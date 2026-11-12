# Documentação — sandrocarvalho.com.br

Portfólio pessoal de Sandro Carvalho, feito em Next.js e publicado em https://sandrocarvalho.com.br.

| Documento | Conteúdo |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Stack, estrutura de pastas, renderização, SEO |
| [DESIGN.md](./DESIGN.md) | Linguagem visual, tokens, componentes, grid |
| [DEPLOY.md](./DEPLOY.md) | Ambiente local, Docker, CI/CD, Nginx e SSL |
| [ANALISE.md](./ANALISE.md) | Pontos de atenção e backlog de melhorias |

## Início rápido

```bash
yarn install
yarn dev          # http://localhost:3000 (Turbopack)
yarn build && yarn start
```

Ou com Docker e Nginx (http://localhost):

```bash
docker compose -f docker-compose.dev.yml up --build
```

## Convenções

- Idioma do conteúdo: pt-BR.
- Commits: prefixo no estilo Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Branches: `feat/*`, `fix/*` a partir de `main`; o push em `main` faz deploy em produção.
- Alias de import: `@/*` → `src/*`.
