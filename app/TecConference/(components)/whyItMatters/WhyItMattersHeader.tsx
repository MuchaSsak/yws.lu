"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { YWS_TEC_CONFERENCE_ZOOM_LINK } from "@/lib/constants";
import Link from "next/link";

function WhyItMattersHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        Why this conference matters
      </h1>

      {/* Description */}
      <p className="sm:w-[35rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        <span>
          In a world where more and more people of all ages are on the move,
          professionals need meaningful tools to support processes of
          transition, adaptation, reflection, and inclusion.
        </span>
        <span>
          For around 25 years, the TEC community has developed methods that help
          young people involved in international mobility to manage change,
          reflect on their experiences, strengthen interpersonal and
          intercultural skills, navigate challenges, and plan their next steps.
        </span>
        <span>
          These approaches are not only relevant to Erasmus+ and volunteering
          programmes. They can also inspire a much wider range of professionals
          working in education, youth work, mobility, reception, and community
          support.
        </span>
        <span>
          This conference is an opportunity to explore that legacy and discover
          how it has been transformed into practical, accessible resources for
          others through V - Comprehensive Guide to Best Practices in Mobile
          Learning for Adults.
        </span>
      </p>
    </div>
  );
}

export default WhyItMattersHeader;
