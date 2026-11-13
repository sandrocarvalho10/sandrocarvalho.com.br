# Arquitetura

## Stack

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16.4 |
| UI | React | 19.3 |
| Linguagem | TypeScript (`strict: false`) | 5 |
| Estilo | Tailwind CSS (via `@tailwindcss/postcss`) | 4 |
| Utilitários | `clsx` + `tailwind-merge` → `cn()` | — |
| Ícones | `lucide-react` | 0.525 |
| Animação | `gsap` (+ `ScrollTrigger`) | 3.15 |
| Fundo de partículas | `pixi.js` (WebGL, carregado sob demanda) | 8.23 |
| Imagens | `next/image` + `sharp` (AVIF/WebP) | 0.35 |
| Fontes | `next/font/google`: Archivo (variável `--font-archivo` → `font-sans`) | — |
| 3D *(sem uso na página)* | `three`, `@react-three/fiber`, `@react-three/drei` | 0.180 / 9 / 10 |
| Lint | ESLint 9 + `eslint-config-next` | — |
| Runtime | Node 20 (Alpine) | — |
| Gerenciador de pacotes | pnpm (`pnpm-lock.yaml`) | 10.28 |

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
│   ├── icons/tech.svg         # sprite dos ícones da stack (Simple Icons, CC0)
│   ├── ascii/retrato.json     # dados do retrato ASCII (cols, rows, colors)
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
├── ParticleBackground   'use client'  (canvas Pixi fixo atrás da página)
└── app/page.tsx  (Server Component)
    ├── Header           'use client'  (estado do menu mobile)
    ├── About            → CardAnimated, CardAnimatedAvatar
    ├── CurrentWork      → CardCurrentWork, CardCurrentWorkPortfolio
    ├── Content          → CardPortfolio ×2
    ├── Skills           → CardSkills, CardAnimatedContactMe
    └── Footer
```

- A página é 100% estática: não há fetch, API routes nem variáveis de ambiente. No `next build` ela é pré-renderizada (SSG).
- Client Components: `Header`, `ParticleBackground`, `AnimatedCard` e os cards com animação GSAP própria (avatar, contato). O `Hero` (Canvas R3F) também é `'use client'`, mas não é importado em nenhum lugar.
- Os cards de conteúdo usam o wrapper `AnimatedCard` (`screens/components/animated-card.tsx`): entrada animada, tilt 3D e spotlight que segue o cursor.

## Performance

Regras que mantêm a página leve sem perder as animações:

| Regra | Como |
|---|---|
| Nada acima da dobra depende de JS para aparecer | `AnimatedCard aboveTheFold` usa a animação CSS `animate-card-in` (roda no primeiro paint); os demais cards usam GSAP + ScrollTrigger |
| Entrada CSS não conflita com o tilt | A keyframe anima `translate`/`scale` (propriedades independentes), não `transform` |
| Toda imagem passa pelo `next/image` | Com `width`/`height` ou `fill` + `sizes` corretos; AVIF primeiro (`next.config.js`). Imagens decorativas usam `alt=""` |
| Uma imagem com `preload` | Só a do LCP visual (`avatar1.png`) |
| Pixi carrega por último | `requestIdleCallback` + `import("pixi.js")` dinâmico; o ticker para quando a aba fica oculta e respeita `prefers-reduced-motion` |
| Loop de partículas sem raiz quadrada desnecessária | Compara distâncias ao quadrado; `Math.sqrt` só nos pares que viram linha |
| Retrato ASCII em `<canvas>`, não no DOM | ~5.300 glifos num único elemento; só desenha durante a transição (parado = 0 frames). Dados em `public/ascii/retrato.json`, pré-carregados com `preload()` do React |
| Slider sem JavaScript | `TechMarquee` é Server Component (HTML + CSS); ícones vêm de um sprite SVG cacheável (`public/icons/tech.svg`) via `<use>`, fora do bundle |
| `backdrop-blur` só onde aparece | Apenas em cards translúcidos (contato, HVEX). Em cards opacos usar `isolate` no lugar |

Resultado medido (imagens da home): **8,2 MB → ~196 KB**.

## SEO e metadados

- `layout.tsx` exporta `metadata` (title, description, Open Graph, Twitter `summary_large_image`, `metadataBase`) e `viewport.themeColor`.
- `opengraph-image.tsx` gera um PNG de 1200×630 em tempo de build: lê `public/avatar_contact.png` com `fs` e o embute em base64.
- Não há `sitemap.ts`, `robots.ts` nem JSON-LD.

## Estilo

- Tailwind v4 é configurado por CSS (`@import "tailwindcss"` + `@theme inline`).
- Animações (`animate-rotate-bg`, `animate-card-in`) ficam no `@theme` do `global.css`.
- `tailwind.config.js` existe, mas **não é carregado** (falta `@config` no CSS), então as cores que ele define ficam sem efeito. Não adicione nada nele; use o `@theme`. Ver [ANALISE.md](./ANALISE.md).
- Detalhes visuais em [DESIGN.md](./DESIGN.md).

## Idiomas (pt / en / es)

- Rotas em `src/app/[lang]/` (home e `curriculo`), geradas estaticamente para os 3 idiomas.
- Português não tem prefixo: `src/proxy.ts` reescreve `/` e `/curriculo` para `/pt/...` por dentro e redireciona `/pt/...` para a URL sem prefixo. Inglês e espanhol usam `/en` e `/es`.
- Textos em `src/i18n/dictionaries/{pt,en,es}.ts`; o tipo `Dictionary` vem do `pt.ts`, então faltar uma chave em `en`/`es` quebra o build.
- Dados do currículo que não mudam com o idioma (contatos, datas, stacks) ficam em `src/i18n/resume-data.ts`.
- Seletor de idioma (globo no header) mantém o usuário na mesma página.

## Currículo

- **Versão interativa**: `src/screens/resume/resume.tsx` (cards, timeline com GSAP, contadores).
- **Versão PDF**: `src/screens/resume/resume-print.tsx`, que só aparece na impressão. Layout pensado para ATS: uma coluna, Arial, datas MM/AAAA, títulos de seção convencionais.
- PDFs ficam em `public/curriculo/` (um por idioma). **Ao mudar o conteúdo, regenere**: abra `/curriculo`, `/en/curriculo` e `/es/curriculo` no Chrome, use Ctrl+P → "Salvar como PDF" (A4, sem cabeçalhos/rodapés) e substitua os arquivos.
- O telefone aparece só no PDF, não na página pública.
