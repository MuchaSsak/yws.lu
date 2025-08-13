import React from "react";

import RealImpactHeader from "@/app/AboutUs/(components)/realImpact/RealImpactHeader";
import RealImpactCarousel from "@/app/AboutUs/(components)/realImpact/RealImpactCarousel";

function RealImpactSection() {
  return (
    <section className="px-side pb-36 flex items-center flex-col">
      {/* Header */}
      <RealImpactHeader />

      {/* Carousel */}
      <RealImpactCarousel />
    </section>
  );
}

export default RealImpactSection;
