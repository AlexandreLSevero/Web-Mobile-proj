/**
 * Dados mock das ilustrações do mapa por localidade (`HTML/mapa.html`).
 *
 * Mesmas 8 localidades de `HTML/index.html`; cada entrada aponta para o SVG ilustrativo
 * correspondente em `IMG/` e o texto de `alt` usado no `<img>` — mock, sem dados
 * geográficos reais (ideacao.md §6/§14).
 */

const MAPAS_MOCK = {
  'São Paulo, SP': {
    arquivo: 'mapa-sao-paulo.svg',
    alt: 'Mapa meteorológico ilustrativo de São Paulo: nublado, com chuva leve (dados fictícios).',
  },
  'Rio de Janeiro, RJ': {
    arquivo: 'mapa-rio-de-janeiro.svg',
    alt: 'Mapa meteorológico ilustrativo do Rio de Janeiro: predominantemente ensolarado (dados fictícios).',
  },
  'Belo Horizonte, MG': {
    arquivo: 'mapa-belo-horizonte.svg',
    alt: 'Mapa meteorológico ilustrativo de Belo Horizonte: parcialmente nublado (dados fictícios).',
  },
  'Curitiba, PR': {
    arquivo: 'mapa-curitiba.svg',
    alt: 'Mapa meteorológico ilustrativo de Curitiba: nublado, com garoa e vento (dados fictícios).',
  },
  'Porto Alegre, RS': {
    arquivo: 'mapa-porto-alegre.svg',
    alt: 'Mapa meteorológico ilustrativo de Porto Alegre: céu variável, com vento forte (dados fictícios).',
  },
  'Recife, PE': {
    arquivo: 'mapa-recife.svg',
    alt: 'Mapa meteorológico ilustrativo de Recife: quente e úmido, com pancadas de chuva (dados fictícios).',
  },
  'Salvador, BA': {
    arquivo: 'mapa-salvador.svg',
    alt: 'Mapa meteorológico ilustrativo de Salvador: parcialmente nublado, com possibilidade de chuva (dados fictícios).',
  },
  'Manaus, AM': {
    arquivo: 'mapa-manaus.svg',
    alt: 'Mapa meteorológico ilustrativo de Manaus: nublado, com chuva intensa (dados fictícios).',
  },
};

/**
 * Busca a ilustração mock de mapa para a localidade selecionada.
 *
 * @param {string} localidadeSelecionada - valor exatamente igual ao de uma `<option>` dos
 *   `<select>` de `HTML/index.html` (ex.: "São Paulo, SP").
 * @returns {{arquivo: string, alt: string}|null}
 */
export function obterMapa(localidadeSelecionada) {
  return MAPAS_MOCK[localidadeSelecionada] ?? null;
}
