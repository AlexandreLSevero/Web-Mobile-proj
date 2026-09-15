/**
 * Ponte de dados entre `HTML/index.html` e `HTML/resultado.html` (ClimaMonitor).
 *
 * Usa `sessionStorage`: é só um repasse de página para página dentro da mesma aba, não a
 * persistência de Favoritos (fora do Nível 1 — ver ideacao.md §6).
 */

const CHAVE_RESULTADO_COMPARACAO = 'climamonitor:resultado-comparacao';

/**
 * Salva o resultado de uma comparação para a tela de resultado ler em seguida.
 *
 * @param {object} resultado
 */
export function salvarResultadoComparacao(resultado) {
  try {
    sessionStorage.setItem(CHAVE_RESULTADO_COMPARACAO, JSON.stringify(resultado));
  } catch {
    // sessionStorage pode estar indisponível (ex.: modo privado); a navegação continua
    // funcionando como fallback, só sem os dados sorteados.
  }
}

/**
 * Lê o resultado salvo pela tela de comparação, se houver.
 *
 * @returns {object|null}
 */
export function obterResultadoComparacao() {
  try {
    const bruto = sessionStorage.getItem(CHAVE_RESULTADO_COMPARACAO);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}
