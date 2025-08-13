import React from "react";

import { generateTranslatedMetadata } from "@/lib/utils";
import HeroSection from "@/app/RentYourProperty/(components)/hero/HeroSection";
import WhyRentToUsSection from "@/app/RentYourProperty/(components)/whyRentToUs/WhyRentToUsSection";
import InterestedInRentingSection from "@/app/RentYourProperty/(components)/interestedInRenting/InterestedInRentingSection";

/**
 * Metadata
 */
export function generateMetadata() {
  return generateTranslatedMetadata("rentYourPropertyMetadata");
}

/**
 * Page
 */
function RentYourPropertyPage() {
  return (
    <>
      <HeroSection />
      <WhyRentToUsSection />
      <InterestedInRentingSection />
    </>
  );
}

export default RentYourPropertyPage;
