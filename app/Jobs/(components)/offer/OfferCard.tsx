"use client";

import React, { PropsWithChildren, ReactNode } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type OffersCardProps = PropsWithChildren & {
  title: string;
  description: ReactNode;
  competences: ReactNode;
  href: string;
};

function OfferCard({
  title,
  description,
  competences,
  children,
  href,
}: OffersCardProps) {
  const { dictionary } = useLanguage();

  return (
    <div
      className={cn(
        "flex flex-col max-md:px-4 md:px-24",
        "text-center items-center",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4 lg:w-1/2",
          "justify-center flex-row",
        )}
      >
        {/* Icon */}
        {children}

        {/* Title */}
        <h1 className="font-black max-sm:text-2xl text-red-gradient sm:text-4xl">
          {title}
        </h1>
      </div>

      {/* Description */}
      <p className="sm:w-[32.5rem] text-balance text-lg pt-4 pb-6 flex flex-col gap-2">
        {description}
      </p>
      {/* Competences */}
      <p className="sm:w-[32.5rem] text-balance text-lg pt-4 pb-6 flex flex-col gap-2">
        {competences}
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
