import React from "react";

import HeroHeader from "@/app/WeSparkProjects/(components)/hero/HeroHeader";

function HeroSection() {
  return (
    <section className="xl:py-64 max-xl:py-48 relative px-side flex flex-col items-center">
      {/* Header */}
      <HeroHeader />
    </section>
  );
}

export default HeroSection;
