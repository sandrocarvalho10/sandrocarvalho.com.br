import { Footer } from "@/screens/components/footer"
import { About } from "@/screens/landingPage/about"
import { Content } from "@/screens/landingPage/content"
import { Header } from "@/screens/landingPage/header"
import { Hero } from "@/screens/landingPage/hero"

import { Skills } from "@/screens/landingPage/skills"

export default function Page() {
  return (
    <main className="flex flex-col w-full px-4 h-screen gap-8 pb-8">
        <Header />
        <Hero />
        <About />
        <Content />
        <Skills />
        <Footer />
    </main>
  )
}