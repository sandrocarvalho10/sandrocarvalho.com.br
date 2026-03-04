import { CardAnimatedAvatar } from "../components/card-animated-avatar";
import { CardCurrentWork, CardCurrentWorkPortfolio } from "../components/card-current-work";
import { CardPortfolio } from "../components/card-portfolio";

export function CurrentWork() {
    return (
        <section className="w-full grid mx-auto h-full">
            <div className="w-full mx-auto max-w-7xl xs:pt-14 xs:grid xs:grid-cols-1 xs:gap-4 md:grid md:grid-cols-[4fr_5fr] md:gap-8 ">
                <CardCurrentWork />
                <CardCurrentWorkPortfolio />
            </div>
        </section>
    )
}