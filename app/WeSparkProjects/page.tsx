import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/WeSparkProjects/(components)/hero/HeroSection";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("aboutUsMetadata");
  // TODO: Uncomment
  //   return generateTranslatedMetadata("weSparkProjectsMetadata");
}

/**
 * Page
 */
function WeSparkProjectsPage() {
  return (
    <>
      <HeroSection />
    </>
  );
}

export default WeSparkProjectsPage;
