import { LinkedinIcon, Mail } from "lucide-react";
import Link from "next/link";

export function CardAnimatedContactMe() {
    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-[2rem] rounded-tl-lg rounded-tr-[50px] bg-linear-to-br from-orange-600/70 to-amber-400/70  p-4 border border-white/5 backdrop-blur-lg min-h-[400px]">
            {/* Radial blur com anéis concêntricos em tons de amarelo com centro na parte inferior */}
            {/* <div className="absolute inset-0 z-0" style={{
                background: 'radial-gradient(circle at 50% 100%, #FFD700 0%, #FFD700 20%, #FFC000 20%, #FFC000 40%, #FFAA00 40%, #FFAA00 60%, #FF8C00 60%, #FF8C00 80%, #FF6F00 80%, #FF6F00 100%)',
                opacity: 0.7
            }}></div> */}

            {/* Camada de brilho suave para suavizar levemente as bordas */}
            <div className="absolute inset-0 z-1" style={{
                background: 'radial-gradient(circle at 50% 100%, rgba(255,215,0,0.4) 0%, transparent 70%)',
                mixBlendMode: 'overlay'
            }}></div>

            {/* Background animado */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="absolute z-20 bottom-0 left-0 w-full">
                    <img
                        src="/avatar.png"
                        alt="Background"
                        className="w-[400px] object-cover absolute -right-14 bottom-0 opacity-90"
                    // style={{ filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))' }}
                    />
                </div>
            </div>

            {/* Conteúdo */}
            <div className="relative z-30 pt-4 pl-4  w-full max-w-[80%]">
                <h2 className="text-3xl font-medium text-white mb-8">
                    Contate-me
                </h2>
                <div className="font-light text-white w-full max-w-[70%]">
                    Entre em contato via e-mail ou linkedin
                </div>

                <div className="w-32 py-12 flex flex-col justify-center items-center ">

                    <Link href="https://www.linkedin.com/in/sandro-carvalho-dev/" className="p-3 border rounded-none hover:text-amber-400 transition-colors" target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon className="hover:text-amber-400 transition-colors" />
                    </Link>


                    <Link href="mailto:sandrocarvalho@outlook.com" className="p-3 border rounded-none hover:text-amber-400 transition-colors" target="_blank" rel="noopener noreferrer">
                        <Mail className="hover:text-amber-400 transition-colors" />
                    </Link>

                </div>
            </div>

        </div>

    )
}