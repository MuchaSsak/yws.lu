import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/TecConference/(components)/hero/HeroSection";

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
    </>
  );
}

export default TecConferencePage;
