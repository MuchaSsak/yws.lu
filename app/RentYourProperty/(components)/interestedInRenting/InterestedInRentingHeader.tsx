"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import { YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK } from "@/lib/constants";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import InterestedInRentingContactLinks from "@/app/RentYourProperty/(components)/interestedInRenting/InterestedInRentingContactLinks";
import { Button } from "@/components/ui/button";

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

      {/* CTA button */}
      <motion.div {...motionFadeIn()} className="pt-6">
        <Link
          href={YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK}
          target="_blank"
          tabIndex={-1}
        >
          <Button
            className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
            size="lg"
          >
            {dictionary["Rent Out Your Property"]}{" "}
            <span className="transition-[margin]">→</span>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default InterestedInRenetingHeader;
