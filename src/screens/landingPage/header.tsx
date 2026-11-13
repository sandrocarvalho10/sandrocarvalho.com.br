'use client';

import { Check, ChevronDown, FileDown, Globe, Menu, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { htmlLang, localeName, localePath, locales, type Locale, type SitePath } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries';
import { Flag } from '../components/flags';
import { menuItemClass, Popover } from '../components/popover';

interface HeaderProps {
  lang: Locale;
  /** Página atual, para o seletor de idioma manter o usuário nela */
  path: SitePath;
  t: Dictionary['nav'];
  resumePdf: string;
}

const navLink =
  'text-lg font-light text-white/50 transition-colors hover:text-white focus-visible:text-white outline-none';

function SoonBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-950">
      {children}
    </span>
  );
}

/** Ícone + título + subtítulo de um item do menu "Currículo" */
function ResumeItem({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-300 transition-colors group-hover/item:border-amber-400/40">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-medium text-white/90">{title}</span>
        <span className="text-xs font-light text-white/40">{hint}</span>
      </span>
    </>
  );
}

export function Header({ lang, path, t, resumePdf }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const home = localePath(lang, '/');
  const projectsHref = `${home}#projetos`;
  const resumeHref = localePath(lang, '/curriculo');
  const closeMobile = () => setIsOpen(false);

  return (
    <header className="relative z-50 w-full mx-auto bg-background shadow-sm print:hidden">
      {/* Desktop: grade de 3 colunas (logo | links no centro | idioma) */}
      <div className="mx-auto max-w-5xl px-4 py-10 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link href={home} className="text-2xl flex items-baseline" aria-label={t.home}>
          <span className='font-bold text-2xl'>
            Sandro
          </span>
          <span className='font-extralight opacity-50'>
            , Developer_
          </span>
        </Link>

        {/* Menu desktop (centro) */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href={projectsHref} className={navLink}>
            {t.projects}
          </Link>

          <Popover
            align="start"
            triggerClassName={`${navLink} inline-flex items-center gap-1 data-[open=true]:text-white`}
            trigger={
              <>
                {t.resume}
                <ChevronDown className="size-4 transition-transform duration-200 group-data-[open=true]/trigger:rotate-180" />
              </>
            }
            panelClassName="min-w-72"
          >
            {(close) => (
              <>
                <a href={resumePdf} download role="menuitem" onClick={close} className={`${menuItemClass} group/item`}>
                  <ResumeItem icon={<FileDown className="size-4" />} title={t.downloadPdf} hint={t.downloadPdfHint} />
                </a>
                <Link href={resumeHref} role="menuitem" onClick={close} className={`${menuItemClass} group/item`}>
                  <ResumeItem icon={<Sparkles className="size-4" />} title={t.interactive} hint={t.interactiveHint} />
                </Link>
              </>
            )}
          </Popover>

          <span aria-disabled className="inline-flex items-center gap-2 text-lg font-light text-white/30 cursor-default">
            {t.blog}
            <SoonBadge>{t.soon}</SoonBadge>
          </span>
        </nav>

        {/* Idioma (canto direito) */}
        <div className="hidden md:flex justify-self-end">
          <Popover
            label={t.language}
            align="end"
            triggerClassName="relative grid place-items-center text-white/40 transition-colors hover:text-white data-[open=true]:text-white outline-none focus-visible:text-white"
            trigger={
              <>
                <Globe className="size-6" />
                {/* Bandeira do idioma atual, como selo no globo */}
                <Flag locale={lang} className="absolute -right-1.5 -bottom-1 size-3.5" />
              </>
            }
          >
            {(close) =>
              locales.map((l) => (
                <Link
                  key={l}
                  href={localePath(l, path)}
                  hrefLang={htmlLang[l]}
                  lang={htmlLang[l]}
                  role="menuitem"
                  aria-current={l === lang ? 'true' : undefined}
                  onClick={close}
                  className={menuItemClass}
                >
                  <Flag locale={l} />
                  <span className="flex-1">{localeName[l]}</span>
                  {l === lang && <Check className="size-4 text-amber-300" />}
                </Link>
              ))
            }
          </Popover>
        </div>

        {/* Botão hambúrguer (mobile) */}
        <button
          className="md:hidden text-muted"
          aria-label={isOpen ? t.closeMenu : t.openMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile: abre com animação de altura (grid 0fr -> 1fr) */}
      <div
        id="mobile-menu"
        data-open={isOpen}
        inert={!isOpen}
        className="md:hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out data-[open=true]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <nav className="mx-4 mb-4 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#131311] p-2">
            <Link href={projectsHref} onClick={closeMobile} className={menuItemClass}>
              {t.projects}
            </Link>

            <span className="px-3 pt-3 pb-1 text-xs uppercase tracking-[0.2em] text-white/30">{t.resume}</span>
            <a href={resumePdf} download onClick={closeMobile} className={`${menuItemClass} group/item`}>
              <ResumeItem icon={<FileDown className="size-4" />} title={t.downloadPdf} hint={t.downloadPdfHint} />
            </a>
            <Link href={resumeHref} onClick={closeMobile} className={`${menuItemClass} group/item`}>
              <ResumeItem icon={<Sparkles className="size-4" />} title={t.interactive} hint={t.interactiveHint} />
            </Link>

            <span aria-disabled className={`${menuItemClass} text-white/30 hover:bg-transparent hover:text-white/30`}>
              {t.blog}
              <SoonBadge>{t.soon}</SoonBadge>
            </span>

            <div className="mt-2 flex gap-2 border-t border-white/10 px-1 pt-3" aria-label={t.language} role="group">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={localePath(l, path)}
                  hrefLang={htmlLang[l]}
                  lang={htmlLang[l]}
                  aria-current={l === lang ? 'true' : undefined}
                  onClick={closeMobile}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-2 text-sm text-white/60 transition-colors aria-[current=true]:border-amber-400/40 aria-[current=true]:text-white"
                >
                  <Flag locale={l} className="size-4" />
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
