/**
 * Tecnologias da home: 8 em destaque + o restante agrupado por categoria.
 * Itens são slugs do sprite public/icons/tech.svg (ver tech-icons.ts).
 */

export const FEATURED_TECH = [
  "react",
  "nextdotjs",
  "typescript",
  "javascript",
  "tailwindcss",
  "nodedotjs",
  "reactquery",
  "docker",
] as const;

export type TechGroupId = "frontend" | "data" | "testing" | "tooling";

export const TECH_GROUPS: Record<TechGroupId, string[]> = {
  frontend: ["html5", "css", "sass", "shadcnui", "radixui", "gsap", "framer", "storybook"],
  data: ["zustand", "redux", "reacthookform", "zod"],
  testing: ["jest", "vitest"],
  tooling: ["git", "github", "githubactions", "vercel", "linux", "vite", "pnpm", "eslint", "figma"],
};

/**
 * TODO: confirmar antes de voltar a exibir. Não aparecem no currículo nem nos
 * projetos, por isso saíram da home. Para reexibir, mova o slug para um grupo.
 */
export const TECH_TO_CONFIRM = ["graphql", "prisma", "postgresql", "cypress", "threedotjs", "nginx"] as const;
