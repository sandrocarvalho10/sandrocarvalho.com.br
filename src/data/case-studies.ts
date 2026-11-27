import type { Localized } from "./projects";

/**
 * Estudos de caso (página /projetos/<slug>). Os títulos das seções ficam nos
 * dicionários (`caseStudy.sections`); aqui fica só o conteúdo.
 *
 * Cada seção é uma lista de parágrafos. Pendências usam `[TODO: ...]`.
 * NÃO preencha com números que não possam ser comprovados.
 */

export type CaseStudySectionId = "context" | "challenge" | "role" | "architecture" | "results";

export interface CaseStudy {
  slug: string;
  name: string;
  /** Resumo de 1 linha (card na home + meta description) */
  summary: Localized;
  sections: Record<CaseStudySectionId, Localized[]>;
  /** Slugs do sprite ou texto livre */
  stack: string[];
}

export const SHIELD_X: CaseStudy = {
  slug: "shield-x",
  name: "Shield-X",
  summary: {
    pt: "Plataforma da HVEX para o setor elétrico que desenvolvi da arquitetura até a entrega em produção.",
    en: "HVEX platform for the electric power sector that I built from architecture to production.",
    es: "Plataforma de HVEX para el sector eléctrico que desarrollé desde la arquitectura hasta la entrega en producción.",
  },
  sections: {
    context: [
      {
        pt: "[TODO: o que é o Shield-X, para quem ele foi feito e em que momento da HVEX ele surgiu]",
        en: "[TODO: what Shield-X is, who it is for and when it started at HVEX]",
        es: "[TODO: qué es Shield-X, para quién fue hecho y en qué momento de HVEX surgió]",
      },
    ],
    challenge: [
      {
        pt: "[TODO: qual problema precisava ser resolvido e quais eram as restrições (prazo, volume de dados, equipe)]",
        en: "[TODO: which problem had to be solved and what the constraints were (deadline, data volume, team)]",
        es: "[TODO: qué problema había que resolver y cuáles eran las restricciones (plazo, volumen de datos, equipo)]",
      },
    ],
    role: [
      {
        pt: "[TODO: o que você fez de ponta a ponta: prototipação, arquitetura front-end, componentes, integração com APIs, deploy]",
        en: "[TODO: what you did end to end: prototyping, front-end architecture, components, API integration, deploy]",
        es: "[TODO: qué hiciste de punta a punta: prototipado, arquitectura front-end, componentes, integración con APIs, deploy]",
      },
    ],
    architecture: [
      {
        pt: "[TODO: principais decisões e por quê (ex.: Next.js com SSR/API Routes, gerenciamento de estado, biblioteca de gráficos, containerização com Docker)]",
        en: "[TODO: key decisions and why (e.g. Next.js with SSR/API Routes, state management, chart library, Docker containerization)]",
        es: "[TODO: decisiones principales y por qué (ej.: Next.js con SSR/API Routes, gestión de estado, librería de gráficos, contenedorización con Docker)]",
      },
    ],
    results: [
      {
        pt: "[TODO: resultados com métricas reais (ex.: usuários, tempo de carregamento, tempo economizado). Não preencher sem dados]",
        en: "[TODO: results with real metrics (e.g. users, load time, time saved). Leave empty without data]",
        es: "[TODO: resultados con métricas reales (ej.: usuarios, tiempo de carga, tiempo ahorrado). No completar sin datos]",
      },
    ],
  },
  // TODO: confirmar a stack exata do Shield-X (hoje: a stack da HVEX no currículo)
  stack: ["react", "nextdotjs", "typescript", "docker"],
};
