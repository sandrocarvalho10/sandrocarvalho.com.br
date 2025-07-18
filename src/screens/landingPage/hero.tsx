import { CardAnimated } from "../components/card-animated";
import { CardAnimatedAvatar } from "../components/card-animated-avatar";

export function Hero() {
    return (<section className="w-full grid place-items-center h-full">
        <div className="w-full max-w-6xl grid grid-cols-[3fr_1fr] gap-4">
            <CardAnimated />
            <CardAnimatedAvatar />
        </div>
    </section>)
}