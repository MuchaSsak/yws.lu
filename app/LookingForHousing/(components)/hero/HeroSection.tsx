import React from "react";

import HeroHeader from "@/app/LookingForHousing/(components)/hero/HeroHeader";
import HeroBackground from "@/app/LookingForHousing/(components)/hero/HeroBackground";

function HeroSection() {
  return (
    <section className="xl:py-64 max-xl:py-48 relative px-side flex flex-col items-center">
      {/* Header */}
      <HeroHeader />

      {/* Background */}
      <HeroBackground />
    </section>
  );
}

export default HeroSection;
