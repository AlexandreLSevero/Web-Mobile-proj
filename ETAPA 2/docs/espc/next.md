# Especificação — Migração do ClimaMonitor para Next.js

> Documento de especificação. **Não contém implementação**: os trechos de código são só
> ilustrativos, para fixar contratos e convenções. O passo a passo para chegar aqui está em
> [`docs/goal/goal.md`](../goal/goal.md).

---

## 1. Escopo

Portar a Etapa 1 (`ETAPA 1/`, HTML + CSS + JS vanilla) para **Next.js + React**, de forma
**1:1**: mesmas telas, mesmo fluxo, mesma regra de negócio, mesmo comportamento.

A migração está pronta quando quem usa não consegue notar diferença entre as duas
versões.

**Fora do escopo:** qualquer feature nova, mudança de arquitetura de dados (backend,
Route Handlers, cache), troca de mecanismo de estado, mudança de regra de negócio e
deploy. Isso fica para depois da migração.

## 2. Stack

| Item | Escolha |
|---|---|
| Framework | Next.js 15, App Router |
| UI | React 19 |
| Linguagem | JavaScript + JSDoc (o mesmo da Etapa 1) |
| Estilo | CSS global (tokens + reset) + CSS Modules por componente |
| Lint | `next lint` |

Nenhuma dependência além de `next`, `react` e `react-dom`.

## 3. Estrutura de pastas

```
/
├── ETAPA 1/               intocado, só referência
├── app/
│   ├── layout.js          <html lang="pt-BR">, cabeçalho, navegação, rodapé
│   ├── globals.css        tokens.css + reset.css
│   ├── page.js            Comparar   ← index.html
│   ├── resultado/page.js  Resultado  ← resultado.html
│   ├── mapa/page.js       Mapa       ← mapa.html
│   └── favoritos/page.js  Favoritos  ← favoritos.html
├── components/            1 componente por arquivo, .module.css ao lado
├── lib/                   módulos JS sem React e sem DOM
└── public/img/            SVGs de ETAPA 1/IMG
```

Convenções da Etapa 1 continuam: arquivos em minúsculas com hífen, 2 espaços, aspas
simples, ponto e vírgula, pt-BR. O componente exportado usa PascalCase
(`cartao-localidade.js` → `CartaoLocalidade`).

> **Desvio registrado (enxugamento pós-migração):** nem todo componente tem `.module.css`
> próprio. `BotaoFavoritar` e `BotaoCompartilhar` usam o módulo de `ResultadoComparacao`
> (só existem dentro dele) e o `Rodape` usa a classe global `.rodape` de `globals.css`.

## 4. Páginas

| Etapa 1 | Rota | Tipo | Por quê |
|---|---|---|---|
| `HTML/index.html` | `/` | Server + formulário Client | Formulário tem evento e chamada de rede |
| `HTML/resultado.html` | `/resultado` | Client | Lê `sessionStorage` |
| `HTML/mapa.html` | `/mapa` | Client | Lê `sessionStorage` e tem seletor |
| `HTML/favoritos.html` | `/favoritos` | Client | Lê `localStorage` |

Os links entre páginas (`resultado.html`, `../HTML/mapa.html`) viram `<Link href="/resultado">`.
A marcação de cada página é transcrita para JSX sem mudar estrutura nem texto.

## 5. Módulos JS

### 5.1 Copiados sem mudança para `lib/`

Regra de negócio e dados. Mudam só os caminhos de `import`.

- `indice-climatico.js`, `orientacao.js`, `comparar-clima.js`
- `localidades.js`, `dados-mapa.js`, `dados-mock.js`
- `cliente-openweather.js`, `montar-leitura.js`, `configuracao-api.js`
- `armazenamento-comparacao.js`, `armazenamento-favoritos.js`

Ajustes pontuais permitidos:
- `dados-mapa.js`: caminho dos SVGs passa a ser `/img/...`.
- `armazenamento-*.js`: só podem ser chamados de dentro de `useEffect` ou de handlers de
  evento (no servidor, `sessionStorage` e `localStorage` não existem).

A chave da OpenWeather continua em `lib/configuracao-api.js`, versionada, como na
Etapa 1.

> **Desvio registrado (enxugamento pós-migração):** dois ajustes em `lib/` fora da lista
> acima, sem mudar regra de negócio nem resultado na tela:
> - `localidades.js` exporta `LOCALIDADES` (chaves de `COORDENADAS`), usada pelas
>   `<option>` dos selects em vez de repetir as 8 cidades num componente.
> - `comparar-clima.js`: `compararLocalidades` devolve só `{ maiorNivelAtencao }`, único
>   campo lido pela tela; os outros quatro (`maiorTemperatura` etc.) não eram usados.

### 5.2 Convertidos em componentes

Módulos que manipulam o DOM viram componentes React. A lógica de manipulação
(`querySelector`, `textContent`, `hidden`) é substituída por estado e JSX.

| Etapa 1 | Componente | Tipo |
|---|---|---|
| `inicializar-comparar.js` | `FormularioComparar` | Client |
| `inicializar-resultado.js` | `ResultadoComparacao` | Client |
| `filtro-indicador.js` | `FiltroIndicador` | Client |
| `compartilhar-resultado.js` | `BotaoCompartilhar` | Client |
| `favoritar-resultado.js` | `BotaoFavoritar` | Client |
| `inicializar-mapa.js` | `MapaLocalidades` | Client |
| `favoritos.js` | `ListaFavoritos` | Client |

Partes repetidas nas 4 páginas HTML viram componentes Server: `Cabecalho`, `Navegacao`,
`Rodape`.

```js
// components/formulario-comparar.js — esqueleto ilustrativo
'use client';

import { montarLeitura } from '@/lib/montar-leitura';
import { compararLocalidades } from '@/lib/comparar-clima';
import { salvarResultadoComparacao } from '@/lib/armazenamento-comparacao';

export default function FormularioComparar() {
  // mesmo fluxo de inicializar-comparar.js: buscar A e B, comparar, salvar, ir para /resultado
}
```

Regra que continua valendo: **`lib/` é a única fonte da regra de negócio.** Nenhum
componente recalcula índice nem escreve texto de orientação.

## 6. CSS

- `tokens.css` e `reset.css` → importados em `app/globals.css`, sem mudar nomes de
  variáveis.
- `layout.css` → `globals.css` + módulos de `Cabecalho`, `Navegacao` e `Rodape`.
- `comparar.css`, `resultado.css`, `mapa.css`, `favoritos.css` → `*.module.css` dos
  componentes de cada página.
- Valores e media queries copiados como estão. Só muda a forma de aplicar
  (`className={estilos.cartao}`).
- **Desvio registrado:** `.rodape` ficou em `globals.css`, e as regras dos botões
  Favoritar/Compartilhar (`.acoes-resultado*`, `.analise__acao/__status`) ficaram em
  `resultado-comparacao.module.css` — ver nota em §3. Declarações que só repetiam o reset
  ou o padrão do navegador foram removidas.

## 7. Equivalências obrigatórias

O que precisa sair igual ao da Etapa 1:

| Item | Como conferir |
|---|---|
| `lang="pt-BR"`, um `<h1>` e um `<title>` por página | Inspecionar o HTML gerado |
| Regiões `aria-live` de status | Mesmo texto anunciado nos mesmos momentos |
| `<details>`, `<meter>`, `<table>` | Mesma marcação semântica |
| Link "Pular para o conteúdo" (se existir na Etapa 1) | Presente no layout |
| Layout responsivo | Mesma aparência em 320px, 375px e 1280px |

## 8. Critérios de aceite

1. As 4 rotas abrem com o mesmo conteúdo e aparência das 4 páginas da Etapa 1.
2. Comparar → Resultado → Mapa → Favoritar → Favoritos funciona como na Etapa 1.
3. Para as mesmas localidades, índice, classificação e orientação saem idênticos.
4. Favoritos salvos continuam lá após fechar e abrir o navegador.
5. Nenhum erro de hidratação no console.
6. `npm run build` e `next lint` sem erros.

## 9. Riscos

| Risco | Mitigação |
|---|---|
| Erro de hidratação por `sessionStorage`/`localStorage` | Ler só em `useEffect`; renderizar estado vazio no primeiro render |
| Regra de negócio divergir na cópia | Copiar `lib/` sem editar; comparar resultado das duas versões lado a lado |
| JSX diferente do HTML original (`class`, `for`, atributos booleanos) | Converter `class`→`className`, `for`→`htmlFor`; revisar página por página |
