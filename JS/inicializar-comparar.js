import { salvarResultadoComparacao } from './armazenamento-comparacao.js';

const TIMEOUT_MS = 8000;

/**
 * Mostra uma mensagem na região de status (`aria-live="polite"`) do formulário.
 *
 * @param {HTMLFormElement} formulario
 * @param {string} mensagem
 */
function definirStatus(formulario, mensagem) {
  const status = formulario.querySelector('[data-papel="status"]');
  if (status) status.textContent = mensagem;
}

/**
 * Chama o backend do ClimaMonitor (`POST /comparar`, ideacao.md §5.4/§5.6) para a seleção
 * feita pelo usuário.
 *
 * @param {SubmitEvent} evento
 */
async function tratarEnvioFormulario(evento) {
  evento.preventDefault();

  const formulario = evento.currentTarget;
  const botao = formulario.querySelector('button[type="submit"]');
  const localidadeA = formulario.elements.localidadeA.value;
  const localidadeB = formulario.elements.localidadeB.value;
  const periodo = formulario.elements.periodo.value;

  botao.disabled = true;
  definirStatus(formulario, 'Comparando...');

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  try {
    const resposta = await fetch('/comparar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ localidadeA, localidadeB, periodo }),
      signal: controlador.signal,
    });

    const dados = await resposta.json();
    if (!resposta.ok) {
      throw new Error(dados.erro || 'Não foi possível comparar as localidades.');
    }

    salvarResultadoComparacao({
      periodo,
      localidadeA: { ...dados.localidadeA, selecionada: localidadeA },
      localidadeB: { ...dados.localidadeB, selecionada: localidadeB },
      comparacao: dados.comparacao,
    });
    window.location.href = 'resultado.html';
  } catch (erro) {
    const mensagem = erro.name === 'AbortError'
      ? 'O servidor demorou para responder. Tente novamente.'
      : erro.message || 'Não foi possível comparar as localidades. Tente novamente.';
    definirStatus(formulario, mensagem);
    botao.disabled = false;
  } finally {
    clearTimeout(temporizador);
  }
}

function init() {
  const formulario = document.querySelector('[data-acao="comparar"]');
  if (!formulario) return;
  formulario.addEventListener('submit', tratarEnvioFormulario);
}

document.addEventListener('DOMContentLoaded', init);
