"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import useGetStatistics from "@/hooks/tanstack/useGetStatistics";

function RealImpactHeader() {
  const { dictionary } = useLanguage();

  const { data: statistics } = useGetStatistics();

  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        {dictionary["Real impact"]}
      </h1>

      {/* Description */}
      <p className="sm:w-[30rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        {dictionary.realImpactDescriptionAboutUs(
          statistics?.shared_houses_count,
          statistics?.youngsters_accomodated_count,
          statistics?.youngsters_waiting_count
        )}
      </p>
    </div>
  );
}

export default RealImpactHeader;
