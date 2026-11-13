# Análise técnica — pontos de atenção e melhorias

Levantamento inicial em 2026-11-12, atualizado no mesmo dia após a rodada de performance e segurança.
Prioridade: 🔴 alta · 🟡 média · 🟢 baixa. Status: ✅ resolvido · ◐ parcial · ⬜ aberto.

## Segurança das dependências

Auditoria com `yarn audit` / `pnpm audit` em 2026-11-12.

| | Antes | Depois |
|---|---|---|
| Crítica | 6 | 0 |
| Alta | 114 | 0 |
| Moderada | 79 | 1 |
| Baixa | 12 | 0 |

O que foi feito:

| Item | Ação |
|---|---|
| `next` 16.1.6 → **16.4.6** | Corrige RCE não autenticado no Image Optimization e em `use cache`, SSRF, bypass de middleware, cache poisoning e DoS |
| `sharp` 0.34 → **0.35.5** (via next) | CVEs do libvips, libheif e librsvg |
| `react` / `react-dom` → **19.3.1** | Patch da linha 19 |
| `pixi.js` → **8.23** | Puxa `@xmldom/xmldom` 0.8.15 (injeção e ReDoS) |
| `tailwindcss` / `@tailwindcss/postcss` → **4.3.5** | Puxa `tar`, `nanoid` e `source-map-js` corrigidos |
| `shadcn` removido | CLI sem uso em runtime; sozinho trazia cerca de 30 advisories (MCP SDK, body-parser, qs, path-to-regexp…). Usar via `pnpm dlx shadcn@latest` |
| `button` removido | Pacote de terceiros (`aliceui/button`) sem relação com o projeto e sem uso |
| `yarn.lock` removido | Estava desatualizado (next 16.1.6) e o Dockerfile dava preferência a ele, então **a produção instalava versões vulneráveis** enquanto o dev rodava as corrigidas. Agora só existe o `pnpm-lock.yaml`, e a versão do pnpm está fixada em `packageManager` |

Pendente: 1 moderada em `minimatch`, via `eslint-config-next` → `@typescript-eslint`. Só afeta o lint em dev e não vai para produção; resolve quando o `eslint-config-next` atualizar a dependência.

Atualizações major disponíveis, que **não** foram aplicadas por exigirem migração: `lucide-react` 1.x, `eslint` 10, `typescript` 7, `three` 0.187.

## Pontos de atenção (bugs e riscos)

| ID | Prio | Status | Problema | Onde | Correção sugerida |
|---|---|---|---|---|---|
| BUG-1 | 🔴 | ◐ | Tailwind v4 não carrega `tailwind.config.js`; `text-muted`, `border-border` e `primary` não são gerados | `src/styles/global.css` | ✅ `animate-rotate-bg` foi migrada para `@theme` (só `rotate`, respeitando `prefers-reduced-motion`). Falta migrar as cores e apagar o `tailwind.config.js` |
| BUG-2 | 🔴 | ⬜ | `--background: 13 13 13` não é uma cor CSS válida; em sistemas no modo claro o fundo pode ficar branco | `src/styles/global.css` | Declarar as cores em hex/oklch e remover o bloco `prefers-color-scheme` |
| BUG-3 | 🔴 | ✅ | `body { font-family: sans-serif }` sobrescrevia a Archivo, e 3 fontes eram pré-carregadas sem uso | `src/styles/global.css`, `src/fonts/fonts.ts` | Regra removida, `--font-sans` → `--font-archivo`; Inter e Roboto Mono removidas (3 → 1 preload) |
| BUG-4 | 🔴 | ✅ | Erro de TypeScript no `avatar-model.tsx` **quebrava o `next build`** (deploy falhava) | `src/screens/components/avatar-model.tsx` | Trocado por `instanceof THREE.SkinnedMesh` |
| BUG-5 | 🟡 | ⬜ | Menu de navegação vazio: o hambúrguer abre um painel vazio e o ícone de globo não faz nada | `src/screens/landingPage/header.tsx` | Preencher as âncoras ou esconder o menu |
| BUG-6 | 🟡 | ⬜ | `next lint` foi removido no Next 16 e o `.eslintrc.json` é incompatível com o ESLint 9 | `package.json`, `.eslintrc.json` | Criar `eslint.config.mjs` (flat config) e usar o script `"lint": "eslint ."` |
| BUG-7 | 🟡 | ⬜ | `nginx.conf` usa o placeholder `seusite.com` | `infra/nginx.conf` | Trocar para `sandrocarvalho.com.br` |
| BUG-8 | 🟢 | ⬜ | A OG image não carrega a Archivo (o `ImageResponse` precisa da opção `fonts`) | `src/app/opengraph-image.tsx` | Ler o `.ttf` e passar em `fonts: [...]` |
| BUG-9 | 🟢 | ⬜ | `themeColor: '#ffffff'` num site escuro | `src/app/layout.tsx` | `#0D0D0D` |
| BUG-10 | 🟢 | ⬜ | `kicking*.glb` têm 132 bytes (ponteiros de LFS quebrados) | `public/models/` | Remover |

## Melhorias

### Performance e SEO

| ID | Prio | Status | Melhoria |
|---|---|---|---|
| PERF-1 | 🔴 | ✅ | Todas as imagens migradas para `next/image` com `sizes`, AVIF/WebP e cache de 30 dias. Imagens da home: **8,2 MB → ~196 KB** |
| PERF-2 | 🔴 | ✅ | Os cards acima da dobra ficavam com `opacity-0` até o GSAP rodar (LCP preso à hidratação). Agora usam a entrada CSS `animate-card-in` (prop `aboveTheFold`) |
| PERF-3 | 🟡 | ✅ | O Pixi.js inicializa em `requestIdleCallback`, sem competir com o primeiro paint e a hidratação |
| PERF-4 | 🟡 | ✅ | O loop de partículas compara distâncias ao quadrado (antes: `Math.hypot` em cerca de 4.000 pares por frame) |
| PERF-5 | 🟢 | ✅ | `backdrop-blur-lg` removido dos cards opacos (sem efeito visual, só custo de GPU); mantido em contato e HVEX |
| PERF-6 | 🟡 | ◐ | `prefers-reduced-motion`: respeitado nas partículas e na entrada CSS; falta nas animações GSAP (float do avatar/contato, ScrollTrigger) |
| PERF-7 | 🟢 | ⬜ | As animações de float GSAP rodam mesmo fora da tela; pausar com `IntersectionObserver` |
| SEO-1 | 🟡 | ⬜ | Adicionar `app/sitemap.ts` e `app/robots.ts` |
| SEO-2 | 🟢 | ⬜ | Adicionar JSON-LD do tipo `Person` (nome, cargo, `sameAs` com LinkedIn e GitHub) |

### Código

| ID | Prio | Status | Melhoria |
|---|---|---|---|
| COD-1 | 🟡 | ⬜ | Extrair um componente `<Card variant corners>`; a pilha de camadas se repete em vários arquivos (hoje parcialmente coberta pelo `AnimatedCard`) |
| COD-2 | 🟡 | ⬜ | Remover o 3D sem uso (`Hero`, `AvatarModel`, `three`, `three-stdlib`, `@react-three/*`, cerca de 5 MB de `.glb`) ou religá-lo à página |
| COD-3 | 🟡 | ✅ | Removidas as dependências `button` e `shadcn` |
| COD-4 | 🟢 | ⬜ | Ativar `strict: true` no `tsconfig.json` |
| COD-5 | 🟢 | ⬜ | Remover imports sem uso (`content.tsx`, `current-work.tsx`), pastas vazias (`src/components`, `src/hooks`) e `header.module.css` |
| COD-6 | 🟢 | ◐ | Classes inválidas: corrigidas `xs:` (portfólio) e `trasnsition-all`; falta `text-md` |
| COD-7 | 🟢 | ⬜ | Corrigir o nome do pacote (`sandro-caarvalho`) e os acentos do conteúdo ("dinâmicas", "escaláveis", "experiência") |
| COD-8 | 🟢 | ⬜ | Corrigir os aliases do `components.json` (apontam para `@/styles/components`) |

### Acessibilidade

| ID | Prio | Status | Melhoria |
|---|---|---|---|
| A11Y-1 | 🟡 | ✅ | `alt` descritivo nas imagens de conteúdo e `alt=""` nas decorativas |
| A11Y-2 | 🟡 | ◐ | `aria-label` adicionado nos links de LinkedIn, GitHub e e-mail; falta no botão hambúrguer |
| A11Y-3 | 🟢 | ✅ | `rel="noopener noreferrer"` em todos os `target="_blank"` |
| A11Y-4 | 🟢 | ⬜ | Textos com `opacity-40` não atingem o contraste AA |

### Infra e CI

| ID | Prio | Status | Melhoria |
|---|---|---|---|
| INF-1 | 🟡 | ⬜ | Usar `output: 'standalone'` e copiar apenas `.next/standalone` + `.next/static` + `public` (imagem bem menor) |
| INF-2 | 🟡 | ⬜ | Adicionar etapas de `pnpm audit --prod`, `lint` e `tsc --noEmit` no CI antes do build. O BUG-4 teria sido pego aí |
| INF-3 | 🟡 | ⬜ | Taguear a imagem com o SHA do commit, além de `latest`, para permitir rollback |
| INF-4 | 🔴 | ✅ | Um único gerenciador (pnpm). O `yarn.lock` desatualizado fazia a produção instalar dependências vulneráveis |
| INF-5 | 🟢 | ⬜ | Remover `version:` dos compose files e a pasta duplicada `infra/infra/` |
| INF-6 | 🟢 | ⬜ | Preencher o `.dockerignore` (está vazio; `node_modules`, `.next` e `.git` entram no contexto do build) |
| INF-7 | 🟢 | ⬜ | Ativar o Dependabot/Renovate para alertas automáticos de segurança |
