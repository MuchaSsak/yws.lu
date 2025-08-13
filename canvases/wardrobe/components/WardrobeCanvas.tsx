import React, { Suspense } from "react";
import { PresentationControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Cabinet from "@/canvases/wardrobe/components/WardrobeModel";

function WardrobeCanvas() {
  return (
    <div className="h-[36rem] flex-1">
      <Canvas
        camera={{
          fov: 90,
          near: 0.1,
          far: 50,
          position: [0, 5, 25],
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
          <ambientLight intensity={4} />

          <PresentationControls snap polar={[-Math.PI / 8, Math.PI / 3]}>
            <Cabinet />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default WardrobeCanvas;
