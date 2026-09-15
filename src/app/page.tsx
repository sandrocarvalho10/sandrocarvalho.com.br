import Image from "next/image";
import { PortfolioMotion } from "@/screens/components/portfolio-motion";
import { CodeSculpture } from "@/screens/components/code-sculpture";
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Code2,
  Github,
  Layers3,
  Linkedin,
  Mail,
  Download,
  FileText,
} from "lucide-react";
import { Header } from "@/screens/landingPage/header";

const socials = {
  github: "https://github.com/sandrocarvalho10",
  linkedin: "https://linkedin.com/in/sandro-carvalho-dev",
  email: "mailto:sandro.luiz97@outlook.com",
};
const projects = [
  {
    name: "Juninho Personal",
    category: "FITNESS · PRESENÇA DIGITAL",
    image: "/juninhopersonal.png",
    description:
      "Site para apresentar o trabalho do personal trainer Juninho e seus programas de treino.",
    color: "orange",
  },
  {
    name: "Mathias Imóveis",
    category: "IMOBILIÁRIO · WEB DESIGN",
    image: "/mathias-imoveis.png",
    description:
      "Site da Mathias Imóveis, com apresentação da imobiliária e dos imóveis.",
    color: "blue",
  },
];
const expertise = [
  {
    icon: Code2,
    number: "01",
    title: "Front-end",
    text: "Desenvolvimento de interfaces com React e Next.js, do layout à adaptação para celular.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Braces,
    number: "02",
    title: "Back-end",
    text: "Integração de interfaces com APIs e desenvolvimento de aplicações com Node.js.",
    tags: ["Node.js", "APIs", "Integrações"],
  },
  {
    icon: Layers3,
    number: "03",
    title: "Qualidade de código",
    text: "Componentes reutilizáveis, organização do projeto e atenção ao tempo de carregamento.",
    tags: ["Componentização", "Performance", "Escalabilidade"],
  },
];

export default function Page() {
  return (
    <div className="portfolio-shell" id="inicio">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <PortfolioMotion />
      <main id="conteudo">
        <section className="hero-grid" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" /> OLÁ, EU SOU SANDRO CARVALHO
            </div>
            <h1 id="hero-title">
              <span className="title-intro">Sou Sandro.</span>
              <span className="title-line">Desenvolvo</span>
              <span className="title-line title-last">
                para a{" "}
                <span className="title-web">
                  web<span className="title-dot">.</span>
                </span>
              </span>
            </h1>
            <p>
              Trabalho com desenvolvimento Full Stack há mais de 5 anos. Por
              aqui, compartilho alguns projetos e o que estou estudando.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                Ver meus projetos <ArrowDown size={17} />
              </a>
              <a className="text-link" href="#contato">
                Vamos conversar <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="hero-bottom">
              <span>REACT · NEXT.JS · TYPESCRIPT · NODE.JS</span>
              <a href="#curriculo">Meu currículo ↗</a>
            </div>
          </div>
          <div className="portrait">
            <div className="portrait-halo" aria-hidden="true" />
            <CodeSculpture variant="orbit" />
            <div className="portrait-top">
              <span>FULL STACK DEVELOPER</span>
              <Code2 size={23} strokeWidth={1.3} />
            </div>
            <span className="portrait-coordinate" aria-hidden="true">
              SC / DEV
            </span>
            <div className="portrait-avatar-layer">
              <Image
                className="portrait-image"
                src="/avatar1.png"
                alt="Avatar ilustrado de Sandro acenando"
                fill
                priority
                sizes="(max-width: 700px) 100vw, 420px"
              />
            </div>
            <span className="depth-tag depth-tag-code" aria-hidden="true">
              &lt;/&gt;
            </span>
            <span className="depth-tag depth-tag-stack" aria-hidden="true">
              <span className="status-dot" /> React + Next.js
            </span>
            <div className="portrait-label">
              <span>Sandro Carvalho</span>
              <span>
                Desenvolvedor Full Stack <ArrowUpRight size={15} />
              </span>
            </div>
          </div>
        </section>

        <div className="intro-strip">
          <p>
            <strong>5+</strong> anos construindo para a web
          </p>
          <span className="strip-divider" />
          <p>Atualmente na HVEX</p>
          <a href={socials.github} target="_blank" rel="noopener noreferrer">
            Um pouco do meu código <Github size={18} />
          </a>
        </div>

        <section
          id="projetos"
          className="section"
          aria-labelledby="projects-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">PORTFÓLIO</span>
              <h2 id="projects-title">
                Alguns trabalhos<span> recentes.</span>
              </h2>
            </div>
            <span className="section-note">
              Sites e interfaces em que trabalhei.
            </span>
          </div>
          <article className="featured-project panel">
            <div className="featured-copy">
              <span className="project-kicker">
                <span className="status-dot" /> ATUALMENTE NA HVEX
              </span>
              <h3>
                Meu trabalho
                <br />
                na HVEX<span>.</span>
              </h3>
              <p>
                Na HVEX, desenvolvo interfaces para o setor elétrico. Meu foco
                está na experiência de uso, na performance e na evolução das
                aplicações.
              </p>
              <div className="tags">
                <span>Desenvolvimento Web</span>
                <span>Setor elétrico</span>
              </div>
              <a
                className="button button-outline"
                href="https://hvex.com.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                Conheça a HVEX <ArrowUpRight size={17} />
              </a>
            </div>
            <a
              className="featured-preview"
              href="https://hvex.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar o site da HVEX"
            >
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span>hvex.com.br</span>
                <ArrowUpRight size={14} />
              </div>
              <div className="featured-image">
                <Image
                  src="/images/hvex/hvex_site.jpg"
                  alt="Prévia do site da HVEX, empresa de tecnologia para o setor elétrico"
                  fill
                  sizes="(max-width: 700px) 90vw, 650px"
                />
              </div>
            </a>
          </article>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card ${project.color}`}
                key={project.name}
              >
                <div className="project-image">
                  <Image
                    src={project.image}
                    alt={`Apresentação visual do projeto ${project.name}`}
                    fill
                    sizes="(max-width: 700px) 90vw, 600px"
                  />
                  <span className="project-index">0{index + 2}</span>
                </div>
                <div className="project-info">
                  <span className="eyebrow">{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <details>
                    <summary>
                      Explorar o projeto <span aria-hidden="true">+</span>
                    </summary>
                    <div className="project-detail">
                      <p>
                        {index === 0
                          ? "A apresentação coloca o trabalho do personal trainer em destaque, com uma linguagem visual ligada ao universo do esporte e do movimento."
                          : "O projeto organiza a apresentação da imobiliária e dos imóveis em uma experiência visual voltada à descoberta."}
                      </p>
                      <a
                        href={project.image}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver apresentação completa <ArrowUpRight size={15} />
                      </a>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="sobre"
          className="section about-grid"
          aria-labelledby="about-title"
        >
          <div className="about-copy">
            <span className="eyebrow">SOBRE MIM</span>
            <h2 id="about-title">
              Um pouco sobre
              <br />
              <span>quem está por aqui.</span>
            </h2>
            <p>
              Sou desenvolvedor Full Stack e trabalho com web há mais de 5 anos.
              Gosto tanto de montar uma interface quanto de entender como as
              coisas funcionam por trás dela.
            </p>
            <p>
              Hoje trabalho na HVEX e sigo estudando no curso.dev. Aqui estão
              alguns dos projetos que fizeram parte desse caminho, com espaço
              para os próximos também.
            </p>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Minha trajetória no LinkedIn <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="learning-card panel">
            <div className="learning-top">
              <span className="eyebrow">NOS MEUS ESTUDOS</span>
              <Code2 size={23} strokeWidth={1.3} />
            </div>
            <CodeSculpture />
            <div>
              <span className="learning-label">
                <span className="status-dot" /> APRENDENDO NO CURSO.DEV
              </span>
              <h3>
                Ainda tem bastante
                <br />
                coisa para aprender.
              </h3>
              <p>
                Aprofundando conhecimentos em React, TypeScript, Next.js e
                Node.js, com foco em performance e escalabilidade.
              </p>
              <a
                href="https://curso.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Conheça o curso <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section
          id="expertise"
          className="section"
          aria-labelledby="expertise-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">NO DIA A DIA</span>
              <h2 id="expertise-title">
                Com o que <span>trabalho.</span>
              </h2>
            </div>
            <p className="section-note">
              As tecnologias e os cuidados
              <br />
              que fazem parte dos meus projetos.
            </p>
          </div>
          <div className="expertise-grid">
            {expertise.map((item) => (
              <article className="expertise-card" key={item.number}>
                <div className="expertise-top">
                  <item.icon size={26} strokeWidth={1.5} />
                  <span>{item.number}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="curriculo"
          className="section resume-section"
          aria-labelledby="resume-title"
        >
          <div className="resume-heading">
            <span className="eyebrow">CURRÍCULO</span>
            <h2 id="resume-title">
              Prefere guardar
              <br />
              <span>um resumo?</span>
            </h2>
            <p>
              Reuni minha experiência, tecnologias e contatos em um PDF de uma
              página. Fica fácil de consultar ou compartilhar.
            </p>
          </div>
          <div className="resume-download">
            <div className="resume-file">
              <FileText size={32} strokeWidth={1.3} />
              <div>
                <h3>Sandro Carvalho</h3>
                <p>Desenvolvedor Full Stack</p>
              </div>
              <span>PDF</span>
            </div>
            <p className="resume-description">
              Resumo profissional · 1 página · Português
            </p>
            <a
              className="button button-primary"
              href="/curriculo/sandro-carvalho.pdf"
              download="Sandro-Carvalho-Curriculo.pdf"
            >
              Baixar currículo <Download size={17} />
            </a>
          </div>
        </section>

        <section
          id="contato"
          className="contact-section panel"
          aria-labelledby="contact-title"
        >
          <div className="contact-copy">
            <span className="eyebrow">CONTATO</span>
            <h2 id="contact-title">
              Vamos
              <br />
              <span>conversar?</span>
            </h2>
            <p>
              Para falar sobre um projeto ou uma oportunidade,
              <br />
              pode me chamar por e-mail ou pelo LinkedIn.
            </p>
            <a className="button button-dark" href={socials.email}>
              Me envie um e-mail <ArrowUpRight size={19} />
            </a>
            <a className="contact-email" href={socials.email}>
              sandro.luiz97@outlook.com
            </a>
          </div>
          <div className="contact-art">
            <span aria-hidden="true">hello_</span>
            <Image
              src="/avatar_contact.png"
              alt="Avatar de Sandro convidando para uma conversa"
              fill
              sizes="(max-width: 700px) 220px, 400px"
            />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="wordmark" href="#inicio">
          sandro<span>.dev_</span>
        </a>
        <p>Sandro Carvalho © {new Date().getFullYear()}</p>
        <div>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Sandro"
          >
            <Github size={19} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Sandro"
          >
            <Linkedin size={19} />
          </a>
          <a href={socials.email} aria-label="Enviar e-mail para Sandro">
            <Mail size={19} />
          </a>
          <a href="#inicio" aria-label="Voltar ao início">
            <ArrowUpRight size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}
