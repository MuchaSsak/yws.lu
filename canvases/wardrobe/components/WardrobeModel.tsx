import React, { useRef } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function WardrobeModel() {
  const wardrobe = useGLTF("/models/wardrobe.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsedTime = state.clock.getElapsedTime();

    groupRef.current.rotation.y = Math.sin(elapsedTime * 0.35);
  });

  return (
    <group ref={groupRef}>
      <primitive object={wardrobe.scene} scale={0.1} position-y={-10} />
    </group>
  );
}

useGLTF.preload("/models/wardrobe.glb");

export default WardrobeModel;
