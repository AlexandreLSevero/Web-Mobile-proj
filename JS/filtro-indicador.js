/**
 * Filtro "Comparar por indicador" de `HTML/resultado.html` (ideacao.md §5.9).
 *
 * Sem JS, o `<form>` é só um fallback: recarrega `resultado.html?indicador=X`. Este
 * módulo lê esse mesmo parâmetro ao carregar a página (para o fallback continuar
 * funcionando) e, com JS ativo, responde ao evento `change` dos radios sem precisar
 * recarregar nada — como já estava descrito no comentário de `resultado.html`.
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
