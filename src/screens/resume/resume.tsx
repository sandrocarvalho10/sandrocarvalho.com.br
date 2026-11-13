import { ArrowDownToLine, Award, GithubIcon, GraduationCap, Languages, LinkedinIcon, Mail, MapPin, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { EXPERIENCE_DATA, RESUME_CONTACT, STACK_GROUPS, type ExperienceId, type StackGroupId } from "@/i18n/resume-data";
import { AnimatedCard } from "../components/animated-card";
import { CountUp } from "./count-up";
import { TechChip } from "./tech-chip";
import { Timeline } from "./timeline";

type T = Dictionary["resume"];

/** Mesmo "card base" dos cards da home */
const CARD = "relative w-full overflow-hidden isolate rounded-[2rem] bg-[#131311] border border-white/5 p-6 md:p-12";

function SectionTitle({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="relative z-10 mb-8 flex items-center gap-3 text-lg font-medium text-white/60">
      {icon && <span className="text-amber-300/80">{icon}</span>}
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */

function HeroCard({ t }: { t: T }) {
  return (
    <AnimatedCard glowColor="245, 179, 76" aboveTheFold className={`${CARD} flex flex-col gap-10 rounded-br-lg rounded-tr-[50px]`}>
      {/* Mesmo fundo girando do card principal da home */}
      <div className="absolute left-1/2 top-1/2 -z-10 size-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform">
        <div className="w-full h-full animate-rotate-bg">
          <Image src="/card-background.png" alt="" width={1010} height={1010} sizes="1010px" className="w-full h-full object-cover opacity-60" priority />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="aspect-square w-14 rounded-full bg-amber-500">
            <Image src="/avatar.png" alt="" width={56} height={56} className="h-full w-full rounded-full object-cover" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-medium text-white/60">{t.kicker}</span>
            <span className="text-sm opacity-40">{t.role}</span>
          </div>
        </div>

        <a
          href={t.pdfFile}
          download
          className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-400 px-5 py-2.5 text-sm font-semibold text-[#1a0a00]
                     shadow-[0_8px_32px_-8px_rgba(251,146,60,0.7)] transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgba(251,146,60,0.9)]"
        >
          <ArrowDownToLine className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          {t.labels.download}
        </a>
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-6xl font-light leading-tight">
          {t.shortName}
          <span className="block text-2xl md:text-3xl text-white/40">{t.role}</span>
        </h1>
        <p className="max-w-full text-base md:text-lg font-extralight leading-8 md:max-w-[75%] md:leading-9">{t.summary}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-3 py-1.5 font-medium text-emerald-950">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-900 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-900" />
          </span>
          {t.available}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-800 px-3 py-1.5 text-neutral-100">
          <MapPin className="size-4" />
          {t.location}
        </span>
        <span className="flex gap-1">
          <Link href={RESUME_CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="group rounded-md p-2 transition-colors duration-200 hover:bg-[#0a66c2]">
            <LinkedinIcon className="size-5 group-hover:fill-white" />
          </Link>
          <Link href={RESUME_CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="group rounded-full p-2 transition-colors duration-200 hover:bg-black">
            <GithubIcon className="size-5 group-hover:fill-white" />
          </Link>
          <Link href={`mailto:${RESUME_CONTACT.email}`} aria-label="E-mail"
            className="rounded-md p-2 transition-colors duration-200 hover:bg-white hover:text-[#1593df]">
            <Mail className="size-5" />
          </Link>
        </span>
      </div>
    </AnimatedCard>
  );
}

function StatsCard({ t }: { t: T }) {
  return (
    <AnimatedCard
      glowColor="251, 146, 60"
      aboveTheFold
      className="relative h-full w-full overflow-hidden isolate rounded-[2rem] rounded-bl-lg rounded-tr-[50px] border border-white/5 bg-linear-to-br from-orange-600/70 to-amber-400/70 p-6 md:p-10"
    >
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(circle at 50% 100%, rgba(255,215,0,0.4) 0%, transparent 70%)", mixBlendMode: "overlay" }} />
      <dl className="flex h-full flex-col justify-between gap-8">
        {t.stats.map((s) => (
          // dt antes do dd no HTML (semântica); flex-col-reverse põe o número em cima
          <div key={s.label} className="flex flex-col-reverse gap-1">
            <dt className="text-sm font-light text-white/80">{s.label}</dt>
            <dd className="text-6xl md:text-7xl font-extrabold leading-none tracking-tight text-white">
              <CountUp value={s.value} suffix={s.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </AnimatedCard>
  );
}

/* ------------------------------------------------------------------ */

function ObjectiveCard({ t }: { t: T }) {
  return (
    <AnimatedCard glowColor="245, 179, 76" className={`${CARD} rounded-tr-lg rounded-tl-[50px] rounded-bl-[50px]`}>
      <SectionTitle icon={<Quote className="size-5" />}>{t.labels.objective}</SectionTitle>
      <p className="relative z-10 text-xl md:text-2xl font-light leading-relaxed text-white/90">{t.objective}</p>

    </AnimatedCard>
  );
}

function ExperienceCard({ t }: { t: T }) {
  return (
    <AnimatedCard glowColor="56, 189, 248" tiltStrength={1} className={`${CARD} rounded-tl-lg rounded-tr-[50px] rounded-br-[50px]`}>
      <SectionTitle>{t.labels.experience}</SectionTitle>

      <Timeline>
        <ol className="relative flex flex-col gap-14">
          {t.experience.map((job) => {
            const data = EXPERIENCE_DATA[job.id as ExperienceId];
            return (
              <li key={job.id} data-tl-item className="relative pl-10 md:pl-14" style={{ "--job": data.glow } as React.CSSProperties}>
                {/* Marcador na linha */}
                <span
                  data-tl-dot
                  aria-hidden
                  className="absolute left-0 top-1.5 grid size-[15px] place-items-center rounded-full border border-[rgba(var(--job),0.6)] bg-[#131311] md:size-[23px]"
                >
                  <span className={`size-1.5 rounded-full bg-[rgb(var(--job))] md:size-2 ${data.current ? "animate-pulse" : ""}`} />
                </span>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="font-medium text-[rgb(var(--job))]">{job.period}</span>
                  {data.current && (
                    <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-950">
                      {t.labels.current}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-xl md:text-2xl font-light text-white">{job.role}</h3>
                <p className="mt-1 text-sm font-light text-white/50">
                  {job.company}
                  {job.place && <> · {job.place}</>}
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 font-extralight leading-7 text-white/80">
                      <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-[rgba(var(--job),0.7)]" />
                      {b}
                    </li>
                  ))}
                </ul>

                {job.highlights.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">{t.labels.highlights}</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {job.highlights.map((h) => (
                        <div
                          key={h.name}
                          className="group/hl relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-[#051824]/90 to-[#041e36]/90 p-4 transition-colors duration-300 hover:border-sky-400/40"
                        >
                          <div aria-hidden className="absolute -right-10 -top-10 size-28 rounded-full bg-sky-500/20 blur-2xl transition-opacity duration-500 group-hover/hl:opacity-100 opacity-50" />
                          <p className="relative text-lg font-medium text-white">{h.name}</p>
                          <p className="relative mt-1 text-sm font-light text-white/60">{h.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <ul className="mt-6 flex flex-wrap gap-2">
                  {data.stack.map((s) => (
                    <TechChip key={s} item={s} />
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </Timeline>
    </AnimatedCard>
  );
}

/* ------------------------------------------------------------------ */

function StackCard({ t }: { t: T }) {
  return (
    <AnimatedCard glowColor="74, 222, 128" className={`${CARD} rounded-tr-lg rounded-bl-[50px]`}>
      <div className="absolute left-1/2 top-1/2 -z-10 size-[1600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform">
        <div className="w-full h-full animate-rotate-bg">
          <Image src="/card-skills-bg.png" alt="" width={933} height={386} sizes="1010px" className="w-full h-full object-cover opacity-40" />
        </div>
      </div>
      <SectionTitle>{t.labels.stack}</SectionTitle>
      <div className="flex flex-col gap-6">
        {(Object.keys(STACK_GROUPS) as StackGroupId[]).map((g) => (
          <div key={g}>
            <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-white/40">{t.stackGroups[g]}</h3>
            <ul className="flex flex-wrap gap-2">
              {STACK_GROUPS[g].map((s) => (
                <TechChip key={s} item={s} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}

function EducationCard({ t }: { t: T }) {
  return (
    <AnimatedCard
      glowColor="56, 189, 248"
      className="relative w-full h-full overflow-hidden isolate rounded-[2rem] rounded-tl-lg rounded-tr-[50px] rounded-br-[50px] border border-white/5 bg-linear-to-br from-[#051824]/90 to-[#041e36]/95 p-6 md:p-12"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-[350px] w-[350px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <SectionTitle icon={<GraduationCap className="size-5" />}>{t.labels.education}</SectionTitle>
      <ul className="flex flex-col gap-5">
        {t.education.map((e) => (
          <li key={e.title} className="flex flex-col">
            <span className="text-sm text-sky-300/80">{e.period}</span>
            <span className="text-xl font-light text-white">{e.title}</span>
            <span className="text-sm font-light text-white/50">{e.school}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-white/10 pt-8">
        <SectionTitle icon={<Award className="size-5" />}>{t.labels.courses}</SectionTitle>
        <ul className="-mt-2 flex flex-col divide-y divide-white/5">
          {t.courses.map((c) => (
            <li key={c.title} className="flex items-baseline justify-between gap-4 py-3">
              <span className="font-light text-white/85">
                {c.title}
                {c.provider && <span className="text-white/40"> · {c.provider}</span>}
              </span>
              <span className="shrink-0 text-sm text-white/40 tabular-nums">{c.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </AnimatedCard>
  );
}

/* ------------------------------------------------------------------ */

function QualitiesCard({ t }: { t: T }) {
  return (
    <AnimatedCard glowColor="245, 179, 76" className={`${CARD} h-full rounded-br-lg rounded-tl-[50px]`}>
      <SectionTitle>{t.labels.qualities}</SectionTitle>
      <ul className="grid gap-4 sm:grid-cols-2">
        {t.qualities.map((q, i) => (
          <li
            key={q}
            className="group/q flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-amber-400/30 hover:bg-white/[0.04]"
          >
            <span className="text-2xl font-light tabular-nums text-amber-300/60 transition-colors group-hover/q:text-amber-300">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-light leading-7 text-white/80">{q}</span>
          </li>
        ))}
      </ul>
    </AnimatedCard>
  );
}

function LanguagesCard({ t }: { t: T }) {
  return (
    <AnimatedCard
      glowColor="251, 146, 60"
      className="relative h-full w-full overflow-hidden isolate rounded-[2rem] rounded-bl-lg rounded-tr-[50px] border border-white/5 bg-linear-to-br from-orange-600/70 to-amber-400/70 p-6 md:p-10"
    >
      <h2 className="mb-6 flex items-center gap-3 text-lg font-medium text-white/80">
        <Languages className="size-5" />
        {t.labels.languages}
      </h2>
      <ul className="flex flex-col gap-4">
        {t.languages.map((l) => (
          <li key={l.name}>
            <span className="block text-2xl font-light text-white">{l.name}</span>
            <span className="text-sm font-light text-white/80">{l.level}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 mb-4 text-lg font-medium text-white/80">{t.labels.contact}</h2>
      <div className="flex gap-2">
        <Link href={RESUME_CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          className="group border p-3 transition-all duration-300 hover:scale-105 hover:bg-[#0a66c2] hover:text-white">
          <LinkedinIcon className="transition-colors group-hover:fill-white" />
        </Link>
        <Link href={`mailto:${RESUME_CONTACT.email}`} aria-label="E-mail"
          className="border border-white p-3 transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#1593df]">
          <Mail />
        </Link>
      </div>
    </AnimatedCard>
  );
}

/* ------------------------------------------------------------------ */

/** Versão interativa do currículo (some na impressão; ver ResumePrint) */
export function Resume({ t }: { t: T }) {
  return (
    <div className="flex flex-col gap-4 md:gap-8 print:hidden">
      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-[3fr_1fr] md:gap-8">
        <HeroCard t={t} />
        <StatsCard t={t} />
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-[2fr_3fr] md:gap-8">
        {/* Objetivo acompanha a rolagem enquanto a timeline passa */}
        <div className="md:sticky md:top-8 md:self-start">
          <ObjectiveCard t={t} />
        </div>
        <ExperienceCard t={t} />
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
        <StackCard t={t} />
        <EducationCard t={t} />
      </section>

      <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-[3fr_1fr] md:gap-8">
        <QualitiesCard t={t} />
        <LanguagesCard t={t} />
      </section>
    </div>
  );
}
