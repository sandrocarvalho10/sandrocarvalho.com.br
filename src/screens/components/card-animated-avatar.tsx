export function CardAnimatedAvatar() {
    return (
        <div className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-[2rem] bg-[#131311] p-12 border border-white/5 backdrop-blur-lg">
        


            {/* Background animado */}
            <div className="absolute left-1/2 top-1/2 z-0 h-[1010px] w-[1010px] -translate-x-1/2 -translate-y-1/2 pointer-events-none will-change-transform">
                <div className="w-full h-full animate-rotate-bg">
                    <img
                        src="/card-background.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>
            </div>

           
        </div>

    )
}