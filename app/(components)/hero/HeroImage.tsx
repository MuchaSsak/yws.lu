"use client";

import React from "react";
import * as motion from "motion/react-client";
import Image from "next/image";

import { ShineBorder } from "@/components/magicui/shine-border";
import { Lens } from "@/components/ui/lens";

function HeroImage() {
  return (
    <div className="relative">
      <motion.div
        initial={{ x: 1000, y: -500, rotate: 120, opacity: 0 }}
        animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
        transition={{ ease: "anticipate", duration: 2 }}
        className="rounded-2xl"
      >
        <ShineBorder
          className="z-40"
          shineColor={[
            "oklch(70.4% 0.191 22.216)",
            "oklch(62.7% 0.265 303.9)",
            "oklch(76.9% 0.188 70.08)",
            "oklch(85.2% 0.199 91.936)",
          ]}
          borderWidth={3}
        />

        <Lens lensSize={250}>
          <Image
            className="rounded-2xl"
            src="/images/yws_group_photo.jpg"
            alt="Youth Work Synergy (YWS) Group Photo in the About us section"
            priority
            height={500}
            width={700}
          />
        </Lens>
      </motion.div>
    </div>
  );
}

export default HeroImage;
