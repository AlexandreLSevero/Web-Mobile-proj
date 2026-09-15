import { obterResultadoComparacao } from './armazenamento-comparacao.js';
import { formatarNumero, formatarIndicador, calcularDiferenca, descreverDiferenca } from './comparar-clima.js';

const MAX_INDICADOR = { temperatura: 40, umidade: 100, vento: 30 };
const CASAS_MAX_INDICADOR = { temperatura: 0, umidade: 0, chuva: 1, vento: 0 };
const CLASSES_SELO = { Normal: 'normal', 'Atenção': 'atencao', Alerta: 'alerta', 'Crítico': 'critico' };

/**
 * @param {string} campo - valor do atributo `data-campo` do elemento alvo.
 * @returns {Element|null}
 */
function elementoDoCampo(campo) {
  return document.querySelector(`[data-campo="${campo}"]`);
}

function preencherTexto(campo, texto) {
  const elemento = elementoDoCampo(campo);
  if (elemento) elemento.textContent = texto;
}

function preencherDado(campo, valorNumerico, textoExibido) {
  const elemento = elementoDoCampo(campo);
  if (!elemento) return;
  elemento.setAttribute('value', valorNumerico);
  elemento.textContent = textoExibido;
}

function preencherMeter(campo, valorNumerico, textoExibido, maxNumerico) {
  const elemento = elementoDoCampo(campo);
  if (!elemento) return;
  elemento.setAttribute('value', valorNumerico);
  if (maxNumerico !== undefined) elemento.setAttribute('max', maxNumerico);
  elemento.textContent = textoExibido;
}

function preencherClassificacao(campo, classificacao) {
  const elemento = elementoDoCampo(campo);
  if (!elemento) return;
  Object.values(CLASSES_SELO).forEach((classe) => elemento.classList.remove(`selo--${classe}`));
  elemento.classList.add(`selo--${CLASSES_SELO[classificacao] ?? 'normal'}`);
  elemento.textContent = classificacao;
}

function renderizarCabecalho(localidadeA, localidadeB, periodo) {
  preencherTexto('descricao-comparacao', `${localidadeA.selecionada} × ${localidadeB.selecionada} · Período: ${periodo}`);
}

function renderizarPainelGeral(localidadeA, localidadeB) {
  [['a', localidadeA], ['b', localidadeB]].forEach(([sufixo, localidade]) => {
    preencherTexto(`nome-${sufixo}`, localidade.nome);
    ['temperatura', 'umidade', 'chuva', 'vento'].forEach((indicador) => {
      preencherDado(`${indicador}-${sufixo}`, localidade[indicador], formatarIndicador(indicador, localidade[indicador]));
    });
    preencherClassificacao(`classificacao-${sufixo}`, localidade.classificacao);
  });
}

function renderizarIndiceClimatico(localidadeA, localidadeB) {
  [['a', localidadeA], ['b', localidadeB]].forEach(([sufixo, localidade]) => {
    preencherTexto(`indice-nome-${sufixo}`, localidade.nome);
    preencherMeter(`indice-meter-${sufixo}`, localidade.indice, `${localidade.indice} de 100`);
    preencherDado(`indice-data-${sufixo}`, localidade.indice, `${localidade.indice} — ${localidade.classificacao}`);
  });
}

function renderizarTabelaComparativa(localidadeA, localidadeB) {
  ['temperatura', 'umidade', 'chuva', 'vento'].forEach((indicador) => {
    preencherTexto(`tabela-${indicador}-a`, formatarIndicador(indicador, localidadeA[indicador]));
    preencherTexto(`tabela-${indicador}-b`, formatarIndicador(indicador, localidadeB[indicador]));
    const { diferencaFormatada } = calcularDiferenca(indicador, localidadeA, localidadeB);
    preencherTexto(`tabela-${indicador}-diferenca`, diferencaFormatada);
  });
}

function renderizarDetalhesIndicadores(localidadeA, localidadeB) {
  ['temperatura', 'umidade', 'chuva', 'vento'].forEach((indicador) => {
    // Chuva não tem um teto fixo natural: usa o maior valor sorteado entre as duas
    // localidades como referência da barra (mesmo padrão do protótipo estático original).
    const max = indicador === 'chuva'
      ? Math.max(localidadeA.chuva, localidadeB.chuva, 0.1)
      : MAX_INDICADOR[indicador];
    const maxFormatado = formatarNumero(max, CASAS_MAX_INDICADOR[indicador]);

    [['a', localidadeA], ['b', localidadeB]].forEach(([sufixo, localidade]) => {
      preencherTexto(`detalhe-${indicador}-nome-${sufixo}`, localidade.nome);
      preencherMeter(
        `detalhe-${indicador}-meter-${sufixo}`,
        localidade[indicador],
        `${formatarIndicador(indicador, localidade[indicador])} de ${maxFormatado}`,
        max
      );
      preencherDado(`detalhe-${indicador}-dado-${sufixo}`, localidade[indicador], formatarIndicador(indicador, localidade[indicador]));
    });

    preencherTexto(`detalhe-${indicador}-frase`, descreverDiferenca(indicador, localidadeA, localidadeB));
  });
}

/**
 * Preenche o bloco "Ver análise e orientação" com o nome da localidade de maior nível de
 * atenção e a mensagem de orientação já pré-escrita para a leitura sorteada dela — o JS
 * não gera texto novo, só escolhe qual mensagem pronta exibir.
 */
function renderizarAnalise(localidadeA, localidadeB, comparacao) {
  const vencedora = comparacao.maiorNivelAtencao === localidadeA.nome ? localidadeA : localidadeB;
  preencherTexto('leitura-comparacao', `${vencedora.nome} apresenta maior nível de atenção no momento.`);
  preencherTexto('orientacao-mensagem', vencedora.orientacao.mensagem);
}

function init() {
  const resultado = obterResultadoComparacao();
  if (!resultado) return; // acesso direto à página: mantém o conteúdo estático de exemplo.

  const { localidadeA, localidadeB, comparacao, periodo } = resultado;
  renderizarCabecalho(localidadeA, localidadeB, periodo);
  renderizarPainelGeral(localidadeA, localidadeB);
  renderizarIndiceClimatico(localidadeA, localidadeB);
  renderizarTabelaComparativa(localidadeA, localidadeB);
  renderizarDetalhesIndicadores(localidadeA, localidadeB);
  renderizarAnalise(localidadeA, localidadeB, comparacao);
}

document.addEventListener('DOMContentLoaded', init);
