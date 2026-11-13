import type { Dictionary } from ".";

export const es: Dictionary = {
  meta: {
    title: "Sandro Carvalho — Developer",
    description:
      "Portafolio de Sandro Carvalho, desarrollador Full Stack apasionado por transformar ideas en proyectos e interfaces eficientes.",
    ogLocale: "es_ES",
    ogRole: "Full Stack Developer",
    resumeTitle: "Currículum — Sandro Carvalho",
    resumeDescription:
      "Currículum de Sandro Carvalho: desarrollador front-end con más de 5 años de experiencia en React, Next.js, TypeScript y Node.js.",
  },

  nav: {
    home: "Inicio",
    projects: "Proyectos",
    resume: "Currículum",
    blog: "Blog",
    soon: "Pronto",
    downloadPdf: "Descargar PDF",
    downloadPdfHint: "Para imprimir o enviar",
    interactive: "Versión interactiva",
    interactiveHint: "Página con animaciones",
    language: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },

  hero: {
    greeting: "Hola, soy Sandro.",
    role: "Web Developer",
    title: "Apasionado por transformar ideas en proyectos e interfaces eficientes.",
    text: "Con más de 5 años de experiencia en Desarrollo Web, veo cada proyecto como una oportunidad para aprender, evolucionar y aportar valor a través del código.",
    avatarAlt: "Foto de Sandro Carvalho",
    linkedin: "LinkedIn de Sandro Carvalho",
    github: "GitHub de Sandro Carvalho",
  },

  avatar: {
    label: "Retrato de Sandro Carvalho en ASCII. Pasa el ratón o toca para ver las tecnologías con las que trabaja.",
    stack: "Stack",
  },

  currentWork: {
    titleBefore: "Actualmente trabajo en",
    text: "Construyo interfaces dinámicas, optimizadas y escalables para el sector eléctrico, ofreciendo la mejor experiencia de usuario.",
    siteText: "Ensayos, protección, monitoreo, control y gestión de activos en el sector eléctrico.",
    siteAlt: "Captura del sitio web de HVEX",
  },

  projects: {
    title: "Proyectos",
    juninho: "Sitio web de Juninho Personal",
    mathias: "Sitio web de Mathias Imóveis",
  },

  skills: {
    kicker: "Siempre buscando aprender y evolucionar...",
    title: "Actualmente estoy estudiando en curso.dev",
    text: "Estoy perfeccionando mis habilidades en React, TypeScript, Next.js y Node.js, con foco en rendimiento y escalabilidad. Además, exploro nuevas tecnologías y herramientas para mejorar mi productividad y la calidad del código.",
  },

  contact: {
    title: "Contáctame",
    text: "Escríbeme por e-mail o LinkedIn",
    linkedin: "LinkedIn de Sandro Carvalho",
    email: "Enviar un e-mail a Sandro Carvalho",
  },

  footer: {
    madeBy: "Hecho con ❤️ por Sandro",
    rights: "Todos los derechos reservados.",
  },

  resume: {
    pdfFile: "/curriculo/curriculum-sandro-carvalho.pdf",
    kicker: "Currículum",
    name: "Sandro Luis Ribeiro Carvalho",
    shortName: "Sandro Carvalho",
    role: "Desarrollador Front-End",
    location: "Itajubá - MG, Brasil",
    available: "Listo para el próximo gran proyecto",
    labels: {
      objective: "Objetivo",
      summary: "Resumen",
      experience: "Experiencia profesional",
      education: "Formación académica",
      courses: "Cursos y certificaciones",
      qualities: "Principales cualidades",
      stack: "Tecnologías",
      languages: "Idiomas",
      contact: "Contacto",
      current: "Actual",
      download: "Descargar PDF",
      highlights: "Proyectos destacados",
      hours: "Carga horaria",
      skills: "Habilidades técnicas",
      phone: "Teléfono",
    },
    stats: [
      { value: 5, suffix: "+", label: "años de experiencia" },
      { value: 4, suffix: "", label: "empresas" },
      { value: 2, suffix: "", label: "productos llevados a producción en HVEX" },
    ],
    objective:
      "Trabajar como Desarrollador en el área de tecnologías de la información, aplicando mis habilidades en React, Next.js, TypeScript, Node.js y principios sólidos de usabilidad, rendimiento y arquitectura de software. Busco contribuir con soluciones escalables e innovadoras que generen valor real para la empresa y sus usuarios.",
    summary:
      "Desarrollador con más de 5 años de experiencia creando interfaces modernas, sistemas web escalables y herramientas de alto rendimiento. Especialista en React, Next.js, TypeScript, Node.js, HTML, CSS y JavaScript, con sólida experiencia en arquitectura front-end, componentes reutilizables, integración con APIs y foco en usabilidad, accesibilidad y rendimiento. Actualmente en HVEX, liderando proyectos desde el prototipo hasta la entrega en producción. Perfil proactivo y analítico, comprometido con entregas de calidad.",
    experience: [
      {
        id: "hvex",
        company: "HVEX",
        place: "Itajubá - MG, Brasil",
        role: "Analista Desarrollador Front-End",
        period: "May 2021 — actual",
        bullets: [
          "Prototipado y desarrollo de interfaces con React y Next.js (API Routes, SSR)",
          "Creación de componentes reutilizables",
          "Optimización y diseño responsivo de páginas",
          "Integración con gráficos de alto rendimiento (ApexCharts, Observable Plot)",
          "Docker en ambas herramientas, incluida la de informes",
        ],
        highlights: [
          { name: "Shield-X", text: "Desarrollado desde la arquitectura hasta la entrega en producción." },
          { name: "Mjolnir", text: "Herramienta de generación de informes personalizados, con Puppeteer." },
        ],
      },
      {
        id: "ibc",
        company: "Instituto Brasileiro de Coaching — IBC",
        place: "",
        role: "Diseñador Web",
        period: "Abr 2019 — May 2021",
        bullets: [
          "Creación de landing pages",
          "Herramientas de Inbound Marketing",
          "Desarrollo con HTML, CSS, JavaScript, jQuery y WordPress",
          "Prototipado en Adobe XD y diseño gráfico en Photoshop e Illustrator",
        ],
        highlights: [],
      },
      {
        id: "fepi",
        company: "FEPI — Fundação de Ensino e Pesquisa de Itajubá",
        place: "Itajubá - MG, Brasil",
        role: "Pasante de Comunicación y Marketing",
        period: "Nov 2018 — Ene 2019",
        bullets: ["Creación de piezas gráficas y redes sociales", "Photoshop y CorelDRAW"],
        highlights: [],
      },
      {
        id: "support",
        company: "Support Informática",
        place: "Itajubá - MG, Brasil",
        role: "Pasante de Desarrollo",
        period: "Sep 2017 — Mar 2018",
        bullets: [
          "Desarrollo con HTML, CSS, JavaScript, jQuery, PHP y MySQL",
          "Panel administrativo para un cliente",
        ],
        highlights: [],
      },
    ],
    education: [
      { title: "Licenciatura en Sistemas de Información", school: "Centro Universitário de Itajubá — FEPI", period: "2015 — 2020" },
      { title: "Técnico en Informática", school: "E.E. Comendador Mário Goulart Santiago", period: "2012 — 2014" },
    ],
    courses: [
      { title: "curso.dev", provider: "", detail: "En curso" },
      { title: "React: Hooks, Contextos y buenas prácticas", provider: "Alura", detail: "8h · 2024" },
      { title: "React: Automatizando pruebas en aplicaciones front-end", provider: "Alura", detail: "6h · 2023" },
      { title: "React: Ciclo de vida de los componentes", provider: "Alura", detail: "6h · 2023" },
      { title: "Next.js: Primera inmersión en el framework", provider: "Alura", detail: "6h · 2023" },
      { title: "JavaScript: Programación Orientada a Objetos", provider: "Alura", detail: "6h · 2022" },
    ],
    stackGroups: {
      frontend: "Front-end",
      state: "Estado y datos",
      ui: "Estilos, animación y gráficos",
      forms: "Formularios y validación",
      devops: "Infraestructura y versionado",
      tooling: "Herramientas y proceso",
    },
    qualities: [
      "Gran atención al detalle y a la usabilidad",
      "Trabajo en equipo y comunicación clara",
      "Proactividad y sentido de responsabilidad",
      "Compromiso con la calidad, los plazos y la mejora continua",
      "Pasión por el desarrollo y la innovación",
      "Razonamiento lógico y autonomía para resolver problemas",
    ],
    languages: [
      { name: "Portugués", level: "Nativo" },
      { name: "Inglés", level: "Lectura intermedia, comprensión básica; conversación en desarrollo" },
    ],
  },
};
