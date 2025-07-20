export function CardAnimatedAvatar() {
    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-[2rem] bg-[#131311] p-12 border border-white/5 backdrop-blur-lg">
            {/* Radial blur com anéis concêntricos em tons de amarelo com centro na parte inferior */}
            <div className="absolute inset-0 z-0" style={{
                background: 'radial-gradient(circle at 50% 100%, #FFD700 0%, #FFD700 20%, #FFC000 20%, #FFC000 40%, #FFAA00 40%, #FFAA00 60%, #FF8C00 60%, #FF8C00 80%, #FF6F00 80%, #FF6F00 100%)',
                opacity: 0.7
            }}></div>
            
            {/* Camada de brilho suave para suavizar levemente as bordas */}
            <div className="absolute inset-0 z-1" style={{
                background: 'radial-gradient(circle at 50% 100%, rgba(255,215,0,0.4) 0%, transparent 70%)',
                mixBlendMode: 'overlay'
            }}></div>

            {/* Background animado */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="absolute z-20 bottom-0 left-0 w-full">
                    <img
                        src="/avatar1.png"
                        alt="Background"
                        className="w-full object-contain opacity-90"
                        style={{ filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))' }}
                    />
                </div>
            </div>
           
        </div>

    )
}