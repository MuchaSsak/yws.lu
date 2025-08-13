"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

function WhoWeAreHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center pb-32">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        {dictionary["Who we are"]}
      </h1>

      {/* Description */}
      <p className="sm:w-[30rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        {dictionary.whoWeAreDescriptionHomepage}
      </p>

      {/* CTA button */}
      <motion.div {...motionFadeIn()}>
        <Button
          size="lg"
          className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
        >
          <Link tabIndex={-1} href="/AboutUs">
            {dictionary["Learn more"]}{" "}
            <span className="transition-[margin]">→</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default WhoWeAreHeader;
