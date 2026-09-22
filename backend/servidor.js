/**
 * Ponto de entrada do backend mínimo do ClimaMonitor (ideacao.md §5.2/§9): um único
 * endpoint, `POST /comparar`, e o servidor estático que entrega o protótipo (`HTML/`,
 * `CSS/`, `JS/`, `IMG/`). Sem framework, sem dependências — só módulos nativos do Node.
 *
 * Uso: `node backend/servidor.js` a partir da raiz do repositório.
 */

import { createServer } from 'node:http';
import { montarResposta } from './comparar.js';
import { servirArquivo } from './arquivos-estaticos.js';

try {
  process.loadEnvFile();
} catch {
  // Sem .env no disco (ex.: variável já exportada no ambiente) — segue com process.env.
}

if (!process.env.OPENWEATHER_API) {
  console.error('Aviso: OPENWEATHER_API não está definida — POST /comparar vai falhar até configurar o .env.');
}

const PORTA = process.env.PORTA ?? 3000;

/**
 * Lê e faz o parse do corpo JSON de uma requisição.
 *
 * @param {import('node:http').IncomingMessage} req
 * @returns {Promise<object>}
 */
function lerCorpoJson(req) {
  return new Promise((resolvePromise, rejectPromise) => {
    let bruto = '';
    req.on('data', (parte) => { bruto += parte; });
    req.on('end', () => {
      try {
        resolvePromise(bruto ? JSON.parse(bruto) : {});
      } catch {
        rejectPromise(new Error('Corpo da requisição não é um JSON válido.'));
      }
    });
    req.on('error', rejectPromise);
  });
}

function responderJson(res, status, corpo) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(corpo));
}

/**
 * Trata o `POST /comparar`: valida a seleção, monta a resposta e devolve o contrato de
 * ideacao.md §5.6 (com `orientacao` por localidade — ver `backend/comparar.js`).
 *
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function tratarComparar(req, res) {
  let corpo;
  try {
    corpo = await lerCorpoJson(req);
  } catch (erro) {
    responderJson(res, 400, { erro: erro.message });
    return;
  }

  const { localidadeA, localidadeB } = corpo;
  if (typeof localidadeA !== 'string' || !localidadeA.trim() || typeof localidadeB !== 'string' || !localidadeB.trim()) {
    responderJson(res, 400, { erro: 'Informe localidadeA e localidadeB.' });
    return;
  }

  try {
    const resposta = await montarResposta({ localidadeA, localidadeB });
    responderJson(res, 200, resposta);
  } catch (erro) {
    responderJson(res, erro.status ?? 500, { erro: erro.message });
  }
}

const servidor = createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;

  if (req.method === 'POST' && pathname === '/comparar') {
    tratarComparar(req, res);
    return;
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    servirArquivo(req, res);
    return;
  }

  responderJson(res, 405, { erro: 'Método não permitido.' });
});

servidor.listen(PORTA, () => {
  console.log(`ClimaMonitor rodando em http://localhost:${PORTA}`);
});
