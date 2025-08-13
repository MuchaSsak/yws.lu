"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import { YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK } from "@/lib/constants";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { Highlight } from "@/components/ui/hero-highlight";
import { Button } from "@/components/ui/button";

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

      {/* CTA button */}
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
            {dictionary["Rent Out Your Property"]}{" "}
            <span className="transition-[margin]">→</span>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default HeroHeader;
