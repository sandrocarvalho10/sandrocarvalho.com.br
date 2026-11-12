# Análise técnica — pontos de atenção e melhorias

Levantamento feito em 2026-11-12. Prioridade: 🔴 alta · 🟡 média · 🟢 baixa.

## Pontos de atenção (bugs e riscos)

| ID | Prio | Problema | Onde | Correção sugerida |
|---|---|---|---|---|
| BUG-1 | 🔴 | Tailwind v4 não carrega `tailwind.config.js`; `animate-rotate-bg`, `text-muted`, `border-border` e `primary` não são gerados | `src/styles/global.css` | Migrar os tokens para `@theme` (ou adicionar `@config "../../tailwind.config.js"`) |
| BUG-2 | 🔴 | `--background: 13 13 13` não é uma cor CSS válida; em sistemas no modo claro o fundo pode ficar branco | `src/styles/global.css` | Declarar as cores em hex/oklch e remover o bloco `prefers-color-scheme` |
| BUG-3 | 🔴 | `body { font-family: sans-serif }` sobrescreve a Archivo | `src/styles/global.css` | Remover a regra e mapear `--font-sans` para a Archivo |
| BUG-4 | 🟡 | Erro de TypeScript: `obj as THREE.SkinnedMesh` | `src/screens/components/avatar-model.tsx:18` | Usar `(obj as THREE.SkinnedMesh).isSkinnedMesh` ou `instanceof` |
| BUG-5 | 🟡 | Menu de navegação vazio: o hambúrguer abre um painel vazio e o ícone de globo não faz nada | `src/screens/landingPage/header.tsx` | Preencher as âncoras ou esconder o menu |
| BUG-6 | 🟡 | `next lint` foi removido no Next 16 e o `.eslintrc.json` é incompatível com o ESLint 9 | `package.json`, `.eslintrc.json` | Criar `eslint.config.mjs` (flat config) e usar o script `"lint": "eslint ."` |
| BUG-7 | 🟡 | `nginx.conf` usa o placeholder `seusite.com` | `infra/nginx.conf` | Trocar para `sandrocarvalho.com.br` |
| BUG-8 | 🟢 | A OG image não carrega a Archivo (o `ImageResponse` precisa da opção `fonts`) | `src/app/opengraph-image.tsx` | Ler o `.ttf` e passar em `fonts: [...]` |
| BUG-9 | 🟢 | `themeColor: '#ffffff'` num site escuro | `src/app/layout.tsx` | `#0D0D0D` |
| BUG-10 | 🟢 | `kicking*.glb` têm 132 bytes (ponteiros de LFS quebrados) | `public/models/` | Remover |

## Melhorias

### Código

| ID | Prio | Melhoria |
|---|---|---|
| COD-1 | 🟡 | Extrair um componente `<Card variant corners>`; a mesma pilha de camadas se repete em 6 arquivos |
| COD-2 | 🟡 | Remover o 3D sem uso (`Hero`, `AvatarModel`, `three`, `three-stdlib`, `@react-three/*`, cerca de 5 MB de `.glb`) ou religá-lo à página |
| COD-3 | 🟡 | Remover as dependências `button` e `shadcn` (o shadcn é uma CLI, deve ser usado via `npx`) |
| COD-4 | 🟢 | Ativar `strict: true` no `tsconfig.json` |
| COD-5 | 🟢 | Remover imports sem uso (`content.tsx`, `current-work.tsx`), pastas vazias (`src/components`, `src/hooks`) e `header.module.css` |
| COD-6 | 🟢 | Corrigir classes inválidas: `xs:`, `text-md`, `trasnsition-all` |
| COD-7 | 🟢 | Corrigir o nome do pacote (`sandro-caarvalho`) e os acentos do conteúdo ("dinâmicas", "escaláveis", "experiência") |
| COD-8 | 🟢 | Corrigir os aliases do `components.json` (apontam para `@/styles/components`) |

### Performance e SEO

| ID | Prio | Melhoria |
|---|---|---|
| PERF-1 | 🔴 | Trocar `<img>` por `next/image`; comprimir `juninhopersonal.png` (3,3 MB) e `mathias-imoveis.png` (3,4 MB) para AVIF/WebP |
| PERF-2 | 🟡 | Respeitar `prefers-reduced-motion` nas animações contínuas |
| SEO-1 | 🟡 | Adicionar `app/sitemap.ts` e `app/robots.ts` |
| SEO-2 | 🟢 | Adicionar JSON-LD do tipo `Person` (nome, cargo, `sameAs` com LinkedIn e GitHub) |

### Acessibilidade

| ID | Prio | Melhoria |
|---|---|---|
| A11Y-1 | 🟡 | Colocar `alt` descritivo nas imagens de conteúdo e `alt=""` nas decorativas |
| A11Y-2 | 🟡 | Adicionar `aria-label` nos botões e links que só têm ícone |
| A11Y-3 | 🟢 | Usar `rel="noopener noreferrer"` em todos os `target="_blank"` |
| A11Y-4 | 🟢 | Textos com `opacity-40` não atingem o contraste AA |

### Infra e CI

| ID | Prio | Melhoria |
|---|---|---|
| INF-1 | 🟡 | Usar `output: 'standalone'` e copiar apenas `.next/standalone` + `.next/static` + `public` (imagem bem menor) |
| INF-2 | 🟡 | Adicionar etapas de `lint` + `tsc --noEmit` no CI antes do build |
| INF-3 | 🟡 | Taguear a imagem com o SHA do commit, além de `latest`, para permitir rollback |
| INF-4 | 🟢 | Usar um único gerenciador de pacotes (o Dockerfile faz fallback entre três; o dev usa `npm`) |
| INF-5 | 🟢 | Remover `version:` dos compose files e a pasta duplicada `infra/infra/` |
| INF-6 | 🟢 | Preencher o `.dockerignore` (está vazio; `node_modules`, `.next` e `.git` entram no contexto do build) |
