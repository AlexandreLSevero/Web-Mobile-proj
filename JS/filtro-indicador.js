/**
 * Filtro "Comparar por indicador" de `HTML/resultado.html` (ideacao.md §5.9).
 *
 * Responde ao evento `change` dos radios e troca a `<section data-indicador="...">`
 * visível sem recarregar a página — como já estava descrito no comentário de
 * `resultado.html`. Também lê `?indicador=X` da URL ao carregar, para quem chega
 * via link direto já com um indicador selecionado.
 */

const NOME_RADIO = 'indicador';
const INDICADOR_PADRAO = 'geral';

/**
 * Deixa visível somente a `<section data-indicador="X">` cujo X é o indicador informado;
 * nas demais, define o atributo `hidden`.
 *
 * @param {string} indicador
 */
function aplicarFiltro(indicador) {
  document.querySelectorAll('[data-indicador]').forEach((secao) => {
    secao.hidden = secao.dataset.indicador !== indicador;
  });
}

function init() {
  const radios = document.querySelectorAll(`input[name="${NOME_RADIO}"]`);
  if (radios.length === 0) return;

  const valoresValidos = new Set([...radios].map((radio) => radio.value));
  const indicadorNaUrl = new URLSearchParams(window.location.search).get(NOME_RADIO);
  const indicadorInicial = valoresValidos.has(indicadorNaUrl) ? indicadorNaUrl : INDICADOR_PADRAO;

  radios.forEach((radio) => {
    radio.checked = radio.value === indicadorInicial;
    radio.addEventListener('change', () => {
      if (radio.checked) aplicarFiltro(radio.value);
    });
  });
  aplicarFiltro(indicadorInicial);
}

document.addEventListener('DOMContentLoaded', init);
