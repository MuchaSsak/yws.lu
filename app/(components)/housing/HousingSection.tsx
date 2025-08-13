"use client";

import React from "react";

import WardrobeCanvas from "@/canvases/wardrobe/components/WardrobeCanvas";
import useViewportSize from "@/hooks/useViewportSize";
import HousingHeader from "@/app/(components)/housing/HousingHeader";

const MIN_VIEWPORT_WIDTH_TO_RENDER_CANVAS_PX = 1280;

function HousingSection() {
  const { width } = useViewportSize();
  const shouldRenderCanvas = width >= MIN_VIEWPORT_WIDTH_TO_RENDER_CANVAS_PX;

  return (
    <section className="flex max-xl:justify-center px-side pb-32">
      {/* 3D wardrobe canvas */}
      {shouldRenderCanvas && <WardrobeCanvas />}

      {/* Header */}
      <HousingHeader />
    </section>
  );
}

export default HousingSection;
