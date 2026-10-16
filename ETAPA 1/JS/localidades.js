/**
 * Coordenadas fixas das 8 localidades oferecidas em `HTML/index.html` (ClimaMonitor).
 *
 * Evita depender de uma API de geocodificação: o conjunto de localidades é fechado nesta
 * versão (Nível 1), então as coordenadas ficam hardcoded aqui.
 */

const COORDENADAS = {
  'São Paulo, SP': { lat: -23.5505, lon: -46.6333 },
  'Rio de Janeiro, RJ': { lat: -22.9068, lon: -43.1729 },
  'Belo Horizonte, MG': { lat: -19.9167, lon: -43.9345 },
  'Curitiba, PR': { lat: -25.4284, lon: -49.2733 },
  'Porto Alegre, RS': { lat: -30.0346, lon: -51.2177 },
  'Recife, PE': { lat: -8.0476, lon: -34.8770 },
  'Salvador, BA': { lat: -12.9777, lon: -38.5016 },
  'Manaus, AM': { lat: -3.1190, lon: -60.0217 },
};

/**
 * Busca as coordenadas de uma localidade pelo valor exato do `<select>` do front-end.
 *
 * @param {string} localidadeSelecionada - ex.: "São Paulo, SP".
 * @returns {{lat: number, lon: number}|null}
 */
export function obterCoordenadas(localidadeSelecionada) {
  return COORDENADAS[localidadeSelecionada] ?? null;
}
