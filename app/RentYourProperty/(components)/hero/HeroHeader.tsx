"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Highlight } from "@/components/ui/hero-highlight";

function HeroHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center flex flex-col items-center z-[1]">
      {/* Title */}
      <BoxReveal boxColor="#fa8534" duration={0.5}>
        <h1 className="font-semibold tracking-tight max-sm:text-4xl sm:text-6xl sm:leading-20">
          <span>{dictionary["Rent your property with confidence:"]}</span>{" "}
          <Highlight className="text-foreground italic font-bold max-sm:leading-14">
            {dictionary["safe, reliable & impactful"]}
          </Highlight>
        </h1>
      </BoxReveal>

      {/* Description */}
      <div className="py-8 text-lg md:w-[32.5rem] xl:w-[35rem] flex flex-col items-center gap-2 text-balance">
        {dictionary.heroDescriptionRentYourProperty}
      </div>
    </div>
  );
}

export default HeroHeader;
