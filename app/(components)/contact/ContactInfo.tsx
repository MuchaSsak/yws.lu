"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import motionFadeIn from "@/lib/animations/motionFadeIn";
import {
  YWS_APPLY_FOR_HOUSING_GOOGLE_FORM_LINK,
  YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK,
} from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactLinks from "@/app/(components)/contact/ContactLinks";
import { Button } from "@/components/ui/button";
import { SparklesText } from "@/components/magicui/sparkles-text";

function ContactInfo() {
  const { dictionary } = useLanguage();

  return (
    <div className="flex flex-col max-xl:items-center flex-1 gap-2">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl sm:leading-20 pb-4">
        <SparklesText
          colors={{ first: "#ff7820", second: "#ffd120" }}
          className="sm:text-6xl max-sm:text-4xl pr-4"
          sparklesCount={7}
        >
          {dictionary["Contact us"]}
        </SparklesText>
      </h1>

      {/* Links */}
      <ContactLinks />

      {/* CTA buttons */}
      <motion.div
        {...motionFadeIn()}
        className="flex gap-4 flex-wrap max-xl:justify-center pt-6"
      >
        <Link href={YWS_APPLY_FOR_HOUSING_GOOGLE_FORM_LINK} tabIndex={-1}>
          <Button
            className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
            size="lg"
          >
            {dictionary["Looking for housing"]}{" "}
            <span className="transition-[margin]">→</span>
          </Button>
        </Link>

        <Link href={YWS_RENT_YOUR_PROPERTY_GOOGLE_FORM_LINK} tabIndex={-1}>
          <Button
            className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
            size="lg"
          >
            {dictionary["Rent your property"]}{" "}
            <span className="transition-[margin]">→</span>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

export default ContactInfo;
