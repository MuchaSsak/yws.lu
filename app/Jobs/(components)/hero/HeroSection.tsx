import React from "react";

import HeroHeader from "@/app/Jobs/(components)/hero/HeroHeader";
import HeroBackground from "@/app/Jobs/(components)/hero/HeroBackground";

function HeroSection() {
  return (
    <section className="xl:pt-48 max-xl:pt-32 relative px-side flex flex-col">
      {/* Background */}
      <HeroBackground />

      {/* Header */}
      <HeroHeader />
    </section>
  );
}

export default HeroSection;
