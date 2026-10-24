# Web-Mobile-proj

## Integrantes

Alexandre Luppi Severo e Silva (RA: 10419724)

Enrico Minto Spanier (RA: 10419775)

Guilherme Vecchi (RA: 10418517)

## Como rodar

### Etapa 1 — HTML + CSS + JS puros

Abra `ETAPA 1/HTML/index.html` por um servidor estático (os módulos ES não carregam via
`file://`), por exemplo:

```bash
cd "ETAPA 1"
python3 -m http.server 8081
# http://localhost:8081/HTML/index.html
```

### Etapa 2 — Next.js

Requer Node.js 20.11 ou superior.

```bash
cd "ETAPA 2"
npm install
npm run dev
# http://localhost:3000
```

Outros comandos: `npm run build` (build de produção), `npm start` (serve o build) e
`npm run lint` (`next lint`).
