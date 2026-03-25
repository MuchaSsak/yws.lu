"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import { YWS_APPLY_FOR_HOUSING_GOOGLE_FORM_LINK } from "@/lib/constants";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

function HeroHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center flex flex-col items-center">
      {/* Title */}
      <BoxReveal boxColor="#fa8534" duration={0.5}>
        <h1 className="font-black max-sm:text-4xl sm:text-7xl text-orange-gradient sm:leading-20">
          {dictionary["Job Offers"]}
        </h1>
      </BoxReveal>

      {/* Description */}
      <div className="py-8 text-lg md:w-[32.5rem] xl:w-[25rem] flex flex-col items-center gap-2">
        {dictionary.heroDescriptionJobs}
      </div>
    </div>
  );
}

export default HeroHeader;
