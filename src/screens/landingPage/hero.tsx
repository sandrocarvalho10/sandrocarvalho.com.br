import { CardAnimated } from "../components/card-animated";
import { CardAnimatedAvatar } from "../components/card-animated-avatar";

export function Hero() {
    return (<section className="w-full grid place-items-center h-full">
        <div className="w-full max-w-6xl xs:grid xs:grid-cols-1 xs:gap-4 md:grid md:grid-cols-[3fr_1fr] md:gap-4 ">
            <CardAnimated />
            <CardAnimatedAvatar />
        </div>
    </section>)
}