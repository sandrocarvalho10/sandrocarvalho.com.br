/**
 * Partes do currículo que não mudam com o idioma: contatos, datas e stacks.
 * Os textos traduzidos ficam em `dictionaries/*.ts` (chave `resume`), ligados
 * a estes dados pelo mesmo `id`.
 *
 * Itens de stack: se for um slug do sprite (ver tech-icons.ts) vira ícone +
 * nome da marca; senão aparece só o texto.
 */

export const RESUME_CONTACT = {
  email: "sandro.luiz97@outlook.com",
  linkedin: "https://www.linkedin.com/in/sandro-carvalho-dev/",
  linkedinLabel: "linkedin.com/in/sandro-carvalho-dev",
  github: "https://github.com/sandrocarvalho10",
  githubLabel: "github.com/sandrocarvalho10",
};

/**
 * Telefone: só no PDF. Não vai no HTML da página pública (evita robôs de
 * spam); é inserido no cliente apenas na versão de impressão (PrintPhone).
 * Guardado em partes para não aparecer inteiro no código-fonte servido.
 */
export const RESUME_PHONE_PARTS = ["(35)", "98867", "0983"] as const;

export type ExperienceId = "hvex" | "hvex-analyst" | "ibc" | "fepi" | "support";

const HVEX_STACK = [
  "react", "nextdotjs", "typescript", "zustand", "Context API", "reactquery",
  "reacthookform", "zod", "Yup", "gsap", "ApexCharts", "observable", "puppeteer", "docker",
];

// start/end em MM/AAAA: formato que os ATS (triagem automática) reconhecem
export const EXPERIENCE_DATA: Record<
  ExperienceId,
  { current?: boolean; start: string; end?: string; glow: string; stack: string[] }
> = {
  hvex: {
    current: true,
    start: "06/2026",
    glow: "56, 189, 248",
    stack: HVEX_STACK, // TODO: confirmar se a stack do cargo Pleno é a mesma
  },
  "hvex-analyst": {
    start: "05/2021",
    end: "06/2026",
    glow: "56, 189, 248",
    stack: HVEX_STACK,
  },
  ibc: {
    start: "04/2019",
    end: "05/2021",
    glow: "245, 179, 76",
    stack: ["html5", "css", "javascript", "jquery", "wordpress", "Adobe XD", "Photoshop", "Illustrator"],
  },
  fepi: {
    start: "11/2018",
    end: "01/2019",
    glow: "236, 72, 153",
    stack: ["Photoshop", "coreldraw"],
  },
  support: {
    start: "09/2017",
    end: "03/2018",
    glow: "74, 222, 128",
    stack: ["html5", "css", "javascript", "jquery", "php", "mysql"],
  },
};

export type StackGroupId = "frontend" | "state" | "ui" | "forms" | "devops" | "tooling";

export const STACK_GROUPS: Record<StackGroupId, string[]> = {
  frontend: ["react", "nextdotjs", "javascript", "typescript", "html5", "css", "nodedotjs", "API Routes", "SSR"],
  state: ["zustand", "Context API", "reactquery"],
  ui: ["tailwindcss", "sass", "styledcomponents", "gsap", "ApexCharts", "observable"],
  forms: ["reacthookform", "zod", "Yup"],
  devops: ["docker", "Docker Compose", "git", "github", "gitlab"],
  tooling: ["storybook", "Design Systems", "vite", "webpack", "Scrum"],
};
