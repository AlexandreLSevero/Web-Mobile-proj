'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listarLocalidades } from '@/lib/cliente-api';
import { montarLeitura } from '@/lib/montar-leitura';
import { compararLocalidades } from '@/lib/comparar-clima';
import { salvarResultadoComparacao } from '@/lib/armazenamento-comparacao';
import OpcoesLocalidade from './opcoes-localidade';
import estilos from './formulario-comparar.module.css';

/**
 * Formulário da tela Comparar: carrega as localidades do JSON estático, busca a leitura de
 * cada uma no backend (`/api/clima/[slug]`), salva o resultado para a tela de resultado
 * renderizar e navega para ela.
 */
export default function FormularioComparar() {
  const router = useRouter();
  // null = lista ainda não carregada (primeiro render, igual no servidor e no navegador).
  const [localidades, setLocalidades] = useState(null);
  const [localidadeA, setLocalidadeA] = useState('São Paulo, SP');
  const [localidadeB, setLocalidadeB] = useState('Rio de Janeiro, RJ');
  const [status, setStatus] = useState('Carregando localidades...');
  const [enviando, setEnviando] = useState(false);

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

  /**
   * @param {React.FormEvent<HTMLFormElement>} evento
   */
  async function tratarEnvioFormulario(evento) {
    evento.preventDefault();

    const periodo = evento.currentTarget.elements.periodo.value;

    setEnviando(true);
    setStatus('Comparando...');

    try {
      const [leituraA, leituraB] = await Promise.all([
        montarLeitura(localidadeA),
        montarLeitura(localidadeB),
      ]);
      const comparacao = compararLocalidades(leituraA, leituraB);
      salvarResultadoComparacao({ periodo, localidadeA: leituraA, localidadeB: leituraB, comparacao });
      router.push('/resultado');
    } catch (erro) {
      setStatus(erro.message || 'Não foi possível comparar as localidades. Tente novamente.');
      setEnviando(false);
    }
  }

  return (
    <form className={estilos['form-comparar']} method="get" action="/resultado" onSubmit={tratarEnvioFormulario}>
      <p className={estilos['form-comparar__campo']}>
        <label className={estilos['form-comparar__rotulo']} htmlFor="localidade-a">Localidade A</label>
        <select
          className={estilos['form-comparar__select']}
          id="localidade-a"
          name="localidadeA"
          value={localidadeA}
          onChange={(evento) => setLocalidadeA(evento.target.value)}
          disabled={!localidades}
        >
          {localidades && <OpcoesLocalidade localidades={localidades} />}
        </select>
      </p>

      <p className={estilos['form-comparar__campo']}>
        <label className={estilos['form-comparar__rotulo']} htmlFor="localidade-b">Localidade B</label>
        <select
          className={estilos['form-comparar__select']}
          id="localidade-b"
          name="localidadeB"
          value={localidadeB}
          onChange={(evento) => setLocalidadeB(evento.target.value)}
          disabled={!localidades}
        >
          {localidades && <OpcoesLocalidade localidades={localidades} />}
        </select>
      </p>

      <p className={`${estilos['form-comparar__campo']} ${estilos['form-comparar__campo--periodo']}`}>
        <label className={estilos['form-comparar__rotulo']} htmlFor="periodo">Período</label>
        {/* Nesta versão só "Agora"; 24h / 7 dias / 30 dias são Nível 3 (ideacao.md §6). */}
        <select className={estilos['form-comparar__select']} id="periodo" name="periodo" defaultValue="agora">
          <option value="agora">Agora</option>
        </select>
      </p>

      <p className={estilos['form-comparar__acao']}>
        <button className="botao botao--primario" type="submit" disabled={enviando || !localidades}>Comparar clima</button>
      </p>

      <p aria-live="polite">{status}</p>
    </form>
  );
}
