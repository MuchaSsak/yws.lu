import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";

import { ArrowBigRight } from "@/lib/icons";
import LoadingCube from "@/canvases/components/LoadingCube";
import ZoomController from "@/canvases/components/ZoomController";
import BedroomModel from "@/canvases/bedroom/components/BedroomModel";

export const BEDROOM_SECTION_ID = "bedroom-section";

function BedroomCanvas() {
  const [isTurnedRight, setIsTurnedRight] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <section id={BEDROOM_SECTION_ID} className="bg-[#140c09] h-screen">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [5, 0.1, 0.4],
        }}
      >
        {/* Lights */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 29, 3]} intensity={1} color="orange" />

        {/* Post processing */}
        <EffectComposer>
          <Bloom mipmapBlur intensity={2} luminanceThreshold={0.5} />
          <Vignette offset={0.5} darkness={0.5} />
        </EffectComposer>

        <Suspense fallback={<LoadingCube />}>
          <ZoomController>
            <BedroomModel isTurnedRight={isTurnedRight} />
          </ZoomController>
        </Suspense>
      </Canvas>

      {/* Look right/left for mobile */}
      <button
        ref={buttonRef}
        className="absolute p-2 transition-transform duration-300 rounded-full cursor-pointer min-[1100px]:hidden max-sm:bottom-64 sm:bottom-40 right-6 bg-background/85"
        onClick={() => {
          setIsTurnedRight((prev) => !prev);

          if (!buttonRef.current) return;
          buttonRef.current.style.transform = `rotate(${
            isTurnedRight ? "0deg" : "180deg"
          })`;
        }}
      >
        <ArrowBigRight className="fill-black/75 stroke-none" />
      </button>
    </section>
  );
}

export default BedroomCanvas;
