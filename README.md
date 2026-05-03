# Curriculo Online

Este projeto e um app React com Vite. Ele nao abre corretamente pelo Live Server do VS Code, porque o Live Server nao compila arquivos `.tsx`, imports do Vite nem o alias `@/`.

## Como abrir no navegador

No terminal, dentro da pasta do projeto:

```bash
npm install --package-lock=false
npm run dev
```

Depois abra o link mostrado no terminal, normalmente:

```text
http://localhost:8080/
```

No Windows, tambem da para executar o arquivo:

```text
rodar-site.bat
```

## Build de producao

```bash
npm run build
```
