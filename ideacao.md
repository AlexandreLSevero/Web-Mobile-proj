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
- Manter a implementação enxuta o suficiente para ser construída **apenas com HTML, CSS e JavaScript**, sem depender de frameworks ou de um backend dedicado;
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
4. **Definição do escopo técnico** — decisão de construir uma única aplicação responsiva, usando apenas HTML, CSS e JavaScript, sem framework de front-end e sem backend dedicado.
5. **Wireframe de baixa fidelidade** — tradução do fluxo em telas esquemáticas.
6. **Implementação funcional simples** (`climamonitor-app.html`) — versão navegável já funcional, com dados simulados, servindo de base para a próxima etapa (conexão com APIs reais).

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

---

## 5. Funcionalidade central: Comparar Localidades

### 5.1 Visão geral

Em vez de o usuário apenas consultar o clima de uma cidade isoladamente, ele seleciona **duas localidades** e recebe uma comparação direta entre elas — por exemplo, **São Paulo × Rio de Janeiro**. O objetivo é transformar dados de múltiplas APIs em informação compreensível, destacando diferenças, situações extremas e possíveis impactos.

### 5.2 Fluxo principal (tudo executado no navegador)

Como o projeto usa apenas HTML, CSS e JavaScript, **não há um servidor de backend dedicado**: a própria página, rodando no navegador do usuário, faz as chamadas às APIs meteorológicas e processa os dados com JavaScript puro.

```
Usuário (no navegador, celular ou computador)
   │
   │ Escolhe duas localidades (+ período)
   ▼
Página HTML/CSS/JS
   │
   │ fetch() para cada API, diretamente do navegador
   ▼
   ┌──────────────┬──────────────┬──────────────┐
   ▼              ▼              ▼              ▼
API 1          API 2          API 3          API 4
   └──────────────┴──────────────┴──────────────┘
                   │
             Normalização (JavaScript)
                   │
          Cálculo das médias (JavaScript)
                   │
              Comparação (JavaScript)
                   │
             Classificação (JavaScript)
                   │
              Orientação (JavaScript)
                   │
                   ▼
     Atualização da tela (mesmo HTML/CSS)
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

### 5.4 Chamada às APIs (direto do JavaScript da página)

```js
// Exemplo ilustrativo — chamada feita pelo próprio front-end, sem backend
const resposta = await fetch(`https://api-meteorologica.exemplo/clima?cidade=São Paulo`);
const dados = await resposta.json();
```

> **Nota técnica:** como as chamadas partem diretamente do navegador, é preciso escolher APIs meteorológicas que permitam esse tipo de acesso (com suporte a CORS) ou usar suas chaves de acesso de forma pública/gratuita compatível com uso no front-end. Isso deve ser validado na escolha final das APIs, mantendo o projeto sem a necessidade de um servidor próprio.

### 5.5 Processamento no próprio front-end

O JavaScript da página consulta as APIs configuradas para cada localidade, normaliza as unidades (ex.: Fahrenheit → Celsius) e calcula a média entre as fontes antes de comparar os indicadores (temperatura, umidade, chuva, vento).

```
API 1: 24°C        ┐
API 2: 25°C        ├─► Normalização ─► Média = 24,25°C
API 3: 23°C (77°F) │
API 4: 25°C        ┘
```

O mesmo processo é repetido para a segunda localidade e para os demais indicadores.

### 5.6 Estrutura de dados interna (calculada em JavaScript)

Mesmo sem um backend, é útil manter os dados organizados em um objeto interno, exatamente como se fosse a resposta de uma API própria — isso deixa o código mais organizado e facilita eventuais evoluções futuras:

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
    "indice": 32,
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
*Valores meramente ilustrativos; os dados reais virão das APIs integradas. Na implementação funcional atual (`climamonitor-app.html`), esse mesmo formato já é usado internamente, só que com dados simulados no lugar das chamadas às APIs.*

### 5.7 Índice Climático (classificação própria da aplicação)

Um **Índice de Condição Climática** próprio — não um índice meteorológico oficial — resume os indicadores (temperatura, umidade, chuva, vento, cada um com peso definido pela equipe) em uma escala única, calculada em JavaScript:

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

### O que evitar na primeira versão

Para manter o escopo enxuto e viável para um projeto de extensão construído apenas com HTML, CSS e JavaScript, recomenda-se **não** implementar de início: login/cadastro de usuários, sistema de permissões, mapas avançados (bibliotecas de mapa como Leaflet/Mapbox), notificações push, previsões de longo prazo, inteligência artificial, banco de dados ou backend dedicado, muitos filtros ou dashboards com muitos gráficos. Esses itens ficam como evoluções futuras (Seção 11).

---

## 7. Arquitetura de telas (o que está no wireframe e na implementação)

O protótipo (`wireframe-climamonitor.html`) e a implementação funcional (`climamonitor-app.html`) representam **uma única aplicação responsiva**, com um único conjunto de telas — não há uma versão separada para mobile e outra para web. A diferença entre usar em um celular ou em um computador é apenas visual (o CSS reorganiza os elementos conforme o espaço disponível), nunca uma tela ou fluxo diferente.

| # | Tela / seção | Função no fluxo |
|---|---|---|
| 1 | Comparar (início) | Seleção de Localidade A, Localidade B e período; sem necessidade de login |
| 2 | Resultado da comparação | Temperatura, umidade, chuva e vento lado a lado, com badge de classificação e índice climático |
| 3 | Análise e orientação | Texto interpretativo automático + recomendação prática para a população |
| 4 | Comparar por indicador | Seleção de um indicador específico com barras comparativas |
| 5 | Mapa das localidades | Visualização espacial simples das duas localidades comparadas |
| 6 | Favoritos | Pares de localidades salvos localmente, sem conta de usuário |

---

## 8. Fluxo de uso resumido

```
CIDADÃO (celular ou computador, mesma aplicação)
   │
   ├─ Abre a página (sem login)
   ├─ Escolhe Localidade A e Localidade B
   ├─ Escolhe o período (inicialmente apenas "Agora")
   ├─ Toca/clica em "Comparar clima"
   ├─ Vê o resultado lado a lado + índice climático
   ├─ Lê a análise automática e a orientação
   ├─ (Opcional) Aprofunda por indicador específico
   ├─ (Opcional) Visualiza as localidades no mapa
   └─ (Opcional) Salva a comparação em Favoritos
```

---

## 9. Arquitetura técnica (visão geral)

Sem backend dedicado: toda a lógica roda no navegador, na mesma página que exibe a interface.

```
┌────────────────────────────────────────┐
│         PÁGINA (HTML + CSS + JS)        │
│                                          │
│  HTML  → estrutura das telas/telas      │
│  CSS   → layout responsivo (mobile      │
│          e desktop na mesma página)     │
│  JS    → escolha das localidades        │
│          fetch() nas APIs               │
│          normalização                   │
│          cálculo das médias             │
│          comparação                     │
│          classificação (índice)         │
│          geração da orientação          │
│          atualização da tela            │
└──────────────┬───────────────────────────┘
               │
               ├──── API 1
               ├──── API 2
               ├──── API 3
               └──── API 4
```

---

## 10. Tecnologias (definição de escopo técnico)

> Decisão de escopo: o projeto será construído **apenas com HTML5, CSS3 e JavaScript puro (vanilla)** — sem frameworks de front-end (React, Vue, Flutter, React Native etc.) e sem backend dedicado (Node/Django/FastAPI).

- **HTML5** — estrutura semântica de uma única página (formulário de comparação, resultado, indicador, mapa, favoritos), organizada em seções que são mostradas/ocultadas por JavaScript.
- **CSS3** — responsividade via flexbox e media queries, garantindo que a mesma página funcione bem em celular, tablet e computador.
- **JavaScript (vanilla)** — toda a lógica de negócio: chamada às APIs (`fetch`), normalização de unidades, cálculo de médias, cálculo do índice climático, geração de análise/orientação e atualização da interface (manipulação do DOM).
- **APIs meteorológicas** — integrar 2 a 4 fontes públicas com suporte a chamadas diretas do navegador (CORS habilitado), reduzindo a dependência de uma única fonte.
- **Hospedagem** — por não haver backend, a aplicação pode ser publicada como site estático (ex.: GitHub Pages, Netlify, Vercel) ou simplesmente aberta localmente no navegador, o que é adequado ao orçamento de um projeto de extensão.

---

## 11. Próximos passos sugeridos

1. **Validação do wireframe e da implementação funcional** com um pequeno grupo de usuários reais, coletando feedback sobre a clareza do resultado, do índice climático e da orientação, em celular e em computador.
2. **Escolha das APIs meteorológicas** que suportem chamadas diretas do navegador (CORS), substituindo os dados simulados da implementação atual por dados reais.
3. **Definição dos pesos do índice climático** junto à equipe, com base em referências de órgãos meteorológicos, deixando claro que é uma metodologia própria da aplicação.
4. **Testes de usabilidade** com tarefas guiadas (ex.: "compare o clima da sua cidade com o de um familiar e diga qual está em situação de maior atenção"), testando explicitamente em diferentes tamanhos de tela.
5. **Evolução gradual, sempre em HTML/CSS/JS**: comparação por indicador → comparação por período com gráficos simples → identificação de condições extremas → (possíveis versões futuras, já fora do escopo enxuto) favoritos persistentes, mapas mais elaborados e monitoramento contínuo.

---

## 12. Ideia central do projeto

> "Não apenas mostrar o clima, mas transformar diferentes fontes de dados climáticos em uma comparação simples, compreensível e útil para a população — em uma única aplicação leve, responsiva e construída apenas com HTML, CSS e JavaScript."

```
APIs meteorológicas → Dados climáticos → Normalização e média (JS)
   → Comparação entre localidades → Classificação → Orientação
   → Conscientização da população
```

A funcionalidade **Comparar Localidades** é o principal mecanismo de interação do sistema, conectando a parte técnica do projeto à proposta extensionista e aos ODS 11 e 13 — tudo isso sem exigir múltiplas plataformas, frameworks ou um backend dedicado.

---

## 13. Como usar este material

- **`wireframe-climamonitor.html`** — protótipo de baixa fidelidade usado na fase de ideação, ilustrando as telas da aplicação.
- **`climamonitor-app.html`** — implementação funcional simples, em HTML, CSS e JavaScript puro, já navegável, com dados simulados (mock) no lugar das chamadas reais às APIs. É a base a partir da qual se conecta as APIs meteorológicas reais.
- **Este documento** — serve como registro escrito do processo de ideação, podendo ser anexado ao relatório do projeto de extensão ou usado como roteiro de apresentação para a banca/orientador.
