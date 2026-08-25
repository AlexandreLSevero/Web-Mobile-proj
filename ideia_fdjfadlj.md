Comparação de Localidades — Monitor de Eventos Climáticos
1. Visão geral

A funcionalidade "Comparar com outra localidade" pode ser a principal interação do sistema.

Em vez de o usuário apenas consultar as condições climáticas de uma cidade, ele poderá selecionar duas localidades e comparar suas condições climáticas.

Exemplo:

São Paulo × Rio de Janeiro

O objetivo é transformar os dados obtidos pelas APIs em informações compreensíveis, permitindo identificar diferenças, situações extremas e possíveis impactos para a população.

O fluxo principal será:

Usuário
   │
   │ Escolhe duas localidades
   ▼
Frontend
   │
   │ Requisição HTTP
   ▼
Backend
   │
   ├── Consulta API 1
   ├── Consulta API 2
   ├── Consulta API 3
   └── Consulta API 4
          │
          ▼
     Normalização
          │
          ▼
     Cálculo das médias
          │
          ▼
      Comparação
          │
          ▼
     Classificação
          │
          ▼
       Orientação
          │
          ▼
Frontend

2. Objetivo da funcionalidade

A funcionalidade deve permitir que o usuário responda perguntas como:

Qual das duas localidades está mais quente?
Qual apresenta maior umidade?
Onde houve maior volume de chuva?
Qual possui maior velocidade do vento?
Qual localidade apresenta maior nível de atenção?
Qual indicador é responsável pela diferença?
Que orientação pode ser dada à população?

Dessa forma, o sistema não apenas apresenta dados, mas transforma os dados em informação útil para tomada de consciência sobre eventos climáticos.

3. Interface inicial

A tela pode ser simples e conter duas entradas de localização:

┌─────────────────────────────────────────────┐
│           COMPARAR LOCALIDADES              │
│                                             │
│  Localidade A                               │
│  [ São Paulo, SP                       ]    │
│                                             │
│             ↕ Comparar                      │
│                                             │
│  Localidade B                               │
│  [ Rio de Janeiro, RJ                  ]    │
│                                             │
│           [ COMPARAR CLIMA ]                │
└─────────────────────────────────────────────┘


O usuário seleciona as duas localidades e clica em "Comparar clima".

Esse clique é responsável por iniciar a comunicação:

Frontend → Backend → APIs → Processamento → Backend → Frontend

4. Fluxo da comparação
4.1. Seleção das localidades

O usuário informa:

Localidade A: São Paulo, SP
Localidade B: Rio de Janeiro, RJ


Também pode selecionar um período:

Período:

[ Agora ▼ ]

- Agora
- Últimas 24 horas
- Últimos 7 dias
- Últimos 30 dias


Inicialmente, recomenda-se implementar apenas "Agora". Os outros períodos podem ser adicionados posteriormente.

4.2. Requisição ao backend

Ao clicar em:

[ COMPARAR CLIMA ]


o frontend envia uma requisição para o backend.

Uma possibilidade seria:

POST /comparar


Com um corpo semelhante a:

{
  "localidadeA": "São Paulo, SP",
  "localidadeB": "Rio de Janeiro, RJ",
  "periodo": "agora"
}

5. Processamento no backend

O backend recebe as duas localidades e realiza as consultas necessárias.

                 ┌── API 1 ──┐
São Paulo ───────┼── API 2 ──┤
                 ├── API 3 ──┤
                 └── API 4 ──┘
                       │
                       ▼
                  Normalização
                       │
                       ▼
                     Média


                 ┌── API 1 ──┐
Rio de Janeiro ──┼── API 2 ──┤
                 ├── API 3 ──┤
                 └── API 4 ──┘
                       │
                       ▼
                  Normalização
                       │
                       ▼
                     Média


Depois disso, o backend pode comparar:

Temperatura
Umidade
Chuva
Vento
6. Média das APIs

Como serão utilizadas quatro APIs, o sistema pode combinar os resultados antes de apresentar os dados ao usuário.

Por exemplo:

API 1: 24°C
API 2: 25°C
API 3: 23°C
API 4: 25°C

Média = 24,25°C


O mesmo processo pode ser aplicado aos demais indicadores.

É importante que o backend faça a normalização dos dados, pois diferentes APIs podem utilizar unidades ou estruturas diferentes.

Exemplo:

API 1 → temperatura em Celsius
API 2 → temperatura em Celsius
API 3 → temperatura em Fahrenheit
API 4 → temperatura em Celsius


Antes da média, todos os valores devem estar na mesma unidade.

7. Resultado da comparação

Depois do processamento, o frontend pode apresentar os dados lado a lado.

┌─────────────────────────────────────────────────┐
│              RESULTADO DA COMPARAÇÃO            │
│                                                 │
│  SÃO PAULO              RIO DE JANEIRO          │
│                                                 │
│  🌡️ 24°C                  🌡️ 29°C              │
│  💧 78%                   💧 72%                │
│  🌧️ 12 mm                 🌧️ 3 mm              │
│  💨 18 km/h                💨 21 km/h            │
│                                                 │
│  🟡 ATENÇÃO              🟢 NORMAL              │
└─────────────────────────────────────────────────┘


Isso permite que o usuário identifique rapidamente as diferenças.

8. Índice de Condição Climática

Uma evolução interessante é criar um Índice de Condição Climática próprio do projeto.

Esse índice não deve ser apresentado como um índice meteorológico oficial. Ele seria uma metodologia desenvolvida pela própria aplicação para classificar as condições encontradas.

Exemplo:

0 ─────────────────────────────── 100

🟢 0–30     Normal
🟡 31–60    Atenção
🟠 61–80    Alerta
🔴 81–100   Crítico


O índice pode considerar os principais indicadores:

Temperatura ──┐
Umidade ──────┤
Chuva ────────┼──► Índice climático
Vento ────────┘


Cada indicador pode receber um peso definido pela equipe.

Por exemplo, em uma situação de chuva intensa, o volume de precipitação pode possuir maior influência na classificação.

9. Interpretação da comparação

O sistema não deve limitar-se a mostrar:

São Paulo: 24°C
Rio de Janeiro: 29°C


Ele pode interpretar os resultados.

Exemplo:

São Paulo apresenta maior nível de atenção atualmente.

E explicar:

A classificação está relacionada principalmente ao maior volume de chuva combinado com umidade elevada.

Isso torna o resultado mais compreensível para usuários que não possuem conhecimento técnico sobre meteorologia.

10. Comparação por indicador

Outra interação simples é permitir que o usuário escolha qual indicador deseja analisar.

Comparar por:

(•) Condição geral
( ) Temperatura
( ) Chuva
( ) Umidade
( ) Vento


Se o usuário selecionar chuva, por exemplo:

COMPARAÇÃO DE CHUVA

São Paulo
████████████████████████ 12 mm

Rio de Janeiro
██████ 3 mm

São Paulo apresentou
9 mm a mais de chuva.


Essa funcionalidade pode utilizar a mesma estrutura do backend, alterando apenas o indicador solicitado.

11. Comparação geral

Quando o usuário selecionar "Condição geral", o sistema pode analisar todos os indicadores.

Exemplo:

SÃO PAULO
Temperatura: 24°C
Umidade: 78%
Chuva: 12 mm
Vento: 18 km/h

Índice: 58
Classificação: 🟡 Atenção


RIO DE JANEIRO
Temperatura: 29°C
Umidade: 72%
Chuva: 3 mm
Vento: 21 km/h

Índice: 32
Classificação: 🟢 Normal


Depois:

ANÁLISE

São Paulo apresenta maior nível de atenção
em relação ao Rio de Janeiro.

O principal fator de diferença é o volume
de precipitação registrado.

12. Orientação para a população

Essa é uma das partes mais importantes para relacionar o projeto aos ODS 11 e ODS 13.

O sistema pode transformar a classificação em uma orientação simples.

Exemplo — chuva
🌧️ Atenção para chuva

O volume de precipitação observado está elevado
em comparação à outra localidade.

Recomenda-se atenção em áreas sujeitas a
alagamentos e acompanhamento dos canais
oficiais de emergência.

Exemplo — temperatura
🌡️ Temperatura elevada

A temperatura apresenta valores elevados.

Recomenda-se evitar exposição prolongada ao sol,
manter hidratação adequada e ter atenção especial
com pessoas mais vulneráveis.

Exemplo — vento
💨 Ventos fortes

A velocidade do vento está elevada em comparação
à outra localidade.

Recomenda-se atenção durante deslocamentos e
acompanhamento dos alertas oficiais.


O objetivo não é substituir órgãos oficiais, mas conscientizar o usuário sobre possíveis condições de risco.

13. Relação com os ODS
ODS 11 — Cidades e Comunidades Sustentáveis

A aplicação pode contribuir para o ODS 11 ao fornecer informações que ajudem a população a compreender condições climáticas que podem afetar o ambiente urbano.

Exemplos:

Chuva intensa;
Possibilidade de alagamentos;
Temperaturas elevadas;
Ventos fortes;
Condições potencialmente adversas para deslocamento.
ODS 13 — Ação Contra a Mudança Global do Clima

A aplicação também pode contribuir para o ODS 13 ao aumentar a conscientização sobre eventos e condições climáticas.

A ideia é:

Dados climáticos
       ↓
Informação
       ↓
Interpretação
       ↓
Conscientização
       ↓
Comportamento mais informado


Assim, o sistema possui uma função educativa além da função técnica.

14. Comparação entre períodos

Depois da primeira versão, a funcionalidade pode evoluir para comparação temporal.

Em vez de:

São Paulo × Rio de Janeiro


o usuário poderia escolher:

São Paulo × Rio de Janeiro
Período: últimos 7 dias


O sistema poderia então apresentar a evolução dos indicadores.

Exemplo:

Temperatura média

30° ┤             ╭───╮
28° ┤       ╭─────╯   ╰──╮
26° ┤───────╯             ╰
24° ┤
    └────────────────────────
      Seg Ter Qua Qui Sex Sáb


Com duas séries, uma para cada localidade.

Isso permite responder perguntas como:

Qual cidade teve maior temperatura média?
Qual teve maior variação?
Qual apresentou mais chuva?
Em qual localidade ocorreram condições mais extremas?
15. Níveis de evolução

A funcionalidade pode ser desenvolvida progressivamente.

Nível 1 — Comparar agora
São Paulo × Rio de Janeiro


O sistema apresenta:

Temperatura;
Umidade;
Chuva;
Vento;
Classificação;
Orientação.
Nível 2 — Comparar indicadores

O usuário escolhe:

Temperatura
Chuva
Umidade
Vento
Condição geral


O sistema destaca o indicador selecionado.

Nível 3 — Comparar períodos

O usuário escolhe:

Agora
Últimas 24 horas
Últimos 7 dias
Últimos 30 dias


O sistema apresenta a evolução dos dados.

Nível 4 — Identificação de condições extremas

O sistema pode identificar situações em que determinados valores ultrapassam os limites definidos pela metodologia.

Exemplo:

⚠️ Condição extrema identificada

São Paulo apresentou volume de chuva
significativamente superior ao da localidade
comparada.

16. Interface completa proposta

Uma tela inicial poderia ser estruturada assim:

┌─────────────────────────────────────────────────┐
│              MONITOR CLIMÁTICO                  │
│                                                 │
│ Compare as condições climáticas de localidades  │
│                                                 │
│  Localidade A            Localidade B           │
│ ┌─────────────────┐     ┌─────────────────┐    │
│ │ São Paulo       │ ⇄   │ Rio de Janeiro  │    │
│ └─────────────────┘     └─────────────────┘    │
│                                                 │
│ Período: [ Agora ▼ ]                            │
│                                                 │
│             [ COMPARAR ]                        │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│              RESULTADO                          │
│                                                 │
│  SÃO PAULO              RIO DE JANEIRO          │
│                                                 │
│  🌡️ 24°C                  🌡️ 29°C              │
│  💧 78%                   💧 72%                │
│  🌧️ 12 mm                 🌧️ 3 mm              │
│  💨 18 km/h                💨 21 km/h            │
│                                                 │
│  🟡 ATENÇÃO              🟢 NORMAL              │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│             ANÁLISE DA COMPARAÇÃO               │
│                                                 │
│  São Paulo apresenta maior nível de atenção.    │
│                                                 │
│  O principal fator de diferença é o volume      │
│  de precipitação.                               │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│       ORIENTAÇÃO PARA A POPULAÇÃO               │
│                                                 │
│  🌧️ Atenção para áreas sujeitas a alagamentos. │
│                                                 │
└─────────────────────────────────────────────────┘

17. API do backend

Uma estrutura inicial simples pode ser:

POST /comparar

Request
{
  "localidadeA": "São Paulo, SP",
  "localidadeB": "Rio de Janeiro, RJ",
  "periodo": "agora"
}

Response
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


Os valores acima são apenas exemplos de estrutura. Os valores reais serão provenientes das APIs.

18. Arquitetura

Uma arquitetura simples pode ser:

┌──────────────────────┐
│      FRONTEND        │
│                      │
│ Escolha das cidades  │
│ Seleção do período   │
│ Botão comparar       │
│ Visualização         │
└──────────┬───────────┘
           │
           │ HTTP
           ▼
┌──────────────────────┐
│       BACKEND        │
│                      │
│ Controller           │
│        ↓             │
│ Service              │
│        ↓             │
│ Normalização         │
│        ↓             │
│ Cálculo das médias   │
│        ↓             │
│ Comparação           │
│        ↓             │
│ Classificação        │
│        ↓             │
│ Orientação           │
└──────────┬───────────┘
           │
           ├──────── API 1
           ├──────── API 2
           ├──────── API 3
           └──────── API 4

19. O que evitar inicialmente

Para manter o projeto simples e extensível, não é necessário implementar tudo de uma vez.

Evitar inicialmente:

Login;
Cadastro de usuários;
Sistema complexo de permissões;
Mapas avançados;
Notificações;
Previsões de 30 dias;
Inteligência artificial;
Banco de dados complexo;
Dezenas de filtros;
Dashboard com muitos gráficos.

Esses recursos podem ficar como possibilidades futuras.

20. Escopo recomendado para a primeira versão

A primeira versão pode possuir somente:

1. Usuário escolhe Localidade A
             ↓
2. Usuário escolhe Localidade B
             ↓
3. Usuário clica em "Comparar"
             ↓
4. Frontend chama o backend
             ↓
5. Backend consulta as 4 APIs
             ↓
6. Backend normaliza os dados
             ↓
7. Backend calcula as médias
             ↓
8. Backend compara os indicadores
             ↓
9. Backend gera classificação
             ↓
10. Backend gera orientação
             ↓
11. Frontend apresenta resultado


Isso já demonstra:

Interação com o usuário;
Comunicação frontend/backend;
Consumo de APIs externas;
Tratamento de dados;
Normalização;
Cálculos;
Comparação;
Classificação;
Visualização;
Orientação à população;
Relação com os ODS 11 e 13.
21. Possíveis extensões futuras

A arquitetura pode permitir evoluções como:

Versão 1
└── Comparar duas localidades agora

Versão 2
├── Comparar indicadores específicos
└── Inverter localidades

Versão 3
├── Comparar últimos 24h
├── Comparar últimos 7 dias
└── Gráficos históricos

Versão 4
├── Identificação de eventos extremos
├── Histórico de comparações
└── Ranking de localidades

Versão 5
├── Alertas
├── Mapas
└── Monitoramento contínuo

22. Ideia central do projeto

A principal ideia pode ser resumida em:

"Não apenas mostrar o clima, mas transformar diferentes fontes de dados climáticos em uma comparação simples, compreensível e útil para a população."

O diferencial da aplicação estaria no fluxo:

4 APIs
   ↓
Dados climáticos
   ↓
Média e normalização
   ↓
Comparação entre localidades
   ↓
Identificação de condições relevantes
   ↓
Classificação
   ↓
Orientação
   ↓
Conscientização da população


Dessa forma, a funcionalidade "Comparar com outra localidade" deixa de ser apenas um recurso visual e passa a ser o principal mecanismo de interação do sistema, conectando a parte técnica do projeto com sua proposta extensionista e com os ODS 11 e 13.
