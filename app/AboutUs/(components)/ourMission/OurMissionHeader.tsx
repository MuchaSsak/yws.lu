"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";

function OurMissionHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        {dictionary["Our mission"]}
      </h1>

      {/* Description */}
      <p className="sm:w-[30rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        {dictionary.ourMissionDescriptionAboutUs}
      </p>
    </div>
  );
}

export default OurMissionHeader;
