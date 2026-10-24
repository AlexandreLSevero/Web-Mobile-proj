'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { montarLeitura } from '@/lib/montar-leitura';
import { compararLocalidades } from '@/lib/comparar-clima';
import { salvarResultadoComparacao } from '@/lib/armazenamento-comparacao';
import OpcoesLocalidade from './opcoes-localidade';
import estilos from './formulario-comparar.module.css';

/**
 * Formulário da tela Comparar: busca a leitura real de cada localidade na OpenWeather,
 * salva o resultado para a tela de resultado renderizar e navega para ela.
 */
export default function FormularioComparar() {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [enviando, setEnviando] = useState(false);

  /**
   * @param {React.FormEvent<HTMLFormElement>} evento
   */
  async function tratarEnvioFormulario(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    const localidadeA = formulario.elements.localidadeA.value;
    const localidadeB = formulario.elements.localidadeB.value;
    const periodo = formulario.elements.periodo.value;

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
        <select className={estilos['form-comparar__select']} id="localidade-a" name="localidadeA" defaultValue="São Paulo, SP">
          <OpcoesLocalidade />
        </select>
      </p>

      <p className={estilos['form-comparar__campo']}>
        <label className={estilos['form-comparar__rotulo']} htmlFor="localidade-b">Localidade B</label>
        <select className={estilos['form-comparar__select']} id="localidade-b" name="localidadeB" defaultValue="Rio de Janeiro, RJ">
          <OpcoesLocalidade />
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
        <button className="botao botao--primario" type="submit" disabled={enviando}>Comparar clima</button>
      </p>

      <p aria-live="polite">{status}</p>
    </form>
  );
}
