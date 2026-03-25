"use client";

import React, { PropsWithChildren } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import { YWS_APPLY_FOR_HOUSING_GOOGLE_FORM_LINK } from "@/lib/constants";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type OffersCardProps = PropsWithChildren & {
  title: string;
  description: string;
  href: string;
  isAlignedLeft?: boolean;
};

function OfferCard({
  isAlignedLeft = true,
  title,
  description,
  children,
  href,
}: OffersCardProps) {
  const { dictionary } = useLanguage();

  return (
    <div
      className={cn(
        "flex flex-col max-md:px-4 md:px-24",
        isAlignedLeft ? "text-left items-start" : "text-right items-end",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 lg:w-1/2",
          isAlignedLeft ? " flex-row" : " flex-row-reverse",
        )}
      >
        {/* Icon */}
        {children}

        {/* Title */}
        <h1 className="font-black max-sm:text-2xl flex-1 text-red-gradient sm:text-4xl">
          {title}
        </h1>
      </div>

      {/* Description */}
      <p className="sm:w-[25rem] text-lg pt-4 pb-6 flex flex-col gap-2">
        {description}
      </p>

      {/* CTA buttons */}
      <motion.div
        {...motionFadeIn()}
        animate="visible"
        className="flex gap-4 max-xl:justify-center xl:justify-end flex-wrap"
      >
        <Button
          size="lg"
          className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
        >
          <Link tabIndex={-1} target="_blank" href={href}>
            {dictionary["Download now"]}{" "}
            <span className="transition-[margin]">→</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default OfferCard;
