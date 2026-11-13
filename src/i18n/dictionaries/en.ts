import type { Dictionary } from ".";

export const en: Dictionary = {
  meta: {
    title: "Sandro Carvalho — Developer",
    description:
      "Portfolio of Sandro Carvalho, a Full Stack developer passionate about turning ideas into efficient projects and interfaces.",
    ogLocale: "en_US",
    ogRole: "Full Stack Developer",
    resumeTitle: "Résumé — Sandro Carvalho",
    resumeDescription:
      "Résumé of Sandro Carvalho: front-end developer with 5+ years of experience in React, Next.js, TypeScript and Node.js.",
  },

  nav: {
    home: "Home",
    projects: "Projects",
    resume: "Résumé",
    blog: "Blog",
    soon: "Soon",
    downloadPdf: "Download PDF",
    downloadPdfHint: "To print or send",
    interactive: "Interactive version",
    interactiveHint: "Animated page",
    language: "Language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    greeting: "Hi, I'm Sandro.",
    role: "Web Developer",
    title: "Passionate about turning ideas into efficient projects and interfaces.",
    text: "With over 5 years of experience in Web Development, I see every project as a chance to learn, grow and deliver value through code.",
    avatarAlt: "Photo of Sandro Carvalho",
    linkedin: "Sandro Carvalho on LinkedIn",
    github: "Sandro Carvalho on GitHub",
  },

  avatar: {
    label: "ASCII portrait of Sandro Carvalho. Hover or tap to see the technologies he works with.",
    stack: "Stack",
  },

  currentWork: {
    titleBefore: "I'm currently working at",
    text: "I build dynamic, optimized and scalable interfaces for the electric power sector, delivering the best user experience.",
    siteText: "Testing, protection, monitoring, control and asset management for the electric power sector.",
    siteAlt: "Screenshot of the HVEX website",
  },

  projects: {
    title: "Projects",
    juninho: "Juninho Personal website",
    mathias: "Mathias Imóveis website",
  },

  skills: {
    kicker: "Always looking to learn and grow...",
    title: "I'm currently studying at curso.dev",
    text: "I'm sharpening my skills in React, TypeScript, Next.js and Node.js, with a focus on performance and scalability. I'm also exploring new technologies and tools to improve my productivity and code quality.",
  },

  contact: {
    title: "Contact me",
    text: "Get in touch by e-mail or LinkedIn",
    linkedin: "Sandro Carvalho on LinkedIn",
    email: "Send an e-mail to Sandro Carvalho",
  },

  footer: {
    madeBy: "Made with ❤️ by Sandro",
    rights: "All rights reserved.",
  },

  resume: {
    pdfFile: "/curriculo/resume-sandro-carvalho.pdf",
    kicker: "Résumé",
    name: "Sandro Luis Ribeiro Carvalho",
    shortName: "Sandro Carvalho",
    role: "Front-End Developer",
    location: "Itajubá - MG, Brazil",
    available: "Ready for the next big project",
    labels: {
      objective: "Objective",
      summary: "Summary",
      experience: "Professional experience",
      education: "Education",
      courses: "Courses and certifications",
      qualities: "Key strengths",
      stack: "Technologies",
      languages: "Languages",
      contact: "Contact",
      current: "Present",
      download: "Download PDF",
      highlights: "Key projects",
      hours: "Workload",
      skills: "Technical skills",
      phone: "Phone",
    },
    stats: [
      { value: 5, suffix: "+", label: "years of experience" },
      { value: 4, suffix: "", label: "companies" },
      { value: 2, suffix: "", label: "products shipped to production at HVEX" },
    ],
    objective:
      "To work as a Developer in information technology, applying my skills in React, Next.js, TypeScript, Node.js and solid principles of usability, performance and software architecture. I aim to contribute scalable, innovative solutions that create real value for the company and its users.",
    summary:
      "Developer with over 5 years of experience building modern interfaces, scalable web systems and high-performance tools. Specialized in React, Next.js, TypeScript, Node.js, HTML, CSS and JavaScript, with solid experience in front-end architecture, reusable components, API integration and a focus on usability, accessibility and performance. Currently at HVEX, leading projects from prototyping to production. Proactive and analytical, committed to quality deliveries.",
    experience: [
      {
        id: "hvex",
        company: "HVEX",
        place: "Itajubá - MG, Brazil",
        role: "Front-End Developer Analyst",
        period: "May 2021 — present",
        bullets: [
          "Prototyping and building interfaces with React and Next.js (API Routes, SSR)",
          "Building reusable components",
          "Page performance and responsiveness",
          "High-performance chart integration (ApexCharts, Observable Plot)",
          "Docker for both tools, including the reporting one",
        ],
        highlights: [
          { name: "Shield-X", text: "Built from architecture to production delivery." },
          { name: "Mjolnir", text: "Custom report generation tool, powered by Puppeteer." },
        ],
      },
      {
        id: "ibc",
        company: "Instituto Brasileiro de Coaching — IBC",
        place: "",
        role: "Web Designer",
        period: "Apr 2019 — May 2021",
        bullets: [
          "Landing page development",
          "Inbound Marketing tools",
          "Development with HTML, CSS, JavaScript, jQuery and WordPress",
          "Prototyping in Adobe XD and graphic design in Photoshop and Illustrator",
        ],
        highlights: [],
      },
      {
        id: "fepi",
        company: "FEPI — Fundação de Ensino e Pesquisa de Itajubá",
        place: "Itajubá - MG, Brazil",
        role: "Communication and Marketing Intern",
        period: "Nov 2018 — Jan 2019",
        bullets: ["Artwork and social media content", "Photoshop and CorelDRAW"],
        highlights: [],
      },
      {
        id: "support",
        company: "Support Informática",
        place: "Itajubá - MG, Brazil",
        role: "Development Intern",
        period: "Sep 2017 — Mar 2018",
        bullets: [
          "Development with HTML, CSS, JavaScript, jQuery, PHP and MySQL",
          "Admin dashboard for a client",
        ],
        highlights: [],
      },
    ],
    education: [
      { title: "B.Sc. in Information Systems", school: "Centro Universitário de Itajubá — FEPI", period: "2015 — 2020" },
      { title: "IT Technician", school: "E.E. Comendador Mário Goulart Santiago", period: "2012 — 2014" },
    ],
    courses: [
      { title: "curso.dev", provider: "", detail: "In progress" },
      { title: "React: Hooks, Contexts and best practices", provider: "Alura", detail: "8h · 2024" },
      { title: "React: Automating tests in front-end applications", provider: "Alura", detail: "6h · 2023" },
      { title: "React: Component lifecycle", provider: "Alura", detail: "6h · 2023" },
      { title: "Next.js: First dive into the framework", provider: "Alura", detail: "6h · 2023" },
      { title: "JavaScript: Object-Oriented Programming", provider: "Alura", detail: "6h · 2022" },
    ],
    stackGroups: {
      frontend: "Front-end",
      state: "State and data",
      ui: "Styling, animation and charts",
      forms: "Forms and validation",
      devops: "Infra and version control",
      tooling: "Tooling and process",
    },
    qualities: [
      "Strong attention to detail and usability",
      "Teamwork and clear communication",
      "Proactive, with a strong sense of ownership",
      "Committed to quality, deadlines and continuous improvement",
      "Passion for development and innovation",
      "Logical reasoning and autonomy in problem solving",
    ],
    languages: [
      { name: "Portuguese", level: "Native" },
      { name: "English", level: "Intermediate reading, basic listening; speaking in progress" },
    ],
  },
};
