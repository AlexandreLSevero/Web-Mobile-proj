/**
 * Persistência de Favoritos (ClimaMonitor) — `localStorage`, sem conta de usuário.
 *
 * Par de `armazenamento-comparacao.js`, mas para dados que sobrevivem entre sessões
 * (favoritos), não só entre `index.html` e `resultado.html` na mesma aba.
 */

const CHAVE_FAVORITOS = 'climamonitor:favoritos';

/**
 * @param {string} nomeA
 * @param {string} nomeB
 * @returns {string}
 */
function montarChave(nomeA, nomeB) {
  return `${nomeA}::${nomeB}`;
}

/**
 * @returns {Array<{chave: string, nomeA: string, nomeB: string, data: string}>}
 */
export function obterFavoritos() {
  try {
    const bruto = localStorage.getItem(CHAVE_FAVORITOS);
    return bruto ? JSON.parse(bruto) : [];
  } catch {
    return [];
  }
}

function salvarFavoritos(lista) {
  try {
    localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(lista));
  } catch {
    // localStorage pode estar indisponível (ex.: modo privado); segue sem persistir.
  }
}

/**
 * @param {string} nomeA
 * @param {string} nomeB
 * @returns {boolean}
 */
export function ehFavorito(nomeA, nomeB) {
  const chave = montarChave(nomeA, nomeB);
  return obterFavoritos().some((favorito) => favorito.chave === chave);
}

/**
 * Adiciona a comparação aos favoritos (ou atualiza a data, se já estava favoritada).
 *
 * @param {string} nomeA
 * @param {string} nomeB
 * @returns {Array<object>} lista atualizada de favoritos
 */
export function favoritarComparacao(nomeA, nomeB) {
  const chave = montarChave(nomeA, nomeB);
  const lista = obterFavoritos().filter((favorito) => favorito.chave !== chave);
  lista.unshift({ chave, nomeA, nomeB, data: new Date().toISOString() });
  salvarFavoritos(lista);
  return lista;
}

/**
 * @param {string} chave
 * @returns {Array<object>} lista atualizada de favoritos
 */
export function removerFavorito(chave) {
  const lista = obterFavoritos().filter((favorito) => favorito.chave !== chave);
  salvarFavoritos(lista);
  return lista;
}
