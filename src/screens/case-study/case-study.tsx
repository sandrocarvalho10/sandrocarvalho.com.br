import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { CaseStudy, CaseStudySectionId } from "@/data/case-studies";
import { AnimatedCard } from "../components/animated-card";
import { TechBadge } from "../components/tech-badge";
import { TodoText } from "../components/todo-text";

const CARD = "relative w-full h-full overflow-hidden isolate rounded-[2rem] bg-[#131311] border border-white/5 p-6 md:p-10";

const SECTION_ORDER: CaseStudySectionId[] = ["context", "challenge", "role", "architecture", "results"];

/** Cantos e brilho variam por card, como no resto do site (bento). 5 seções + Stack = grade 2×3 */
const SECTION_STYLE: Record<CaseStudySectionId, { glow: string; corners: string }> = {
  context: { glow: "245, 179, 76", corners: "rounded-tr-lg rounded-bl-[50px]" },
  challenge: { glow: "56, 189, 248", corners: "rounded-tl-lg rounded-br-[50px]" },
  role: { glow: "74, 222, 128", corners: "rounded-tr-lg rounded-tl-[50px]" },
  architecture: { glow: "56, 189, 248", corners: "rounded-bl-lg rounded-tr-[50px]" },
  results: { glow: "251, 146, 60", corners: "rounded-tl-lg rounded-br-[50px]" },
};

export function CaseStudyView({ study, lang, t }: { study: CaseStudy; lang: Locale; t: Dictionary["caseStudy"] }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 md:gap-8">
      <AnimatedCard
        glowColor="56, 189, 248"
        aboveTheFold
        className="relative w-full overflow-hidden isolate rounded-[2rem] rounded-br-lg rounded-tr-[50px] border border-white/5 bg-linear-to-br from-[#051824]/90 to-[#041e36]/95 p-6 md:p-12"
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-[350px] w-[350px] rounded-full bg-cyan-500/25 blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-blue-600/25 blur-[120px]" />
        </div>

        <Link
          href={`${localePath(lang, "/")}#projetos`}
          className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {t.back}
        </Link>

        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-sky-200">{t.kicker}</p>
        <h1 className="mt-2 text-4xl font-light md:text-6xl">{study.name}</h1>
        <p className="mt-6 max-w-3xl text-base font-extralight leading-8 md:text-lg md:leading-9">
          <TodoText text={study.summary[lang]} />
        </p>
      </AnimatedCard>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        {SECTION_ORDER.map((id) => {
          const style = SECTION_STYLE[id];
          return (
            <AnimatedCard
              key={id}
              glowColor={style.glow}
              tiltStrength={1}
              className={`${CARD} ${style.corners}`}
            >
              <section aria-labelledby={`cs-${id}`}>
                <h2 id={`cs-${id}`} className="mb-4 text-2xl font-light text-white">
                  {t.sections[id]}
                </h2>
                <div className="flex flex-col gap-4 font-light leading-7 text-white/80">
                  {study.sections[id].map((p, i) => (
                    <p key={i}>
                      <TodoText text={p[lang]} />
                    </p>
                  ))}
                </div>
              </section>
            </AnimatedCard>
          );
        })}

        <AnimatedCard glowColor="74, 222, 128" tiltStrength={1} className={`${CARD} rounded-tr-lg rounded-bl-[50px]`}>
          <section aria-labelledby="cs-stack">
            <h2 id="cs-stack" className="mb-4 text-2xl font-light text-white">
              {t.sections.stack}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <TechBadge key={s} item={s} />
              ))}
            </ul>
          </section>
        </AnimatedCard>
      </div>
    </div>
  );
}
