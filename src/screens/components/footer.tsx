import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full mx-auto max-w-7xl px-1">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl rounded-tl-lg rounded-br-[40px] border border-white/5 bg-[#131311] px-6 py-5 text-sm backdrop-blur-lg">

        <div className="flex items-center gap-2 text-muted opacity-70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          online
        </div>

        <div className="text-muted opacity-60 text-center">
          Desenvolvido com ❤️ por Sandro &copy; {new Date().getFullYear()}. Todos os direitos reservados.
        </div>

        <div className="flex gap-3">
          <Link
            href="https://linkedin.com/in/sandro-carvalho-dev"
            className="group p-2 rounded-md text-muted opacity-60 hover:opacity-100 hover:bg-[#0a66c2] transition-all duration-200"
            target="_blank"
          >
            <LinkedinIcon size={16} className="group-hover:fill-white" />
          </Link>
          <Link
            href="https://github.com/sandrocarvalho10"
            className="group p-2 rounded-md text-muted opacity-60 hover:opacity-100 hover:bg-white/10 transition-all duration-200"
            target="_blank"
          >
            <GithubIcon size={16} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
