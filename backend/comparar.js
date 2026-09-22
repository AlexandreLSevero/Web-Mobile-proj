/**
 * Orquestra o `POST /comparar` (ideacao.md §5.2/§5.6): resolve coordenadas, busca o clima
 * de cada localidade, calcula índice/classificação/orientação e monta a comparação entre
 * as duas — o front-end só renderiza o que vem daqui.
 */

import { obterCoordenadas } from './localidades.js';
import { buscarClima } from './cliente-openweather.js';
import { calcularRiscos, calcularIndice, classificar } from './indice-climatico.js';
import { gerarOrientacao } from './orientacao.js';

/**
 * Monta a leitura completa de uma localidade: dados do OpenWeather + índice + orientação.
 *
 * @param {string} localidadeSelecionada - valor exato do `<select>` (ex.: "São Paulo, SP").
 * @returns {Promise<object>}
 * @throws {Error} se a localidade não tiver coordenadas cadastradas.
 */
async function montarLeitura(localidadeSelecionada) {
  const coordenadas = obterCoordenadas(localidadeSelecionada);
  if (!coordenadas) {
    const erro = new Error(`Localidade não suportada: "${localidadeSelecionada}".`);
    erro.status = 400;
    throw erro;
  }

  const leitura = await buscarClima(coordenadas.lat, coordenadas.lon);
  const riscos = calcularRiscos(leitura);
  const indice = calcularIndice(riscos);
  const classificacao = classificar(indice);
  const orientacao = gerarOrientacao(classificacao, riscos);

  return {
    nome: localidadeSelecionada.split(',')[0].trim(),
    ...leitura,
    indice,
    classificacao,
    orientacao,
  };
}

/**
 * Compara duas localidades, indicador a indicador, apontando qual tem o maior valor —
 * mesma regra de `JS/comparar-clima.js#compararLocalidades`, recalculada no backend
 * porque agora é ele quem já entrega os dados prontos.
 *
 * @param {object} localidadeA
 * @param {object} localidadeB
 * @returns {object}
 */
function compararLocalidades(localidadeA, localidadeB) {
  return {
    maiorTemperatura: localidadeA.temperatura >= localidadeB.temperatura ? localidadeA.nome : localidadeB.nome,
    maiorUmidade: localidadeA.umidade >= localidadeB.umidade ? localidadeA.nome : localidadeB.nome,
    maiorChuva: localidadeA.chuva >= localidadeB.chuva ? localidadeA.nome : localidadeB.nome,
    maiorVento: localidadeA.vento >= localidadeB.vento ? localidadeA.nome : localidadeB.nome,
    maiorNivelAtencao: localidadeA.indice >= localidadeB.indice ? localidadeA.nome : localidadeB.nome,
  };
}

/**
 * Monta a resposta completa do `POST /comparar`.
 *
 * @param {{localidadeA: string, localidadeB: string}} selecao
 * @returns {Promise<object>}
 */
export async function montarResposta({ localidadeA, localidadeB }) {
  const [leituraA, leituraB] = await Promise.all([
    montarLeitura(localidadeA),
    montarLeitura(localidadeB),
  ]);

  return {
    localidadeA: leituraA,
    localidadeB: leituraB,
    comparacao: compararLocalidades(leituraA, leituraB),
  };
}
