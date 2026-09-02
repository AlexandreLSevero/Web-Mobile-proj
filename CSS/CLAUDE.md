# CLAUDE.md — CSS

Regras para os arquivos CSS deste projeto (ClimaMonitor). Complementa o `CLAUDE.md` da raiz.

## Base

- CSS puro, sem pré-processador e sem framework.
- Indentação de 2 espaços; uma propriedade por linha; propriedades em ordem consistente.
- Um arquivo de tokens/reset global + um arquivo por tela ou componente, importados de forma
  previsível. Sem `@import` em cascata profunda.

## Nomenclatura e organização

- Classes em `kebab-case`, com padrão consistente (ex.: BEM: `.cartao`, `.cartao__valor`,
  `.cartao--alerta`).
- Estilize por classe; evite seletores por tag genérica, `!important` e seletores com
  especificidade alta/aninhada demais.
- Ganchos de JS (`data-*`, `.js-…`) não recebem estilo; classes de estilo não são usadas como
  seletor em JS.

## Design tokens

- Centralize cores, espaçamentos, tipografia e raios em `:root` com custom properties
  (`--cor-atencao`, `--espaco-2`, …). Sem valores mágicos repetidos.
- Faixas do índice climático têm cores fixas — defina uma variável por faixa
  (Normal / Atenção / Alerta / Crítico) e não dependa **só** da cor para transmitir o estado
  (inclua rótulo textual/ícone).

## Layout e responsividade

- **Mobile-first**: estilos base para tela pequena, `min-width` media queries para ampliar.
- Layout com Flexbox e Grid; evite floats e posicionamento absoluto para estrutura.
- Unidades relativas (`rem`, `%`, `fr`, `clamp()`); `px` só para bordas/detalhes finos.
- Nada de rolagem horizontal; mídias com `max-width: 100%`.
- Alvos de toque ≥ 44×44px.

## Acessibilidade e robustez

- Contraste mínimo WCAG AA (texto normal 4.5:1).
- `:focus-visible` sempre estilizado e perceptível; nunca `outline: none` sem substituto.
- Respeite `@media (prefers-reduced-motion: reduce)` para animações/transições.
- Transições curtas e com propósito; não anime `width`/`height`/`top`/`left` em excesso.
