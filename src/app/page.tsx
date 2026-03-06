import { Footer } from "@/screens/components/footer"
import { About } from "@/screens/landingPage/about"
import { Content } from "@/screens/landingPage/content"
import { CurrentWork } from "@/screens/landingPage/current-work"
import { Header } from "@/screens/landingPage/header"
import { Skills } from "@/screens/landingPage/skills"

export default function Page() {
  return (
    <main className="flex flex-col w-full px-4 h-screen gap-8 pb-8">
      <Header />
      <About />
      <CurrentWork />
      <Content />
      <Skills />
      <Footer />
    </main>
  )
}