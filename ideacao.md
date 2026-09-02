# Tutorial de Ideação — ClimaMonitor
### Planejamento de projeto de extensão (aplicação web responsiva) para monitoramento de eventos climáticos
**ODS 11** — Cidades e Comunidades Sustentáveis · **ODS 13** — Ação contra a Mudança Global do Clima

---

## 1. Contexto e justificativa

Eventos climáticos extremos — chuvas intensas, ondas de calor, ventos fortes — têm se tornado mais frequentes e mais intensos, afetando diretamente a rotina e a segurança da população em áreas urbanas.

Duas lacunas motivam este projeto:

1. **Falta de informação comparativa e compreensível** sobre condições climáticas: hoje o cidadão comum consulta o clima de um único lugar por vez, sem uma forma simples de entender diferenças e riscos relativos entre localidades.
2. **Dados meteorológicos dispersos em múltiplas fontes**, cada uma com sua própria unidade e estrutura, o que dificulta que uma pessoa comum extraia uma leitura clara da situação.

O projeto **ClimaMonitor** propõe **uma única aplicação web responsiva**, de uso direto pelo cidadão, cujo mecanismo central é permitir a **comparação do clima entre duas localidades**, transformando dados brutos de múltiplas APIs em informação compreensível — identificando diferenças, situações extremas e possíveis impactos para quem consulta. Tem caráter de **extensão universitária**: aproxima conhecimento técnico (consumo de APIs, tratamento e normalização de dados, visualização de informação) da comunidade, com função educativa e de conscientização.

> **Duas decisões importantes de escopo:**
> - Esta versão do planejamento não contempla um usuário gestor público / Defesa Civil. O projeto está desenhado como uma ferramenta de uso direto pelo cidadão.
> - **Não existem "uma versão mobile" e "uma versão web" separadas.** Trata-se de **uma única aplicação, responsiva**, que se adapta ao tamanho da tela (celular, tablet ou computador) usando a mesma base de código, HTML, CSS e telas.

### Alinhamento com os ODS

| ODS | Meta relacionada | Como o projeto contribui |
|---|---|---|
| **ODS 11** | 11.5 — Reduzir mortes e perdas causadas por desastres, incluindo os relacionados à água | Ao comparar localidades, o usuário identifica com mais clareza chuva intensa, risco de alagamento e condições adversas para deslocamento |
| **ODS 11** | 11.b — Fortalecer a capacidade de planejamento e gestão de riscos nas cidades | Mesmo sem um usuário gestor nesta versão, os dados comparativos ajudam qualquer pessoa a entender riscos do ambiente urbano onde vive ou pretende ir |
| **ODS 13** | 13.1 — Fortalecer a resiliência e a capacidade de adaptação a riscos climáticos | A orientação gerada a partir da comparação (ex: atenção a alagamentos, calor ou vento) fortalece a capacidade de resposta individual |
| **ODS 13** | 13.3 — Melhorar a educação, conscientização e capacidade sobre mudança do clima | O fluxo dados → informação → interpretação → conscientização é o núcleo educativo da aplicação |

---

## 2. Objetivos

**Objetivo geral:** desenvolver uma aplicação web responsiva, acessível tanto em celular quanto em computador, que permita ao cidadão comparar o clima entre duas localidades de forma simples, compreensível e útil, promovendo consciência sobre riscos climáticos urbanos.

**Objetivos específicos:**
- Permitir que o usuário compare temperatura, umidade, chuva e vento entre duas localidades, em tempo real, em uma única interface que funcione bem em qualquer tamanho de tela;
- Consumir e normalizar dados de múltiplas fontes (APIs meteorológicas) em uma leitura única e confiável;
- Classificar a condição de cada localidade por meio de um índice climático próprio da aplicação;
- Interpretar automaticamente a comparação, explicando qual localidade apresenta maior nível de atenção e por quê;
- Gerar orientações simples e práticas para a população a partir dessa interpretação;
- Manter a implementação enxuta: front-end **apenas com HTML, CSS e JavaScript**, sem framework, apoiado por um **backend mínimo em JavaScript (Node.js)**, também sem framework e sem banco de dados;
- Evoluir, em versões futuras, para comparação por indicador específico e por período histórico.

---

## 3. Público-alvo e persona

O projeto tem **um único tipo de usuário: o cidadão**, que usa a aplicação tanto para curiosidade e planejamento pessoal quanto para se informar sobre riscos — seja pelo celular, seja pelo computador, sempre na mesma aplicação.

### Persona — Cidadão
- **Nome fictício:** Maria, 34 anos.
- **Cenários de uso:**
  - Quer saber se está mais seguro viajar para a casa de um familiar em outra cidade esta semana;
  - Mora em uma região sujeita a alagamentos e quer entender se a situação atual é mais ou menos crítica que a de um bairro vizinho;
  - Quer decidir, no dia a dia, como se vestir ou se planejar comparando sua cidade com outra.
- **Necessidade:** uma resposta rápida, visual e em linguagem simples — não um boletim técnico.
- **Dor:** hoje precisa abrir vários apps de previsão do tempo, um para cada cidade, e ainda assim não tem uma leitura clara de "qual lugar está em situação mais preocupante e por quê".

---

## 4. Metodologia de ideação

O planejamento seguiu estas etapas:

1. **Levantamento do problema** — dificuldade de comparar condições climáticas entre localidades de forma acessível, e mapeamento das metas dos ODS 11 e 13 relacionadas.
2. **Definição da persona e dos cenários de uso** — construção do perfil do cidadão e das situações em que ele buscaria comparar duas localidades.
3. **Detalhamento da funcionalidade central** — a comparação de localidades deixou de ser "mais um recurso" e passou a ser o **principal mecanismo de interação do sistema**, estruturando fluxo, cálculo de índice e orientação.
4. **Definição do escopo técnico** — decisão de construir uma única aplicação responsiva, com front-end apenas em HTML, CSS e JavaScript (sem framework) e um backend mínimo em JavaScript (Node.js) responsável por consumir as APIs meteorológicas e guardar as chaves.
5. **Wireframe de baixa fidelidade** (`wireframe.html`) — tradução do fluxo em telas esquemáticas; artefato histórico da fase de ideação, hoje superado em alguns pontos (ver §7).
6. **Protótipo estático navegável** (pasta `HTML/`) — 4 páginas HTML5 semânticas, ainda **sem CSS e sem JS**, com dados mock (São Paulo × Rio de Janeiro). É a base sobre a qual entram a responsividade (CSS), o comportamento (JS) e a conexão com o backend.

### Funcionalidades priorizadas

| Funcionalidade | Impacto | Prioridade |
|---|---|---|
| Comparar clima entre duas localidades ("agora") | Alto | P0 |
| Classificação por índice climático próprio | Alto | P0 |
| Análise automática + orientação à população | Alto | P0 |
| Comparação por indicador específico (temperatura, chuva, umidade, vento) | Médio | P1 |
| Mapa simples das duas localidades comparadas | Médio | P1 |
| Localidades favoritas (sem login) | Baixo | P2 |
| Comparação por período (24h / 7 dias / 30 dias) com gráfico histórico | Baixo | P2 |

*A coluna "Plataforma" foi removida da tabela original: como agora existe apenas uma aplicação responsiva, todas as funcionalidades acima valem igualmente em qualquer tamanho de tela.*

*No protótipo estático atual, as telas de Mapa, Favoritos e a comparação por indicador já aparecem como **telas navegáveis com dados mock**. O comportamento real de cada uma (mapa interativo, favoritos que persistem, filtro dinâmico por indicador) continua adiado — ver §6.*

---

## 5. Funcionalidade central: Comparar Localidades

### 5.1 Visão geral

Em vez de o usuário apenas consultar o clima de uma cidade isoladamente, ele seleciona **duas localidades** e recebe uma comparação direta entre elas — por exemplo, **São Paulo × Rio de Janeiro**. O objetivo é transformar dados de múltiplas APIs em informação compreensível, destacando diferenças, situações extremas e possíveis impactos.

### 5.2 Fluxo principal

O front-end (página HTML/CSS/JS, no navegador do usuário) só coleta a seleção e
apresenta o resultado. Um **backend mínimo em JavaScript (Node.js)** faz o trabalho
pesado: consome as APIs meteorológicas, normaliza, calcula médias, aplica o índice e
monta a orientação — e guarda as chaves das APIs, que nunca chegam ao navegador.
A comunicação entre os dois é um único endpoint: `POST /comparar`.

```
Usuário (no navegador, celular ou computador)
   │
   │ Escolhe duas localidades (+ período)
   ▼
Front-end HTML/CSS/JS
   │
   │ POST /comparar  { localidadeA, localidadeB, periodo }
   ▼
Backend mínimo (JavaScript / Node.js)
   │
   │ fetch() para cada API (chaves ficam no backend)
   ▼
   ┌──────────────┬──────────────┬──────────────┐
   ▼              ▼              ▼              ▼
API 1          API 2          API 3          API 4
   └──────────────┴──────────────┴──────────────┘
                   │
             Normalização (backend)
                   │
          Cálculo das médias (backend)
                   │
              Comparação (backend)
                   │
             Classificação — índice (backend)
                   │
              Orientação (backend)
                   │
                   │ resposta JSON (contrato §5.6)
                   ▼
     Front-end renderiza o resultado (HTML/CSS)
```

### 5.3 Interface inicial (referência para o wireframe)

```
┌─────────────────────────────────────────────┐
│           COMPARAR LOCALIDADES               │
│                                               │
│  Localidade A: [ São Paulo, SP           ]   │
│  Localidade B: [ Rio de Janeiro, RJ      ]   │
│  Período:      [ Agora ▾ ]                   │
│                                               │
│              [ COMPARAR CLIMA ]              │
└─────────────────────────────────────────────┘
```

Este layout único se adapta por CSS (media queries / flexbox) tanto para telas estreitas de celular quanto para telas largas de computador — não são duas telas diferentes, é a mesma marcação HTML se reorganizando.

Recomenda-se implementar inicialmente apenas o período **"Agora"**; as demais opções (24h, 7 dias, 30 dias) entram em versões seguintes.

### 5.4 Chamada ao backend

O front-end faz **uma única chamada**, ao próprio backend do projeto:

```js
// Exemplo ilustrativo — o front-end fala apenas com o backend do ClimaMonitor
const resposta = await fetch('/comparar', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    localidadeA: 'São Paulo, SP',
    localidadeB: 'Rio de Janeiro, RJ',
    periodo: 'agora'
  })
});
const dados = await resposta.json(); // objeto no formato da §5.6
```

O backend é quem chama as APIs meteorológicas. As chamadas às fontes externas ficam
todas do lado do servidor.

> **Nota técnica:** com o backend intermediando as chamadas, **CORS deixa de ser um
> requisito** para a escolha das APIs e as chaves de acesso ficam no servidor, fora do
> versionamento. A escolha final das fontes passa a considerar apenas cobertura,
> limites de uso e custo.

### 5.5 Processamento no backend

O backend consulta as APIs configuradas para cada localidade, normaliza as unidades (ex.: Fahrenheit → Celsius) e calcula a média entre as fontes antes de comparar os indicadores (temperatura, umidade, chuva, vento).

```
API 1: 24°C        ┐
API 2: 25°C        ├─► Normalização ─► Média = 24,25°C
API 3: 23°C (77°F) │
API 4: 25°C        ┘
```

O mesmo processo é repetido para a segunda localidade e para os demais indicadores.

### 5.6 Estrutura de dados interna (calculada em JavaScript)

Este é o **contrato de resposta do `POST /comparar`** — o formato que o backend devolve e que o front-end sabe renderizar:

```json
{
  "localidadeA": {
    "nome": "São Paulo",
    "temperatura": 24.3,
    "umidade": 78,
    "chuva": 12.5,
    "vento": 18.2,
    "indice": 58,
    "classificacao": "ATENÇÃO"
  },
  "localidadeB": {
    "nome": "Rio de Janeiro",
    "temperatura": 29.1,
    "umidade": 72,
    "chuva": 3.2,
    "vento": 21.0,
    "indice": 25,
    "classificacao": "NORMAL"
  },
  "comparacao": {
    "maiorTemperatura": "Rio de Janeiro",
    "maiorUmidade": "São Paulo",
    "maiorChuva": "São Paulo",
    "maiorVento": "Rio de Janeiro",
    "maiorNivelAtencao": "São Paulo"
  },
  "orientacao": {
    "tipo": "CHUVA",
    "mensagem": "Atenção para áreas sujeitas a alagamentos."
  }
}
```
*Valores meramente ilustrativos; os dados reais virão das APIs integradas pelo backend. O protótipo estático em `HTML/` já exibe esse mesmo conjunto de campos (mock São Paulo × Rio de Janeiro), ainda sem a chamada real ao backend.*

### 5.7 Índice Climático (classificação própria da aplicação)

Um **Índice de Condição Climática** próprio — não um índice meteorológico oficial — resume os indicadores (temperatura, umidade, chuva, vento, cada um com peso definido pela equipe) em uma escala única, calculada **no backend**. Os pesos e os textos de orientação (§5.8) são regra de negócio do backend e não devem ser reimplementados no front-end. Os pesos ainda não estão fechados (ver §14).

| Faixa | Classificação |
|---|---|
| 0–30 | 🟢 Normal |
| 31–60 | 🟡 Atenção |
| 61–80 | 🟠 Alerta |
| 81–100 | 🔴 Crítico |

### 5.8 Interpretação e orientação

O sistema não se limita a mostrar números lado a lado — ele **interpreta** o resultado e **orienta** o usuário. Exemplo de leitura automática:

> *"São Paulo apresenta maior nível de atenção atualmente. A classificação está relacionada principalmente ao maior volume de chuva combinado com umidade elevada."*

E a orientação correspondente:

> 🌧️ *Atenção para chuva* — o volume de precipitação está elevado em comparação à outra localidade. Recomenda-se atenção em áreas sujeitas a alagamentos e acompanhamento dos canais oficiais.

O mesmo padrão se aplica a temperatura elevada (hidratação, evitar exposição prolongada ao sol) e ventos fortes (atenção em deslocamentos). O objetivo não é substituir órgãos oficiais, mas conscientizar o usuário sobre possíveis condições de risco.

### 5.9 Comparação por indicador

Além da visão geral, o usuário pode escolher analisar um único indicador:

```
Comparar por:  (•) Geral   ( ) Temperatura   ( ) Chuva   ( ) Umidade   ( ) Vento

CHUVA
São Paulo         ████████████████████████ 12 mm
Rio de Janeiro    ██████ 3 mm

São Paulo apresentou 9 mm a mais de chuva.
```

No protótipo atual, essa seleção é um acordeão de `<details>` dentro de `resultado.html` (ver §7), não uma tela separada.

### 5.10 Evolução temporal (versão futura)

Com a seleção de período (24h / 7 dias / 30 dias), o sistema passa a apresentar a evolução dos indicadores em um gráfico com duas séries — uma por localidade — respondendo perguntas como "qual cidade teve maior variação" ou "onde ocorreram condições mais extremas no período". Isso pode ser feito ainda em JavaScript puro (desenhando barras/linhas com HTML e CSS), sem necessidade de bibliotecas externas.

---

## 6. Níveis de evolução da funcionalidade

| Nível | Escopo |
|---|---|
| **1 — Comparar agora** | Duas localidades, indicadores atuais, classificação e orientação |
| **2 — Comparar por indicador** | Usuário escolhe temperatura, chuva, umidade, vento ou geral |
| **3 — Comparar por período** | 24h, 7 dias, 30 dias, com gráfico de evolução |
| **4 — Condições extremas** | Sistema sinaliza quando um valor ultrapassa limites definidos pela metodologia |

### Fora do Nível 1 (adiado)

Para manter o escopo enxuto, ficam de fora da primeira entrega: login/cadastro de
usuários, sistema de permissões, persistência real dos Favoritos (localStorage), mapa
interativo / bibliotecas de mapa (Leaflet, Mapbox), gráficos e histórico, notificações
push, previsões de longo prazo, inteligência artificial, banco de dados e dashboards
com muitos gráficos. Esses itens ficam como evoluções futuras (Seção 11).

O backend do projeto **existe** já no Nível 1, mas é **mínimo**: um único endpoint
(`POST /comparar`), sem banco e sem framework. Já as telas de Mapa, Favoritos e a
comparação por indicador entram no Nível 1 apenas como **telas estáticas** (dados mock),
sem o comportamento real descrito acima.

---

## 7. Arquitetura de telas

A aplicação é **uma única aplicação responsiva**, com um único conjunto de telas — não
há versão separada para mobile e para web. A diferença entre usar no celular ou no
computador é só visual (o CSS reorganiza os elementos), nunca uma tela ou fluxo diferente.

**Referência atual:** o protótipo estático na pasta `HTML/` — **4 arquivos**. O
`wireframe.html` é artefato histórico da ideação: ainda mostra "App Mobile" × "Versão
Web" separados, um 4º item de navegação e gráficos de histórico; nesses pontos ele já
**não** representa a direção do projeto.

| # | Arquivo | Função no fluxo |
|---|---|---|
| 1 | `HTML/index.html` — Comparar | Seleção de Localidade A, Localidade B e período; sem necessidade de login |
| 2 | `HTML/resultado.html` — Resultado | Indicadores lado a lado, índice climático, comparação por indicador e análise/orientação (ver abaixo) |
| 3 | `HTML/mapa.html` — Mapa | Visualização espacial simples das duas localidades (estática nesta versão) |
| 4 | `HTML/favoritos.html` — Favoritos | Pares de localidades salvos localmente, sem conta de usuário (mock nesta versão) |

Navegação: 3 itens — **Comparar · Mapa · Favoritos**.

`resultado.html` concentra o que antes eram telas próprias:

- **Comparar por indicador** — acordeão exclusivo de `<details name="indicador">` com 5
  painéis: "Geral" (aberto por padrão — os 2 cartões de localidade, o índice climático e
  a tabela geral) e um painel por indicador (Temperatura / Chuva / Umidade / Vento), cada
  um com barras `<meter>` e a leitura da diferença. Abrir um painel fecha os outros.
- **Análise e orientação** — um `<details>` separado ("Ver análise e orientação"),
  fechado por padrão, com a leitura interpretativa e a recomendação prática.

As telas `analise-orientacao.html` e `comparar-por-indicador.html` **não existem mais**.

---

## 8. Fluxo de uso resumido

```
CIDADÃO (celular ou computador, mesma aplicação)
   │
   ├─ Abre a página (sem login)
   ├─ Escolhe Localidade A e Localidade B
   ├─ Escolhe o período (inicialmente apenas "Agora")
   ├─ Toca/clica em "Comparar clima"  → front-end chama POST /comparar
   ├─ Vê o resultado lado a lado + índice climático (resultado.html)
   ├─ (Opcional) Aprofunda por indicador específico  — mesmo resultado.html
   ├─ (Opcional) Abre a análise automática e a orientação  — mesmo resultado.html
   ├─ (Opcional) Visualiza as localidades no mapa (mapa.html)
   └─ (Opcional) Salva a comparação em Favoritos (favoritos.html)
```

---

## 9. Arquitetura técnica (visão geral)

Duas partes: um front-end estático (HTML/CSS/JS) e um backend mínimo em JavaScript
(Node.js). O front-end nunca fala com as APIs meteorológicas — só com o backend.

```
┌─────────────────────────────────┐                ┌─────────────────────────────────┐
│   FRONT-END (HTML + CSS + JS)    │                │   BACKEND (JavaScript / Node)   │
│   site estático                 │  POST /comparar │   sem framework, sem banco      │
│                                 │ ──────────────► │                                 │
│  HTML  estrutura das 4 telas    │                 │  fetch() nas APIs (chaves aqui) │
│  CSS   layout responsivo        │                 │  normalização de unidades      │
│  JS    coleta da seleção        │ ◄────────────── │  cálculo das médias            │
│        POST /comparar           │   resposta JSON │  comparação                    │
│        render do resultado      │   (contrato §5.6)  classificação (índice)        │
│        carregando / erro        │                 │  geração da orientação         │
└─────────────────────────────────┘                └───────────────┬─────────────────┘
                                                                   │
                                                     ┌──────┬──────┼──────┬──────┐
                                                   API 1  API 2  API 3  API 4
```

---

## 10. Tecnologias (definição de escopo técnico)

> Decisão de escopo: **front-end apenas com HTML5, CSS3 e JavaScript puro (vanilla)** —
> sem frameworks (React, Vue, Flutter, React Native etc.) — e um **backend mínimo em
> JavaScript (Node.js)**, sem framework (Express/Nest) e sem banco de dados.

- **HTML5** — estrutura semântica das 4 telas (`HTML/`), com seções mostradas/ocultadas por `<details>` nativo e, mais adiante, por JavaScript.
- **CSS3** — responsividade via flexbox e media queries, garantindo que a mesma página funcione bem em celular, tablet e computador.
- **JavaScript (vanilla) no front-end** — coleta da seleção, chamada `POST /comparar`, renderização do resultado, estados de carregando/erro (`aria-live`) e foco.
- **Backend mínimo (Node.js, JavaScript)** — expõe apenas `POST /comparar`; consulta as APIs meteorológicas, normaliza unidades, calcula médias, aplica o índice climático, gera a análise/orientação e guarda as chaves das APIs (fora do versionamento).
- **APIs meteorológicas** — integrar 2 a 4 fontes públicas (consumidas pelo backend), reduzindo a dependência de uma única fonte. Sem exigência de CORS.
- **Hospedagem** — front-end como site estático (GitHub Pages, Netlify, Vercel); backend como pequeno serviço Node. Ambos compatíveis com o orçamento de um projeto de extensão.

---

## 11. Próximos passos sugeridos

1. **Adicionar CSS e JS ao protótipo estático** em `HTML/` — responsividade e comportamento, mantendo a separação de camadas.
2. **Implementar o backend `POST /comparar`** em Node.js, começando com dados mock no mesmo formato da §5.6 e depois plugando as APIs reais.
3. **Escolha das APIs meteorológicas** (consumidas pelo backend), avaliando cobertura, limites de uso e custo — CORS deixa de ser critério.
4. **Definição dos pesos do índice climático** junto à equipe, com base em referências de órgãos meteorológicos, deixando claro que é uma metodologia própria da aplicação.
5. **Validação e testes de usabilidade** com um pequeno grupo de usuários reais, com tarefas guiadas (ex.: "compare o clima da sua cidade com o de um familiar e diga qual está em situação de maior atenção"), em celular e em computador.
6. **Evolução gradual**: comparação por período com gráficos simples → identificação de condições extremas → (fora do escopo enxuto) favoritos persistentes, mapa interativo e monitoramento contínuo.

---

## 12. Ideia central do projeto

> "Não apenas mostrar o clima, mas transformar diferentes fontes de dados climáticos em uma comparação simples, compreensível e útil para a população — em uma única aplicação leve e responsiva, com front-end em HTML, CSS e JavaScript e um backend mínimo, também em JavaScript."

```
APIs meteorológicas → Dados climáticos → Normalização e média (backend)
   → Comparação entre localidades → Classificação → Orientação
   → Conscientização da população
```

A funcionalidade **Comparar Localidades** é o principal mecanismo de interação do sistema, conectando a parte técnica do projeto à proposta extensionista e aos ODS 11 e 13 — tudo isso sem exigir múltiplas plataformas, frameworks ou infraestrutura pesada.

---

## 13. Como usar este material

- **`wireframe.html`** — wireframe de baixa fidelidade da fase de ideação. Artefato histórico: alguns pontos (mobile/web separados, 4º item de nav, gráficos) já não refletem a direção atual.
- **Pasta `HTML/`** — protótipo estático atual: 4 páginas HTML5 semânticas, ainda sem CSS e sem JS, com dados mock (São Paulo × Rio de Janeiro). É a base sobre a qual entram CSS, JS e a chamada ao backend.
- **Este documento** — registro escrito do processo de ideação, podendo ser anexado ao relatório do projeto de extensão ou usado como roteiro de apresentação para a banca/orientador.

---

## 14. Pendências e decisões em aberto

Itens ainda **não definidos** ou que **podem não ser feitos nesta fase** — registrados
aqui para não serem improvisados:

| Item | Situação |
|---|---|
| Pesos exatos do índice climático | Não definidos. As faixas (§5.7) estão fixadas; os pesos por indicador, não. |
| Quais APIs meteorológicas | Não escolhidas. Critérios: cobertura no Brasil, limites de uso, custo. |
| Textos finais das orientações (§5.8) | Apenas rascunho ilustrativo. Precisam de revisão da equipe. |
| Stack exata do backend | "Backend mínimo em Node.js/JavaScript, sem framework" — falta decidir se `http` puro ou um utilitário mínimo. |
| Persistência real de Favoritos | Fora do Nível 1. Se entrar, será via `localStorage` (sem conta). Sem data definida. |
| Mapa interativo | Fora do Nível 1. Como fazer sem biblioteca de mapa ainda é questão aberta; hoje `mapa.html` é estático. |
| Botão "Compartilhar resultado" | Existe no protótipo (`resultado.html`), mas o comportamento (Web Share API? copiar link?) não está definido. |
| Seleção de período 24h / 7 dias / 30 dias | Só "Agora" no Nível 1. As demais opções dependem de APIs com histórico (Nível 3). |
| `check-in-2/m.md` | Arquivo vazio — placeholder de entrega/checkpoint, sem conteúdo ainda. |
