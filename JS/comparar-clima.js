/**
 * Regras de comparação entre duas leituras climáticas (ClimaMonitor).
 *
 * Funções puras: comparam e formatam valores já prontos (mock hoje; resposta real do
 * `POST /comparar` no futuro). Não recalculam o índice climático nem escrevem novos textos
 * de orientação — isso é regra de negócio do backend (ideacao.md §5.7/§5.8, JS/CLAUDE.md).
 */

const UNIDADES_INDICADOR = {
  temperatura: { casas: 1, sufixo: '°C' },
  umidade: { casas: 0, sufixo: '%' },
  chuva: { casas: 1, sufixo: 'mm' },
  vento: { casas: 1, sufixo: 'km/h' },
};

const FRASES_DIFERENCA = {
  temperatura: (vencedor, diferenca) => `${vencedor} está ${diferenca} mais quente.`,
  umidade: (vencedor, diferenca) => `${vencedor} está ${diferenca} mais úmido.`,
  chuva: (vencedor, diferenca) => `${vencedor} registrou ${diferenca} a mais de chuva.`,
  vento: (vencedor, diferenca) => `${vencedor} teve vento ${diferenca} mais forte.`,
};

/**
 * Formata um número no padrão pt-BR (vírgula decimal).
 *
 * @param {number} valor
 * @param {number} casas - casas decimais.
 * @returns {string}
 */
export function formatarNumero(valor, casas) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: casas, maximumFractionDigits: casas });
}

/**
 * Formata um indicador com sua unidade (ex.: "24,3 °C", "78%").
 *
 * @param {'temperatura'|'umidade'|'chuva'|'vento'} indicador
 * @param {number} valor
 * @returns {string}
 */
export function formatarIndicador(indicador, valor) {
  const { casas, sufixo } = UNIDADES_INDICADOR[indicador];
  return sufixo === '%' ? `${formatarNumero(valor, casas)}%` : `${formatarNumero(valor, casas)} ${sufixo}`;
}

/**
 * Compara duas leituras e aponta, indicador a indicador, qual localidade tem o maior valor.
 * Comparação simples de números já calculados — não é o cálculo do índice climático.
 *
 * @param {object} leituraA
 * @param {object} leituraB
 * @returns {{maiorTemperatura: string, maiorUmidade: string, maiorChuva: string, maiorVento: string, maiorNivelAtencao: string}}
 */
export function compararLocalidades(leituraA, leituraB) {
  return {
    maiorTemperatura: leituraA.temperatura >= leituraB.temperatura ? leituraA.nome : leituraB.nome,
    maiorUmidade: leituraA.umidade >= leituraB.umidade ? leituraA.nome : leituraB.nome,
    maiorChuva: leituraA.chuva >= leituraB.chuva ? leituraA.nome : leituraB.nome,
    maiorVento: leituraA.vento >= leituraB.vento ? leituraA.nome : leituraB.nome,
    maiorNivelAtencao: leituraA.indice >= leituraB.indice ? leituraA.nome : leituraB.nome,
  };
}

/**
 * Calcula a diferença absoluta de um indicador entre duas leituras e quem tem o maior valor.
 *
 * @param {'temperatura'|'umidade'|'chuva'|'vento'} indicador
 * @param {object} leituraA
 * @param {object} leituraB
 * @returns {{vencedor: string, diferencaFormatada: string}}
 */
export function calcularDiferenca(indicador, leituraA, leituraB) {
  const { casas, sufixo } = UNIDADES_INDICADOR[indicador];
  const valorA = leituraA[indicador];
  const valorB = leituraB[indicador];
  const vencedor = valorA >= valorB ? leituraA.nome : leituraB.nome;
  const diferencaAbsoluta = Math.abs(valorA - valorB);
  const diferencaFormatada = indicador === 'umidade'
    ? `${formatarNumero(diferencaAbsoluta, casas)} pontos percentuais`
    : `${formatarNumero(diferencaAbsoluta, casas)} ${sufixo}`;
  return { vencedor, diferencaFormatada };
}

/**
 * Gera a frase comparativa de um indicador entre as duas localidades (painéis "Comparar
 * por indicador" de `HTML/resultado.html`).
 *
 * @param {'temperatura'|'umidade'|'chuva'|'vento'} indicador
 * @param {object} leituraA
 * @param {object} leituraB
 * @returns {string}
 */
export function descreverDiferenca(indicador, leituraA, leituraB) {
  const { vencedor, diferencaFormatada } = calcularDiferenca(indicador, leituraA, leituraB);
  return FRASES_DIFERENCA[indicador](vencedor, diferencaFormatada);
}
