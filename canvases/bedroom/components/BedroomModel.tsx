import React, { useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { ClipboardType, Download } from "@/lib/icons";
import { isMobile } from "@/lib/utils";
import useMousePosition from "@/hooks/useMousePosition";

function BedroomModel({ isTurnedRight }: { isTurnedRight: boolean }) {
  const bedroom = useGLTF("/models/bedroom.glb");
  const { camera, clock } = useThree();
  const [zoomInStatus, setZoomInStatus] = useState<
    "default" | "our homes" | "our journey"
  >("default");
  const ourHomesHighlightMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const ourJourneyHighlightMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
  const pointer = useMousePosition();
  const htmlPosition = ((): [x: number, y: number, z: number] => {
    const vpWidth = window.innerWidth;
    if (vpWidth > 1300) return [3.5, 0.5, 1];
    if (vpWidth > 900) return [2.5, 0.75, 1];
    if (vpWidth > 500) return [1.5, 1, 1];
    if (vpWidth > 420) return [0, 1.45, 1];
    if (vpWidth > 400) return [0, 1.45, 0.85];
    else return [0, 1.45, 0.75];
  })();

  useFrame((state) => {
    // Set camera lookAt target
    if (zoomInStatus === "default") setDefaultCameraLookAt();
    if (zoomInStatus === "our homes") setZoomInOurHomesCameraLookAt();
    if (zoomInStatus === "our journey") setZoomInOurJourneyCameraLookAt();

    const elapsedTime = state.clock.getElapsedTime();

    gsap.timeline().to(ourHomesHighlightMaterialRef.current, {
      opacity: Math.abs(Math.sin(elapsedTime * 0.5)),
      duration: 1,
      ease: "expo.out",
    });
    gsap.timeline().to(ourJourneyHighlightMaterialRef.current, {
      opacity: Math.abs(Math.sin(elapsedTime * 0.5)),
      duration: 1,
      ease: "expo.out",
    });
  });

  function setDefaultCameraLookAt() {
    const elapsedTime = clock.getElapsedTime();

    if (isMobile()) {
      // Follow the drag and move slightly on it's own
      camera.lookAt(
        new THREE.Vector3(
          -2,
          -0.15 - Math.cos(elapsedTime * 0.5) * 0.05,
          (isTurnedRight ? -2.5 : 0.1) - Math.sin(elapsedTime) * 0.08
        )
      );
    } else {
      // Follow the mouse and move slightly on it's own
      camera.lookAt(
        new THREE.Vector3(
          -2,
          -0.15 + pointer.y * 0.2 - Math.cos(elapsedTime * 0.5) * 0.05,
          0.1 - pointer.x * 0.4 - Math.sin(elapsedTime) * 0.08
        )
      );
    }

    camera.updateProjectionMatrix();
  }

  function setZoomInOurHomesCameraLookAt() {
    const elapsedTime = clock.getElapsedTime();

    if (isMobile()) {
      // Move slightly on it's own
      camera.lookAt(
        new THREE.Vector3(
          -3,
          -0.15 - Math.cos(elapsedTime * 0.5) * 0.05,
          -1.6 + Math.sin(elapsedTime * 0.5) * 1.6
        )
      );
    } else {
      // Follow the mouse and move slightly on it's own
      camera.lookAt(
        new THREE.Vector3(
          -3,
          -0.15 + pointer.y * 1.25 - Math.cos(elapsedTime * 0.5) * 0.05,
          -1.5 - pointer.x * 1.25 + Math.sin(elapsedTime) * 0.08
        )
      );
    }

    camera.updateProjectionMatrix();
  }

  function setZoomInOurJourneyCameraLookAt() {
    const elapsedTime = clock.getElapsedTime();

    if (isMobile()) {
      // Move slightly on it's own
      camera.lookAt(
        new THREE.Vector3(
          -3,
          -0.15 - Math.cos(elapsedTime * 0.5) * 0.05,
          -12 + Math.sin(elapsedTime) * 0.08
        )
      );
    } else {
      // Follow the mouse and move slightly on it's own
      camera.lookAt(
        new THREE.Vector3(
          -3,
          -0.15 + pointer.y * 1.25 - Math.cos(elapsedTime * 0.5) * 0.05,
          -12 - pointer.x * 1.75 + Math.sin(elapsedTime) * 0.08
        )
      );
    }

    camera.updateProjectionMatrix();
  }

  // Change camera position on our homes click
  function handleZoomInOurHomes() {
    if (zoomInStatus === "default") {
      setZoomInStatus("our homes");

      gsap.killTweensOf(camera.position, "x,y,z");
      gsap.to(camera.position, { x: -1, z: 1 });
    } else {
      setZoomInStatus("default");

      gsap.killTweensOf(camera.position, "x,y,z");
      gsap.to(camera.position, { x: 5, y: 0.1, z: 0.3, ease: "power2.inOut" });
    }
  }

  // Change camera position on our journey click
  function handleZoomInOurJourney() {
    if (zoomInStatus === "default") {
      setZoomInStatus("our journey");

      gsap.killTweensOf(camera.position, "x,y,z");
      gsap.to(camera.position, {
        x: 1,
        z: isMobile() ? 1.75 : 1,
        ease: "expo",
        duration: 1.5,
      });
    } else {
      setZoomInStatus("default");

      gsap.killTweensOf(camera.position, "x,y,z");
      gsap.to(camera.position, { x: 5, y: 0.1, z: 0.3, ease: "power2.inOut" });
    }
  }

  return (
    <group>
      <group
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "default")}
      >
        {/* Zoom into our homes click handler */}
        <mesh
          rotation-y={Math.PI * 0.5}
          position={[-2.5, 0.25, -1]}
          scale={[2.5, 2.5, 2]}
          onClick={handleZoomInOurHomes}
        >
          <boxGeometry />
          <meshBasicMaterial visible={false} colorWrite={false} />
        </mesh>

        {/* Zoom into our journey click handler */}
        <mesh
          rotation-y={Math.PI * 4}
          position={[-0.5, 0, -1.85]}
          scale={[2.5, 2, 2]}
          onClick={handleZoomInOurJourney}
        >
          <planeGeometry />
          <meshBasicMaterial visible={false} colorWrite={false} />
        </mesh>

        {/* Our homes highlight */}
        <mesh
          rotation-y={Math.PI * 0.5}
          position={[-3.35, 1.24, -1.14]}
          scale={[0.75, 0.35, 1]}
        >
          <planeGeometry />
          <meshBasicMaterial transparent ref={ourHomesHighlightMaterialRef} />
        </mesh>

        {/* Our journey highlight */}
        <mesh
          rotation-y={Math.PI * 4}
          position={[-0.035, 0.025, -1.875]}
          scale={[1.65, 1.8, 1.75]}
        >
          <planeGeometry />
          <meshBasicMaterial transparent ref={ourJourneyHighlightMaterialRef} />
        </mesh>
      </group>

      <Html position={htmlPosition}>
        <h1 className="pb-6 font-black select-none text-background text-7xl">
          Youth Work Synergy
        </h1>
        <p className="text-2xl italic font-bold text-background select-none max-xl:[filter:drop-shadow(0_0_2px_var(--foreground))]">
          Unlock your future with affordable shared living in Luxembourg
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 pt-5">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeak3NN_4Ds3Iv7q8kCcJC7us8QsNb3FD2wZi1ausdO0mMstA/viewform"
            target="_blank"
            className="max-2xl:text-orange-950 2xl:border-orange-500 max-2xl:bg-orange-500/85 hover:text-background focus-within:text-background focus-within:border-white hover:border-white rounded-full px-4 py-2 2xl:text-orange-500 flex items-center gap-2 justify-center hover:scale-90 focus-within:scale-90 transition-[color,border-color,scale] focus-within:ring-4 border-2 font-medium border-foreground"
          >
            <span>FILL OUT THE FORM</span>
            <ClipboardType strokeWidth={1.5} />
          </a>

          <a
            href="/files/brochure.pdf"
            target="_blank"
            className="max-2xl:text-orange-950 2xl:border-orange-500 max-2xl:bg-orange-500/85 hover:text-background focus-within:text-background focus-within:border-background hover:border-background rounded-full px-4 py-2 2xl:text-orange-500 flex items-center gap-2 justify-center hover:scale-90 focus-within:scale-90 transition-[color,border-color,scale] focus-within:ring-4 border-2 font-medium border-foreground"
          >
            <span>DOWNLOAD BROCHURE</span>
            <Download strokeWidth={1.5} />
          </a>
        </div>
      </Html>

      {/* Model */}
      <primitive object={bedroom.scene} scale={0.01} />
    </group>
  );
}

useGLTF.preload("/models/loft_bedroom.glb");

export default BedroomModel;
