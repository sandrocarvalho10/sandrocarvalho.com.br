import type { Dictionary } from "@/i18n/dictionaries";
import { EXPERIENCE_DATA, RESUME_CONTACT, STACK_GROUPS, type ExperienceId, type StackGroupId } from "@/i18n/resume-data";
import { techIcon } from "../components/tech-icons";
import { TodoText } from "../components/todo-text";
import { PrintPhone } from "./print-phone";

type T = Dictionary["resume"];

const name = (item: string) => techIcon(item)?.title ?? item;

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-5 mb-2 border-b border-orange-500 pb-1 text-[11pt] font-bold uppercase tracking-wide text-orange-700 break-after-avoid">
      {children}
    </h2>
  );
}

/**
 * Versão de impressão do currículo: só aparece ao imprimir (Ctrl+P) e é a
 * fonte dos PDFs em public/curriculo. Feita para ATS (sistemas de triagem):
 * - uma coluna só, na ordem de leitura; sem tabelas, imagens ou ícones
 * - fonte padrão (Arial): a Archivo fazia o extrator de texto grudar
 *   palavras ("PHPe MySQL")
 * - títulos de seção convencionais e datas em MM/AAAA
 * - contatos com rótulo e URLs completas no corpo (não em cabeçalho de página)
 * O telefone só é inserido no cliente (PrintPhone): fica no PDF, mas não no
 * HTML servido da página pública.
 */
export function ResumePrint({ t }: { t: T }) {
  const L = t.labels;

  return (
    <article className="hidden print:block bg-white font-[Arial,Helvetica,sans-serif] text-[10pt] leading-snug text-neutral-800">
      <header className="border-b-2 border-neutral-900 pb-3">
        {/* <p> e não <h1>: a página já tem um h1 (versão de tela) */}
        <p className="text-[20pt] font-bold leading-tight text-neutral-950">{t.name}</p>
        <p className="text-[12pt] font-bold text-orange-700">{t.role}</p>
        <p className="mt-2 text-[9.5pt] text-neutral-700">
          {t.location}<PrintPhone label={L.phone} /> | E-mail: {RESUME_CONTACT.email}
        </p>
        <p className="text-[9.5pt] text-neutral-700">
          LinkedIn: {RESUME_CONTACT.linkedin} | GitHub: {RESUME_CONTACT.github}
        </p>
      </header>

      <H2>{L.summary}</H2>
      <p>{t.summary}</p>

      <H2>{L.experience}</H2>
      {t.experience.map((job, i) => {
        const data = EXPERIENCE_DATA[job.id as ExperienceId];
        // Cargos seguidos na mesma empresa: a stack aparece só uma vez, no último
        const showStack = t.experience[i + 1]?.company !== job.company;
        return (
          <section key={job.id} className="mb-3 break-inside-avoid">
            <h3 className="font-bold text-neutral-950">{job.role}</h3>
            <p className="text-neutral-700">
              {job.company}
              {job.place && ` | ${job.place}`} | {data.start} - {data.end ?? L.current}
            </p>
            {(job.bullets.length > 0 || job.highlights.length > 0) && (
            <ul className="mt-1 list-disc pl-5">
              {job.bullets.map((b) => <li key={b}><TodoText text={b} /></li>)}
              {job.highlights.map((h) => (
                <li key={h.name}>{h.name}: {h.text}</li>
              ))}
            </ul>
            )}
            {showStack && (
              <p className="mt-1 text-[9pt] text-neutral-600">
                {L.stack}: {data.stack.map(name).join(", ")}
              </p>
            )}
          </section>
        );
      })}

      <H2>{L.skills}</H2>
      <ul className="list-none">
        {(Object.keys(STACK_GROUPS) as StackGroupId[]).map((g) => (
          <li key={g}>
            <strong className="text-neutral-950">{t.stackGroups[g]}:</strong> {STACK_GROUPS[g].map(name).join(", ")}
          </li>
        ))}
      </ul>

      <H2>{L.education}</H2>
      {t.education.map((e) => (
        <p key={e.title} className="mb-1.5">
          <strong className="text-neutral-950">{e.title}</strong>
          <br />
          {e.school} | {e.period.replace(" — ", " - ")}
        </p>
      ))}

      <div className="break-inside-avoid">
        <H2>{L.courses}</H2>
        <ul className="list-disc pl-5">
          {t.courses.map((c) => (
            <li key={c.title}>
              {c.title}
              {c.provider && ` | ${c.provider}`} | {c.detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="break-inside-avoid">
        <H2>{L.languages}</H2>
        <ul className="list-disc pl-5">
          {t.languages.map((l) => (
            <li key={l.name}>{l.name}: {l.level}</li>
          ))}
        </ul>
      </div>

    </article>
  );
}
