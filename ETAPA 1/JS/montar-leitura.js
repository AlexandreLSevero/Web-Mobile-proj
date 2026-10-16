/**
 * Monta a leitura completa de uma localidade (ClimaMonitor): busca na OpenWeather +
 * índice climático + orientação. Mesmo formato que `JS/dados-mock.js#sortearLeitura` já
 * produzia, para não exigir mudança em `JS/inicializar-resultado.js`.
 */

import { obterCoordenadas } from './localidades.js';
import { buscarClima } from './cliente-openweather.js';
import { calcularRiscos, calcularIndice, classificar } from './indice-climatico.js';
import { gerarOrientacao } from './orientacao.js';

/**
 * @param {string} localidadeSelecionada - valor exato do `<select>` (ex.: "São Paulo, SP").
 * @returns {Promise<object>} leitura com `nome`, `selecionada`, indicadores, `indice`,
 *   `classificacao` e `orientacao`.
 * @throws {Error} se a localidade não tiver coordenadas cadastradas ou a busca falhar.
 */
export async function montarLeitura(localidadeSelecionada) {
  const coordenadas = obterCoordenadas(localidadeSelecionada);
  if (!coordenadas) {
    throw new Error(`Localidade não suportada: "${localidadeSelecionada}".`);
  }

  const leitura = await buscarClima(coordenadas.lat, coordenadas.lon);
  const riscos = calcularRiscos(leitura);
  const indice = calcularIndice(riscos);
  const classificacao = classificar(indice);
  const orientacao = gerarOrientacao(classificacao, riscos);

  return {
    ...leitura,
    nome: localidadeSelecionada.split(',')[0].trim(),
    selecionada: localidadeSelecionada,
    indice,
    classificacao,
    orientacao,
  };
}
