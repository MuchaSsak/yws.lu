import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import Rocket from "@/canvases/rocket/components/RocketModel";

function RocketCanvas() {
  return (
    <div className="h-[36rem] w-full">
      <Canvas
        camera={{
          fov: 90,
          near: 0.1,
          far: 50,
          position: [0, 7.5, 15],
        }}
      >
        <Suspense
          fallback={
            <mesh scale={10} rotation-x={Math.PI * 0.5} position-y={3}>
              <boxGeometry />
              <meshBasicMaterial color="#ff6900" wireframe />
            </mesh>
          }
        >
          {/* Lights */}
          <ambientLight intensity={2} />
          <directionalLight
            color="orangered"
            intensity={4}
            position={[-3, -3, 3]}
          />
          <directionalLight
            color="white"
            intensity={2.5}
            position={[10, 10, 1]}
          />

          <Rocket />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default RocketCanvas;
