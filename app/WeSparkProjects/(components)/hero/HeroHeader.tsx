"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { SparklesText } from "@/components/magicui/sparkles-text";

function HeroHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="flex flex-col w-full text-left">
      {/* Title */}
      <BoxReveal boxColor="#fa8534" duration={0.75}>
        <h1 className="sm:text-6xl max-sm:text-5xl font-bold">
          <SparklesText
            colors={{ first: "#b96ff9", second: "#730bce" }}
            sparklesCount={7}
          >
            {dictionary["We Spark Projects"]}
          </SparklesText>
        </h1>
      </BoxReveal>

      {/* Description */}
      <BoxReveal boxColor="#fa8534" duration={1}>
        <p className="pt-4 pb-6 text-lg md:w-[25rem] flex flex-col gap-2">
          {dictionary.heroDescriptionWeSparkProjects}
        </p>
      </BoxReveal>
    </div>
  );
}

export default HeroHeader;
