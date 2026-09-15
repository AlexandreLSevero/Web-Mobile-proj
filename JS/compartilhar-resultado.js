/**
 * Botão "Compartilhar resultado" de `HTML/resultado.html`.
 *
 * O comportamento estava em aberto (ideacao.md §14: "Web Share API? copiar link?").
 * Escolha adotada aqui, com degradação em cascata: Web Share API nativa → copiar para a
 * área de transferência → aviso pedindo para copiar manualmente. Feedback sempre por uma
 * região `aria-live="polite"` (HTML/CLAUDE.md), nunca só visual.
 */

/**
 * Monta o texto a compartilhar a partir do que está renderizado na página — funciona
 * tanto com dados sorteados via JS quanto com o conteúdo estático de exemplo.
 *
 * @returns {string}
 */
function montarTextoCompartilhamento() {
  const partes = ['descricao-comparacao', 'leitura-comparacao', 'orientacao-mensagem'].map((campo) => {
    const elemento = document.querySelector(`[data-campo="${campo}"]`);
    return elemento ? elemento.textContent.trim().replace(/\s+/g, ' ') : '';
  });
  return partes.filter(Boolean).join('\n\n');
}

function anunciarStatus(mensagem) {
  const regiao = document.querySelector('[data-campo="compartilhar-status"]');
  if (regiao) regiao.textContent = mensagem;
}

/**
 * @param {MouseEvent} evento
 */
async function compartilhar(evento) {
  const texto = montarTextoCompartilhamento();
  if (!texto) {
    anunciarStatus('Não há resultado para compartilhar ainda.');
    return;
  }

  if (navigator.share) {
    try {
      await navigator.share({ title: 'ClimaMonitor — Resultado da comparação', text: texto });
      return;
    } catch (erro) {
      if (erro.name === 'AbortError') return; // usuário cancelou o compartilhamento nativo
      // qualquer outro erro (ex.: sem suporte real) segue para o próximo método
    }
  }

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(texto);
      anunciarStatus('Resultado copiado para a área de transferência.');
      return;
    } catch {
      // segue para o aviso abaixo
    }
  }

  anunciarStatus('Não foi possível compartilhar automaticamente. Copie o resultado manualmente.');
}

function init() {
  const botao = document.querySelector('[data-acao="compartilhar"]');
  if (!botao) return;
  botao.addEventListener('click', compartilhar);
}

document.addEventListener('DOMContentLoaded', init);
