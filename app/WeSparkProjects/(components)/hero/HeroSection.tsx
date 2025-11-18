import React from "react";

import HeroHeader from "@/app/WeSparkProjects/(components)/hero/HeroHeader";
import ProjectsList from "@/app/WeSparkProjects/(components)/projectsList/ProjectsList";

function HeroSection() {
  return (
    <section className="xl:py-48 max-xl:py-32 relative min-h-screen px-side flex flex-col">
      {/* Header */}
      <HeroHeader />

      {/* Projects list */}
      <ProjectsList />
    </section>
  );
}

export default HeroSection;
