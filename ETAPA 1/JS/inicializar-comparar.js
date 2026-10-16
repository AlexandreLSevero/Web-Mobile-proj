import { montarLeitura } from './montar-leitura.js';
import { compararLocalidades } from './comparar-clima.js';
import { salvarResultadoComparacao } from './armazenamento-comparacao.js';

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
 * Busca a leitura real de cada localidade escolhida na OpenWeather e salva o resultado
 * para a tela de resultado renderizar.
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

  try {
    const [leituraA, leituraB] = await Promise.all([
      montarLeitura(localidadeA),
      montarLeitura(localidadeB),
    ]);
    const comparacao = compararLocalidades(leituraA, leituraB);
    salvarResultadoComparacao({ periodo, localidadeA: leituraA, localidadeB: leituraB, comparacao });
    window.location.href = 'resultado.html';
  } catch (erro) {
    definirStatus(formulario, erro.message || 'Não foi possível comparar as localidades. Tente novamente.');
    botao.disabled = false;
  }
}

function init() {
  const formulario = document.querySelector('[data-acao="comparar"]');
  if (!formulario) return;
  formulario.addEventListener('submit', tratarEnvioFormulario);
}

document.addEventListener('DOMContentLoaded', init);
