import React from "react";

import HeroHeader from "@/app/TecConference/(components)/hero/HeroHeader";
import HeroCursor from "@/app/TecConference/(components)/hero/HeroCursor";
import HeroBackground from "@/app/TecConference/(components)/hero/HeroBackground";

function HeroSection() {
  return (
    <section className="xl:pt-48 max-xl:pt-32 relative min-h-screen px-side flex flex-col">
      {/* Background */}
      <HeroBackground />

      {/* Header */}
      <HeroHeader />

      {/* Cursor */}
      <HeroCursor />
    </section>
  );
}

export default HeroSection;
