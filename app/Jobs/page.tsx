import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/Jobs/(components)/hero/HeroSection";
import OffersList from "@/app/Jobs/(components)/offer/OffersList";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("jobsMetadata");
}

/**
 * Page
 */
function JobsPage() {
  return (
    <>
      <HeroSection />
      <OffersList />
    </>
  );
}

export default JobsPage;
