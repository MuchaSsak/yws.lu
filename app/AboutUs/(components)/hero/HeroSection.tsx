import React from "react";

import HeroHeader from "@/app/AboutUs/(components)/hero/HeroHeader";
import HeroImage from "@/app/(components)/hero/HeroImage";

function HeroSection() {
  return (
    <section className="xl:py-48 max-xl:py-36 gap-4 px-side flex items-center justify-between max-xl:flex-col max-xl:gap-12">
      {/* Header */}
      <HeroHeader />

      {/* Image */}
      <HeroImage />
    </section>
  );
}

export default HeroSection;
