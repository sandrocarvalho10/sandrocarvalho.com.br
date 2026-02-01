'use client';
import { AvatarModel } from "@/screens/components/avatar-model";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";


/**
 * Mini-doc: Manuseio do Modelo 3D
 * -------------------------------
 * Canvas props:
 *  - camera.position [x,y,z]: coloca a câmera 1,2 unidades à frente no eixo Z (modelo aparece mais próximo)
 *  - camera.fov 45°: campo de visão moderado; mantém proporções naturais do modelo
 *  - camera.rotation [0,0,0]: sem inclinação inicial; modelo fica de frente para o usuário
 *
 * Luzes:
 *  - ambientLight intensity 1: luz de preenchimento base para que nenhuma superfície fique totalmente preta
 *  - directionalLight position [3,3,3] intensity 6: luz principal forte vindo do canto superior-direito, projeta sombras suaves e destaques
 *
 * Suspense:
 *  - fallback null: cena vazia enquanto o modelo carrega; mantém o layout estável
 *
 * OrbitControls:
 *  - enableZoom false: impede zoom com scroll para que a seção hero permaneça previsível
 */


export function Hero() {

    return (
        <section className="w-full grid grid-cols-2 place-items-center h-full min-h-[600px]">

            <div className="w-full h-full flex flex-col justify-center items-center gap-4">
                <h1 className="text-4xl font-bold text-white">Sandro Carvalho</h1>
                <p className="text-lg text-white">Full Stack Developer</p>
            </div>
            <div className="w-full h-full flex justify-center items-center bg-radial-[at_50%_75%] from-orange-200 via-red-400 to-transparent to-60%">

            <Canvas camera={{ position: [0, 0, 1.2], fov: 45, rotation: [0, 0, 0]}} >
                <ambientLight intensity={1} />
                <directionalLight position={[3, 3, 3]} intensity={6} />
                <Suspense fallback={null}>
                    <AvatarModel />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
            </div>

        </section>
    )
}