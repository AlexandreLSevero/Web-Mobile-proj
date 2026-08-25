# Tutorial de Ideação — ClimaMonitor
### Planejamento de projeto de extensão (Web-mobile) para monitoramento de eventos climáticos
**ODS 11** — Cidades e Comunidades Sustentáveis · **ODS 13** — Ação contra a Mudança Global do Clima

---

## 1. Contexto e justificativa

Eventos climáticos extremos — chuvas intensas, ondas de calor, ventos fortes — têm se tornado mais frequentes e mais intensos, afetando diretamente a rotina e a segurança da população em áreas urbanas.

Duas lacunas motivam este projeto:

1. **Falta de informação comparativa e compreensível** sobre condições climáticas: hoje o cidadão comum consulta o clima de um único lugar por vez, sem uma forma simples de entender diferenças e riscos relativos entre localidades.
2. **Dados meteorológicos dispersos em múltiplas fontes**, cada uma com sua própria unidade e estrutura, o que dificulta que uma pessoa comum extraia uma leitura clara da situação.

O projeto **ClimaMonitor** propõe uma solução Web-mobile, de uso direto pelo cidadão, cujo mecanismo central é permitir a **comparação do clima entre duas localidades**, transformando dados brutos de múltiplas APIs em informação compreensível — identificando diferenças, situações extremas e possíveis impactos para quem consulta. Tem caráter de **extensão universitária**: aproxima conhecimento técnico (integração de APIs, tratamento e normalização de dados, visualização de informação) da comunidade, com função educativa e de conscientização.

> Esta versão do planejamento não contempla um usuário gestor público / Defesa Civil. O projeto está desenhado como uma ferramenta de uso direto pelo cidadão.

### Alinhamento com os ODS

| ODS | Meta relacionada | Como o projeto contribui |
|---|---|---|
| **ODS 11** | 11.5 — Reduzir mortes e perdas causadas por desastres, incluindo os relacionados à água | Ao comparar localidades, o usuário identifica com mais clareza chuva intensa, risco de alagamento e condições adversas para deslocamento |
| **ODS 11** | 11.b — Fortalecer a capacidade de planejamento e gestão de riscos nas cidades | Mesmo sem um usuário gestor nesta versão, os dados comparativos ajudam qualquer pessoa a entender riscos do ambiente urbano onde vive ou pretende ir |
| **ODS 13** | 13.1 — Fortalecer a resiliência e a capacidade de adaptação a riscos climáticos | A orientação gerada a partir da comparação (ex: atenção a alagamentos, calor ou vento) fortalece a capacidade de resposta individual |
| **ODS 13** | 13.3 — Melhorar a educação, conscientização e capacidade sobre mudança do clima | O fluxo dados → informação → interpretação → conscientização é o núcleo educativo da aplicação |

---

## 2. Objetivos

**Objetivo geral:** desenvolver uma aplicação Web-mobile que permita ao cidadão comparar o clima entre duas localidades de forma simples, compreensível e útil, promovendo consciência sobre riscos climáticos urbanos.

**Objetivos específicos:**
- Permitir que o usuário compare temperatura, umidade, chuva e vento entre duas localidades, em tempo real;
- Agregar e normalizar dados de múltiplas fontes (APIs meteorológicas) em uma leitura única e confiável;
- Classificar a condição de cada localidade por meio de um índice climático próprio da aplicação;
- Interpretar automaticamente a comparação, explicando qual localidade apresenta maior nível de atenção e por quê;
- Gerar orientações simples e práticas para a população a partir dessa interpretação;
- Evoluir, em versões futuras, para comparação por indicador específico e por período histórico.

---

## 3. Público-alvo e persona

O projeto tem **um único tipo de usuário: o cidadão**, que usa o app tanto para curiosidade e planejamento pessoal quanto para se informar sobre riscos.

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
3. **Detalhamento da funcionalidade central** — a comparação de localidades deixou de ser "mais um recurso" e passou a ser o **principal mecanismo de interação do sistema**, estruturando fluxo, backend, cálculo de índice e orientação.
4. **Wireframe de baixa fidelidade** — tradução do fluxo em telas esquemáticas (`wireframe-climamonitor.html`), validando a navegação antes de qualquer investimento em design visual ou código.

### Funcionalidades priorizadas

| Funcionalidade | Plataforma | Impacto | Prioridade |
|---|---|---|---|
| Comparar clima entre duas localidades ("agora") | Mobile + Web | Alto | P0 |
| Classificação por índice climático próprio | Mobile + Web | Alto | P0 |
| Análise automática + orientação à população | Mobile + Web | Alto | P0 |
| Comparação por indicador específico (temperatura, chuva, umidade, vento) | Mobile + Web | Médio | P1 |
| Mapa simples das duas localidades comparadas | Mobile + Web | Médio | P1 |
| Localidades favoritas (sem login) | Mobile + Web | Baixo | P2 |
| Comparação por período (24h / 7 dias / 30 dias) com gráfico histórico | Web (prioritário) + Mobile | Baixo | P2 |

---

## 5. Funcionalidade central: Comparar Localidades

### 5.1 Visão geral

Em vez de o usuário apenas consultar o clima de uma cidade isoladamente, ele seleciona **duas localidades** e recebe uma comparação direta entre elas — por exemplo, **São Paulo × Rio de Janeiro**. O objetivo é transformar dados de múltiplas APIs em informação compreensível, destacando diferenças, situações extremas e possíveis impactos.

### 5.2 Fluxo principal

```
Usuário
   │
   │ Escolhe duas localidades (+ período)
   ▼
Frontend ── requisição HTTP ──► Backend
                                   │
                    ┌──────────────┼──────────────┬──────────────┐
                    ▼              ▼              ▼              ▼
                 API 1          API 2          API 3          API 4
                    └──────────────┴──────────────┴──────────────┘
                                   │
                             Normalização
                                   │
                          Cálculo das médias
                                   │
                              Comparação
                                   │
                             Classificação
                                   │
                              Orientação
                                   │
                                   ▼
                               Frontend
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

Recomenda-se implementar inicialmente apenas o período **"Agora"**; as demais opções (24h, 7 dias, 30 dias) entram em versões seguintes.

### 5.4 Requisição ao backend

```
POST /comparar
{
  "localidadeA": "São Paulo, SP",
  "localidadeB": "Rio de Janeiro, RJ",
  "periodo": "agora"
}
```

### 5.5 Processamento no backend

O backend consulta as APIs configuradas para cada localidade, normaliza as unidades (ex.: Fahrenheit → Celsius) e calcula a média entre as fontes antes de comparar os indicadores (temperatura, umidade, chuva, vento).

```
API 1: 24°C        ┐
API 2: 25°C        ├─► Normalização ─► Média = 24,25°C
API 3: 23°C (77°F) │
API 4: 25°C        ┘
```

O mesmo processo é repetido para a segunda localidade e para os demais indicadores.

### 5.6 Resposta do backend (exemplo de contrato)

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
*Valores meramente ilustrativos; os dados reais virão das APIs integradas.*

### 5.7 Índice Climático (classificação própria da aplicação)

Um **Índice de Condição Climática** próprio — não um índice meteorológico oficial — resume os indicadores (temperatura, umidade, chuva, vento, cada um com peso definido pela equipe) em uma escala única:

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

### 5.10 Evolução temporal (versão futura, priorizada na Web)

Com a seleção de período (24h / 7 dias / 30 dias), o sistema passa a apresentar a evolução dos indicadores em um gráfico com duas séries — uma por localidade — respondendo perguntas como "qual cidade teve maior variação" ou "onde ocorreram condições mais extremas no período".

---

## 6. Níveis de evolução da funcionalidade

| Nível | Escopo |
|---|---|
| **1 — Comparar agora** | Duas localidades, indicadores atuais, classificação e orientação |
| **2 — Comparar por indicador** | Usuário escolhe temperatura, chuva, umidade, vento ou geral |
| **3 — Comparar por período** | 24h, 7 dias, 30 dias, com gráfico de evolução |
| **4 — Condições extremas** | Sistema sinaliza quando um valor ultrapassa limites definidos pela metodologia |

### O que evitar na primeira versão

Para manter o escopo enxuto e viável para um projeto de extensão, recomenda-se **não** implementar de início: login/cadastro de usuários, sistema de permissões, mapas avançados, notificações push, previsões de longo prazo, inteligência artificial, banco de dados complexo, muitos filtros ou dashboards com muitos gráficos. Esses itens ficam como evoluções futuras (Seção 8).

---

## 7. Arquitetura de telas (o que está no wireframe)

O protótipo visual (`wireframe-climamonitor.html`) tem duas abas — **App Mobile** e **Versão Web** — ambas para o mesmo usuário (cidadão), sem tela ou fluxo de gestor público.

### 7.1 App Mobile

| # | Tela | Função no fluxo |
|---|---|---|
| 1 | Comparar (início) | Seleção de Localidade A, Localidade B e período; sem necessidade de login |
| 2 | Resultado da comparação | Temperatura, umidade, chuva e vento lado a lado, com badge de classificação e índice climático |
| 3 | Análise e orientação | Texto interpretativo automático + recomendação prática para a população |
| 4 | Comparar por indicador | Seleção de um indicador específico com barras comparativas |
| 5 | Mapa das localidades | Visualização espacial simples das duas localidades comparadas |
| 6 | Favoritos | Pares de localidades salvos localmente, sem conta de usuário |

### 7.2 Versão Web

| # | Tela | Função no fluxo |
|---|---|---|
| 1 | Comparar clima (início) | Mesma seleção de localidades e período, em layout mais amplo |
| 2 | Resultado e evolução histórica | KPIs comparativos e gráfico de série temporal (quando o período selecionado for diferente de "Agora") |
| 3 | Comparação por indicador | Tabela comparativa detalhada por indicador |
| 4 | Mapa das localidades comparadas | Mesma lógica do mobile, adaptada a tela maior |

---

## 8. Fluxo de uso resumido

```
CIDADÃO
   │
   ├─ Abre o app (sem login)
   ├─ Escolhe Localidade A e Localidade B
   ├─ Escolhe o período (inicialmente apenas "Agora")
   ├─ Toca em "Comparar clima"
   ├─ Vê o resultado lado a lado + índice climático
   ├─ Lê a análise automática e a orientação
   ├─ (Opcional) Aprofunda por indicador específico
   ├─ (Opcional) Visualiza as localidades no mapa
   └─ (Opcional) Salva a comparação em Favoritos
```

---

## 9. Arquitetura técnica (visão geral)

```
┌──────────────────────┐
│      FRONTEND        │
│  Escolha das cidades │
│  Seleção do período  │
│  Botão comparar      │
│  Visualização        │
└──────────┬───────────┘
           │ HTTP
           ▼
┌──────────────────────┐
│       BACKEND        │
│  Controller          │
│  Service             │
│  Normalização        │
│  Cálculo das médias  │
│  Comparação          │
│  Classificação       │
│  Orientação          │
└──────────┬───────────┘
           │
           ├──── API 1
           ├──── API 2
           ├──── API 3
           └──── API 4
```

---

## 10. Tecnologias sugeridas (para a próxima fase)

> Sugestão de stack — a ser validada pela equipe conforme os recursos e conhecimentos disponíveis no grupo de extensão.

- **Mobile:** React Native ou Flutter (multiplataforma, reduz custo de manutenção em equipe pequena).
- **Web:** React ou Vue.js.
- **Backend/API:** Node.js ou Python (Django/FastAPI), responsável por consultar as APIs meteorológicas, normalizar unidades, calcular médias e gerar a classificação/orientação.
- **APIs meteorológicas:** integrar 2 a 4 fontes públicas (ex.: OpenWeatherMap, INMET, CEMADEN, WeatherAPI) para compor a média e reduzir a dependência de uma única fonte.
- **Gráficos (versão futura):** Chart.js ou Recharts para a evolução temporal por período.

---

## 11. Próximos passos sugeridos

1. **Validação do wireframe** com um pequeno grupo de usuários reais, coletando feedback sobre a clareza do resultado, do índice climático e da orientação.
2. **Implementação do Nível 1** (comparar "agora", sem login) como primeira entrega funcional.
3. **Definição dos pesos do índice climático** junto à equipe, com base em referências de órgãos meteorológicos, deixando claro que é uma metodologia própria da aplicação.
4. **Testes de usabilidade** com tarefas guiadas (ex.: "compare o clima da sua cidade com o de um familiar e diga qual está em situação de maior atenção").
5. **Evolução gradual**: comparação por indicador → comparação por período com gráficos → identificação de condições extremas → (possíveis versões futuras) mapas, alertas e monitoramento contínuo.

---

## 12. Ideia central do projeto

> "Não apenas mostrar o clima, mas transformar diferentes fontes de dados climáticos em uma comparação simples, compreensível e útil para a população."

```
4 APIs → Dados climáticos → Normalização e média → Comparação entre localidades
   → Classificação → Orientação → Conscientização da população
```

A funcionalidade **Comparar Localidades** deixa de ser "mais um recurso visual" e passa a ser o principal mecanismo de interação do sistema, conectando a parte técnica do projeto à proposta extensionista e aos ODS 11 e 13.

---

## 13. Como usar este material

- **`wireframe-climamonitor.html`** — abra no navegador; use as abas "App Mobile" e "Versão Web" no topo. Todas as telas representam o mesmo usuário (cidadão); não há tela de gestor público nesta versão.
- **Este documento** — serve como registro escrito do processo de ideação, podendo ser anexado ao relatório do projeto de extensão ou usado como roteiro de apresentação para a banca/orientador.
