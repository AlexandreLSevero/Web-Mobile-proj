# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto

Projeto de extensão acadêmico (Mackenzie, "Web e Mobile") — **ClimaMonitor**, app web-mobile
para o cidadão cuja funcionalidade central é **comparar o clima atual entre duas localidades**.
Alinhado aos ODS 11 e 13. O repositório ainda está na fase de **ideação / wireframe**: não há
build, gerenciador de pacotes nem testes.

- [ideacao.md](ideacao.md) — documento de planejamento **autoritativo**: personas, prioridades
  de feature (P0–P2), contrato `POST /comparar`, faixas do índice climático, inventário de
  telas. Leia antes de propor ou implementar qualquer funcionalidade.
- [wireframe.html](wireframe.html) — wireframe de baixa fidelidade, autocontido (CSS/JS inline).
- `HTML/`, `CSS/`, `JS/` — código-fonte por linguagem; cada pasta tem seu próprio `CLAUDE.md`
  com as regras específicas.

## Regras gerais

- **Idioma:** todo conteúdo, copy de UI, comentários e documentação em **português do Brasil**.
- **Stack:** HTML5, CSS e JavaScript **puros (vanilla)** — sem framework, sem build, sem
  dependências externas nesta fase. Não introduza bibliotecas sem pedir.
- **Disciplina de escopo:** a primeira entrega é o **Nível 1** (comparar "agora", sem login,
  sem banco, sem mapa, sem gráfico, sem push, sem IA). Itens além disso estão adiados
  (ideacao.md §6 e §8) — não os adicione sem solicitação explícita.
- **Fonte da verdade:** havendo conflito entre código e [ideacao.md](ideacao.md), pergunte;
  não improvise regra de negócio (pesos do índice, mensagens de orientação, etc.).
- **Regra de Desenvolvimento** Todo desenvolvimento deve ser feito em plan mode inicialmente e somente ir para auto com autorização/permissão.

## Git

- Não faça commit nem push a menos que solicitado.
- Nunca commite direto em `main`; crie um branch (`feature/…`, `fix/…`, `docs/…`).
- Commits pequenos e atômicos, um assunto por commit.
- Mensagem de commit no imperativo e em português: `Adiciona tela de resultado da comparação`.
  Evite mensagens genéricas como "Update" / "ajustes".
- Não commite arquivos gerados, credenciais ou chaves de API (as chaves das APIs
  meteorológicas ficam fora do versionamento).

## Código

- Um arquivo por responsabilidade; nomes de arquivo em minúsculas com hífen (`comparar-clima.js`).
- Indentação de 2 espaços em HTML, CSS e JS.
- Mantenha a separação de camadas: estrutura no HTML, apresentação no CSS, comportamento no JS
  (sem CSS inline nem `onclick=` no HTML no código de produção).
- Acessibilidade e responsividade não são opcionais — ver `HTML/CLAUDE.md` e `CSS/CLAUDE.md`.
