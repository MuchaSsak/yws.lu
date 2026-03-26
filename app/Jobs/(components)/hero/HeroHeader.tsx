"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";

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
      <BoxReveal boxColor="#fa8534" duration={0.5}>
        <div className="py-8 text-lg md:w-[32.5rem] flex flex-col items-center gap-2">
          {dictionary.heroDescriptionJobs}
        </div>
      </BoxReveal>
    </div>
  );
}

export default HeroHeader;
