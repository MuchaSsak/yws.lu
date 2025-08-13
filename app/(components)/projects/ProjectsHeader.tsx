"use client";

import React from "react";
import * as motion from "motion/react-client";
import Link from "next/link";

import motionFadeIn from "@/lib/animations/motionFadeIn";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

function ProjectsHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="flex-1 max-xl:text-center">
      {/* Title */}
      <h1 className="font-black max-sm:text-4xl sm:text-6xl text-orange-gradient sm:leading-20">
        {dictionary["Youth-Led Projects!"]}
      </h1>

      {/* Description */}
      <p className="w-[25rem] text-lg pt-4 max-sm:px-4 pb-6 max-xl:mx-auto xl:ml-auto max-xl:items-center xl:items-end flex flex-col gap-2">
        {dictionary.youthLedProjectsDescriptionHomepage}
      </p>

      {/* CTA button */}
      <motion.div {...motionFadeIn()}>
        <Button
          size="lg"
          className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:font-semibold focus-visible:font-semibold"
        >
          <Link tabIndex={-1} href="/WeSparkProjects">
            {dictionary["See for yourself"]}{" "}
            <span className="transition-[margin]">→</span>
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default ProjectsHeader;
