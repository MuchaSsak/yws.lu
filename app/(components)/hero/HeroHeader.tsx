"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import { YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK } from "@/lib/constants";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";

function HeroHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="flex flex-col text-left items-start">
      {/* Title */}
      <BoxReveal boxColor="#fa8534" duration={0.5}>
        <h1 className="sm:text-6xl max-sm:text-5xl font-bold pb-4">
          {dictionary["Rent out"]}{" "}
          <LineShadowText
            shadowColor="#730bce"
            className="italic text-orange-600"
          >
            {dictionary["your"]}
          </LineShadowText>{" "}
          <LineShadowText
            shadowColor="#730bce"
            className="italic text-orange-600 pr-4"
          >
            {dictionary["property"]}
          </LineShadowText>
        </h1>
      </BoxReveal>

      {/* Subtitle */}
      <BoxReveal boxColor="#fa8534" duration={0.75}>
        <h2 className="sm:text-4xl max-sm:text-2xl font-bold items-center md:w-max gap-2">
          {dictionary["Give youth a chance for a"]}{" "}
          <SparklesText
            colors={{ first: "#b96ff9", second: "#730bce" }}
            className="sm:text-4xl max-sm:text-2xl italic font-normal text-orange-600 pr-4"
            sparklesCount={7}
          >
            {dictionary["better future"]}
          </SparklesText>
        </h2>
      </BoxReveal>

      {/* Description */}
      <BoxReveal boxColor="#fa8534" duration={1}>
        <p className="pt-4 pb-6 text-lg md:w-[25rem] flex flex-col gap-2">
          {dictionary.heroDescriptionHomepage}
        </p>
      </BoxReveal>

      {/* CTA buttons */}
      <motion.div {...motionFadeIn(1.25)} className="flex gap-4 flex-wrap">
        <Link
          href={YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK}
          target="_blank"
          tabIndex={-1}
        >
          <Button
            className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
            size="lg"
          >
            {dictionary["Rent now"]}{" "}
            <span className="transition-[margin]">→</span>
          </Button>
        </Link>

        <Link href="/RentYourProperty" tabIndex={-1}>
          <Button
            className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
            size="lg"
            variant="secondary"
          >
            {dictionary["Learn more"]}{" "}
            <span className="transition-[margin]">→</span>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default HeroHeader;
