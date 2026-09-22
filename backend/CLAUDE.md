# CLAUDE.md — Backend

Regras para o backend do ClimaMonitor (`backend/`). Complementa o `CLAUDE.md` da raiz.

## Base

- Node.js **vanilla**: só módulos nativos (`node:http`, `node:fs`, `node:path`) e `fetch`
  global — sem framework (Express/Fastify/Nest) e sem dependências externas (`package.json`
  não deve existir enquanto isso não mudar).
- Um arquivo por responsabilidade, mesma convenção do resto do projeto (nomes em minúsculas
  com hífen).
- Sem banco de dados (ideacao.md §6/§10) — tudo calculado em memória, por requisição.

## Configuração e segredos

- A chave `OPENWEATHER_API` vem do `.env` (fora do versionamento) via
  `process.loadEnvFile()`. **Nunca** logar a chave nem devolvê-la em nenhuma resposta.
- `backend/cliente-openweather.js` é o único módulo autorizado a montar a URL/chamar a
  OpenWeather.

## Contrato `POST /comparar`

- Corpo: `{ localidadeA, localidadeB, periodo }` (`periodo` ainda não usado — Nível 1 só
  tem "agora").
- Resposta: `{ localidadeA, localidadeB, comparacao }`, cada localidade com `nome`,
  `temperatura`, `umidade`, `chuva`, `vento`, `indice`, `classificacao` e `orientacao`
  (`{ tipo, mensagem }` **por localidade** — não um campo único no topo; decisão registrada
  na conversa que introduziu este backend, substitui o exemplo de `ideacao.md §5.6`).
- Erros sempre em JSON, `{ erro: 'mensagem em pt-BR' }`, com o status apropriado
  (400 = requisição inválida/localidade não suportada, 502 = falha ao consultar a
  OpenWeather, 500 = erro de configuração do servidor).

## Regra de negócio

- Pesos do índice climático e textos de orientação vivem só em `indice-climatico.js` e
  `orientacao.js` — não duplicar essa lógica no front-end (JS/CLAUDE.md já proíbe o
  inverso). Qualquer mudança de peso/faixa/texto é decisão de negócio: não improvisar,
  alinhar antes (ver `ideacao.md §5.7/§5.8/§14`).
