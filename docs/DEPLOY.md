# Deploy e Infraestrutura

## Visão geral

```
push em main
   │
   ▼
GitHub Actions (deploy.yml)
   ├─ docker build -f infra/Dockerfile.prod
   ├─ docker push ghcr.io/<owner>/nextjs-app:latest
   └─ SSH no servidor → cd /srv/app && docker compose pull && up -d
                                   │
                                   ▼
                    ┌──────────── servidor ────────────┐
   :80 / :443 ───▶  │ nginx ──▶ nextjs:3000 (next start)│
                    │ certbot (Let's Encrypt)           │
                    └───────────────────────────────────┘
```

## Ambiente local

| Modo | Comando | URL |
|---|---|---|
| Node | `pnpm dev` | http://localhost:3000 |
| Docker + Nginx | `docker compose -f docker-compose.dev.yml up --build` | http://localhost |

`docker-compose.dev.yml` monta o código como volume (hot reload) e usa `infra/nginx.local.conf` como proxy na porta 80.

## Imagem de produção (`infra/Dockerfile.prod`)

1. **base**: `node:20-alpine` + `libc6-compat`.
2. **deps**: instala as dependências a partir do lockfile encontrado (yarn → npm → pnpm). O projeto usa só o `pnpm-lock.yaml`, e o `corepack` ativa a versão do campo `packageManager`.
3. **builder**: `next build` com `NEXT_TELEMETRY_DISABLED=1`.
4. **runner**: usuário não-root `nextjs` (uid 1001); copia `public`, `.next`, `node_modules` e `package.json`; roda `npm run start` na porta 3000.

## Servidor (`infra/docker-compose.prod.yml`)

| Serviço | Imagem | Portas | Volumes |
|---|---|---|---|
| `nextjs` | `ghcr.io/sandrocarvalho10/nextjs-app:latest` | expõe 3000 | — |
| `nginx` | `nginx:alpine` | 80, 443 | `nginx.conf`, `certbot/www`, `certbot/conf` |
| `certbot` | `certbot/certbot` | — | `certbot/www`, `certbot/conf` |

O Nginx redireciona HTTP → HTTPS, atende o desafio ACME em `/.well-known/acme-challenge/` e faz proxy para `nextjs:3000`.

### Emitir ou renovar o certificado

```bash
cd /srv/app
docker compose run --rm certbot certonly --webroot -w /var/www/certbot \
  -d sandrocarvalho.com.br -d www.sandrocarvalho.com.br
docker compose exec nginx nginx -s reload
```

> ⚠️ `infra/nginx.conf` ainda usa o placeholder `seusite.com` em `server_name` e nos caminhos dos certificados. Ajustar antes de reaproveitar o arquivo.

## Secrets do GitHub Actions

| Secret | Uso |
|---|---|
| `GITHUB_TOKEN` | login no GHCR (automático) |
| `SERVER_HOST` | IP/host do servidor |
| `SERVER_USER` | usuário SSH |
| `SERVER_SSH_KEY` | chave privada SSH |

## Checklist de segurança antes do deploy

```bash
pnpm audit --prod     # dependências de runtime; nenhuma crítica/alta pode passar
pnpm build
```

O Next.js é a dependência mais sensível (servidor exposto + Image Optimization). Manter na última versão patch da linha 16.x.

## Rollback

Hoje só existe a tag `latest`, então não há rollback por versão. Paliativo: fazer revert do commit em `main` e deixar o pipeline rodar de novo. Ver melhoria INF-3 em [ANALISE.md](./ANALISE.md).
