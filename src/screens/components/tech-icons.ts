// Tecnologias exibidas no slider do card do avatar.
// Os desenhos ficam no sprite public/icons/tech.svg (Simple Icons v16.37.0,
// licença CC0-1.0; Zustand é um ícone próprio). Cores quase pretas viraram
// branco para aparecer no fundo escuro.

export interface TechIcon {
  /** id do <symbol> no sprite */
  slug: string;
  title: string;
  /** Cor da marca, sem # */
  hex: string;
}

export const TECH_ICONS: TechIcon[] = [
  { slug: "nextdotjs", title: "Next.js", hex: "FFFFFF" },
  { slug: "react", title: "React", hex: "61DAFB" },
  { slug: "typescript", title: "TypeScript", hex: "3178C6" },
  { slug: "javascript", title: "JavaScript", hex: "F7DF1E" },
  { slug: "html5", title: "HTML5", hex: "E34F26" },
  { slug: "css", title: "CSS", hex: "663399" },
  { slug: "tailwindcss", title: "Tailwind CSS", hex: "06B6D4" },
  { slug: "sass", title: "Sass", hex: "CC6699" },
  { slug: "nodedotjs", title: "Node.js", hex: "5FA04E" },
  { slug: "docker", title: "Docker", hex: "2496ED" },
  { slug: "zod", title: "Zod", hex: "408AFF" },
  { slug: "zustand", title: "Zustand", hex: "A0703F" },
  { slug: "vercel", title: "Vercel", hex: "FFFFFF" },
  { slug: "linux", title: "Linux", hex: "FCC624" },
  { slug: "git", title: "Git", hex: "F03C2E" },
  { slug: "github", title: "GitHub", hex: "FFFFFF" },
  { slug: "vite", title: "Vite", hex: "9135FF" },
  { slug: "figma", title: "Figma", hex: "F24E1E" },
  { slug: "redux", title: "Redux", hex: "764ABC" },
  { slug: "reactquery", title: "React Query", hex: "FF4154" },
  { slug: "reacthookform", title: "React Hook Form", hex: "EC5990" },
  { slug: "shadcnui", title: "shadcn/ui", hex: "FFFFFF" },
  { slug: "radixui", title: "Radix UI", hex: "FFFFFF" },
  { slug: "storybook", title: "Storybook", hex: "FF4785" },
  { slug: "vitest", title: "Vitest", hex: "00FF74" },
  { slug: "jest", title: "Jest", hex: "C21325" },
  { slug: "cypress", title: "Cypress", hex: "69D3A7" },
  { slug: "graphql", title: "GraphQL", hex: "E10098" },
  { slug: "prisma", title: "Prisma", hex: "2D3748" },
  { slug: "postgresql", title: "PostgreSQL", hex: "4169E1" },
  { slug: "framer", title: "Framer", hex: "0055FF" },
  { slug: "gsap", title: "GSAP", hex: "0AE448" },
  { slug: "threedotjs", title: "Three.js", hex: "FFFFFF" },
  { slug: "pnpm", title: "pnpm", hex: "F69220" },
  { slug: "eslint", title: "ESLint", hex: "4B32C3" },
  { slug: "nginx", title: "NGINX", hex: "009639" },
  { slug: "githubactions", title: "GitHub Actions", hex: "2088FF" },
];

/**
 * Ícones que existem no sprite mas não passam no slider: usados no currículo
 * (experiências antigas e ferramentas específicas). Mesma regra de cor.
 */
export const EXTRA_TECH_ICONS: TechIcon[] = [
  { slug: "puppeteer", title: "Puppeteer", hex: "40B5A4" },
  { slug: "styledcomponents", title: "styled-components", hex: "DB7093" },
  { slug: "gitlab", title: "GitLab", hex: "FC6D26" },
  { slug: "webpack", title: "Webpack", hex: "8DD6F9" },
  { slug: "jquery", title: "jQuery", hex: "0769AD" },
  { slug: "wordpress", title: "WordPress", hex: "21759B" },
  { slug: "php", title: "PHP", hex: "777BB4" },
  { slug: "mysql", title: "MySQL", hex: "4479A1" },
  { slug: "observable", title: "Observable Plot", hex: "FFFFFF" },
  { slug: "coreldraw", title: "CorelDRAW", hex: "FFFFFF" },
];

const BY_SLUG = new Map([...TECH_ICONS, ...EXTRA_TECH_ICONS].map((i) => [i.slug, i]));

/** Busca um ícone pelo slug do sprite (undefined se não houver desenho). */
export function techIcon(slug: string): TechIcon | undefined {
  return BY_SLUG.get(slug);
}
