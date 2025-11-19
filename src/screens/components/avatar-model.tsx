import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {  useRef } from "react";
import * as THREE from "three";

export function AvatarModel() {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/models/avatar_white.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003;
      
      const time = Date.now() * 0.001;
      
      scene.traverse((obj) => {
        if (obj.type === 'SkinnedMesh') {
          const mesh = obj as THREE.SkinnedMesh;
          if (mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
            
            const smileIndex = mesh.morphTargetDictionary['mouthSmile'];
            if (smileIndex !== undefined) {
              mesh.morphTargetInfluences[smileIndex] = Math.sin(time * 0.5) * 0.4 + 0.6;
            }
            //Configura os movimentos do Modelo 3D 
            /** O modelo pode parecer sorrindo ao passar o mouse  */

            // Quem decide o que aparece para voce na sua tela?

            const openIndex = mesh.morphTargetDictionary['mouthOpen'];
            if (openIndex !== undefined) {
              mesh.morphTargetInfluences[openIndex] = Math.sin(time * 0.3) * 0.2 + 0.3;
            }
          }
        }
      });
    }
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.4}
      position={[0, -2.3, 0]}
    />
  );
}
