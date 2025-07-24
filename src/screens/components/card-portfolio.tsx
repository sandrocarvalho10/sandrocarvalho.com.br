interface  ICardPortfolioProps {
    src?: string;
    alt?: string;
}

export function CardPortfolio({
    src = "/juninhopersonal.png",
    alt = "Background"
}: ICardPortfolioProps) {
    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-[2rem] bg-[#131311] p-12 border border-white/5 backdrop-blur-lg min-h-[300px] aspect-video">
            {/* Radial blur com anéis concêntricos em tons de azul com centro na parte inferior */}
            <div className="absolute inset-0 z-0" style={{
                background: 'radial-gradient(circle at 50% 100%, #00BFFF 0%, #00BFFF 20%, #1E90FF 20%, #1E90FF 40%, #4169E1 40%, #4169E1 60%, #6495ED 60%, #6495ED 80%, #7B68EE 80%, #7B68EE 100%)',
                opacity: 0.7
            }}></div>
            
            {/* Camada de brilho suave para suavizar levemente as bordas */}
            <div className="absolute inset-0 z-1" style={{
                background: 'radial-gradient(circle at 50% 100%, rgba(0,191,255,0.4) 0%, transparent 70%)',
                mixBlendMode: 'overlay'
            }}></div>

            {/* Background animado */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="absolute z-20 inset-0">
                    <img
                        src={src}
                        alt={alt}
                        className="w-full h-full object-cover opacity-90"
                        style={{ filter: 'drop-shadow(0 0 15px rgba(0, 191, 255, 0.6))' }}
                    />
                </div>
            </div>
           
        </div>
    )
}