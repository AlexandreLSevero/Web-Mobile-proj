'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { obterFavoritos, removerFavorito, favoritarComparacao } from '@/lib/armazenamento-favoritos';
import { montarLeitura } from '@/lib/montar-leitura';
import { compararLocalidades } from '@/lib/comparar-clima';
import { salvarResultadoComparacao } from '@/lib/armazenamento-comparacao';
import estilos from './lista-favoritos.module.css';

const FORMATADOR_DATA = new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

/**
 * Lista da tela Favoritos: pares de localidades salvos em `localStorage`.
 *
 * Um favorito guarda só o par de localidades, não uma leitura antiga — abrir um favorito
 * roda a comparação de novo na OpenWeather, para mostrar o clima atual, não uma foto velha.
 */
export default function ListaFavoritos() {
  const router = useRouter();
  // null = ainda não lido do localStorage (primeiro render, igual no servidor e no navegador).
  const [favoritos, setFavoritos] = useState(null);
  // `vez` muda a cada anúncio para refocar a região mesmo quando a mensagem se repete.
  const [status, setStatus] = useState({ mensagem: '', vez: 0 });
  const regiaoStatus = useRef(null);
  const consultaEmAndamento = useRef(false);

  useEffect(() => {
    setFavoritos(obterFavoritos());
  }, []);

  // O foco vai para a região de status só depois que o texto aparece: vazia, ela fica com
  // `display: none` e não recebe foco.
  useEffect(() => {
    if (status.vez > 0) regiaoStatus.current?.focus();
  }, [status]);

  function anunciarStatus(mensagem) {
    setStatus((anterior) => ({ mensagem, vez: anterior.vez + 1 }));
  }

  /**
   * Refaz a comparação de um favorito e leva para a tela Resultado com o clima atual —
   * mesmo fluxo do formulário da tela Comparar.
   *
   * @param {React.MouseEvent} evento
   * @param {{nomeA: string, nomeB: string}} favorito
   */
  async function abrirFavorito(evento, { nomeA, nomeB }) {
    evento.preventDefault();
    if (consultaEmAndamento.current) return;
    consultaEmAndamento.current = true;
    anunciarStatus('Comparando...');

    try {
      const [leituraA, leituraB] = await Promise.all([montarLeitura(nomeA), montarLeitura(nomeB)]);
      const comparacao = compararLocalidades(leituraA, leituraB);
      salvarResultadoComparacao({ periodo: 'agora', localidadeA: leituraA, localidadeB: leituraB, comparacao });
      favoritarComparacao(nomeA, nomeB); // atualiza a data de "última consulta"
      router.push('/resultado');
    } catch (erro) {
      anunciarStatus(erro.message || 'Não foi possível atualizar essa comparação. Tente novamente.');
      consultaEmAndamento.current = false;
    }
  }

  function remover(chave) {
    setFavoritos(removerFavorito(chave));
    anunciarStatus('Comparação removida dos favoritos.');
  }

  return (
    <>
      <p className={estilos['favoritos__status']} aria-live="polite" tabIndex={-1} ref={regiaoStatus}>{status.mensagem}</p>

      <div className={estilos['lista-favoritos']}>
        {favoritos?.length === 0 && (
          <p className={estilos['lista-favoritos__vazio']}>Nenhuma comparação favoritada ainda.</p>
        )}
        {favoritos?.map((favorito) => (
          <article key={favorito.chave} className={estilos.favorito}>
            <div className={estilos['favorito__corpo']}>
              <h2 className={estilos['favorito__titulo']}>
                <Link href="/resultado" onClick={(evento) => abrirFavorito(evento, favorito)}>
                  {favorito.nomeA} × {favorito.nomeB}
                </Link>
              </h2>
              <p className={estilos['favorito__data']}>
                <small>
                  Última consulta: <time dateTime={favorito.data}>{FORMATADOR_DATA.format(new Date(favorito.data))}</time>
                </small>
              </p>
            </div>
            <button
              className={estilos['favorito__remover']}
              type="button"
              aria-label={`Remover ${favorito.nomeA} × ${favorito.nomeB} dos favoritos`}
              onClick={() => remover(favorito.chave)}
            >
              ★
            </button>
          </article>
        ))}
      </div>
    </>
  );
}
