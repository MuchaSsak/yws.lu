import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/LookingForHousing/(components)/hero/HeroSection";
import HowItWorksSection from "@/app/LookingForHousing/(components)/howItWorks/HowItWorksSection";
import WhoGetsPrioritySection from "@/app/LookingForHousing/(components)/whoGetsPriority/WhoGetsPrioritySection";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("lookingForHousingMetadata");
}

/**
 * Page
 */
function LookingForHousingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <WhoGetsPrioritySection />
    </>
  );
}

export default LookingForHousingPage;
