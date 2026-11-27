import type { Locale } from "@/i18n/config";

/**
 * Projetos exibidos na home. Para adicionar um novo, inclua um item em
 * `PROJECTS` (a ordem do array é a ordem na página).
 *
 * - Textos traduzidos usam `Localized` (pt/en/es).
 * - `stack` aceita slugs do sprite (ver `screens/components/tech-icons.ts`,
 *   viram ícone + nome) ou texto livre.
 * - Botões "Ver site" e "Código" só aparecem se `liveUrl` / `repoUrl` existirem.
 * - Pendências usam o marcador `[TODO: ...]`, que aparece destacado na
 *   página. Busque por "TODO" para encontrar todas.
 */

export type Localized = Record<Locale, string>;

/**
 * Relação do Sandro com o projeto, mostrada como selo no card:
 * - "author": projeto pessoal / freela feito por ele
 * - "work": feito por ele numa empresa (`company`), ex.: Shield-X na HVEX
 * - "employer": site da empresa onde trabalha (não feito por ele)
 */
export type ProjectOwnership = "author" | "work" | "employer";

/** Capa desenhada (ícone) para projetos ainda sem print */
export type ProjectCover = "download" | "messages" | "folders";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  /** Texto alternativo descritivo (imagem informativa) */
  alt: Localized;
}

/** Logo/ícone do app (quadrado). Sem print, vira a capa do card; com print, aparece ao lado do nome. */
export interface ProjectLogo {
  src: string;
  size: number;
  /** Cor de destaque do logo, "r, g, b": tinge o brilho da capa */
  accent: string;
}

export interface Project {
  id: string;
  name: string;
  ownership: ProjectOwnership;
  /** Empresa, quando `ownership` é "work" (ex.: "HVEX") */
  company?: string;
  /** 1 linha: qual problema o projeto resolve */
  problem?: Localized;
  /** Itens do papel do Sandro no projeto (lista "Meu papel") */
  roles?: Localized[];
  /** Destaques do projeto (lista "Destaques") */
  highlights?: Localized[];
  logo?: ProjectLogo;
  stack: string[];
  image?: ProjectImage;
  /** Capa com ícone genérico, usada quando não há `image` nem `logo` */
  cover?: ProjectCover;
  /** "soon": em desenvolvimento, mostra o selo "Em breve" */
  status?: "soon";
  liveUrl?: string;
  repoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "shield-x",
    name: "Shield-X",
    ownership: "work",
    company: "HVEX",
    problem: {
      pt: "Plataforma de integração de ativos inteligentes para concessionárias de energia, com acesso em tempo real a todos os ativos.",
      en: "Smart asset integration platform for power utilities, with real-time access to every asset.",
      es: "Plataforma de integración de activos inteligentes para distribuidoras de energía, con acceso en tiempo real a todos los activos.",
    },
    roles: [
      {
        pt: "Desenvolvimento da arquitetura até a entrega em produção",
        en: "Built it from architecture to production delivery",
        es: "Desarrollo desde la arquitectura hasta la entrega en producción",
      },
      {
        pt: "Prototipação e interfaces com React e Next.js (API Routes, SSR)",
        en: "Prototyping and interfaces with React and Next.js (API Routes, SSR)",
        es: "Prototipado e interfaces con React y Next.js (API Routes, SSR)",
      },
      {
        pt: "Criação de componentes reutilizáveis",
        en: "Reusable components",
        es: "Creación de componentes reutilizables",
      },
      {
        pt: "Containerização com Docker",
        en: "Docker containerization",
        es: "Contenerización con Docker",
      },
    ],
    stack: ["react", "nextdotjs", "typescript", "docker"],
    image: {
      src: "/images/projects/shieldx.jpg",
      width: 1440,
      height: 900,
      alt: {
        pt: "Página inicial do Shield-X: título “A plataforma mais completa de integração de ativos inteligentes para concessionárias de energia” e um notebook exibindo o painel com mapa e indicadores.",
        en: "Shield-X home page: headline “The most complete smart asset integration platform for power utilities” and a laptop showing the dashboard with a map and indicators.",
        es: "Página de inicio de Shield-X: título “La plataforma más completa de integración de activos inteligentes para distribuidoras de energía” y un portátil mostrando el panel con mapa e indicadores.",
      },
    },
    liveUrl: "https://shieldx.hvex.com.br",
  },
  {
    id: "juninho",
    name: "Juninho Personal",
    ownership: "author",
    problem: {
      pt: "Site de personal trainer com planos de treino e contato pelo WhatsApp.",
      en: "Personal trainer website with training plans and WhatsApp contact.",
      es: "Sitio de entrenador personal con planes de entrenamiento y contacto por WhatsApp.",
    },
    stack: ["nextdotjs", "tailwindcss", "figma"],
    image: {
      src: "/juninhopersonal.png",
      width: 2918,
      height: 1544,
      alt: {
        pt: "Página inicial do site Juninho Personal: foto em preto e branco de treino com barra, logo laranja “Junior Aprigio Personal Trainer” e o título “Liberte o seu atleta interior”.",
        en: "Juninho Personal website home page: black-and-white photo of a barbell workout, orange “Junior Aprigio Personal Trainer” logo and the headline “Unleash your inner athlete”.",
        es: "Página de inicio del sitio Juninho Personal: foto en blanco y negro de un entrenamiento con barra, logo naranja “Junior Aprigio Personal Trainer” y el título “Libera a tu atleta interior”.",
      },
    },
  },
  {
    id: "mathias",
    name: "Mathias Imóveis",
    ownership: "author",
    problem: {
      pt: "Site imobiliário para agendar visitas e falar com consultor pelo WhatsApp.",
      en: "Real estate website to book visits and talk to an agent via WhatsApp.",
      es: "Sitio inmobiliario para agendar visitas y hablar con un asesor por WhatsApp.",
    },
    stack: ["nextdotjs", "tailwindcss", "figma"],
    image: {
      src: "/mathias-imoveis.png",
      width: 2918,
      height: 1544,
      alt: {
        pt: "Página inicial do site Mathias Imóveis: casa moderna iluminada ao anoitecer e o título “Seu sonho tem um endereço”, com botões para agendar visita e falar com um consultor.",
        en: "Mathias Imóveis website home page: a modern house lit at dusk and the headline “Your dream has an address”, with buttons to book a visit and talk to an agent.",
        es: "Página de inicio del sitio Mathias Imóveis: casa moderna iluminada al anochecer y el título “Tu sueño tiene una dirección”, con botones para agendar una visita y hablar con un asesor.",
      },
    },
  },
  {
    id: "capture",
    name: "Capture Event Flow",
    ownership: "author",
    problem: {
      pt: "Estúdio fotográfico que roda inteiro no navegador, para fotógrafos e equipes de eventos (festas, formaturas, casamentos, corporativos).",
      en: "Photo studio that runs entirely in the browser, for photographers and event teams (parties, graduations, weddings, corporate).",
      es: "Estudio fotográfico que funciona completamente en el navegador, para fotógrafos y equipos de eventos (fiestas, graduaciones, bodas, corporativos).",
    },
    highlights: [
      {
        pt: "Importa, seleciona, edita e entrega tudo localmente",
        en: "Import, cull, edit and deliver everything locally",
        es: "Importa, selecciona, edita y entrega todo localmente",
      },
      {
        pt: "Sem enviar centenas de fotos para a nuvem: rápido, gratuito e privado",
        en: "No uploading hundreds of photos to the cloud: fast, free and private",
        es: "Sin subir cientos de fotos a la nube: rápido, gratuito y privado",
      },
      {
        pt: "Instalável como app e funciona offline",
        en: "Installable as an app and works offline",
        es: "Instalable como app y funciona sin conexión",
      },
    ],
    stack: ["nextdotjs", "PWA"],
    logo: { src: "/images/projects/capture-event-flow.png", size: 512, accent: "214, 236, 138" },
    image: {
      src: "/images/projects/capture.jpg",
      width: 1440,
      height: 900,
      alt: {
        pt: "Tela do Capture Event Flow em tema escuro: lista de eventos, backup e restauração, galeria de fotografias, mesa de edição e painel de ajustes de luz e cor.",
        en: "Capture Event Flow screen in a dark theme: event list, backup and restore, photo gallery, editing desk and light and color adjustments panel.",
        es: "Pantalla de Capture Event Flow en tema oscuro: lista de eventos, copia de seguridad y restauración, galería de fotos, mesa de edición y panel de ajustes de luz y color.",
      },
    },
    liveUrl: "https://capture.sandrocarvalho.com.br",
  },
  {
    id: "mptube",
    name: "mptube",
    ownership: "author",
    problem: {
      pt: "Ferramenta para baixar vídeos e áudios do YouTube, Instagram e Facebook.",
      en: "Tool to download videos and audio from YouTube, Instagram and Facebook.",
      es: "Herramienta para descargar videos y audios de YouTube, Instagram y Facebook.",
    },
    stack: ["nextdotjs", "Tauri"],
    logo: { src: "/images/projects/mptube.png", size: 512, accent: "255, 186, 0" },
    repoUrl: "https://github.com/sandrocarvalho10/mptube",
  },
  {
    id: "washared",
    name: "washared",
    ownership: "author",
    // Em breve: falta a homologação com credenciais Meta reais antes de produção
    status: "soon",
    problem: {
      pt: "Central de atendimento multiagente para WhatsApp Business, com tickets e departamentos.",
      en: "Multi-agent customer service hub for WhatsApp Business, with tickets and departments.",
      es: "Central de atención multiagente para WhatsApp Business, con tickets y departamentos.",
    },
    highlights: [
      {
        pt: "Fluxo multiagente e integração oficial com a Meta",
        en: "Multi-agent flow and official Meta integration",
        es: "Flujo multiagente e integración oficial con Meta",
      },
      {
        pt: "Relatórios, auditoria e gestão segura de acesso",
        en: "Reports, auditing and secure access management",
        es: "Informes, auditoría y gestión segura de acceso",
      },
      {
        pt: "Observabilidade com OpenTelemetry e preflight de produção",
        en: "OpenTelemetry observability and production preflight",
        es: "Observabilidad con OpenTelemetry y preflight de producción",
      },
    ],
    stack: ["nextdotjs", "Tauri 2", "Fastify", "OpenTelemetry"],
    logo: { src: "/images/projects/washared.png", size: 128, accent: "225, 18, 72" },
  },
  {
    id: "my-galery",
    name: "my-galery",
    ownership: "author",
    status: "soon",
    problem: {
      pt: "Unificação e organização de pastas do Google Drive.",
      en: "Unifies and organizes Google Drive folders.",
      es: "Unificación y organización de carpetas de Google Drive.",
    },
    stack: [],
    cover: "folders",
  },
];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
