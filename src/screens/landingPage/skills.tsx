import { CardAnimatedContactMe } from "../components/card-animated-contact-me";
import { CardSkills } from "../components/card-skills";

export function Skills() {
  return (
    <section className="w-full grid place-items-center h-full pb-6">
      <div className="w-full mx-auto max-w-7xl grid grid-cols-1 gap-4 md:grid-cols-[3fr_1fr] md:gap-8">
        <CardSkills />  
        <CardAnimatedContactMe />
      </div>
    </section>
  );
}