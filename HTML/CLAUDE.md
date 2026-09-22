# CLAUDE.md — HTML

Regras para os arquivos HTML deste projeto (ClimaMonitor). Complementa o `CLAUDE.md` da raiz.

## Base

- **HTML5**, `<!DOCTYPE html>`, `<html lang="pt-BR">`, `<meta charset="UTF-8">` e
  `<meta name="viewport" content="width=device-width, initial-scale=1">` em toda página.
- Indentação de 2 espaços. Atributos entre aspas duplas. Tags e atributos em minúsculas.
- Validar no [validator.w3.org](https://validator.w3.org/) antes de considerar pronto.

## Semântica em primeiro lugar

- **Priorize tags semânticas**; use `<div>`/`<span>` só quando não houver elemento com
  significado adequado.
  - `<header>`, `<nav>`, `<main>` (um por página), `<section>`, `<article>`, `<aside>`,
    `<footer>` para as regiões da página.
  - `<h1>`–`<h6>` em ordem hierárquica, sem pular níveis; um `<h1>` por página.
  - `<button>` para ação, `<a href>` para navegação — nunca `<div>` clicável.
  - `<form>`, `<label for>` associado a todo campo, `<fieldset>`/`<legend>` para grupos
    (ex.: seleção de período, seleção de indicador).
  - `<table>` com `<caption>`, `<thead>`, `<tbody>`, `<th scope>` para a tabela comparativa
    por indicador.
  - `<figure>`/`<figcaption>` para o mapa e para gráficos futuros.
  - `<time datetime="…">` para horários de medição.

## Acessibilidade

- Todo `<img>` com `alt` descritivo (`alt=""` apenas se for puramente decorativa).
- Use HTML nativo antes de ARIA; adicione `aria-*` só para preencher lacunas reais.
- Estados dinâmicos (resultado carregando, erro) em região com `aria-live="polite"`.
- Ordem do DOM = ordem de leitura; foco visível preservado; navegável por teclado.
- Contraste e alvos de toque são responsabilidade do CSS — ver `CSS/CLAUDE.md`.

## Estrutura e integração

- Sem CSS inline e sem `style=` no código de produção; sem manipuladores `onclick=` no
  markup — o comportamento vem de `JS/` via `addEventListener`.
- `<link rel="stylesheet">` no `<head>`; `<script src="…" defer>` no `<head>` ou antes do
  `</body>`.
- Ganchos de JS: prefira `data-*` (ex.: `data-acao="comparar"`) a classes de estilo.

## Conjunto de telas

- Um único conjunto de telas em `HTML/`, sem versão separada de mobile e web (ideacao.md §7).
  **4 telas**: `index.html` (entry point, "Comparar"), `resultado.html`, `mapa.html`,
  `favoritos.html`. Nav com 3 itens: Comparar · Mapa · Favoritos.
- `resultado.html` concentra tudo:
  - **Filtro "Comparar por indicador"** = `<fieldset>` de radios (`name="indicador"`:
    geral / temperatura / chuva / umidade / vento), como o wireframe (ideacao.md §5.9).
  - Um `<section data-indicador="...">` por opção. `data-indicador` é **gancho de JS**
    (não estilo) — esconder/mostrar por indicador é feito por `JS/filtro-indicador.js`
    (evento `change`, `hidden` nas demais, estado inicial `geral` ou `?indicador=X` da URL).
  - `<details><summary>Ver análise e orientação</summary></details>` — disclosure nativo,
    fica fora do filtro (não é um indicador).
  - Não existem mais `analise-orientacao.html` nem `comparar-por-indicador.html`.
- **Etapa atual: HTML5 semântico + CSS (`CSS/`) + JS (`JS/`, ver `JS/CLAUDE.md`).**
  `<link rel="stylesheet">` no `<head>` e `<script type="module" src="…"></script>` antes de
  `</body>`; nada de `style=` inline ou `onclick=` no HTML. Hide/show do bloco de análise
  continua sendo o `<details>` nativo. O filtro "Comparar por indicador" tem destaque visual
  do radio marcado via CSS (`:has()`) **e** filtra de fato via JS. `data-*` é gancho de JS,
  nunca usado como seletor de estilo.
- Backend mínimo em `backend/` (ver `backend/CLAUDE.md`): `index.html` chama
  `POST /comparar` de verdade (dados reais da OpenWeather) em vez de sortear mock. Sem JS,
  o `<form method="get">` ainda navega para o próprio `resultado.html`, mas sem dados —
  ficam os valores estáticos de exemplo (São Paulo × Rio de Janeiro) como fallback.
