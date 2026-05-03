# Currículo Fácil

Este projeto usa React, TypeScript e Vite.

## Rodar em desenvolvimento

```sh
npm install
npm run dev
```

Abra a URL mostrada no terminal, normalmente:

```txt
http://localhost:8080/
```

## Usar com Live Server

O `index.html` da raiz não roda diretamente no Live Server, porque ele depende do Vite para compilar `src/main.tsx` e resolver os imports do React.

Para usar Live Server:

```sh
npm run build
```

Depois abra a pasta `dist` no Live Server ou abra `dist/index.html` pelo Live Server.
