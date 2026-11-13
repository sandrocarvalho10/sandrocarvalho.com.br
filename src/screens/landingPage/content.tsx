import type { Dictionary } from "@/i18n/dictionaries";
import { CardPortfolio } from "../components/card-portfolio";

export function Content({ t }: { t: Dictionary["projects"] }) {
    return (
        // Âncora do item "Projetos" do menu
        <section id="projetos" aria-label={t.title} className="w-full grid mx-auto h-full scroll-mt-8">
            <div className="w-full mx-auto max-w-7xl grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                <CardPortfolio src="juninhopersonal.png" alt={t.juninho} />
                <CardPortfolio src="mathias-imoveis.png" alt={t.mathias} side="right" />
            </div>
        </section>
    );
}
