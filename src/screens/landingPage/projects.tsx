import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { SHIELD_X } from "@/data/case-studies";
import { PROJECTS } from "@/data/projects";
import { CardCurrentWork } from "../components/card-current-work";
import { CardCaseStudy, CardProject } from "../components/card-project";

const FEATURED_ID = "shield-x";

// Mesmo padrão dos cards antigos: base 2rem e um canto pequeno virado para o vizinho
const ROW_CORNERS = ["rounded-[2rem] rounded-tr-lg", "rounded-[2rem] rounded-bl-lg", "rounded-[2rem] rounded-tl-lg"];

export function Projects({ lang, t }: { lang: Locale; t: Dictionary }) {
  // Projeto da HVEX fica ao lado do card "Atualmente estou trabalhando na HVEX"
  const featured = PROJECTS.find((p) => p.id === FEATURED_ID);
  const others = PROJECTS.filter((p) => p.id !== FEATURED_ID);

  return (
    // Âncora do item "Projetos" do menu e do botão "Ver projetos"
    <section id="projetos" aria-labelledby="projetos-title" className="mx-auto flex w-full max-w-7xl flex-col gap-4 scroll-mt-8 md:gap-8">
      <h2 id="projetos-title" className="sr-only">{t.projects.title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[4fr_5fr] md:gap-8">
        <CardCurrentWork t={t.currentWork} />
        {featured && (
          <CardProject
            project={featured}
            lang={lang}
            t={t.projects}
            corners="rounded-lg rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px]"
          />
        )}
      </div>

      <CardCaseStudy study={SHIELD_X} lang={lang} t={t.projects} />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {others.map((p, i) => (
          <CardProject key={p.id} project={p} lang={lang} t={t.projects} corners={ROW_CORNERS[i % ROW_CORNERS.length]} />
        ))}
      </div>
    </section>
  );
}
