import { CardAnimated } from "../components/card-animated";
import { CardAnimatedAvatar } from "../components/card-animated-avatar";

export function About() {
    return (<section className="w-full grid place-items-center h-full">
        <div className="w-full max-w-7xl grid grid-cols-1 gap-4 md:grid-cols-[3fr_1fr] md:gap-8">
            <CardAnimated />
            <CardAnimatedAvatar />
        </div>
    </section>)
}