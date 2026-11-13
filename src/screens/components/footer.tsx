import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="w-full mx-auto max-w-5xl px-4 py-4 flex items-center justify-center print:hidden">
      <div className="text-base flex items-baseline text-center">
        {t.madeBy} &copy; {new Date().getFullYear()}. {t.rights}
      </div>
    </footer>
  )
}
