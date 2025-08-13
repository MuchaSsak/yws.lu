import React from "react";

import HeroSection from "@/app/(components)/hero/HeroSection";
import WhoWeAreSection from "@/app/(components)/whoWeAre/WhoWeAreSection";
import HousingSection from "@/app/(components)/housing/HousingSection";
import ProjectsSection from "@/app/(components)/projects/ProjectsSection";
import ContactSection from "@/app/(components)/contact/ContactSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <WhoWeAreSection />
      <HousingSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}

export default HomePage;
