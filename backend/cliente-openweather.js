/**
 * Cliente da Current Weather API 2.5 do OpenWeather (ClimaMonitor).
 *
 * Único ponto do backend que fala com a OpenWeather — a chave (`OPENWEATHER_API`) nunca
 * sai daqui, nunca é logada e nunca chega ao front-end.
 */

const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather';
const TIMEOUT_MS = 8000;

/**
 * Busca a leitura atual de uma coordenada e normaliza para as unidades do ClimaMonitor.
 * A API devolve `wind.speed` em m/s mesmo com `units=metric`; convertemos para km/h, a
 * unidade usada em todo o front-end (ver `JS/comparar-clima.js`).
 *
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<{temperatura: number, umidade: number, chuva: number, vento: number}>}
 * @throws {Error} se a chamada falhar, expirar ou a API responder com erro.
 */
export async function buscarClima(lat, lon) {
  const chave = process.env.OPENWEATHER_API;
  if (!chave) {
    const erro = new Error('Chave da OpenWeather (OPENWEATHER_API) não configurada no servidor.');
    erro.status = 500;
    throw erro;
  }

  const url = new URL(URL_BASE);
  url.searchParams.set('lat', lat);
  url.searchParams.set('lon', lon);
  url.searchParams.set('appid', chave);
  url.searchParams.set('units', 'metric');
  url.searchParams.set('lang', 'pt_br');

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  let resposta;
  try {
    resposta = await fetch(url, { signal: controlador.signal });
  } catch {
    const erro = new Error('Não foi possível conectar à OpenWeather. Tente novamente em instantes.');
    erro.status = 502;
    throw erro;
  } finally {
    clearTimeout(temporizador);
  }

  if (!resposta.ok) {
    const erro = new Error(`OpenWeather respondeu com erro (HTTP ${resposta.status}).`);
    erro.status = 502;
    throw erro;
  }

  const dados = await resposta.json();
  return {
    temperatura: dados.main.temp,
    umidade: dados.main.humidity,
    chuva: dados.rain?.['1h'] ?? 0,
    vento: dados.wind.speed * 3.6,
  };
}
