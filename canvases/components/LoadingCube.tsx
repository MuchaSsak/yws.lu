import React, { useRef } from "react";
import * as THREE from "three";
import { Center, Html, useProgress } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function LoadingCube() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();

  useFrame((_, delta) => {
    if (!cubeRef.current) return;
    cubeRef.current.rotation.y += delta;
  });

  return (
    <Center>
      <Html className="transform [transform:translateX(-50%)!important] top-1/3 left-1/2">
        <h3 className="text-3xl tracking-wider text-white w-max">
          Loading:{" "}
          <span className="font-bold text-orange-500">
            {progress.toFixed(2)}%
          </span>
        </h3>
      </Html>

      <mesh ref={cubeRef} rotation-z={-Math.PI * 0.05} position-y={-1}>
        <boxGeometry />
        <meshBasicMaterial wireframe />
      </mesh>
    </Center>
  );
}

export default LoadingCube;
