import localidades from '@/public/dados/localidades.json';

const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const TIMEOUT_MS = 8000;

/**
 * Backend do clima atual: o navegador pede por `slug` e só este arquivo conhece a chave
 * da OpenWeather (`OPENWEATHER_API_KEY`, em `.env.local`). Recebe o slug — nunca lat/lon
 * do cliente — para que ninguém use a chave para consultar coordenadas arbitrárias.
 *
 * A API devolve `wind.speed` em m/s mesmo com `units=metric`; convertemos para km/h, a
 * unidade usada em todo o front-end (ver `lib/comparar-clima.js`).
 *
 * @param {Request} _requisicao
 * @param {{params: Promise<{slug: string}>}} contexto
 * @returns {Promise<Response>} `{temperatura, umidade, chuva, vento}` ou `{erro}`.
 */
export async function GET(_requisicao, { params }) {
  const { slug } = await params;
  const localidade = localidades.dados.find((item) => item.slug === slug);
  if (!localidade) {
    return Response.json({ erro: 'Localidade não encontrada.' }, { status: 404 });
  }

  const chave = process.env.OPENWEATHER_API_KEY;
  if (!chave) {
    return Response.json({ erro: 'Servidor sem chave da OpenWeather configurada.' }, { status: 500 });
  }

  const url = new URL(URL_BASE);
  url.searchParams.set('lat', localidade.lat);
  url.searchParams.set('lon', localidade.lon);
  url.searchParams.set('appid', chave);
  url.searchParams.set('units', 'metric');
  url.searchParams.set('lang', 'pt_br');

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  try {
    const resposta = await fetch(url, { signal: controlador.signal, cache: 'no-store' });
    if (!resposta.ok) {
      return Response.json(
        { erro: `OpenWeather respondeu com erro (HTTP ${resposta.status}).` },
        { status: 502 },
      );
    }

    const dados = await resposta.json();
    return Response.json({
      temperatura: dados.main.temp,
      umidade: dados.main.humidity,
      chuva: dados.rain?.['1h'] ?? 0,
      vento: dados.wind.speed * 3.6,
    });
  } catch {
    return Response.json(
      { erro: 'Não foi possível conectar à OpenWeather. Tente novamente em instantes.' },
      { status: 502 },
    );
  } finally {
    clearTimeout(temporizador);
  }
}
