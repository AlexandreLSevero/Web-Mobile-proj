'use client';

import { useEffect, useState } from 'react';
import { ehFavorito, favoritarComparacao, removerFavorito } from '@/lib/armazenamento-favoritos';
import estilos from './resultado-comparacao.module.css';

/**
 * Botão "Favoritar" da tela Resultado: alterna o par de localidades exibido nos favoritos
 * (`localStorage`, via `lib/armazenamento-favoritos.js`).
 *
 * @param {{nomeA: string, nomeB: string}} props - nomes completos (ex.: "São Paulo, SP").
 */
export default function BotaoFavoritar({ nomeA, nomeB }) {
  const [favoritado, setFavoritado] = useState(false);
  const [status, setStatus] = useState('');

  // localStorage só existe no navegador: lido depois do primeiro render.
  useEffect(() => {
    setFavoritado(ehFavorito(nomeA, nomeB));
  }, [nomeA, nomeB]);

  function alternarFavorito() {
    if (!nomeA || !nomeB) {
      setStatus('Não há comparação para favoritar ainda.');
      return;
    }

    const jaEhFavorito = ehFavorito(nomeA, nomeB);

    if (jaEhFavorito) {
      removerFavorito(`${nomeA}::${nomeB}`);
      setStatus('Comparação removida dos favoritos.');
    } else {
      favoritarComparacao(nomeA, nomeB);
      setStatus('Comparação adicionada aos favoritos.');
    }

    setFavoritado(!jaEhFavorito);
  }

  return (
    <>
      <p className={estilos['acoes-resultado']}>
        <button
          className={`botao ${estilos['botao-favoritar']}`}
          type="button"
          aria-pressed={favoritado}
          onClick={alternarFavorito}
        >
          {favoritado ? '★ Favoritado' : '☆ Favoritar'}
        </button>
      </p>
      <p className={estilos['acoes-resultado__status']} aria-live="polite">{status}</p>
    </>
  );
}
