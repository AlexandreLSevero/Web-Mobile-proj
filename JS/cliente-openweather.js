/**
 * Cliente da Current Weather API 2.5 do OpenWeather, chamada diretamente do navegador
 * (ClimaMonitor não tem backend — ver `JS/configuracao-api.js`).
 */

import { OPENWEATHER_API_KEY } from './configuracao-api.js';

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
  const url = new URL(URL_BASE);
  url.searchParams.set('lat', lat);
  url.searchParams.set('lon', lon);
  url.searchParams.set('appid', OPENWEATHER_API_KEY);
  url.searchParams.set('units', 'metric');
  url.searchParams.set('lang', 'pt_br');

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  let resposta;
  try {
    resposta = await fetch(url, { signal: controlador.signal });
  } catch {
    throw new Error('Não foi possível conectar à OpenWeather. Verifique sua conexão e tente novamente.');
  } finally {
    clearTimeout(temporizador);
  }

  if (!resposta.ok) {
    throw new Error(`OpenWeather respondeu com erro (HTTP ${resposta.status}).`);
  }

  const dados = await resposta.json();
  return {
    temperatura: dados.main.temp,
    umidade: dados.main.humidity,
    chuva: dados.rain?.['1h'] ?? 0,
    vento: dados.wind.speed * 3.6,
  };
}
