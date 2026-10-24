'use client';

import { Fragment, useEffect, useState } from 'react';
import { obterResultadoComparacao } from '@/lib/armazenamento-comparacao';
import {
  formatarNumero,
  formatarIndicador,
  calcularDiferenca,
  descreverDiferenca,
  compararLocalidades,
} from '@/lib/comparar-clima';
import Cabecalho from './cabecalho';
import Navegacao from './navegacao';
import FiltroIndicador, { INDICADORES_FILTRO } from './filtro-indicador';
import BotaoFavoritar from './botao-favoritar';
import BotaoCompartilhar from './botao-compartilhar';
import estilos from './resultado-comparacao.module.css';

const INDICADORES = ['temperatura', 'umidade', 'chuva', 'vento'];
const ROTULOS_INDICADOR = { temperatura: 'Temperatura', umidade: 'Umidade', chuva: 'Chuva', vento: 'Vento' };

// Painéis "por indicador", na mesma ordem e com os mesmos ids da Etapa 1.
const PAINEIS_DETALHE = [
  { indicador: 'temperatura', id: 'd-temp', titulo: 'Temperatura (°C)' },
  { indicador: 'chuva', id: 'd-chuva', titulo: 'Chuva (mm)' },
  { indicador: 'umidade', id: 'd-umidade', titulo: 'Umidade (%)' },
  { indicador: 'vento', id: 'd-vento', titulo: 'Vento (km/h)' },
];

// Temperatura e umidade têm um teto natural e fixo (°C de referência / 100%).
// Chuva e vento não têm teto natural — há cenários de Alerta/Crítico com valores altos
// (ex.: vento > 30 km/h), então o teto do <meter> é dinâmico: o maior valor entre as duas
// localidades (nunca menor que o já exibido).
const MAX_INDICADOR = { temperatura: 40, umidade: 100 };
const CASAS_MAX_INDICADOR = { temperatura: 0, umidade: 0, chuva: 1, vento: 1 };
const CLASSES_SELO = { Normal: 'normal', 'Atenção': 'atencao', Alerta: 'alerta', 'Crítico': 'critico' };

// Exemplo estático (São Paulo × Rio de Janeiro) exibido em acesso direto à página, sem
// comparação salva — os mesmos valores do HTML da Etapa 1.
const LOCALIDADE_A_EXEMPLO = {
  nome: 'São Paulo', selecionada: 'São Paulo, SP',
  temperatura: 24.3, umidade: 78, chuva: 12.5, vento: 18.2, indice: 58, classificacao: 'Atenção',
  orientacao: {
    tipo: 'CHUVA',
    mensagem: 'Atenção para chuva: o volume de precipitação está elevado em comparação à outra localidade. Recomenda-se atenção em áreas sujeitas a alagamentos e acompanhamento dos canais oficiais.',
  },
};
const LOCALIDADE_B_EXEMPLO = {
  nome: 'Rio de Janeiro', selecionada: 'Rio de Janeiro, RJ',
  temperatura: 29.1, umidade: 72, chuva: 3.2, vento: 21.0, indice: 25, classificacao: 'Normal',
  orientacao: { tipo: 'NORMAL', mensagem: 'Condições dentro da normalidade; nenhum cuidado especial é necessário no momento.' },
};
const RESULTADO_EXEMPLO = {
  periodo: 'agora',
  localidadeA: LOCALIDADE_A_EXEMPLO,
  localidadeB: LOCALIDADE_B_EXEMPLO,
  comparacao: compararLocalidades(LOCALIDADE_A_EXEMPLO, LOCALIDADE_B_EXEMPLO),
};

/**
 * @param {string} classificacao
 * @returns {string}
 */
function classeSelo(classificacao) {
  return `${estilos.selo} ${estilos[`selo--${CLASSES_SELO[classificacao] ?? 'normal'}`]}`;
}

/**
 * @param {'temperatura'|'umidade'|'chuva'|'vento'} indicador
 * @param {object} localidadeA
 * @param {object} localidadeB
 * @returns {number}
 */
function calcularMaxMeter(indicador, localidadeA, localidadeB) {
  return MAX_INDICADOR[indicador] ?? Math.max(localidadeA[indicador], localidadeB[indicador], 0.1);
}

/**
 * @param {{localidade: object}} props
 */
function ComparacaoLocal({ localidade }) {
  return (
    <div className={estilos['comparacao-local']}>
      <h3 className={estilos['comparacao-local__titulo']}>{localidade.nome}</h3>
      <dl className={estilos['comparacao-local__lista']}>
        {INDICADORES.map((indicador) => (
          <Fragment key={indicador}>
            <dt>{ROTULOS_INDICADOR[indicador]}</dt>
            <dd><data value={localidade[indicador]}>{formatarIndicador(indicador, localidade[indicador])}</data></dd>
          </Fragment>
        ))}
        <dt>Classificação</dt>
        <dd><span className={classeSelo(localidade.classificacao)}>{localidade.classificacao}</span></dd>
      </dl>
    </div>
  );
}

/**
 * Tela Resultado: mostra a comparação salva pela tela Comparar (`sessionStorage`) ou, em
 * acesso direto, o exemplo estático São Paulo × Rio de Janeiro.
 */
export default function ResultadoComparacao() {
  const [resultado, setResultado] = useState(RESULTADO_EXEMPLO);
  const [indicador, setIndicador] = useState('geral');

  // sessionStorage e a URL do navegador só são lidos depois do primeiro render.
  useEffect(() => {
    const salvo = obterResultadoComparacao();
    if (salvo) setResultado(salvo);

    const indicadorNaUrl = new URLSearchParams(window.location.search).get('indicador');
    if (INDICADORES_FILTRO.some((opcao) => opcao.valor === indicadorNaUrl)) setIndicador(indicadorNaUrl);
  }, []);

  const { localidadeA, localidadeB, comparacao, periodo } = resultado;
  const descricao = `${localidadeA.selecionada} × ${localidadeB.selecionada} · Período: ${periodo}`;

  // O JS não gera texto novo: só escolhe a mensagem pronta da localidade de maior atenção.
  const vencedora = comparacao.maiorNivelAtencao === localidadeA.nome ? localidadeA : localidadeB;
  const leituraComparacao = `${vencedora.nome} apresenta maior nível de atenção no momento.`;
  const orientacaoMensagem = vencedora.orientacao.mensagem;

  const textoCompartilhamento = [descricao, leituraComparacao, orientacaoMensagem].join('\n\n');

  return (
    <>
      <Cabecalho titulo="Resultado da comparação" descricao={descricao} />
      <Navegacao />

      <main className="conteudo">
        <BotaoFavoritar nomeA={localidadeA.selecionada} nomeB={localidadeB.selecionada} />

        <h2>Comparar por indicador</h2>

        <FiltroIndicador valor={indicador} aoMudar={setIndicador} />

        <section
          className={estilos['painel-indicador']}
          aria-label="Comparação geral"
          hidden={indicador !== 'geral'}
        >
          <div className={estilos['painel-indicador__grade']}>
            <ComparacaoLocal localidade={localidadeA} />
            <ComparacaoLocal localidade={localidadeB} />
          </div>

          <div className={estilos['indice-climatico']}>
            <h3>Índice climático (0 a 100)</h3>
            {[localidadeA, localidadeB].map((localidade, posicao) => (
              <p key={posicao} className={estilos['indice-climatico__linha']}>
                <span>{localidade.nome}</span>:
                {' '}<meter min="0" max="100" low="30" high="60" optimum="0" value={localidade.indice}>{localidade.indice} de 100</meter>
                {' '}<data value={localidade.indice}>{localidade.indice} — {localidade.classificacao}</data>
              </p>
            ))}
            <p className={estilos['indice-climatico__nota']}><small>Classificação própria da aplicação; não é um índice meteorológico oficial.</small></p>
          </div>

          <h3>Todos os indicadores</h3>
          <div className={estilos['tabela-comparativa__wrapper']}>
            <table className={estilos['tabela-comparativa']}>
              <caption>Comparação geral dos indicadores (dados ilustrativos)</caption>
              <thead>
                <tr>
                  <th scope="col">Indicador</th>
                  <th scope="col">{localidadeA.nome}</th>
                  <th scope="col">{localidadeB.nome}</th>
                  <th scope="col">Diferença</th>
                </tr>
              </thead>
              <tbody>
                {INDICADORES.map((item) => (
                  <tr key={item}>
                    <th scope="row">{ROTULOS_INDICADOR[item]}</th>
                    <td>{formatarIndicador(item, localidadeA[item])}</td>
                    <td>{formatarIndicador(item, localidadeB[item])}</td>
                    <td>{calcularDiferenca(item, localidadeA, localidadeB).diferencaFormatada}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {PAINEIS_DETALHE.map(({ indicador: item, id, titulo }) => {
          const max = calcularMaxMeter(item, localidadeA, localidadeB);
          const maxFormatado = formatarNumero(max, CASAS_MAX_INDICADOR[item]);
          return (
            <section
              key={item}
              className={estilos['painel-indicador']}
              aria-labelledby={id}
              hidden={indicador !== item}
            >
              <h3 id={id}>{titulo}</h3>
              {[localidadeA, localidadeB].map((localidade, posicao) => (
                <p key={posicao} className={estilos['indice-climatico__linha']}>
                  <span>{localidade.nome}</span>:
                  {' '}<meter min="0" max={max} value={localidade[item]}>
                    {formatarIndicador(item, localidade[item])} de {maxFormatado}
                  </meter>
                  {' '}<data value={localidade[item]}>{formatarIndicador(item, localidade[item])}</data>
                </p>
              ))}
              <p>{descreverDiferenca(item, localidadeA, localidadeB)}</p>
            </section>
          );
        })}

        <details className={estilos.analise}>
          <summary className={estilos['analise__resumo']}>Ver análise e orientação</summary>

          <div className={estilos['analise__secao']}>
            <h3>Leitura da comparação</h3>
            <p>{leituraComparacao}</p>
          </div>

          <div className={estilos['analise__secao']}>
            <h3>Orientação</h3>
            <p>{orientacaoMensagem}</p>
            <p><small>Esta orientação não substitui os órgãos oficiais de defesa civil.</small></p>
          </div>

          <BotaoCompartilhar texto={textoCompartilhamento} />
        </details>
      </main>
    </>
  );
}
