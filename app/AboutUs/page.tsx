import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/AboutUs/(components)/hero/HeroSection";
import OurMissionSection from "@/app/AboutUs/(components)/ourMission/OurMissionSection";
import RealImpactSection from "@/app/AboutUs//(components)/realImpact/RealImpactSection";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("aboutUsMetadata");
}

/**
 * Page
 */
function AboutUsPage() {
  return (
    <>
      <HeroSection />
      <OurMissionSection />
      <RealImpactSection />
    </>
  );
}

export default AboutUsPage;
