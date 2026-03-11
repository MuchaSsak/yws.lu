import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/TecConference/(components)/hero/HeroSection";
import GlobeSection from "@/app/TecConference/(components)/globe/GlobeSection";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("tecConferenceMetadata");
}

/**
 * Page
 */
function TecConferencePage() {
  return (
    <>
      <HeroSection />
      <GlobeSection />
    </>
  );
}

export default TecConferencePage;
