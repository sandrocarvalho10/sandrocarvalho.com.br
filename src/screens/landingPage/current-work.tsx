import type { Dictionary } from "@/i18n/dictionaries";
import { CardCurrentWork, CardCurrentWorkPortfolio } from "../components/card-current-work";

export function CurrentWork({ t }: { t: Dictionary["currentWork"] }) {
    return (
        <section className="w-full grid mx-auto h-full">
            <div className="w-full mx-auto max-w-7xl grid grid-cols-1 gap-4 md:grid-cols-[4fr_5fr] md:gap-8">
                <CardCurrentWork t={t} />
                <CardCurrentWorkPortfolio t={t} />
            </div>
        </section>
    )
}
