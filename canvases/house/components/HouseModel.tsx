"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import { HERO_SECTION_ID } from "@/app/(components)/hero/HeroSection";
import gsapRotateModel from "@/lib/animations/gsapRotateModel";

function HouseModel() {
  const house = useGLTF("/models/house.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y -= delta * 0.1;
  });

  useGSAP(() => {
    if (!groupRef.current) return;

    gsapRotateModel(groupRef.current.rotation, `#${HERO_SECTION_ID}`);
  });

  return (
    <group ref={groupRef}>
      <primitive object={house.scene} scale={1.2} position-y={-5} />
    </group>
  );
}

useGLTF.preload("/models/house.glb");

export default HouseModel;
