import { Github, Instagram, Linkedin } from "lucide-react";


function CardHeader() {

    return (
        <div className="w-full flex items-center justify-between ">
            <div className="flex gap-4 items-center ">

                <span className="rounded-full bg-amber-500 w-14 border-amber-700 aspect-square">
                    <img
                        src="/avatar.png"
                        alt="Avatar"
                        className="w-full h-full object-cover rounded-full"
                    />
                </span>
                <div className="text-sm font-light flex flex-col gap-0">
                    <span className="text-white opacity-60 font-medium text-lg">Olá, Eu sou Sandro.</span>
                    <span className="text-sm opacity-40">Front-End Developer</span>
                </div>

            </div>
            <div className="flex gap-2 items-center">
                <Linkedin />
                <Instagram />
                <Github />
            </div>

        </div>
    )
}

function CardContent() {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-5xl font-light w-full max-w-[90%] leading-16">Apaixonado por transformar ideias em projetos e interfaces eficientes.</h1>
            <p className="text-lg font-extralight leading-10 max-w-[60%]">Com mais de 5 anos de experiência em Desenvolvimento Web, encaro cada projeto como uma chance de aprender, evoluir e entregar valor através do código.
            </p>
        </div>
    )
}

export function CardAnimated() {
    return (
        <div className="relative w-full max-w-5xl overflow-hidden h-auto flex flex-col gap-12 rounded-[2rem] bg-[#131311] p-12 border border-white/5 backdrop-blur-lg rounded-br-lg rounded-tr-[50px]">
        


            {/* Background animado */}
            <div className="absolute left-1/2 top-1/2 z-0 h-[1010px] w-[1010px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform">
                <div className="w-full animate-rotate-bg">
                    <img
                        src="/card-background.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
            </div>

            <CardHeader />
            <CardContent />
        </div>

    )
}