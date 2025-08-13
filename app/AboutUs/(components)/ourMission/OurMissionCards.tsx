"use client";

import React from "react";
import * as motion from "motion/react-client";

import { Armchair, BookOpenCheck, PiggyBank } from "@/lib/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlareCard } from "@/components/ui/glare-card";

function OurMissionCards() {
  const { dictionary } = useLanguage();

  const OUR_MISSION_CARDS = [
    {
      Icon: <BookOpenCheck className="size-16 text-orange-900" />,
      title: dictionary["Coaching"],
      description: dictionary.ourMissionCardOneDescriptionAboutUs,
    },
    {
      Icon: <PiggyBank className="size-16 text-orange-900" />,
      title: dictionary["Affordability"],
      description: dictionary.ourMissionCardTwoDescriptionAboutUs,
    },
    {
      Icon: <Armchair className="size-16 text-orange-900" />,
      title: dictionary["Sustainability"],
      description: dictionary.ourMissionCardThreeDescriptionAboutUs,
    },
  ];

  return (
    <div className="flex justify-center items-center gap-6 pt-4 flex-wrap">
      {OUR_MISSION_CARDS.map(({ Icon, title, description }, i) => (
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {
              y: 200,
            },
            visible: {
              y: 0,
            },
          }}
          transition={{ ease: "easeInOut", delay: 0.125 * i, duration: 0.75 }}
          viewport={{ once: true }}
          key={description}
        >
          <GlareCard className="bg-background/15 text-center px-4 pt-6 flex flex-col items-center gap-1.5">
            {Icon}
            <h3 className="text-xl pb-1.5 font-semibold">{title}</h3>
            <span className="font-medium">{description}</span>
          </GlareCard>
        </motion.div>
      ))}
    </div>
  );
}

export default OurMissionCards;
