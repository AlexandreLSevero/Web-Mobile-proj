# CLAUDE.md — JavaScript

Regras para os arquivos JS deste projeto (ClimaMonitor). Complementa o `CLAUDE.md` da raiz.

## Base

- JavaScript moderno (ES2020+), **vanilla**, sem framework, sem bundler, sem dependências.
- Módulos ES (`<script type="module">` / `import` / `export`), um módulo por responsabilidade.
- `'use strict'` implícito nos módulos; `const` por padrão, `let` quando reatribuir, nunca `var`.
- Indentação de 2 espaços; ponto e vírgula; aspas simples.

## Estilo de código

- Nomes em `camelCase`; funções são verbos (`compararLocalidades`, `normalizarUnidades`).
- Funções pequenas e puras quando possível; separe cálculo (índice, médias, comparação) de
  efeitos colaterais (DOM, rede).
- Sem variáveis globais; nada de lógica no escopo de módulo além de um `init()` chamado no
  `DOMContentLoaded`.
- Comentários explicam o *porquê*, não o *o quê*; JSDoc nas funções de regra de negócio.

## DOM e eventos

- Selecione elementos por `data-*` (ex.: `[data-acao="comparar"]`), não por classes de estilo.
- `addEventListener`; nada de `onclick=` no HTML nem de HTML inline via `innerHTML` com dados
  não sanitizados — prefira `textContent` / `createElement`.
- Atualize estados de carregamento/erro em regiões `aria-live` e gerencie o foco após
  navegação entre telas.

## Rede e dados

- Toda chamada externa passa pelo backend (`POST /comparar`) — o front **não** chama as APIs
  meteorológicas nem guarda chaves.
- `fetch` com `async/await`, sempre com `try/catch`, checando `response.ok`, com timeout
  (`AbortController`) e mensagem de erro amigável em pt-BR.
- Respeite o contrato de `ideacao.md` §5.4/§5.6; valide o shape da resposta antes de renderizar.
- Não implemente pesos do índice climático nem textos de orientação no front sem alinhamento —
  são regra de negócio do backend.

## Escopo

- Nível 1 apenas: sem persistência (Favoritos), sem gráficos, sem service worker/PWA, sem
  bibliotecas de mapa até que seja pedido.
