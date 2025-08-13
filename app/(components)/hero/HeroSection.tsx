"use client";

import HeroHeader from "@/app/(components)/hero/HeroHeader";
import HouseCanvas from "@/canvases/house/components/HouseCanvas";
import useViewportSize from "@/hooks/useViewportSize";

export const HERO_SECTION_ID = "hero-section";
const MIN_VIEWPORT_WIDTH_TO_RENDER_CANVAS_PX = 1280;

function HeroSection() {
  const { width } = useViewportSize();
  const shouldRenderCanvas = width >= MIN_VIEWPORT_WIDTH_TO_RENDER_CANVAS_PX;

  return (
    <section
      id={HERO_SECTION_ID}
      className="min-h-screen pt-48 px-side text-center flex"
    >
      {/* Header */}
      <HeroHeader />

      {/* 3D house canvas */}
      {shouldRenderCanvas && <HouseCanvas />}
    </section>
  );
}

export default HeroSection;
