"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";

function HeroHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-left">
      {/* Title */}
      <BoxReveal boxColor="#fa8534" duration={0.5}>
        <h1 className="font-black max-sm:text-4xl sm:text-7xl xl:text-8xl text-orange-gradient sm:leading-20">
          {dictionary["About us"]}
        </h1>
      </BoxReveal>

      {/* Description */}
      <div className="pt-8 text-lg md:w-[32.5rem] xl:w-[25rem] flex flex-col gap-2">
        {dictionary.heroDescriptionAboutUs}
      </div>
    </div>
  );
}

export default HeroHeader;
