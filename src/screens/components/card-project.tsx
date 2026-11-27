import { ArrowRight, BookOpen, Briefcase, Building2, Clock, Download, FolderTree, GithubIcon, MessagesSquare, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CaseStudy } from "@/data/case-studies";
import type { Localized, Project, ProjectCover, ProjectLogo } from "@/data/projects";
import { cn } from "@/styles/lib/utils";
import { AnimatedCard } from "./animated-card";
import { TechBadge } from "./tech-badge";
import { TodoText } from "./todo-text";

type T = Dictionary["projects"];

const primaryBtn =
  "inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-4 py-2 text-sm font-semibold text-[#1a0a00] " +
  "shadow-[0_8px_24px_-8px_rgba(251,146,60,0.7)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 " +
  "outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131311]";

const secondaryBtn =
  "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/85 " +
  "transition-colors duration-300 hover:border-white/40 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

export const projectButtonClass = { primary: primaryBtn, secondary: secondaryBtn };

/**
 * Botão redondo de canto (mesmo estilo do antigo link "hvex.com.br"):
 * seta a 45° para "Ver site" / "Ler estudo de caso", logo do GitHub para "Código".
 * Fundo escuro translúcido para aparecer tanto sobre prints claros quanto escuros.
 */
const cornerBtn =
  "group/corner grid size-12 place-items-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md " +
  "transition-[background-color,color,scale] duration-300 hover:scale-105 hover:bg-white hover:text-[#131311] " +
  "outline-none focus-visible:ring-2 focus-visible:ring-amber-300";

function CornerArrow() {
  return (
    <ArrowRight
      aria-hidden
      className="size-5 -rotate-45 transition-transform duration-300 group-hover/corner:translate-x-0.5 group-hover/corner:-translate-y-0.5"
    />
  );
}

/** Capa para projetos ainda sem print: degradê azul + ícone */
const COVER_ICON: Record<ProjectCover, typeof Download> = {
  download: Download,
  messages: MessagesSquare,
  folders: FolderTree,
};

interface CardProjectProps {
  project: Project;
  lang: Locale;
  t: T;
  /**
   * Cantos do card. Padrão do site: um canto pequeno (lg) virado para o
   * vizinho e o resto arredondado (2rem ou 50px).
   */
  corners?: string;
  className?: string;
}

const OWNERSHIP_ICON = { author: UserRound, work: Briefcase, employer: Building2 } as const;

export function CardProject({ project, lang, t, corners = "rounded-[2rem] rounded-tr-lg", className }: CardProjectProps) {
  const { image } = project;
  const OwnershipIcon = OWNERSHIP_ICON[project.ownership];
  const ownershipLabel =
    project.ownership === "work" && project.company ? `${t.ownership.work} ${project.company}` : t.ownership[project.ownership];

  return (
    <AnimatedCard
      glowColor="56, 189, 248"
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden border border-white/5 bg-[#131311]",
        corners,
        className
      )}
    >
      {/* Links no canto superior direito, quase na borda */}
      {(project.liveUrl || project.repoUrl) && (
        <div className="absolute right-4 top-4 z-30 flex gap-2">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={cornerBtn} title={t.code}>
              <GithubIcon aria-hidden className="size-5" />
              <span className="sr-only">{t.code}: {project.name} ({t.newTab})</span>
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={cornerBtn} title={t.liveSite}>
              <CornerArrow />
              <span className="sr-only">{t.liveSite}: {project.name} ({t.newTab})</span>
            </a>
          )}
        </div>
      )}

      {!image && project.logo && <ProjectLogoCover logo={project.logo} />}
      {!image && !project.logo && project.cover && <ProjectCoverArt cover={project.cover} />}

      {image && (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden">
          {/* Anéis azuis atrás do screenshot (mesmo fundo dos cards antigos) */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 100%, #00BFFF 0%, #00BFFF 20%, #1E90FF 20%, #1E90FF 40%, #4169E1 40%, #4169E1 60%, #6495ED 60%, #6495ED 80%, #7B68EE 80%, #7B68EE 100%)",
              opacity: 0.7,
            }}
          />
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover/card:scale-105">
            <Image
              src={image.src}
              alt={image.alt[lang]}
              fill
              sizes="(min-width: 1280px) 624px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top opacity-90"
            />
          </div>
          {/* Transição suave da imagem para o corpo do card */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#131311] to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-3 text-2xl font-medium text-white">
            {/* Com print na capa, o logo do app aparece ao lado do nome */}
            {image && project.logo && (
              <Image src={project.logo.src} alt="" width={32} height={32} className="size-8 rounded-lg ring-1 ring-white/10" />
            )}
            {project.name}
          </h3>
          <div className="flex flex-wrap gap-2">
          {project.status === "soon" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-amber-950">
              <Clock aria-hidden className="size-3.5" />
              {t.soon}
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
              project.ownership === "author" ? "bg-amber-400/15 text-amber-200" : "bg-sky-400/15 text-sky-200"
            )}
          >
            <OwnershipIcon aria-hidden className="size-3.5" />
            {ownershipLabel}
          </span>
          </div>
        </div>

        {project.problem && (
          // Cards simples (sem listas): no máximo 2 linhas na tela.
          // O corte é só visual: leitores de tela leem o texto todo.
          <p
            className={cn("font-light leading-7 text-white/80", !project.roles?.length && !project.highlights?.length && "line-clamp-2")}
            title={project.problem[lang]}
          >
            <TodoText text={project.problem[lang]} />
          </p>
        )}

        {project.roles && <DetailList title={t.role} items={project.roles} lang={lang} />}
        {project.highlights && <DetailList title={t.highlights} items={project.highlights} lang={lang} />}

        {project.stack.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label={t.stack}>
            {project.stack.map((s) => (
              <TechBadge key={s} item={s} />
            ))}
          </ul>
        )}

      </div>
    </AnimatedCard>
  );
}

/** Lista curta com traço na frente ("Meu papel", "Destaques") */
function DetailList({ title, items, lang }: { title: string; items: Localized[]; lang: Locale }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h4 className="mb-2 text-xs uppercase tracking-[0.2em] text-white/65">{title}</h4>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item.pt} className="flex gap-3 text-sm font-light leading-6 text-white/80">
            <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-sky-300/70" />
            <span><TodoText text={item[lang]} /></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Capa para projetos sem print: logo do app sobre fundo escuro tingido com a cor dele */
function ProjectLogoCover({ logo }: { logo: ProjectLogo }) {
  return (
    <div
      aria-hidden
      className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#0e0e0d]"
      style={{ "--accent": logo.accent } as React.CSSProperties}
    >
      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(var(--accent),0.28)] blur-[90px]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-0 grid place-items-center">
        <Image
          src={logo.src}
          alt=""
          width={logo.size}
          height={logo.size}
          sizes="112px"
          className="size-24 rounded-3xl shadow-[0_20px_50px_-12px_rgba(var(--accent),0.6)] ring-1 ring-white/10 transition-transform duration-700 group-hover/card:scale-110 md:size-28"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#131311] to-transparent" />
    </div>
  );
}

function ProjectCoverArt({ cover }: { cover: ProjectCover }) {
  const Icon = COVER_ICON[cover];
  return (
    <div aria-hidden className="relative aspect-video w-full shrink-0 overflow-hidden bg-linear-to-br from-[#051824] to-[#041e36]">
      <div className="absolute -top-16 -left-16 size-56 rounded-full bg-cyan-500/25 blur-[80px]" />
      <div className="absolute -bottom-16 -right-10 size-56 rounded-full bg-blue-600/30 blur-[80px]" />
      {/* Grade sutil, no clima "tecnológico" dos outros cards */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-20 place-items-center rounded-3xl border border-white/15 bg-white/[0.06] text-sky-200 backdrop-blur-sm transition-transform duration-700 group-hover/card:scale-110">
          <Icon className="size-9" />
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#131311] to-transparent" />
    </div>
  );
}

/** Card largo que leva à página de um estudo de caso */
export function CardCaseStudy({ study, lang, t }: { study: CaseStudy; lang: Locale; t: T }) {
  return (
    <AnimatedCard
      glowColor="56, 189, 248"
      className="relative w-full overflow-hidden isolate rounded-[2rem] rounded-bl-lg rounded-tr-[50px] border border-white/5 bg-linear-to-br from-[#051824]/90 to-[#041e36]/95 p-6 md:p-12"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[350px] w-[350px] rounded-full bg-cyan-500/25 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-blue-600/25 blur-[120px]" />
        {/* "X" gigante, decorativo */}
        <span className="absolute -right-6 -top-16 select-none text-[16rem] font-extrabold leading-none text-white/[0.03] md:text-[22rem]">
          X
        </span>
      </div>

      {/* Link no canto superior direito, quase na borda */}
      <Link
        href={localePath(lang, `/projetos/${study.slug}`)}
        className={cn(cornerBtn, "absolute right-4 top-4 z-30")}
        title={t.readCaseStudy}
      >
        <CornerArrow />
        <span className="sr-only">{t.readCaseStudy}: {study.name}</span>
      </Link>

      <div className="flex flex-col gap-6 pr-14 md:pr-0">
        <div className="flex max-w-2xl flex-col gap-4">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sky-400/15 px-2.5 py-1 text-xs font-medium text-sky-200">
            <BookOpen aria-hidden className="size-3.5" />
            {t.caseStudy}
          </span>
          <h3 className="text-3xl font-light text-white md:text-4xl">
            {t.caseStudy}: <span className="font-semibold">{study.name}</span>
          </h3>
          <p className="font-light leading-7 text-white/80">
            <TodoText text={study.summary[lang]} />
          </p>
          <ul className="flex flex-wrap gap-2" aria-label={t.stack}>
            {study.stack.map((s) => (
              <TechBadge key={s} item={s} />
            ))}
          </ul>
        </div>
      </div>
    </AnimatedCard>
  );
}
