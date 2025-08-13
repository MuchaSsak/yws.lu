"use client";

import React from "react";
import * as motion from "motion/react-client";

import {
  BrushCleaning,
  DollarSign,
  HandCoins,
  HeartHandshake,
  LandPlot,
} from "@/lib/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlareCard } from "@/components/ui/glare-card";

function WhyRentToUsCards() {
  const { dictionary } = useLanguage();

  const OUR_MISSION_CARDS = [
    {
      Icon: <HandCoins className="size-16 text-orange-900" />,
      title: dictionary["Guaranteed Rent"],
      description: dictionary.whyRentToUsGuaranteedRentRentYourProperty,
    },
    {
      Icon: <DollarSign className="size-16 text-orange-900" />,
      title: dictionary["Tax Benefits"],
      description: dictionary.whyRentToUsTaxBenefitsRentYourProperty,
    },
    {
      Icon: <HeartHandshake className="size-16 text-orange-900" />,
      title: dictionary["Ongoing Tenant Support"],
      description: dictionary.whyRentToUsOngoingTenantSupportRentYourProperty,
    },
    {
      Icon: <LandPlot className="size-16 text-orange-900" />,
      title: dictionary["Property Flexibility"],
      description: dictionary.whyRentToUsPropertyFlexibilityRentYourProperty,
    },
    {
      Icon: <BrushCleaning className="size-16 text-orange-900" />,
      title: dictionary["Property Maintenance"],
      description: dictionary.whyRentToUsPropertyMaintenanceRentYourProperty,
    },
  ];

  return (
    <div className="flex justify-center items-center gap-6 pt-12 flex-wrap">
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

export default WhyRentToUsCards;
