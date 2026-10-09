import { PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";

/**
 * The 2025 hero house (CC BY 4.0, credited in the credits dialog; wiki: design/assets.md) with the same camera, light
 * and motion: a two-second intro spin, then a slow turn, draggable within limits. Meshopt-compressed, so no Draco
 * decoder is fetched.
 */
const MODEL = "/models/house.glb";
const INTRO_SECONDS = 2;
const INTRO_FROM = -Math.PI * 4;
const INTRO_TO = -Math.PI * 6.2;

/** The 2025 intro used GSAP's "expo.out". */
const expoOut = (progress: number) => (progress >= 1 ? 1 : 1 - 2 ** (-10 * progress));

interface Props {
  reducedMotion: boolean;
  onReady: () => void;
}

function House({ reducedMotion, onReady }: Props) {
  const { scene } = useGLTF(MODEL, false, true);
  const group = useRef<Group>(null);
  const started = useRef<number | null>(null);

  useEffect(onReady, [onReady]);

  useFrame(({ clock }, delta) => {
    const house = group.current;
    if (!house) return;
    if (reducedMotion) {
      house.rotation.y = INTRO_TO;
      return;
    }
    started.current ??= clock.elapsedTime;
    const progress = (clock.elapsedTime - started.current) / INTRO_SECONDS;
    if (progress < 1) house.rotation.y = INTRO_FROM + (INTRO_TO - INTRO_FROM) * expoOut(progress);
    else house.rotation.y -= delta * 0.1;
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.2} position-y={-5} />
    </group>
  );
}

export function HouseCanvas({ reducedMotion, onReady }: Props) {
  return (
    <Canvas camera={{ fov: 90, near: 0.1, far: 50, position: [0, 10, 25] }} dpr={[1, 2]}>
      <ambientLight intensity={2} />
      <Suspense fallback={null}>
        <PresentationControls polar={[-Math.PI / 8, Math.PI / 3]}>
          <House reducedMotion={reducedMotion} onReady={onReady} />
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
