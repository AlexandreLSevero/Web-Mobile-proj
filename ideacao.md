# Tutorial de Ideação — ClimaMonitor
### Planejamento de projeto de extensão (Web-mobile) para monitoramento de eventos climáticos
**ODS 11** — Cidades e Comunidades Sustentáveis · **ODS 13** — Ação contra a Mudança Global do Clima

---

## 1. Contexto e justificativa

Eventos climáticos extremos — enchentes, deslizamentos de terra, ondas de calor — têm se tornado mais frequentes e mais intensos em áreas urbanas, atingindo com maior gravidade populações em situação de vulnerabilidade socioeconômica que residem em regiões de risco (encostas, margens de rios, ocupações irregulares).

Duas lacunas motivam este projeto:

1. **Falta de informação em tempo real e acessível** para o cidadão comum sobre riscos climáticos na sua própria região.
2. **Falta de um canal estruturado** para que a população reporte ocorrências e para que a gestão pública (Defesa Civil, prefeituras) consiga visualizar, validar e agir sobre esses dados de forma centralizada.

O projeto **ClimaMonitor** propõe uma solução Web-mobile que conecta cidadãos e gestores públicos em torno do monitoramento colaborativo de eventos climáticos, com caráter de **extensão universitária**: aproxima conhecimento técnico (desenvolvimento de software, dados abertos, cartografia de risco) da comunidade, gerando impacto social direto.

### Alinhamento com os ODS

| ODS | Meta relacionada | Como o projeto contribui |
|---|---|---|
| **ODS 11** | 11.5 — Reduzir mortes e perdas causadas por desastres, incluindo os relacionados à água | Alertas em tempo real e mapeamento de áreas de risco ajudam a reduzir a exposição da população a desastres urbanos |
| **ODS 11** | 11.b — Adotar políticas de gestão integrada de risco de desastres | O painel web fornece dados estruturados para que gestores públicos formulem políticas baseadas em evidência |
| **ODS 13** | 13.1 — Fortalecer a resiliência e a capacidade de adaptação a riscos climáticos | O sistema de alerta antecipado (early warning) fortalece a capacidade de resposta da comunidade |
| **ODS 13** | 13.3 — Melhorar a educação, conscientização e capacidade sobre mudança do clima | O boletim informativo e o histórico de eventos cumprem função educativa e de conscientização |

---

## 2. Objetivos

**Objetivo geral:** desenvolver um sistema Web-mobile colaborativo de monitoramento e alerta de eventos climáticos urbanos, articulando cidadãos e órgãos públicos de defesa civil.

**Objetivos específicos:**
- Permitir que o cidadão visualize riscos climáticos da sua região em um mapa interativo;
- Emitir alertas automáticos e oficiais (push, SMS) para áreas afetadas;
- Criar um canal de report cidadão (crowdsourcing) de ocorrências, com foto e geolocalização;
- Fornecer a gestores públicos um painel de validação de reports, emissão de alertas e indicadores para prestação de contas (ligados às metas dos ODS 11 e 13).

---

## 3. Público-alvo e personas

### Persona 1 — Cidadão (usuário do app mobile)
- **Nome fictício:** Maria, 42 anos, moradora de bairro em encosta.
- **Necessidade:** saber com antecedência se há risco de deslizamento na sua rua e poder avisar a Defesa Civil quando perceber um problema (rachadura, acúmulo de água).
- **Dor:** hoje só descobre o risco quando o evento já está acontecendo, por WhatsApp ou boato de vizinho.

### Persona 2 — Gestor público (usuário do painel web)
- **Nome fictício:** Carlos, agente da Defesa Civil municipal.
- **Necessidade:** centralizar informações de múltiplos bairros, validar denúncias da população e emitir alertas oficiais rapidamente.
- **Dor:** hoje recebe informações fragmentadas por telefone e redes sociais, sem um fluxo único de validação.

---

## 4. Metodologia de ideação

O planejamento seguiu quatro etapas:

1. **Levantamento do problema** — pesquisa sobre desastres climáticos urbanos e mapeamento das metas dos ODS 11 e 13 que poderiam ser endereçadas por tecnologia.
2. **Definição de personas e jornadas** — construção dos dois perfis de usuário (cidadão e gestor) e seus respectivos fluxos de uso.
3. **Brainstorm de funcionalidades** — listagem de funcionalidades candidatas, priorizadas pelo critério de *impacto social x viabilidade técnica* (método de priorização simples, inspirado em matriz de esforço x impacto).
4. **Wireframe de baixa fidelidade** — tradução das funcionalidades priorizadas em telas esquemáticas (o arquivo `wireframe-climamonitor.html`), permitindo validar o fluxo de navegação antes de qualquer investimento em design visual ou código.

### Funcionalidades priorizadas

| Funcionalidade | Plataforma | Impacto | Prioridade |
|---|---|---|---|
| Mapa de riscos em tempo real | Mobile | Alto | P0 |
| Alertas push/SMS | Mobile + Web (emissão) | Alto | P0 |
| Report cidadão com foto e geolocalização | Mobile | Alto | P0 |
| Validação de reports pela Defesa Civil | Web | Alto | P0 |
| Histórico de alertas | Mobile | Médio | P1 |
| Indicadores/relatórios ODS | Web | Médio | P1 |
| Boletim semanal educativo | Mobile | Baixo | P2 |

---

## 5. Arquitetura de telas (o que está no wireframe)

O protótipo visual (`wireframe-climamonitor.html`) está dividido em duas frentes, alternadas por abas no topo do arquivo:

### 5.1 App Mobile (Cidadão)

| # | Tela | Função no fluxo |
|---|---|---|
| 1 | Splash / Entrada | Login ou cadastro; cadastro captura bairro/CEP para já vincular o usuário a uma área de risco |
| 2 | Início | Resumo do nível de risco da região do usuário, mini-mapa e lista de alertas ativos |
| 3 | Mapa de riscos | Mapa interativo com marcadores por tipo de evento (enchente, deslizamento, calor) e filtros |
| 4 | Detalhe do alerta | Severidade, área afetada, recomendações de segurança e opção de compartilhar |
| 5 | Reportar ocorrência | Formulário de crowdsourcing: tipo de evento, foto, localização automática e descrição |
| 6 | Histórico de alertas | Linha do tempo de alertas anteriores recebidos pelo usuário |
| 7 | Perfil | Dados da conta, área monitorada e preferências de notificação |

A navegação inferior fixa (bottom navigation) garante que as 5 áreas centrais — Início, Mapa, Reportar, Alertas, Perfil — estejam sempre a um toque de distância, reduzindo a fricção em situações de emergência.

---

## 6. Fluxo de uso resumido

```
CIDADÃO                                   GESTOR PÚBLICO
   │                                            │
   ├─ Abre o app → vê risco da região           │
   ├─ Consulta mapa de eventos                  │
   ├─ Percebe uma ocorrência                    │
   │      └─ Envia REPORT (foto + local) ──────►├─ Recebe report na fila de validação
   │                                            ├─ Valida ou descarta
   │                                            ├─ Se confirmado, EMITE ALERTA OFICIAL
   ◄────────────────────────────────────────────┤
   ├─ Recebe push/SMS de alerta
   ├─ Consulta detalhe + recomendações
   └─ Marca como lido / compartilha             └─ Acompanha indicadores ODS no dashboard
```

---

## 7. Tecnologias sugeridas (para a próxima fase)

> Sugestão de stack — a ser validada pela equipe conforme os recursos e conhecimentos disponíveis no grupo de extensão.

- **Mobile:** React Native ou Flutter (multiplataforma, reduz custo de manutenção em um projeto com equipe pequena).
- **Web (painel do gestor):** React ou Vue.js.
- **Backend/API:** Node.js ou Python (Django/FastAPI), com banco de dados geoespacial (PostgreSQL + PostGIS).
- **Mapas:** Mapbox ou Leaflet com OpenStreetMap (opções gratuitas/open-source, adequadas a um projeto de extensão com orçamento limitado).
- **Notificações:** Firebase Cloud Messaging (push) e um gateway de SMS.
- **Dados climáticos:** integração futura com APIs públicas (ex: INMET, CEMADEN) para enriquecer os alertas com dados oficiais.

---

## 8. Próximos passos sugeridos

1. **Validação do wireframe** com um grupo pequeno de usuários reais (moradores de área de risco e um agente de defesa civil), coletando feedback sobre clareza e utilidade das telas.
2. **Protótipo de média/alta fidelidade** (Figma) aplicando identidade visual, cores de severidade (verde/amarelo/laranja/vermelho) e acessibilidade (contraste, tamanho de fonte).
3. **Testes de usabilidade** com tarefas guiadas (ex: "reporte uma ocorrência de enchente na sua rua").
4. **Definição de parcerias institucionais** (Defesa Civil local, ONGs, associações de bairro) — etapa central para o caráter extensionista do projeto.
5. **Plano de indicadores de impacto**, alinhando métricas do app (nº de reports validados, tempo médio de resposta, alcance dos alertas) às metas oficiais dos ODS 11 e 13, para subsidiar relatórios de extensão.

---

## 9. Como usar este material

- **`wireframe-climamonitor.html`** — abra no navegador; use as abas "App Mobile" e "Painel Web" no topo para alternar entre as telas do cidadão e do gestor. É um wireframe de baixa fidelidade (proposital): o foco é a estrutura e o fluxo, não o visual final.
- **Este documento** — serve como registro escrito do processo de ideação, podendo ser anexado ao relatório do projeto de extensão ou usado como roteiro de apresentação para a banca/orientador.
