function CardHeader() {

    return (
        <div className="w-full flex items-center justify-between">
            <h4 className="text-base font-light text-white opacity-80">
                Sempre procurando aprender e evoluir...
            </h4>

        </div>
    )
}

function CardContent() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-normal w-full leading-10 max-w-[50%]">Atualmente eu estou aprendendo no curso.dev</h1>
            <p className="text-base font-extralight leading-9 max-w-[60%]">
                Estou aprimorando minhas habilidades em React, TypeScript e Next.js, Node.js com foco em performance e escalabilidade. Além disso, estou explorando novas tecnologias e ferramentas para melhorar minha produtividade e qualidade de código.
            </p>
        </div>
    )
}

export function CardSkills() {
    return (
        <div className="relative w-full max-w-5xl overflow-hidden h-auto flex flex-col gap-4 rounded-[2rem] bg-[#131311] p-12 border border-white/5 backdrop-blur-lg rounded-tr-lg rounded-bl-[50px]">



            {/* Background animado */}
            <div className="absolute left-1/2 top-1/2 z-0 h-[1010px] w-[1010px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform">
                <div className="w-full animate-rotate-bg">
                    <img
                        src="/card-skills-bg.png"
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