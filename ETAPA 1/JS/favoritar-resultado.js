/**
 * Botão "Favoritar" de `HTML/resultado.html`.
 *
 * Lê os nomes completos das duas localidades já renderizados no cabeçalho (funciona
 * tanto com dados sorteados via JS quanto com o conteúdo estático de exemplo) e alterna
 * o estado de favorito em `localStorage`, via `armazenamento-favoritos.js`.
 */

import { ehFavorito, favoritarComparacao, removerFavorito } from './armazenamento-favoritos.js';

function elementoDoCampo(campo) {
  return document.querySelector(`[data-campo="${campo}"]`);
}

function obterLocalidadesAtuais() {
  const nomeA = elementoDoCampo('selecionada-a')?.textContent.trim();
  const nomeB = elementoDoCampo('selecionada-b')?.textContent.trim();
  return nomeA && nomeB ? { nomeA, nomeB } : null;
}

function anunciarStatus(mensagem) {
  const regiao = elementoDoCampo('favoritar-status');
  if (regiao) regiao.textContent = mensagem;
}

/**
 * @param {boolean} favoritado
 */
function atualizarBotao(favoritado) {
  const botao = document.querySelector('[data-acao="favoritar"]');
  if (!botao) return;
  botao.setAttribute('aria-pressed', String(favoritado));
  botao.textContent = favoritado ? '★ Favoritado' : '☆ Favoritar';
}

function alternarFavorito() {
  const localidades = obterLocalidadesAtuais();
  if (!localidades) {
    anunciarStatus('Não há comparação para favoritar ainda.');
    return;
  }

  const { nomeA, nomeB } = localidades;
  const jaEhFavorito = ehFavorito(nomeA, nomeB);

  if (jaEhFavorito) {
    removerFavorito(`${nomeA}::${nomeB}`);
    anunciarStatus('Comparação removida dos favoritos.');
  } else {
    favoritarComparacao(nomeA, nomeB);
    anunciarStatus('Comparação adicionada aos favoritos.');
  }

  atualizarBotao(!jaEhFavorito);
}

function init() {
  const botao = document.querySelector('[data-acao="favoritar"]');
  if (!botao) return;

  const localidades = obterLocalidadesAtuais();
  if (localidades) atualizarBotao(ehFavorito(localidades.nomeA, localidades.nomeB));

  botao.addEventListener('click', alternarFavorito);
}

document.addEventListener('DOMContentLoaded', init);
