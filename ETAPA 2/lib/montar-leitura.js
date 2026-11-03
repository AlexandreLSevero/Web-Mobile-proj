/**
 * Monta a leitura completa de uma localidade (ClimaMonitor): clima atual (backend
 * `/api/clima/[slug]`, que consulta a OpenWeather) + índice climático + orientação.
 */

import { obterLocalidade, buscarClima } from './cliente-api.js';
import { calcularRiscos, calcularIndice, classificar } from './indice-climatico.js';
import { gerarOrientacao } from './orientacao.js';

/**
 * @param {string} localidadeSelecionada - valor exato do `<select>` (ex.: "São Paulo, SP").
 * @returns {Promise<object>} leitura com `nome`, `selecionada`, indicadores, `indice`,
 *   `classificacao` e `orientacao`.
 * @throws {Error} se a localidade não estiver em `localidades.json` ou a busca falhar.
 */
export async function montarLeitura(localidadeSelecionada) {
  const localidade = await obterLocalidade(localidadeSelecionada);
  if (!localidade) {
    throw new Error(`Localidade não suportada: "${localidadeSelecionada}".`);
  }

  const leitura = await buscarClima(localidade.slug);
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
