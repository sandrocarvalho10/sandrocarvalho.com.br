# Documentação — sandrocarvalho.com.br

Portfólio pessoal de Sandro Carvalho, feito em Next.js e publicado em https://sandrocarvalho.com.br.

| Documento | Conteúdo |
|---|---|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Stack, estrutura de pastas, renderização, SEO |
| [DESIGN.md](./DESIGN.md) | Linguagem visual, tokens, componentes, grid |
| [DEPLOY.md](./DEPLOY.md) | Ambiente local, Docker, CI/CD, Nginx e SSL |
| [ANALISE.md](./ANALISE.md) | Pontos de atenção e backlog de melhorias |

## Início rápido

Gerenciador de pacotes: **pnpm** (versão fixada em `packageManager` no `package.json`; use `corepack enable` para ativá-la).

```bash
pnpm install
pnpm dev          # http://localhost:3000 (Turbopack)
pnpm build && pnpm start
pnpm audit        # checar vulnerabilidades antes de abrir PR
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
- Só existe um lockfile (`pnpm-lock.yaml`). Não commitar `yarn.lock` nem `package-lock.json`: o Dockerfile dá preferência a eles e a produção acabaria instalando versões diferentes das do dev.
