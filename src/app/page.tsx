import { Content } from "@/screens/landingPage/content"
import { Header } from "@/screens/landingPage/header"
import { Hero } from "@/screens/landingPage/hero"

export default function Page() {
  return (
    <main className="flex flex-col w-full px-4 h-screen gap-6">
        <Header />
        <Hero />
        <Content />
    </main>
  )
}