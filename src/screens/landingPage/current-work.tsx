import { CardAnimatedAvatar } from "../components/card-animated-avatar";
import { CardCurrentWork, CardCurrentWorkPortfolio } from "../components/card-current-work";
import { CardPortfolio } from "../components/card-portfolio";

export function CurrentWork() {
    return (
        <section className="w-full grid mx-auto h-full">
            <div className="w-full mx-auto max-w-7xl grid grid-cols-1 gap-4 md:grid-cols-[4fr_5fr] md:gap-8">
                <CardCurrentWork />
                <CardCurrentWorkPortfolio />
            </div>
        </section>
    )
}