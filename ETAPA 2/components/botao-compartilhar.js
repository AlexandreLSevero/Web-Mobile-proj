'use client';

import { useState } from 'react';
import estilos from './resultado-comparacao.module.css';

/**
 * Botão "Compartilhar resultado" da tela Resultado.
 *
 * Degradação em cascata (ideacao.md §14): Web Share API nativa → copiar para a área de
 * transferência → aviso pedindo para copiar manualmente. Feedback sempre por uma região
 * `aria-live="polite"`, nunca só visual.
 *
 * @param {{texto: string}} props - texto já montado com descrição, leitura e orientação.
 */
export default function BotaoCompartilhar({ texto }) {
  const [status, setStatus] = useState('');

  async function compartilhar() {
    if (!texto) {
      setStatus('Não há resultado para compartilhar ainda.');
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
        setStatus('Resultado copiado para a área de transferência.');
        return;
      } catch {
        // segue para o aviso abaixo
      }
    }

    setStatus('Não foi possível compartilhar automaticamente. Copie o resultado manualmente.');
  }

  return (
    <>
      <p className={estilos['analise__acao']}>
        <button className="botao" type="button" onClick={compartilhar}>Compartilhar resultado</button>
      </p>
      <p className={estilos['analise__status']} aria-live="polite">{status}</p>
    </>
  );
}
