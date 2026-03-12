"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { YWS_TEC_CONFERENCE_ZOOM_LINK } from "@/lib/constants";
import Link from "next/link";

function WhoIsItForHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        Who is it for?
      </h1>

      {/* Description */}
      <p className="sm:w-[35rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        <span>
          This conference is for youth workers, trainers and facilitators,
          volunteers, professionals working in mobility programmes,
          organisations welcoming people in transition or on the move, and
          anyone interested in non-formal learning, reflection, and inclusion.
        </span>
        <span>
          Whether you are already familiar with TEC or discovering it for the
          first time, this event will offer insights, inspiration, and practical
          tools.
        </span>
      </p>
    </div>
  );
}

export default WhoIsItForHeader;
