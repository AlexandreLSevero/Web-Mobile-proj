/**
 * Serve os arquivos estáticos do protótipo (HTML/CSS/JS/IMG) a partir da raiz do
 * repositório, para que os caminhos relativos já usados nas páginas (`../CSS/…`,
 * `../JS/…`) resolvam sem precisar de outro servidor.
 */

import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';

const RAIZ_REPOSITORIO = resolve(import.meta.dirname, '..');

const TIPOS_DE_CONTEUDO = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
};

/**
 * Resolve o caminho de uma requisição para um arquivo dentro do repositório, recusando
 * qualquer tentativa de escapar da raiz (ex.: `..` no caminho).
 *
 * @param {string} pathname - `req.url` já sem query string.
 * @returns {string|null} caminho absoluto no disco, ou `null` se inválido/inexistente.
 */
function resolverCaminho(pathname) {
  const caminhoRelativo = pathname === '/' ? 'HTML/index.html' : decodeURIComponent(pathname).slice(1);
  const caminhoAbsoluto = normalize(join(RAIZ_REPOSITORIO, caminhoRelativo));

  if (!caminhoAbsoluto.startsWith(RAIZ_REPOSITORIO)) return null;
  if (!existsSync(caminhoAbsoluto) || !statSync(caminhoAbsoluto).isFile()) return null;
  return caminhoAbsoluto;
}

/**
 * Serve o arquivo estático correspondente à requisição, ou responde 404 em pt-BR.
 *
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
export function servirArquivo(req, res) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const caminho = resolverCaminho(pathname);

  if (!caminho) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada.');
    return;
  }

  const tipoDeConteudo = TIPOS_DE_CONTEUDO[extname(caminho)] ?? 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': tipoDeConteudo });
  createReadStream(caminho).pipe(res);
}
