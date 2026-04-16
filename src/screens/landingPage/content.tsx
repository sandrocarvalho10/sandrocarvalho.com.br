import { CardAnimatedAvatar } from "../components/card-animated-avatar";
import { CardPortfolio } from "../components/card-portfolio";

export function Content() {
    return (
        <section className="w-full grid mx-auto h-full">
            <div className="w-full mx-auto max-w-7xl grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                <CardPortfolio src="juninhopersonal.png" />
                <CardPortfolio src="mathias-imoveis.png" />
            </div>
        </section>
    );
}