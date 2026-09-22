/**
 * Lista de `HTML/favoritos.html`: substitui os 3 exemplos estáticos (fallback sem JS)
 * pelos favoritos reais salvos em `localStorage`, via `armazenamento-favoritos.js`.
 */

import { obterFavoritos, removerFavorito } from './armazenamento-favoritos.js';

const FORMATADOR_DATA = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

function anunciarStatus(mensagem) {
  const regiao = document.querySelector('[data-campo="favoritos-status"]');
  if (!regiao) return;
  regiao.textContent = mensagem;
  regiao.focus();
}

/**
 * @param {{chave: string, nomeA: string, nomeB: string, data: string}} favorito
 * @returns {HTMLElement}
 */
function criarItemFavorito(favorito) {
  const artigo = document.createElement('article');
  artigo.className = 'favorito';
  artigo.dataset.chave = favorito.chave;

  const corpo = document.createElement('div');
  corpo.className = 'favorito__corpo';

  const titulo = document.createElement('h2');
  titulo.className = 'favorito__titulo';
  const link = document.createElement('a');
  link.href = 'resultado.html';
  link.textContent = `${favorito.nomeA} × ${favorito.nomeB}`;
  titulo.appendChild(link);

  const paragrafoData = document.createElement('p');
  paragrafoData.className = 'favorito__data';
  const pequeno = document.createElement('small');
  pequeno.append('Última consulta: ');
  const tempo = document.createElement('time');
  const data = new Date(favorito.data);
  tempo.dateTime = favorito.data;
  tempo.textContent = FORMATADOR_DATA.format(data);
  pequeno.appendChild(tempo);
  paragrafoData.appendChild(pequeno);

  corpo.append(titulo, paragrafoData);

  const botaoRemover = document.createElement('button');
  botaoRemover.className = 'favorito__remover';
  botaoRemover.type = 'button';
  botaoRemover.dataset.acao = 'remover-favorito';
  botaoRemover.setAttribute('aria-label', `Remover ${favorito.nomeA} × ${favorito.nomeB} dos favoritos`);
  botaoRemover.textContent = '★';

  artigo.append(corpo, botaoRemover);
  return artigo;
}

function criarEstadoVazio() {
  const paragrafo = document.createElement('p');
  paragrafo.className = 'lista-favoritos__vazio';
  paragrafo.textContent = 'Nenhuma comparação favoritada ainda.';
  return paragrafo;
}

function renderizar(lista) {
  const container = document.querySelector('[data-lista-favoritos]');
  if (!container) return;

  container.replaceChildren(...(lista.length ? lista.map(criarItemFavorito) : [criarEstadoVazio()]));
}

function tratarClique(evento) {
  const botao = evento.target.closest('[data-acao="remover-favorito"]');
  if (!botao) return;

  const chave = botao.closest('[data-chave]')?.dataset.chave;
  if (!chave) return;

  renderizar(removerFavorito(chave));
  anunciarStatus('Comparação removida dos favoritos.');
}

function init() {
  const container = document.querySelector('[data-lista-favoritos]');
  if (!container) return;

  renderizar(obterFavoritos());
  container.addEventListener('click', tratarClique);
}

document.addEventListener('DOMContentLoaded', init);
