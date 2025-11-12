import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function AvatarModel() {
   const group = useRef<THREE.Group>(null!);
   const { scene, animations } = useGLTF('/models/Waving.glb')
  const { actions } = useAnimations(animations, scene)

  useEffect(() => {
    // Ativa a animação principal (ex: "Idle" ou "Walk")
    const action = actions[Object.keys(actions)[0]]
    action?.play()
  }, [actions])


  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.4}
      position={[0, -2.3, 0]}
    />
  );
}
