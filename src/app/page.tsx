import { Header } from "@/screens/landingPage/header"
import { Hero } from "@/screens/landingPage/hero"

export default function Page() {
  return (
    <div className="flex flex-col w-full px-4 h-screen">
        <Header />
        <Hero />

    </div>
  )
}