"use client";

import React from "react";
import * as motion from "motion/react-client";

import { useLanguage } from "@/contexts/LanguageContext";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Image from "next/image";
import { YWS_TEC_CONFERENCE_ZOOM_LINK } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ElectricBorder from "@/components/ui/ElectricBorder";
import motionFadeIn from "@/lib/animations/motionFadeIn";
import { Lens } from "@/components/ui/lens";

function HeroHeader() {
  const { dictionary } = useLanguage();

  return (
    <div className="lg:flex-row max-lg:flex-col justify-between flex">
      <div className="flex flex-col w-full text-left">
        {/* Title */}
        <BoxReveal boxColor="#fa8534" duration={0.75}>
          <h1 className="font-bold">
            <SparklesText
              className="sm:text-6xl max-sm:text-3xl max-sm:w-[80%] sm:w-2/3 max-sm:mx-auto max-sm:text-center"
              colors={{ first: "#b96ff9", second: "#730bce" }}
              sparklesCount={7}
            >
              Much More Than a Method
            </SparklesText>
          </h1>
        </BoxReveal>

        {/* Description */}
        <BoxReveal boxColor="#fa8534" duration={1}>
          <p className="pt-4 italic opacity-50 text-lg lg:w-[25rem] flex max-sm:text-center max-sm:text-balance flex-col gap-2">
            &quot;Sharing the wisdom of the Training & Evaluation Cycle of
            international volunteering programmes&quot;
          </p>
        </BoxReveal>

        <BoxReveal boxColor="#fa8534" duration={1}>
          <p className="pt-4 pb-4 text-lg lg:w-[25rem] max-sm:text-center max-sm:text-balance gap-2">
            <span className="font-semibold">Join us</span> for the closing
            conference of V - Comprehensive Guide to Best Practices in Mobile
            Learning for Adults and discover how the knowledge, methods, and
            practices developed through the Training & Evaluation Cycle (TEC)
            can support professionals and volunteers working with people on the
            move.
          </p>
        </BoxReveal>

        <BoxReveal boxColor="#fa8534" duration={1.1}>
          <p className="text-lg lg:w-[25rem] font-semibold max-sm:text-center max-sm:text-balance gap-2">
            {">"} Learning for adults
          </p>
        </BoxReveal>

        <BoxReveal boxColor="#fa8534" duration={1.2}>
          <p className="text-lg lg:w-[25rem] font-semibold max-sm:text-center max-sm:text-balance gap-2">
            {">"} 9 April 2026, 14:30–15:30
          </p>
        </BoxReveal>

        <BoxReveal boxColor="#fa8534" duration={1.3}>
          <p className="text-lg pb-6 lg:w-[25rem] font-semibold max-sm:text-center max-sm:text-balance gap-2">
            {">"} Hosted on{" "}
            <a
              href={YWS_TEC_CONFERENCE_ZOOM_LINK}
              className="font-bold hover:underline focus-visible:underline hover:text-3xl hover:tracking-widest hover:uppercase transition-all text-primary"
            >
              Zoom&#8482;
            </a>
          </p>
        </BoxReveal>

        <motion.div {...motionFadeIn(0.75)} className="flex gap-4 flex-wrap">
          <Link href={YWS_TEC_CONFERENCE_ZOOM_LINK} tabIndex={-1}>
            <Button
              className="[&:hover_span]:ml-2 [&:focus-visible_span]:ml-2 hover:scale-110 origin-left hover:font-semibold focus-visible:font-semibold"
              size="lg"
            >
              Register on Zoom&#8482;{" "}
              <span className="transition-[margin]">→</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Image */}
      <motion.div {...motionFadeIn()}>
        <ElectricBorder
          color="#fa8534"
          speed={1}
          chaos={0.12}
          thickness={2}
          style={{ borderRadius: 32 }}
          className="h-fit w-fit max-lg:animate-aurora-sm max-lg:mt-16 max-lg:mr-4 lg:animate-aurora max-lg:ml-auto"
        >
          <Lens lensSize={350} zoomFactor={1.35}>
            <Image
              className="rounded-2xl max-lg:w-64"
              src="/images/projects/tec_conference_banner.png"
              alt="Youth Work Synergy (YWS) Group Photo in the About us section"
              priority
              height={600}
              width={500}
            />
          </Lens>
        </ElectricBorder>
      </motion.div>
    </div>
  );
}

export default HeroHeader;
