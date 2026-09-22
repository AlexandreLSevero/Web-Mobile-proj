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

- **Sem backend**: o projeto não pode usar Node.js (restrição do professor da disciplina),
  então não há servidor para guardar chaves. O front chama a OpenWeather **direto do
  navegador** (`JS/cliente-openweather.js`). A chave fica em `JS/configuracao-api.js`,
  **local e no `.gitignore`** (o GitHub bloqueia push com segredo detectado): cada pessoa
  copia `JS/configuracao-api.example.js` e cola a própria chave. Decisão registrada em
  `ideacao.md §14`.
- `fetch` com `async/await`, sempre com `try/catch`, checando `response.ok`, com timeout
  (`AbortController`) e mensagem de erro amigável em pt-BR.
- Pesos do índice climático (`JS/indice-climatico.js`) e textos de orientação
  (`JS/orientacao.js`) são regra de negócio: não duplicar a lógica em outro módulo, e
  qualquer mudança de peso/faixa/texto é decisão de negócio — não improvisar, alinhar
  antes (`ideacao.md §5.7/§5.8/§14`).

## Escopo

- Nível 1 apenas: sem persistência (Favoritos), sem gráficos, sem service worker/PWA, sem
  bibliotecas de mapa até que seja pedido.
