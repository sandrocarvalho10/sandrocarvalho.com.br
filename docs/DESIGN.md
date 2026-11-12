# DESIGN.md — sandrocarvalho.com.br

Documento de design do portfólio pessoal de Sandro Carvalho. Descreve a linguagem visual, os tokens, os componentes e as regras de composição **como estão implementados hoje**, e marca com ⚠️ onde o código diverge do que se pretende.

---

## 1. Conceito

**Bento grid escuro com cards "folha".** A página é uma sequência vertical de linhas (sections), cada uma com 2 cards lado a lado no desktop e empilhados no mobile. O fundo é quase preto; a cor vem dos cards, cada um com uma "temperatura" própria:

| Família | Uso | Sensação |
|---|---|---|
| **Neutro escuro** (`#131311`) | Apresentação, Skills | Sóbrio, texto em destaque |
| **Quente** (laranja → dourado) | Avatar, Contato, OG image | Pessoal, convite |
| **Frio** (azul / ciano / navy) | Trabalho atual (HVEX), Portfólio | Profissional, técnico |

Tom de voz: primeira pessoa, pt-BR, frases curtas, tipografia leve (pesos `extralight`/`light`) em tamanhos grandes.

---

## 2. Tokens

### 2.1 Cores

**Base**

| Token | Valor | Onde |
|---|---|---|
| `background` | `#0D0D0D` (dark: `#0A0A0A`) | `body` |
| `foreground` | `#EAEAEA` (dark: `#EDEDED`) | texto padrão |
| `surface` | `#131311` | fundo dos cards neutros |
| `surface-border` | `rgba(255,255,255,0.05)` (`border-white/5`) | borda de todos os cards |
| `muted` | `#9CA3AF` | ícones/links do header |

**Gradiente quente** (avatar, contato, OG)

```
#FF6F00 → #FF8C00 → #FFA500/#FFAA00 → #FFC000 → #FFD700
```
- Card Avatar: anéis concêntricos (radial com stops duros a cada 20%), centro em `50% 100%`, opacidade 0.7.
- Card Contato: `bg-linear-to-br from-orange-600/70 to-amber-400/70`.
- Brilho de sobreposição: `radial-gradient(circle at 50% 100%, rgba(255,215,0,.4), transparent 70%)` com `mix-blend-mode: overlay`.

**Gradiente frio** (portfólio)

```
#00BFFF → #1E90FF → #4169E1 → #6495ED → #7B68EE
```
Mesmos anéis concêntricos do card Avatar, brilho `rgba(0,191,255,.4)`.

**HVEX (navy/ciano)**

| Token | Valor |
|---|---|
| fundo | `#051824` → `#041E36` (90–95%) |
| glow 1 | `cyan-500/30`, blur 120px, canto sup. esq. |
| glow 2 | `blue-600/30`, blur 120px, canto inf. dir. |
| banner | `/images/banner2k.avif` + `from-blue-900/40 to-blue-400/90` |

**Marcas de terceiros (hover)**

| Marca | Cor |
|---|---|
| LinkedIn | `#0A66C2` |
| GitHub | `#000000` |
| E-mail | `#1593DF` sobre branco |

> ⚠️ `tailwind.config.js` define `primary = #4ADE80` (verde), mas nenhum componente usa verde. A cor de destaque real do site é o **laranja/dourado**. Ver §7.

### 2.2 Tipografia

- **Família:** Archivo (Google Fonts via `next/font`), pesos 100–700, exposta como `--font-archivo` / `font-sans`. É a única fonte do site.
- **Escala usada:**

| Papel | Mobile | Desktop | Peso | Line-height |
|---|---|---|---|---|
| Display (headline do About) | `text-3xl` | `text-5xl` | light | `leading-16` |
| Título de card | `text-2xl` | `text-3xl`/`text-4xl` | light/normal | `leading-10`/`12` |
| Título de contato | `text-3xl` | `text-3xl` | medium | — |
| Corpo | `text-base` | `text-lg` | extralight | `leading-8`/`10` (generoso) |
| Logo | `text-2xl` | `text-2xl` | bold + extralight 50% | — |
| Legenda | `text-sm` | `text-sm` | light, opacidade 40% | — |

- **Regra:** contraste por peso e opacidade, não por cor. Destaques dentro de frases usam `font-bold text-white` (ex.: "**HVEX**").
- Largura de leitura limitada com `max-w-[60%]`–`[90%]` no desktop, `max-w-full` no mobile.

### 2.3 Raios — o "card folha"

Assinatura visual do site: cantos assimétricos. Base `rounded-[2rem]`, **um ou dois cantos em `50px`** e **o canto oposto "fechado" em `rounded-lg`/`rounded-sm`**. Os cantos fechados apontam para o centro do grid, formando um encaixe entre os cards vizinhos.

| Card | Cantos 50px | Canto fechado |
|---|---|---|
| About (esq.) | top-right | bottom-right |
| Avatar (dir.) | top-left, bottom-right | bottom-left |
| Current Work (esq.) | top-left, top-right, bottom-left | bottom-right |
| HVEX (dir.) | top-left, top-right, bottom-right | bottom-left |
| Skills (esq.) | bottom-left | top-right |
| Contato (dir.) | top-right | top-left |
| Portfólio | 2rem uniforme | — |

Botões de ícone: `rounded-md` (LinkedIn no About), `rounded-full` (GitHub, seta HVEX), `rounded-none` (contato).

### 2.4 Espaçamento e layout

- Container de conteúdo: `max-w-7xl` (sections) / `max-w-5xl` (header, footer, cards).
- Gutter lateral da página: `px-4`. Gap entre sections: `gap-8`.
- Gap entre cards: `gap-4` mobile, `md:gap-8` desktop.
- Padding interno dos cards: `p-6` mobile, `md:p-12` desktop (contato: `p-4`).
- Altura mínima dos cards: `min-h-[400px]` (HVEX `md:min-h-[560px]`, portfólio `aspect-video`).
- Breakpoint único: `md` (768px). Abaixo dele tudo é 1 coluna.

### 2.5 Efeitos

| Efeito | Implementação |
|---|---|
| Partículas | Canvas Pixi.js fixo atrás da página (`ParticleBackground`): pontos âmbar/verde/azul ligados por linhas finas quando próximos, repelidos pelo cursor, opacidade 70% |
| Entrada de card | Fade + subida de 32px + scale 0.98 → 1, 0.9s. Acima da dobra: CSS `animate-card-in`; abaixo: GSAP + ScrollTrigger (`top 88%`) |
| Tilt 3D | `AnimatedCard`: rotação de até ±4° seguindo o cursor, `perspective: 1400px` |
| Spotlight | Radial de 480px na cor `glowColor` do card (8% de alfa) seguindo o cursor + anel de borda no hover |
| Float | Avatar e contato flutuam de 8 a 18px em `sine.inOut`, cerca de 3s, yoyo infinito (GSAP) |
| Vidro | `backdrop-blur-lg` **só em cards translúcidos** (contato, HVEX), onde as partículas aparecem por trás. Em cards opacos não tem efeito: usar `isolate` |
| Fundo girando | imagem 1010×1010 centralizada, `animate-rotate-bg` (4s linear infinite, acelera para 1,6s no hover), opacidade 60% |
| Glow de imagem | `drop-shadow(0 0 15px rgba(255,215,0,.6))` (quente) / `rgba(0,191,255,.6)` (frio) |
| Logo 3D | `perspective-[800px]` + `rotate-x-[65deg] rotate-z-[-15deg]`, opacidade 30% |
| Hover de ícone | troca de `bg` para a cor da marca + `fill-white`, `duration-200 ease-in` |
| Hover de link | `opacity-80 → 100`, `duration-300` |

`animate-rotate-bg` fica no `@theme` do `global.css` e é desativada com `prefers-reduced-motion`.

**Cor de glow por card** (`glowColor` do `AnimatedCard`, formato `"r, g, b"`):

| Card | glowColor |
|---|---|
| About | `245, 179, 76` (âmbar) |
| Avatar | `255, 200, 40` (dourado) |
| Contato | `251, 146, 60` (laranja) |
| Skills | `74, 222, 128` (verde) |
| Portfólio | `56, 189, 248` (azul-céu) |

---

## 3. Grid da página

```
┌──────────────────────── Header (logo · globe) ────────────────────────┐
├────────────────────────────────────────────┬──────────────────────────┤
│ About — CardAnimated            (3fr)      │ CardAnimatedAvatar (1fr) │
├────────────────────────┬───────────────────┴──────────────────────────┤
│ CardCurrentWork (4fr)  │ CardCurrentWorkPortfolio — HVEX       (5fr)  │
├────────────────────────┴──────────┬───────────────────────────────────┤
│ CardPortfolio (1fr)               │ CardPortfolio (1fr)               │
├───────────────────────────────────┴────────────┬──────────────────────┤
│ CardSkills                         (3fr)       │ ContactMe      (1fr) │
├────────────────────────────────────────────────┴──────────────────────┤
│                      Footer (© ano · créditos)                        │
└───────────────────────────────────────────────────────────────────────┘
```

Ritmo de proporções: `3:1 → 4:5 → 1:1 → 3:1`. A alternância evita que as linhas fiquem com o mesmo peso visual.

---

## 4. Componentes

| Componente | Arquivo | Função | Família |
|---|---|---|---|
| `Header` | `screens/landingPage/header.tsx` | Logo "Sandro, Developer_" + nav (vazia) + menu mobile | — |
| `CardAnimated` | `screens/components/card-animated.tsx` | Apresentação: avatar, nome, redes, headline e bio | Neutro + fundo girando |
| `CardAnimatedAvatar` | `card-animated-avatar.tsx` | Ilustração do avatar sobre anéis dourados | Quente |
| `CardCurrentWork` | `card-current-work.tsx` | "Atualmente trabalhando na HVEX" + logo em perspectiva | Frio (banner) |
| `CardCurrentWorkPortfolio` | `card-current-work.tsx` | Link hvex.com.br + screenshot do site | Navy/ciano |
| `CardPortfolio` | `card-portfolio.tsx` | Screenshot de projeto sobre anéis azuis | Frio |
| `CardSkills` | `card-skills.tsx` | Aprendizado atual (curso.dev) | Neutro + fundo girando |
| `CardAnimatedContactMe` | `card-animated-contact-me.tsx` | CTA de contato: LinkedIn + e-mail | Quente |
| `Footer` | `screens/components/footer.tsx` | Créditos e ano | — |
| `AnimatedCard` | `animated-card.tsx` | Wrapper de interação: entrada, tilt, spotlight. Props: `glowColor`, `tiltStrength`, `aboveTheFold` | — |
| `ParticleBackground` | `particle-background.tsx` | Fundo de partículas em WebGL, montado no `layout.tsx` | — |
| `Hero` *(não usado)* | `screens/landingPage/hero.tsx` | Avatar 3D (R3F) girando com morph de sorriso | Quente |

### Anatomia comum de um card

```
<AnimatedCard glowColor="r, g, b" [aboveTheFold]
     className="relative overflow-hidden rounded-[2rem] + cantos folha
                border border-white/5 p-6 md:p-12 min-h-[400px]
                [backdrop-blur-lg só se o fundo for translúcido]">
  ├─ camada z-0   : gradiente / imagem de fundo
  ├─ camada z-1   : brilho overlay (mix-blend-overlay)
  ├─ camada z-20  : ilustração/screenshot (pointer-events-none)
  ├─ camada z-30  : conteúdo (texto, links)
  └─ camada z-40  : spotlight + anel de borda (injetados pelo AnimatedCard)
</AnimatedCard>
```

Todo card novo deve seguir essa pilha de camadas. Use `aboveTheFold` **somente** nos cards visíveis sem rolar a página (hoje, a linha About); assim eles aparecem sem esperar o JavaScript.

---

## 5. Imagem e mídia

**Regra:** toda imagem usa `next/image`, nunca `<img>`. Com tamanho fixo, informe `width`/`height` do arquivo original; dentro de um container, use `fill` + `sizes` com a largura real exibida em cada breakpoint. Somente a imagem principal acima da dobra (`avatar1.png`) recebe `preload`. Imagens decorativas usam `alt=""`; as de conteúdo, um `alt` descritivo.

- Ilustrações do avatar em PNG com fundo transparente, ancoradas no **rodapé** do card (`bottom-0`), saindo levemente da borda (`-right-4 -bottom-2`).
- Screenshots de projeto: `object-cover object-top`, com `rounded-t-[2rem]` quando "saem" pela base do card (`-mb-12`).
- OG image (`app/opengraph-image.tsx`): 1200×630, gradiente quente 135°, círculos decorativos translúcidos, headline 44px/800, avatar à direita.

---

## 6. Acessibilidade e conteúdo

- Idioma `pt-br` no `<html>`.
- Contraste: texto `#EAEAEA` sobre `#131311` passa AA; textos com `opacity-40` (legendas, ícones do header) **não passam** e devem ficar restritos a conteúdo decorativo.
- Todo link externo usa `target="_blank"` + `rel="noopener noreferrer"`.
- Botões e links só com ícone têm `aria-label` (falta no hambúrguer do header).
- Imagens de conteúdo têm `alt` descritivo; imagens decorativas usam `alt=""`.
- `prefers-reduced-motion`: as partículas ficam estáticas e a entrada CSS é desativada (`motion-reduce:animate-none`). Ainda falta nas animações GSAP (float e ScrollTrigger).

---

## 7. Dívidas de design (a corrigir)

1. **Tokens em dois lugares e no formato errado.** `global.css` declara `--background: 13 13 13` (formato de canais do Tailwind v3), que é cor inválida no v4; só funciona quando o SO está em modo escuro, porque aí o valor vira `#0a0a0a`. Em SO claro, o fundo pode ficar branco. → Migrar todos os tokens para `@theme` em hex/oklch e remover o `tailwind.config.js` (ou carregá-lo com `@config`).
2. **`primary` verde órfão.** Trocar por laranja (`#FF8C00`) para casar com a identidade real e com o `msapplication-TileColor`.
3. ~~**Fonte sobrescrita.**~~ Resolvido: a Archivo é aplicada via `--font-archivo`.
4. **`themeColor: #ffffff`** num site escuro: usar `#0D0D0D`.
5. **Cores hardcoded repetidas** (`#131311`, gradientes radiais inline) → criar tokens `--color-surface`, `--gradient-warm`, `--gradient-cool`.
6. **Card base.** A pilha de camadas (§4) se repete em 6 arquivos → extrair um `<Card variant="neutral|warm|cool|navy" corners="...">`.
7. **Classes inexistentes:** `xs:` (não há breakpoint `xs`), `text-md`, `trasnsition-all` (typo).
