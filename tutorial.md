# Tutorial — Rodando o ClimaMonitor

Guia rápido para abrir o protótipo, comparar o clima entre duas localidades com dados
reais da OpenWeather e entender como o projeto está organizado. Para o contexto completo
de ideação (personas, escopo, contrato de dados, pendências), veja [ideacao.md](ideacao.md).

## 1. O que é

O ClimaMonitor compara o clima **agora** entre duas localidades brasileiras (das 8
disponíveis no formulário), calcula um índice de condição climática próprio e mostra uma
orientação em linguagem simples. É um site estático: **HTML, CSS e JavaScript puros, sem
framework, sem build e sem Node.js** (restrição do professor da disciplina — ver
`ideacao.md §14`).

## 2. Pré-requisitos

- Um navegador atual (Chrome, Firefox, Edge...).
- Um jeito de servir os arquivos por `http://`, **não** abrindo o `.html` direto pelo
  `file://`. Os módulos ES (`import`/`export` usados em `JS/`) são bloqueados por CORS
  quando a página é aberta como arquivo local — é preciso um servidor, mesmo que simples.
- Nada de `npm install`: não há `package.json` nem dependências no projeto.

## 3. Como rodar localmente

### 3.1 Configure sua chave da OpenWeather

O projeto não versiona chave nenhuma (o GitHub bloqueia push com segredo detectado).
Antes de rodar, copie o modelo e cole a sua própria chave:

```bash
cp JS/configuracao-api.example.js JS/configuracao-api.js
```

Edite `JS/configuracao-api.js` e troque `'COLE_SUA_CHAVE_AQUI'` pela sua chave da
[OpenWeather](https://openweathermap.org/api). Esse arquivo fica no `.gitignore` — nunca
será commitado.

### 3.2 Sirva os arquivos

Qualquer servidor estático serve. Alguns exemplos, execute a partir da **raiz do
repositório**:

```bash
# Python (já vem instalado na maioria dos sistemas)
python3 -m http.server 8080
```

```bash
# VS Code: extensão "Live Server", botão direito em HTML/index.html → "Open with Live Server"
```

Depois, abra no navegador:

```
http://localhost:8080/HTML/index.html
```

## 4. Como usar

1. **Comparar** (`index.html`): escolha Localidade A, Localidade B e clique em "Comparar
   clima". O período só tem a opção "Agora" nesta versão.
2. O front-end busca o clima atual das duas localidades direto na OpenWeather e leva para
   **Resultado** (`resultado.html`): indicadores lado a lado, índice climático, tabela
   comparativa por indicador e a seção "Ver análise e orientação".
3. Na tela de resultado, o botão "☆ Favoritar" salva o par de localidades em
   `localStorage` (sem conta, só neste navegador/dispositivo).
4. Em **Favoritos** (`favoritos.html`), clicar num favorito **refaz a consulta na
   OpenWeather** (não mostra um resultado antigo) e leva para `resultado.html` com o clima
   atual. O botão ★ ao lado remove o favorito.
5. **Mapa** (`mapa.html`) mostra uma ilustração estática por localidade — ainda não é um
   mapa interativo (fora do Nível 1, ver `ideacao.md §6`).

## 5. Estrutura do projeto

```
HTML/   4 páginas: index (Comparar), resultado, mapa, favoritos
CSS/    estilos, um arquivo por tela + tokens/reset/layout compartilhados
JS/     um módulo por responsabilidade (ver JS/CLAUDE.md)
IMG/    ilustrações estáticas (SVG) do mapa
```

Módulos-chave em `JS/` para quem for mexer na integração com a OpenWeather:

| Arquivo | Responsabilidade |
|---|---|
| `configuracao-api.js` | Sua chave da API (local, no `.gitignore` — veja o passo 3.1) |
| `localidades.js` | Coordenadas fixas das 8 localidades |
| `cliente-openweather.js` | `fetch` na Current Weather API 2.5, normaliza unidades |
| `indice-climatico.js` | Pesos e faixas do Índice de Condição Climática (`ideacao.md §5.7`) |
| `orientacao.js` | Textos de orientação por tipo/classificação (`ideacao.md §5.8`) |
| `montar-leitura.js` | Junta os módulos acima numa leitura completa por localidade |
| `inicializar-comparar.js` | Liga o formulário de `index.html` a tudo isso |
| `favoritos.js` | Lista de favoritos; reabrir um refaz a consulta |

## 6. Sobre a chave da API

Como o projeto não pode ter backend nem build, não há como esconder a chave do lado do
servidor — cada pessoa usa a própria, localmente, via `JS/configuracao-api.js`
(`.gitignore`, nunca commitado; veja o passo 3.1). Isso ainda deixa a chave visível a
qualquer pessoa que **abrir a página no navegador dela** (inspecionar código sempre
mostra), só não vaza no repositório do GitHub. Recomendações:

- Use uma chave dedicada só para este projeto (nunca reaproveite uma chave de produção).
- Acompanhe o uso pelo painel do OpenWeather e troque a chave se notar abuso.

## 7. Erros comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Tela em branco / erro de CORS no console | Abriu o `.html` direto (`file://`) | Sirva os arquivos por `http://` (passo 3) |
| "Não foi possível conectar à OpenWeather" | Sem internet, ou a chave atingiu o limite gratuito | Verifique a conexão; confira o painel do OpenWeather |
| "Localidade não suportada" | Nome da localidade não bate com `JS/localidades.js` | Só as 8 localidades do `<select>` de `index.html` têm coordenadas cadastradas |
