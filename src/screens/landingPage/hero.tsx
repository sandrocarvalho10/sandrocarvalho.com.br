'use client';
import { AvatarModel } from "@/screens/components/avatar-model";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";


export function Hero() {

    return (
        <section className="w-full grid place-items-center h-full min-h-[600px]">
            <Canvas camera={{ position: [0, 1.5, 3], fov: 45 }}>

                <ambientLight intensity={0.6} />
                <directionalLight position={[3, 3, 3]} intensity={1.2} />
                <Suspense fallback={null}>
                    <AvatarModel />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>

        </section>
    )
}