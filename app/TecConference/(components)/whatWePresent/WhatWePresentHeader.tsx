"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { YWS_TEC_CONFERENCE_ZOOM_LINK } from "@/lib/constants";
import Link from "next/link";

function WhatWePresentHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        What we will present
      </h1>

      {/* Description */}
      <p className="sm:w-[35rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        <span>
          As part of{" "}
          <span className="text-primary font-semibold">
            V - Comprehensive Guide to Best Practices in Mobile Learning for
            Adults
          </span>
          , we have researched the origins, language, and long-term value of the
          TEC cycle, created a collaborative online platform where TEC
          practitioners have shared successful practices, and developed a
          publication gathering good practices for people working in mobility
          and with people on the move.
        </span>
        <span>
          The result is a set of resources designed to help professionals and
          volunteers support learning, integration, wellbeing, and future
          planning.
        </span>
      </p>
    </div>
  );
}

export default WhatWePresentHeader;
