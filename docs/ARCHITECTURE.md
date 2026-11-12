# Arquitetura

## Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.1 |
| UI | React | 19.2 |
| Linguagem | TypeScript (`strict: false`) | 5 |
| Estilo | Tailwind CSS (via `@tailwindcss/postcss`) | 4 |
| Utilitários | `clsx` + `tailwind-merge` → `cn()` | — |
| Ícones | `lucide-react` | 0.525 |
| Fontes | `next/font/google`: Archivo (Inter e Roboto Mono declaradas, sem uso) | — |
| 3D *(sem uso na página)* | `three`, `@react-three/fiber`, `@react-three/drei` | 0.180 / 9 / 10 |
| Lint | ESLint 9 + `eslint-config-next` | — |
| Runtime | Node 20 (Alpine) | — |
| Gerenciador de pacotes | Yarn (`yarn.lock`) | — |

## Estrutura de pastas

```
.
├── docs/                      # esta documentação
├── infra/                     # Dockerfiles, compose de prod, nginx, certbot
├── .github/workflows/         # deploy.yml (CI/CD)
├── public/
│   ├── images/                # banner, screenshots (hvex/)
│   ├── models/                # .glb do avatar 3D
│   ├── icon/                  # favicon
│   └── *.png                  # avatares, fundos dos cards, screenshots do portfólio
└── src/
    ├── app/
    │   ├── layout.tsx         # <html>, fonte, Metadata e Viewport
    │   ├── page.tsx           # composição da landing page
    │   └── opengraph-image.tsx# OG image dinâmica (next/og)
    ├── screens/
    │   ├── landingPage/       # seções: header, about, current-work, content, skills, hero
    │   └── components/        # cards e footer usados pelas seções
    ├── fonts/                 # instâncias next/font
    ├── styles/
    │   ├── global.css         # @import "tailwindcss" + variáveis CSS
    │   └── lib/utils.ts       # cn()
    └── types/global.d.ts      # declaração de módulos *.css
```

## Fluxo de renderização

```
app/layout.tsx  (Server Component)
└── app/page.tsx  (Server Component)
    ├── Header           'use client'  (estado do menu mobile)
    ├── About            → CardAnimated, CardAnimatedAvatar
    ├── CurrentWork      → CardCurrentWork, CardCurrentWorkPortfolio
    ├── Content          → CardPortfolio ×2
    ├── Skills           → CardSkills, CardAnimatedContactMe
    └── Footer
```

- A página é 100% estática: não há fetch, API routes nem variáveis de ambiente. No `next build` ela é pré-renderizada (SSG).
- O único Client Component é o `Header`. O `Hero` (Canvas R3F) também é `'use client'`, mas não é importado em nenhum lugar.
- Os cards são componentes de apresentação sem props, exceto `CardPortfolio` (`src`, `alt`).

## SEO e metadados

- `layout.tsx` exporta `metadata` (title, description, Open Graph, Twitter `summary_large_image`, `metadataBase`) e `viewport.themeColor`.
- `opengraph-image.tsx` gera um PNG de 1200×630 em tempo de build: lê `public/avatar_contact.png` com `fs` e o embute em base64.
- Não há `sitemap.ts`, `robots.ts` nem JSON-LD.

## Estilo

- Tailwind v4 é configurado por CSS (`@import "tailwindcss"` + `@theme inline`).
- `tailwind.config.js` existe, mas **não é carregado** (falta `@config` no CSS), então o que ele define fica sem efeito. Ver [ANALISE.md](./ANALISE.md).
- Detalhes visuais em [DESIGN.md](./DESIGN.md).
