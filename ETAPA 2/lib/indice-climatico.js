/**
 * Índice de Condição Climática — próprio do ClimaMonitor, não um índice meteorológico
 * oficial (ideacao.md §5.7). Funções puras: cálculo separado de rede e de DOM.
 *
 * Pesos e faixas confirmados com a equipe (ideacao.md §14 estava em aberto):
 * chuva 35% + vento 30% + temperatura 20% + umidade 15%, cada indicador normalizado
 * 0–100 por uma faixa de risco própria antes de ponderar.
 */

const PESOS = { chuva: 0.35, vento: 0.30, temperatura: 0.20, umidade: 0.15 };

const FAIXAS_RISCO = {
  temperatura: { min: 20, max: 38 },
  umidade: { min: 50, max: 100 },
  chuva: { min: 0, max: 20 },
  vento: { min: 0, max: 60 },
};

function normalizarRisco(indicador, valor) {
  const { min, max } = FAIXAS_RISCO[indicador];
  const risco = ((valor - min) / (max - min)) * 100;
  return Math.min(100, Math.max(0, risco));
}

/**
 * Calcula o risco (0–100) de cada indicador a partir da leitura normalizada.
 *
 * @param {{temperatura: number, umidade: number, chuva: number, vento: number}} leitura
 * @returns {{temperatura: number, umidade: number, chuva: number, vento: number}}
 */
export function calcularRiscos(leitura) {
  return {
    temperatura: normalizarRisco('temperatura', leitura.temperatura),
    umidade: normalizarRisco('umidade', leitura.umidade),
    chuva: normalizarRisco('chuva', leitura.chuva),
    vento: normalizarRisco('vento', leitura.vento),
  };
}

/**
 * Combina os riscos por indicador no Índice de Condição Climática (0–100).
 *
 * @param {{temperatura: number, umidade: number, chuva: number, vento: number}} riscos
 * @returns {number}
 */
export function calcularIndice(riscos) {
  const indice = Object.entries(PESOS)
    .reduce((soma, [indicador, peso]) => soma + riscos[indicador] * peso, 0);
  return Math.round(indice);
}

/**
 * Classifica o índice pelas faixas fixadas em ideacao.md §5.7.
 *
 * @param {number} indice
 * @returns {'Normal'|'Atenção'|'Alerta'|'Crítico'}
 */
export function classificar(indice) {
  if (indice <= 30) return 'Normal';
  if (indice <= 60) return 'Atenção';
  if (indice <= 80) return 'Alerta';
  return 'Crítico';
}
