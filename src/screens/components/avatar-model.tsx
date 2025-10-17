import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

export function AvatarModel() {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/avatar_3D.glb');

  // Leve rotação contínua pra dar vida
  useFrame(() => {
    if (group.current) group.current.rotation.y += 0.003;
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.4}         // ajuste o tamanho geral
      position={[0, -1.2, 0]} // move o modelo pra cima/baixo (ajuste fino)
    />
  );
}