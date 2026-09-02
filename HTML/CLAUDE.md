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
- `resultado.html` concentra tudo: o filtro "Comparar por indicador" é um **acordeão exclusivo**
  de `<details name="indicador">` com 5 painéis — "Geral" (aberto por padrão: 2 cartões +
  índice climático + tabela) e um por indicador (Temperatura / Chuva / Umidade / Vento, cada um
  com barras `<meter>` + a diferença). Abrir um painel fecha os outros. Além disso há um
  `<details>` separado (sem `name`) "Ver análise e orientação". Não existem mais
  `analise-orientacao.html` nem `comparar-por-indicador.html`.
- **Etapa atual: HTML5 semântico puro — sem CSS e sem JS.** Nada de `<link rel="stylesheet">`,
  nada de `class` de estilo, nada de `<script>`. Hide/show e o filtro são feitos com `<details>`
  nativo (grupo exclusivo via atributo `name`). A responsividade via CSS (flexbox / media
  queries) e a lógica em JS entram em etapas seguintes (ideacao.md §10).
- Protótipo estático, sem backend: navegação por links `<a href>` e por `<form method="get">`
  apontando para o próprio arquivo `.html` de destino. Os dados exibidos são mock (São Paulo ×
  Rio de Janeiro) e não refletem a seleção feita nos `<select>`.
