"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import { YWS_APPLY_FOR_HOUSING_GOOGLE_FORM_LINK } from "@/lib/constants";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

function HousingHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="xl:text-right max-xl:text-center flex-1">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        {dictionary["Looking for housing?"]}
      </h1>

      {/* Description */}
      <p className="w-[25rem] text-lg pt-4 max-sm:px-4 pb-6 max-xl:mx-auto xl:ml-auto max-xl:items-center xl:items-end flex flex-col gap-2">
        {dictionary.lookingForHousingDescriptionHomepage}
      </p>

      {/* CTA buttons */}
      <motion.div
        {...motionFadeIn()}
        className="flex gap-4 max-xl:justify-center xl:justify-end flex-wrap"
      >
        <Button
          size="lg"
          className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
          variant="secondary"
        >
          <Link tabIndex={-1} href="/LookingForHousing">
            {dictionary["Learn more"]}{" "}
            <span className="transition-[margin]">→</span>
          </Link>
        </Button>

        <Button
          size="lg"
          className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
        >
          <Link
            tabIndex={-1}
            target="_blank"
            href={YWS_APPLY_FOR_HOUSING_GOOGLE_FORM_LINK}
          >
            {dictionary["Apply now"]}{" "}
            <span className="transition-[margin]">→</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default HousingHeader;
