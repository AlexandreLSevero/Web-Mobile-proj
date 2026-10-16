import { obterResultadoComparacao } from './armazenamento-comparacao.js';
import { obterMapa } from './dados-mapa.js';

/**
 * @param {string} campo - valor do atributo `data-campo` do elemento alvo.
 * @returns {Element|null}
 */
function elementoDoCampo(campo) {
  return document.querySelector(`[data-campo="${campo}"]`);
}

/**
 * Troca a ilustração e a legenda de um dos dois cartões do mapa pela localidade escolhida
 * (seleção feita na própria aba Mapa, ou herdada da comparação em `index.html`).
 *
 * @param {'a'|'b'} sufixo
 * @param {string} localidadeSelecionada - valor exatamente igual ao de uma `<option>` dos
 *   `<select>` desta tela (ex.: "São Paulo, SP").
 */
function renderizarMapa(sufixo, localidadeSelecionada) {
  const mapa = obterMapa(localidadeSelecionada);
  if (!mapa) return; // sem ilustração mock para essa localidade: mantém o conteúdo estático.

  const imagem = elementoDoCampo(`mapa-imagem-${sufixo}`);
  if (imagem) {
    imagem.src = `../IMG/${mapa.arquivo}`;
    imagem.alt = mapa.alt;
  }

  const nome = elementoDoCampo(`mapa-nome-${sufixo}`);
  if (nome) nome.textContent = `Ponto ${sufixo.toUpperCase()} — ${localidadeSelecionada}`;
}

function init() {
  const selectA = elementoDoCampo('mapa-select-a');
  const selectB = elementoDoCampo('mapa-select-b');
  if (!selectA || !selectB) return;

  const resultado = obterResultadoComparacao();
  if (resultado) {
    selectA.value = resultado.localidadeA.selecionada;
    selectB.value = resultado.localidadeB.selecionada;
  }

  renderizarMapa('a', selectA.value);
  renderizarMapa('b', selectB.value);

  selectA.addEventListener('change', () => renderizarMapa('a', selectA.value));
  selectB.addEventListener('change', () => renderizarMapa('b', selectB.value));
}

document.addEventListener('DOMContentLoaded', init);
