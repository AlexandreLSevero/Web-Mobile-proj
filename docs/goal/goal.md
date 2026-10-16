# Metas — Migração para Next.js

Checklist para chegar na especificação [`docs/espc/next.md`](../espc/next.md).
Cada item é uma ação fechada. Marque `[x]` ao terminar.
As estimativas consideram uma pessoa que já conhece o código da Etapa 1 e está começando
em React.

**Total estimado: 15 a 21 horas**, divididas em 5 fases.

---

## Fase 1 — Esqueleto do projeto (1,5 h)

- [ ] 1.1 Criar o branch `feature/migracao-next`
- [ ] 1.2 Rodar `npx create-next-app@15 .` na raiz: JavaScript, App Router, ESLint,
      **sem** Tailwind, **sem** `src/`
- [ ] 1.3 Conferir que `ETAPA 1/` não foi alterada (`git status`)
- [ ] 1.4 Criar as pastas `components/`, `lib/`, `public/img/`
- [ ] 1.5 Adicionar `.next/` ao `.gitignore`
- [ ] 1.6 Rodar `npm run dev` e abrir `http://localhost:3000`

**Pronto quando:** a página padrão do Next abre no navegador.

## Fase 2 — Copiar `lib/` e imagens (1,5 h)

- [ ] 2.1 Copiar os 11 módulos de `next.md §5.1` para `lib/`, sem alterar a lógica
- [ ] 2.2 Ajustar os caminhos de `import` entre eles
- [ ] 2.3 Ajustar o caminho dos SVGs em `lib/dados-mapa.js` para `/img/...`
- [ ] 2.4 Copiar os SVGs de `ETAPA 1/IMG/` para `public/img/`

**Pronto quando:** `npm run build` passa com os módulos em `lib/`.

## Fase 3 — Layout e estilos globais (2 a 3 h)

- [ ] 3.1 Importar `tokens.css` e `reset.css` em `app/globals.css`
- [ ] 3.2 Criar `app/layout.js` com `lang="pt-BR"`
- [ ] 3.3 Criar `Cabecalho`, `Navegacao` e `Rodape` a partir da marcação da Etapa 1
- [ ] 3.4 Mover as regras de `layout.css` para `globals.css` e para os módulos desses
      3 componentes

**Pronto quando:** as 4 rotas vazias abrem com cabeçalho e navegação iguais aos da Etapa 1.

## Fase 4 — Telas, uma por vez (8 a 12 h)

Ordem: da mais simples para a mais complexa.

- [ ] 4.1 **Comparar** (`/`): `FormularioComparar` (1,5 h)
- [ ] 4.2 **Mapa** (`/mapa`): `MapaLocalidades` (1,5 h)
- [ ] 4.3 **Resultado, parte 1**: `ResultadoComparacao` com cartões e tabela geral (2 a 3 h)
- [ ] 4.4 **Resultado, parte 2**: `FiltroIndicador` e painéis por indicador (2 a 3 h)
- [ ] 4.5 **Resultado, parte 3**: `BotaoCompartilhar` e `BotaoFavoritar` (1 h)
- [ ] 4.6 **Favoritos** (`/favoritos`): `ListaFavoritos` (1,5 h)

Para cada tela: transcrever o HTML em JSX, converter o CSS da página em `*.module.css`
e comparar com a Etapa 1 aberta ao lado.

**Pronto quando:** o fluxo Comparar → Resultado → Mapa → Favoritar → Favoritos funciona
igual ao da Etapa 1.

## Fase 5 — Conferência e entrega (2 a 3 h)

- [ ] 5.1 Conferir a tabela de equivalências de `next.md §7`
- [ ] 5.2 Conferir os 6 critérios de aceite de `next.md §8`
- [ ] 5.3 Atualizar o `README.md` com `npm install` e `npm run dev`
- [ ] 5.4 Atualizar o `CLAUDE.md` da raiz (stack Next, pastas `app/`, `components/`, `lib/`)
- [ ] 5.5 Abrir o PR de `feature/migracao-next` para `main`

**Pronto quando:** o PR está aberto com todos os critérios de aceite marcados.

---

## Primeiro passo agora

Item 1.1: criar o branch `feature/migracao-next`. Leva 1 minuto.
