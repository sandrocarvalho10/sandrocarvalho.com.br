/**
 * Textos em português (idioma padrão). `en.ts` e `es.ts` seguem exatamente
 * a mesma forma: o tipo `Dictionary` é derivado deste arquivo.
 */
export const pt = {
  meta: {
    title: "Sandro Carvalho — Developer",
    description:
      "Portfolio de Sandro Carvalho, desenvolvedor Full Stack apaixonado por transformar ideias em projetos e interfaces eficientes.",
    ogLocale: "pt_BR",
    ogRole: "Full Stack Developer",
    resumeTitle: "Currículo — Sandro Carvalho",
    resumeDescription:
      "Currículo de Sandro Carvalho: desenvolvedor front-end com mais de 5 anos de experiência em React, Next.js, TypeScript e Node.js.",
  },

  nav: {
    home: "Início",
    projects: "Projetos",
    resume: "Currículo",
    blog: "Blog",
    soon: "Em breve",
    downloadPdf: "Download PDF",
    downloadPdfHint: "Para imprimir ou enviar",
    interactive: "Versão interativa",
    interactiveHint: "Página com animações",
    language: "Idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },

  hero: {
    greeting: "Olá, Eu sou Sandro.",
    role: "Web Developer",
    title: "Apaixonado por transformar ideias em projetos e interfaces eficientes.",
    text: "Com mais de 5 anos de experiência em Desenvolvimento Web, encaro cada projeto como uma chance de aprender, evoluir e entregar valor através do código.",
    avatarAlt: "Foto de Sandro Carvalho",
    linkedin: "LinkedIn de Sandro Carvalho",
    github: "GitHub de Sandro Carvalho",
  },

  avatar: {
    label: "Retrato de Sandro Carvalho em ASCII. Passe o mouse ou toque para ver as tecnologias com que trabalha.",
    stack: "Stack",
  },

  currentWork: {
    titleBefore: "Atualmente estou trabalhando na",
    text: "Estou construindo interfaces dinâmicas, otimizadas e escaláveis para o setor elétrico, promovendo a melhor experiência de usuário.",
    siteText: "Ensaios, proteção, monitoramento, controle e gestão de ativos no setor elétrico.",
    siteAlt: "Screenshot do site da HVEX",
  },

  projects: {
    title: "Projetos",
    juninho: "Site do Juninho Personal",
    mathias: "Site da Mathias Imóveis",
  },

  skills: {
    kicker: "Sempre procurando aprender e evoluir...",
    title: "Atualmente eu estou aprendendo no curso.dev",
    text: "Estou aprimorando minhas habilidades em React, TypeScript e Next.js, Node.js com foco em performance e escalabilidade. Além disso, estou explorando novas tecnologias e ferramentas para melhorar minha produtividade e qualidade de código.",
  },

  contact: {
    title: "Contate-me",
    text: "Entre em contato via e-mail ou linkedin",
    linkedin: "LinkedIn de Sandro Carvalho",
    email: "Enviar e-mail para Sandro Carvalho",
  },

  footer: {
    madeBy: "Desenvolvido com ❤️ por Sandro",
    rights: "Todos os direitos reservados.",
  },

  resume: {
    pdfFile: "/curriculo/curriculo-sandro-carvalho.pdf",
    kicker: "Currículo",
    name: "Sandro Luis Ribeiro Carvalho",
    shortName: "Sandro Carvalho",
    role: "Desenvolvedor Front-End",
    location: "Itajubá - MG, Brasil",
    available: "Pronto para o próximo grande projeto",
    labels: {
      objective: "Objetivo",
      summary: "Resumo",
      experience: "Experiência profissional",
      education: "Formação acadêmica",
      courses: "Cursos e qualificações",
      qualities: "Principais qualidades",
      stack: "Tecnologias",
      languages: "Idiomas",
      contact: "Contato",
      current: "Atual",
      download: "Baixar PDF",
      highlights: "Projetos de destaque",
      hours: "Carga horária",
      skills: "Habilidades técnicas",
      phone: "Telefone",
    },
    stats: [
      { value: 5, suffix: "+", label: "anos de experiência" },
      { value: 4, suffix: "", label: "empresas" },
      { value: 2, suffix: "", label: "produtos levados à produção na HVEX" },
    ],
    objective:
      "Atuar como Desenvolvedor na área de tecnologia da informação, aplicando minhas habilidades em React, Next.js, TypeScript, Node.js e princípios sólidos de usabilidade, performance e arquitetura de software. Busco contribuir com soluções escaláveis e inovadoras que gerem valor real para a empresa e seus usuários.",
    summary:
      "Desenvolvedor com mais de 5 anos de experiência no desenvolvimento de interfaces modernas, sistemas web escaláveis e ferramentas de alto desempenho. Especialista em React, Next.js, TypeScript, Node.js, HTML, CSS e JavaScript, com experiência sólida em arquitetura front-end, componentes reutilizáveis, integração com APIs e foco em usabilidade, acessibilidade e performance. Atualmente na HVEX, liderando projetos da prototipação à entrega em produção. Perfil proativo, analítico e comprometido com entregas de qualidade.",
    experience: [
      {
        id: "hvex",
        company: "HVEX",
        place: "Itajubá - MG",
        role: "Analista Desenvolvedor Front-End",
        period: "Mai 2021 — atual",
        bullets: [
          "Prototipação e desenvolvimento de interfaces com React e Next.js (API Routes, SSR)",
          "Criação de componentes reutilizáveis",
          "Otimização e responsividade de páginas",
          "Integração com gráficos de alta performance (ApexCharts, Observable Plot)",
          "Docker nas duas ferramentas, inclusive na de relatórios",
        ],
        highlights: [
          { name: "Shield-X", text: "Desenvolvido da arquitetura até a entrega em produção." },
          { name: "Mjolnir", text: "Ferramenta de geração de relatórios customizados, com Puppeteer." },
        ],
      },
      {
        id: "ibc",
        company: "Instituto Brasileiro de Coaching — IBC",
        place: "",
        role: "Web Designer",
        period: "Abr 2019 — Mai 2021",
        bullets: [
          "Criação de landing pages",
          "Ferramentas de Inbound Marketing",
          "Desenvolvimento com HTML, CSS, JavaScript, jQuery e WordPress",
          "Prototipação com Adobe XD e design gráfico com Photoshop e Illustrator",
        ],
        highlights: [],
      },
      {
        id: "fepi",
        company: "FEPI — Fundação de Ensino e Pesquisa de Itajubá",
        place: "Itajubá - MG",
        role: "Estagiário de Comunicação e Marketing",
        period: "Nov 2018 — Jan 2019",
        bullets: ["Criação de artes e mídias sociais", "Photoshop e CorelDRAW"],
        highlights: [],
      },
      {
        id: "support",
        company: "Support Informática",
        place: "Itajubá - MG",
        role: "Estagiário de Desenvolvimento",
        period: "Set 2017 — Mar 2018",
        bullets: [
          "Desenvolvimento com HTML, CSS, JavaScript, jQuery, PHP e MySQL",
          "Painel administrativo para cliente",
        ],
        highlights: [],
      },
    ],
    education: [
      { title: "Bacharelado em Sistemas de Informação", school: "Centro Universitário de Itajubá — FEPI", period: "2015 — 2020" },
      { title: "Técnico em Informática", school: "E.E. Comendador Mário Goulart Santiago", period: "2012 — 2014" },
    ],
    courses: [
      { title: "curso.dev", provider: "", detail: "Em andamento" },
      { title: "React: Hooks, Contextos e boas práticas", provider: "Alura", detail: "8h · 2024" },
      { title: "React: Automatizando os testes em aplicações front-end", provider: "Alura", detail: "6h · 2023" },
      { title: "React: Ciclo de vida dos componentes", provider: "Alura", detail: "6h · 2023" },
      { title: "Next.js: Primeiro mergulho no framework", provider: "Alura", detail: "6h · 2023" },
      { title: "JavaScript: Programando a Orientação a Objetos", provider: "Alura", detail: "6h · 2022" },
    ],
    stackGroups: {
      frontend: "Front-end",
      state: "Estado e dados",
      ui: "Estilo, animação e gráficos",
      forms: "Formulários e validação",
      devops: "Infra e versionamento",
      tooling: "Ferramentas e processo",
    },
    qualities: [
      "Forte atenção aos detalhes e à usabilidade",
      "Trabalho em equipe e comunicação clara",
      "Proatividade e senso de responsabilidade",
      "Compromisso com qualidade, prazos e melhoria contínua",
      "Paixão por desenvolvimento e inovação",
      "Raciocínio lógico e autonomia para resolver problemas",
    ],
    languages: [
      { name: "Português", level: "Nativo" },
      { name: "Inglês", level: "Leitura intermediária, compreensão básica; conversação em desenvolvimento" },
    ],
  },
};
