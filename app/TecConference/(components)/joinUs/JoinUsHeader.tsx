"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { YWS_EMAIL, YWS_TEC_CONFERENCE_ZOOM_LINK } from "@/lib/constants";
import Link from "next/link";

function JoinUsHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        Join us!
      </h1>

      {/* Description */}
      <p className="sm:w-[35rem] text-lg pt-4 max-sm:px-4 pb-6 items-center mx-auto flex flex-col gap-2">
        <span>
          This closing conference is also a beginning: a chance to continue
          sharing, using, and building on the knowledge developed through the
          TEC tradition.
        </span>
        <span>
          We{" "}
          <span className="text-primary font-semibold">
            invite you to join us
          </span>
          , explore the resources developed through V - Comprehensive Guide to
          Best Practices in Mobile Learning for Adults, and become part of the
          conversation.
        </span>
        <span>
          For any questions, please contact:{" "}
          <Link
            className="text-primary font-semibold hover:underline"
            href={`mailto:${YWS_EMAIL}`}
            target="_blank"
          >
            {YWS_EMAIL}
          </Link>
        </span>
      </p>

      <Link href={YWS_TEC_CONFERENCE_ZOOM_LINK} tabIndex={-1}>
        <Button
          className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
          size="lg"
        >
          Register here <span className="transition-[margin]">→</span>
        </Button>
      </Link>
    </div>
  );
}

export default JoinUsHeader;
