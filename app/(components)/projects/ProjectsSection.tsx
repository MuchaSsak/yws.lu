"use client";

import React from "react";

import useViewportSize from "@/hooks/useViewportSize";
import RocketCanvas from "@/canvases/rocket/components/RocketCanvas";
import ProjectsHeader from "@/app/(components)/projects/ProjectsHeader";

const MIN_VIEWPORT_WIDTH_TO_RENDER_CANVAS_PX = 1280;

function ProjectsSection() {
  const { width } = useViewportSize();
  const shouldRenderCanvas = width >= MIN_VIEWPORT_WIDTH_TO_RENDER_CANVAS_PX;

  return (
    <section className="flex max-xl:justify-center px-side pb-32">
      {/* Header */}
      <ProjectsHeader />

      {/* 3D wardrobe canvas */}
      {shouldRenderCanvas && <RocketCanvas />}
    </section>
  );
}

export default ProjectsSection;
