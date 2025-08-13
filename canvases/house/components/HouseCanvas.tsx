"use client";

import React, { Suspense } from "react";
import { PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import House from "@/canvases/house/components/HouseModel";

function HouseCanvas() {
  return (
    <div className="xl:h-[32.5rem] 2xl:h-[40rem] flex-grow">
      <Canvas
        camera={{
          fov: 90,
          near: 0.1,
          far: 50,
          position: [0, 10, 25],
        }}
      >
        <Suspense
          fallback={
            <mesh scale={15}>
              <boxGeometry />
              <meshBasicMaterial color="#ff6900" wireframe />
            </mesh>
          }
        >
          {/* Lights */}
          <ambientLight intensity={2} />

          <PresentationControls polar={[-Math.PI / 8, Math.PI / 3]}>
            <House />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HouseCanvas;
