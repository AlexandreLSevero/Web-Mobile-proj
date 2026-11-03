'use client';

import { useEffect, useState } from 'react';
import { obterResultadoComparacao } from '@/lib/armazenamento-comparacao';
import { listarLocalidades } from '@/lib/cliente-api';
import OpcoesLocalidade from './opcoes-localidade';
import estilos from './mapa-localidades.module.css';

/**
 * Um dos dois cartões do mapa: ilustração mock e legenda da localidade escolhida.
 *
 * @param {{ponto: 'A'|'B', localidade: string, mapa?: {arquivo: string, alt: string}}} props -
 *   `mapa` vem de `localidades.json`; sem ele (lista ainda carregando) o cartão não aparece.
 */
function CartaoMapa({ ponto, localidade, mapa }) {
  if (!mapa) return null;
  return (
    <figure>
      {/* SVG estático e leve: mantém o <img> da Etapa 1 em vez de next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={estilos['mapa-marcador__imagem']}
        src={mapa.arquivo}
        alt={mapa.alt}
        width="320"
        height="200"
      />
      <figcaption className={estilos['mapa-marcador__nome']}>Ponto {ponto} — {localidade}</figcaption>
    </figure>
  );
}

/**
 * Seleção dos pontos A e B da tela Mapa. Começa em São Paulo × Rio de Janeiro e, se houver,
 * herda as localidades da última comparação feita na tela Comparar.
 */
export default function MapaLocalidades() {
  // null = lista ainda não carregada (primeiro render, igual no servidor e no navegador).
  const [localidades, setLocalidades] = useState(null);
  const [localidadeA, setLocalidadeA] = useState('São Paulo, SP');
  const [localidadeB, setLocalidadeB] = useState('Rio de Janeiro, RJ');
  const [status, setStatus] = useState('Carregando localidades...');

  // sessionStorage só existe no navegador: lido depois do primeiro render.
  useEffect(() => {
    const resultado = obterResultadoComparacao();
    if (!resultado) return;
    setLocalidadeA(resultado.localidadeA.selecionada);
    setLocalidadeB(resultado.localidadeB.selecionada);
  }, []);

  useEffect(() => {
    let ativo = true;
    listarLocalidades()
      .then((lista) => {
        if (!ativo) return;
        setLocalidades(lista);
        setStatus('');
      })
      .catch((erro) => {
        if (ativo) setStatus(erro.message);
      });
    return () => { ativo = false; };
  }, []);

  const mapaDe = (selecionada) => localidades?.find((item) => item.selecionada === selecionada)?.mapa;

  return (
    <>
      <fieldset className={estilos['selecao-mapa']}>
        <legend className={estilos['selecao-mapa__legenda']}>Escolher localidades</legend>
        <p className={estilos['selecao-mapa__campo']}>
          <label className={estilos['selecao-mapa__rotulo']} htmlFor="mapa-localidade-a">Ponto A</label>
          <select
            className={estilos['selecao-mapa__select']}
            id="mapa-localidade-a"
            value={localidadeA}
            onChange={(evento) => setLocalidadeA(evento.target.value)}
            disabled={!localidades}
          >
            {localidades && <OpcoesLocalidade localidades={localidades} />}
          </select>
        </p>
        <p className={estilos['selecao-mapa__campo']}>
          <label className={estilos['selecao-mapa__rotulo']} htmlFor="mapa-localidade-b">Ponto B</label>
          <select
            className={estilos['selecao-mapa__select']}
            id="mapa-localidade-b"
            value={localidadeB}
            onChange={(evento) => setLocalidadeB(evento.target.value)}
            disabled={!localidades}
          >
            {localidades && <OpcoesLocalidade localidades={localidades} />}
          </select>
        </p>
      </fieldset>

      <p aria-live="polite">{status}</p>

      <div className={estilos['mapa-marcador']}>
        <div className={estilos['mapa-marcador__grade']}>
          <CartaoMapa ponto="A" localidade={localidadeA} mapa={mapaDe(localidadeA)} />
          <CartaoMapa ponto="B" localidade={localidadeB} mapa={mapaDe(localidadeB)} />
        </div>
        <p className={estilos['mapa-marcador__legenda']}>
          Ilustrações mock (sem dados meteorológicos reais nem mapa interativo — Nível 1,
          ideacao.md §14). Localização aproximada das duas localidades selecionadas.
        </p>
      </div>
    </>
  );
}
