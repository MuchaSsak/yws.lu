"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import InterestedInRentingContactLinks from "@/app/RentYourProperty/(components)/interestedInRenting/InterestedInRentingContactLinks";

function InterestedInRenetingHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center flex flex-col items-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20 text-balance">
        {dictionary["Interested in renting your property to us?"]}
      </h1>

      {/* Description */}
      <p className="sm:w-[35rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        {dictionary.interestedInRentingDescriptionRentYourProperty}
      </p>

      {/* Contact info */}
      <InterestedInRentingContactLinks />
    </div>
  );
}

export default InterestedInRenetingHeader;
