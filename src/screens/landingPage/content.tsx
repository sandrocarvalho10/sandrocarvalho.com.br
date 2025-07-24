import { CardAnimatedAvatar } from "../components/card-animated-avatar";
import { CardPortfolio } from "../components/card-portfolio";

export function Content() {
    return (
        <section className="w-full grid mx-auto h-full">
            <div className="w-full mx-auto max-w-7xl xs:pt-14 xs:grid xs:grid-cols-1 xs:gap-4 md:grid md:grid-cols-2 md:gap-8 ">
                <CardPortfolio src="juninhopersonal.png" />
                <CardPortfolio src="mathias-imoveis.png" />
            </div>
        </section>
    );
}