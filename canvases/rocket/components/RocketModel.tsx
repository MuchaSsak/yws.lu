import React, { useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

function RocketModel() {
  const rocket = useGLTF("/models/rocket.glb");
  const mixer = useMemo(() => new THREE.AnimationMixer(rocket.scene), [rocket]);

  useThree(() => {
    mixer.clipAction(rocket.animations[0]).play();
  });

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  return (
    <primitive
      object={rocket.scene}
      scale={0.075}
      position-y={-7.5}
      position-x={1}
      rotation-x={Math.PI * 1.92}
      rotation-z={Math.PI * 0.05}
    />
  );
}

useGLTF.preload("/models/rocket.glb");

export default RocketModel;
