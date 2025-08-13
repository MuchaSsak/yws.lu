import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/AboutUs/(components)/hero/HeroSection";
import OurMissionSection from "@/app/AboutUs/(components)/ourMission/OurMissionSection";
import RealImpactSection from "@/app/AboutUs//(components)/realImpact/RealImpactSection";
import TeamSection from "@/app/AboutUs/(components)/team/TeamSection";

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
      <TeamSection />
    </>
  );
}

export default AboutUsPage;
