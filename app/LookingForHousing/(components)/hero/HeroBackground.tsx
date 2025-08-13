"use client";

import React from "react";

import useViewportSize from "@/hooks/useViewportSize";
import { Vortex } from "@/components/ui/vortex";

function HeroBackground() {
  const { width } = useViewportSize();

  return (
    <div className="absolute top-16 h-[35rem] w-full z-[-1]">
      <div className="w-full relative h-[35rem]">
        <Vortex
          rangeY={220}
          baseHue={300}
          particleCount={width <= 600 ? 400 : 700}
          backgroundColor="transparent"
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        />
      </div>
    </div>
  );
}

export default HeroBackground;
