import { CardAnimatedAvatar } from "../components/card-animated-avatar";
import { CardSkills } from "../components/card-skills";

export function Skills() {
  return (
    <section className="w-full grid place-items-center h-full">
      <div className="w-full mx-auto max-w-7xl  xs:grid xs:grid-cols-1 xs:gap-4 md:grid md:grid-cols-[3fr_1fr] md:gap-8">
        <CardSkills />  
        <CardAnimatedAvatar />
      </div>
    </section>
  );
}