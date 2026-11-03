/**
 * Cliente único do front-end (ClimaMonitor): nenhuma tela chama `fetch` direto.
 *
 * - `/dados/localidades.json`: JSON estático (public/) que alimenta o dropdown e o mapa.
 * - `/api/clima/[slug]`: backend (Route Handler) que consulta a OpenWeather com a chave
 *   guardada no servidor.
 */

const VERSAO_ESPERADA = 1;
const TIMEOUT_MS = 8000;
const cache = new Map();

/**
 * `fetch` com timeout e erro amigável. Devolve o JSON já lido.
 *
 * @param {string} caminho
 * @param {string} mensagemFalha - usada quando a conexão falha ou expira.
 * @returns {Promise<any>}
 * @throws {Error}
 */
async function buscar(caminho, mensagemFalha) {
  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_MS);

  let resposta;
  try {
    resposta = await fetch(caminho, { signal: controlador.signal });
  } catch {
    throw new Error(mensagemFalha);
  } finally {
    clearTimeout(temporizador);
  }

  if (!resposta.ok) {
    let mensagem = `O servidor respondeu com erro (HTTP ${resposta.status}).`;
    try {
      const corpo = await resposta.json();
      if (corpo?.erro) mensagem = corpo.erro;
    } catch {
      // corpo sem JSON: mantém a mensagem padrão
    }
    throw new Error(mensagem);
  }

  return resposta.json();
}

/**
 * Lista as localidades do JSON estático (cacheada em memória durante a sessão).
 *
 * @returns {Promise<Array<{slug: string, nome: string, uf: string, selecionada: string, mapa: {arquivo: string, alt: string}}>>}
 * @throws {Error}
 */
export async function listarLocalidades() {
  if (!cache.has('localidades')) {
    cache.set('localidades', buscar('/dados/localidades.json', 'Não foi possível carregar as localidades. Verifique sua conexão e tente novamente.')
      .then((envelope) => {
        if (envelope.versao !== VERSAO_ESPERADA) {
          throw new Error('Formato de localidades incompatível com esta versão do aplicativo.');
        }
        return envelope.dados;
      })
      .catch((erro) => {
        cache.delete('localidades'); // não guarda falha: a próxima chamada tenta de novo
        throw erro;
      }));
  }
  return cache.get('localidades');
}

/**
 * @param {string} localidadeSelecionada - valor do `<select>` (ex.: "São Paulo, SP").
 * @returns {Promise<object|null>}
 */
export async function obterLocalidade(localidadeSelecionada) {
  const localidades = await listarLocalidades();
  return localidades.find((item) => item.selecionada === localidadeSelecionada) ?? null;
}

/**
 * Busca no backend a leitura atual de uma localidade.
 *
 * @param {string} slug
 * @returns {Promise<{temperatura: number, umidade: number, chuva: number, vento: number}>}
 * @throws {Error}
 */
export function buscarClima(slug) {
  return buscar(
    `/api/clima/${encodeURIComponent(slug)}`,
    'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
  );
}
