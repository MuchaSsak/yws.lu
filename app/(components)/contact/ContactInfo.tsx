"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import ContactLinks from "@/app/(components)/contact/ContactLinks";
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
    </div>
  );
}

export default ContactInfo;
