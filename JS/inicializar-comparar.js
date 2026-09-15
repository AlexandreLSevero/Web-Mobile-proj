import { sortearLeitura } from './dados-mock.js';
import { compararLocalidades } from './comparar-clima.js';
import { salvarResultadoComparacao } from './armazenamento-comparacao.js';

/**
 * Sorteia uma leitura mock para cada localidade escolhida e salva o resultado para a
 * tela de resultado renderizar. Não usa `preventDefault()`: o
 * `<form method="get" action="resultado.html">` continua navegando normalmente, o que
 * funciona como fallback caso o JavaScript não rode.
 *
 * @param {SubmitEvent} evento
 */
function tratarEnvioFormulario(evento) {
  const formulario = evento.currentTarget;
  const localidadeA = formulario.elements.localidadeA.value;
  const localidadeB = formulario.elements.localidadeB.value;
  const periodo = formulario.elements.periodo.value;

  try {
    const leituraA = sortearLeitura(localidadeA);
    const leituraB = sortearLeitura(localidadeB);
    const comparacao = compararLocalidades(leituraA, leituraB);
    salvarResultadoComparacao({ periodo, localidadeA: leituraA, localidadeB: leituraB, comparacao });
  } catch (erro) {
    // Sem dados mock para a seleção: resultado.html mantém o conteúdo estático de exemplo.
    console.error(erro);
  }
}

function init() {
  const formulario = document.querySelector('[data-acao="comparar"]');
  if (!formulario) return;
  formulario.addEventListener('submit', tratarEnvioFormulario);
}

document.addEventListener('DOMContentLoaded', init);
