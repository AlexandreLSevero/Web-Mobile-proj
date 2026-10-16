# Sugestão — API sobre JSON estático

> Proposta de desenho. **Não contém implementação**: os trechos de código são só
> ilustrativos.

---

## 1. Problema

Hoje os dados fixos do ClimaMonitor estão **dentro do código JS**:

- `JS/localidades.js`: as 8 localidades e suas coordenadas;
- `JS/dados-mapa.js`: SVG e `alt` de cada mapa;
- `JS/dados-mock.js`: leituras ilustrativas no formato do contrato §5.6.

Para mudar um dado, é preciso mexer em código. A ideia é mover esses dados para
**arquivos JSON** e acessá-los por uma **API de leitura** com endpoints previsíveis, como
se fosse um backend real. Depois, trocar o JSON por uma API de verdade não exige mudar as
telas.

## 2. Princípios

1. **Só leitura** (`GET`). JSON estático não aceita escrita. Favoritos continuam em
   `localStorage`.
2. **Um cliente único** no front: nenhuma tela faz `fetch` direto para um `.json`.
3. **Contrato antes do arquivo**: o formato de cada recurso é definido aqui e vale para o
   JSON de hoje e para um backend futuro.
4. **Funciona nos dois cenários**: no projeto vanilla atual (sem Node) e no Next (ver
   [`next.md`](next.md)).

## 3. Recursos e endpoints

| Recurso | Endpoint lógico | Arquivo estático |
|---|---|---|
| Lista de localidades | `GET /api/localidades` | `api/localidades.json` |
| Uma localidade | `GET /api/localidades/{slug}` | `api/localidades/{slug}.json` |
| Mapa de uma localidade | `GET /api/mapas/{slug}` | `api/mapas/{slug}.json` |
| Leituras mock de uma localidade | `GET /api/leituras/{slug}` | `api/leituras/{slug}.json` |

Por que um arquivo por item em vez de um arquivo gigante: cada tela baixa só o que usa,
e o caminho do arquivo espelha a URL REST. Quando houver backend, basta tirar o `.json`
do final.

### 3.1 Formato dos arquivos

Todo arquivo tem um envelope com metadados, para o cliente saber a versão do contrato e
quando o dado foi gerado:

```json
// api/localidades.json
{
  "versao": 1,
  "atualizadoEm": "2026-10-16",
  "dados": [
    { "slug": "sao-paulo-sp", "nome": "São Paulo", "uf": "SP", "lat": -23.5505, "lon": -46.6333 },
    { "slug": "rio-de-janeiro-rj", "nome": "Rio de Janeiro", "uf": "RJ", "lat": -22.9068, "lon": -43.1729 }
  ]
}
```

```json
// api/mapas/sao-paulo-sp.json
{
  "versao": 1,
  "dados": {
    "slug": "sao-paulo-sp",
    "arquivo": "mapa-sao-paulo.svg",
    "alt": "Mapa meteorológico ilustrativo de São Paulo: nublado, com chuva leve (dados fictícios)."
  }
}
```

```json
// api/leituras/sao-paulo-sp.json — mesmos campos do contrato ideacao.md §5.6
{
  "versao": 1,
  "dados": [
    { "temperatura": 24.3, "umidade": 78, "chuva": 12.5, "vento": 18.2,
      "indice": 58, "classificacao": "Atenção",
      "orientacao": { "tipo": "CHUVA", "mensagem": "..." } }
  ]
}
```

### 3.2 Regras do formato

- `slug`: minúsculas, sem acento, hífen no lugar de espaço e vírgula
  (`"São Paulo, SP"` → `sao-paulo-sp`). É o identificador estável.
- Unidades fixas: °C, %, mm, km/h (as mesmas de `comparar-clima.js`).
- Números como número, nunca como string (`24.3`, não `"24,3"`).
- Textos em pt-BR, UTF-8.
- Mudança que quebra o formato → incrementa `versao`.

## 4. Onde os arquivos ficam

| Cenário | Pasta | Servido em |
|---|---|---|
| Vanilla (Etapa 1, sem Node) | `ETAPA 1/api/` | `../api/localidades.json`, relativo às páginas |
| Next | `public/api/` | `/api/localidades.json` |

Cuidado no Next: `public/api/` e `app/api/` disputam o mesmo prefixo `/api`. Se o
projeto tiver Route Handlers (ex.: `/api/comparar`), use `public/dados/` para os JSON e
deixe `/api` só para rotas dinâmicas. Ver §6.

## 5. Cliente no front-end

Um único módulo, `cliente-api.js`, que esconde de onde o dado vem. As telas só chamam
funções com nome de negócio:

```js
// cliente-api.js — assinatura ilustrativa
const URL_BASE = '../api'; // trocar por '/api' (Next) ou pela URL do backend futuro

/** @returns {Promise<Array<Localidade>>} */
export async function listarLocalidades() { /* GET ${URL_BASE}/localidades.json */ }

/** @param {string} slug */
export async function obterLocalidade(slug) { /* GET ${URL_BASE}/localidades/${slug}.json */ }

/** @param {string} slug */
export async function obterMapa(slug) { /* ... */ }

/** @param {string} slug */
export async function listarLeiturasMock(slug) { /* ... */ }
```

Comportamento obrigatório de toda função (mesmas regras de `ETAPA 1/JS/CLAUDE.md`):

- `fetch` com `async/await` dentro de `try/catch`;
- timeout com `AbortController` (8 s, como `cliente-openweather.js`);
- checar `response.ok`; 404 vira erro com mensagem amigável
  (`'Localidade não encontrada.'`);
- conferir `versao` do envelope e devolver só `dados`;
- cache em memória por URL durante a sessão, porque o arquivo não muda enquanto a página
  está aberta.

```js
// núcleo compartilhado — ilustrativo
async function buscarJson(caminho) {
  // 1. se está no cache em memória, devolve
  // 2. fetch com AbortController
  // 3. !response.ok → throw new Error(mensagemAmigavel)
  // 4. const { versao, dados } = await response.json()
  // 5. versao !== VERSAO_ESPERADA → throw
  // 6. guarda no cache e devolve dados
}
```

## 6. Variante Next.js

Duas formas, da mais simples para a mais flexível:

### 6.1 Arquivo em `public/` (recomendada para começar)

O JSON é servido como arquivo pelo próprio Next. Zero código no servidor. O
`cliente-api.js` só troca `URL_BASE` para `/dados`.

### 6.2 Route Handler lendo o JSON

Quando for preciso filtrar, validar ou esconder campos, o JSON sai de `public/` e passa a
ser importado no servidor:

```js
// app/api/localidades/[slug]/route.js — ilustrativo
import localidades from '@/dados/localidades.json';

export const dynamic = 'force-static'; // gerado no build, servido como estático

export function generateStaticParams() {
  return localidades.dados.map(({ slug }) => ({ slug }));
}

export async function GET(_requisicao, { params }) {
  // procura o slug; achou → Response.json({ versao, dados }); não achou → 404
}
```

Com `force-static` + `generateStaticParams`, o Next gera um arquivo por localidade no
build. O resultado é o mesmo que §6.1, só que com validação.

Nas páginas Server Component, nem é preciso HTTP: importar o JSON direto, porque o
servidor já tem o arquivo.

## 7. Caminho de evolução

```
Hoje            JS com dados embutidos
  ↓
Passo 1         JSON estático + cliente-api.js     ← esta proposta
  ↓
Passo 2         Route Handler lendo o JSON (Next)
  ↓
Futuro          Backend real ou banco, mesmo contrato, mesmo cliente
```

Em cada passo, só o `cliente-api.js` (ou o handler) muda. As telas não mudam.

## 8. Limitações

| Limitação | Consequência |
|---|---|
| Só leitura | Favoritos continuam em `localStorage` |
| Sem consulta (`?uf=SP`) | Filtrar no cliente; a lista tem 8 itens, então não pesa |
| `file://` bloqueia `fetch` | Abrir as páginas com um servidor local (ex.: extensão Live Server), não com duplo clique |
| Dado só muda com novo commit/deploy | Aceitável: localidades e mapas mudam raramente |
| Clima real não cabe aqui | A leitura "agora" continua vindo da OpenWeather; o JSON cobre só dados fixos e mock |

## 9. Decisões em aberto

1. Aplicar primeiro na Etapa 1 (vanilla) ou já direto no Next?
2. Manter `dados-mock.js` como JSON ou descartá-lo de vez, já que a OpenWeather está
   integrada?
