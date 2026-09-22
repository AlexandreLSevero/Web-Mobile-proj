/**
 * Lista de `HTML/favoritos.html`: substitui os 3 exemplos estáticos (fallback sem JS)
 * pelos favoritos reais salvos em `localStorage`, via `armazenamento-favoritos.js`.
 *
 * Um favorito guarda só o par de localidades, não uma leitura antiga — abrir um favorito
 * roda a comparação de novo na OpenWeather (`JS/montar-leitura.js`), para mostrar o clima
 * atual, não uma foto velha.
 */

import { obterFavoritos, removerFavorito, favoritarComparacao } from './armazenamento-favoritos.js';
import { montarLeitura } from './montar-leitura.js';
import { compararLocalidades } from './comparar-clima.js';
import { salvarResultadoComparacao } from './armazenamento-comparacao.js';

const FORMATADOR_DATA = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

let consultaEmAndamento = false;

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
  link.dataset.acao = 'comparar-favorito';
  link.dataset.nomeA = favorito.nomeA;
  link.dataset.nomeB = favorito.nomeB;
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

/**
 * Refaz a comparação de um favorito na OpenWeather e leva para `resultado.html` com o
 * clima atual — mesmo fluxo de `JS/inicializar-comparar.js`, disparado a partir da lista
 * de favoritos em vez do formulário de `index.html`.
 *
 * @param {string} nomeA
 * @param {string} nomeB
 */
async function abrirFavorito(nomeA, nomeB) {
  if (consultaEmAndamento) return;
  consultaEmAndamento = true;
  anunciarStatus('Comparando...');

  try {
    const [leituraA, leituraB] = await Promise.all([montarLeitura(nomeA), montarLeitura(nomeB)]);
    const comparacao = compararLocalidades(leituraA, leituraB);
    salvarResultadoComparacao({ periodo: 'agora', localidadeA: leituraA, localidadeB: leituraB, comparacao });
    favoritarComparacao(nomeA, nomeB); // atualiza a data de "última consulta"
    window.location.href = 'resultado.html';
  } catch (erro) {
    anunciarStatus(erro.message || 'Não foi possível atualizar essa comparação. Tente novamente.');
    consultaEmAndamento = false;
  }
}

function tratarClique(evento) {
  const botaoRemover = evento.target.closest('[data-acao="remover-favorito"]');
  if (botaoRemover) {
    const chave = botaoRemover.closest('[data-chave]')?.dataset.chave;
    if (!chave) return;
    renderizar(removerFavorito(chave));
    anunciarStatus('Comparação removida dos favoritos.');
    return;
  }

  const linkComparar = evento.target.closest('[data-acao="comparar-favorito"]');
  if (linkComparar) {
    evento.preventDefault();
    const { nomeA, nomeB } = linkComparar.dataset;
    abrirFavorito(nomeA, nomeB);
  }
}

function init() {
  const container = document.querySelector('[data-lista-favoritos]');
  if (!container) return;

  renderizar(obterFavoritos());
  container.addEventListener('click', tratarClique);
}

document.addEventListener('DOMContentLoaded', init);
