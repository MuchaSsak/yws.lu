"use client";

import React from "react";

import { useLanguage } from "@/contexts/LanguageContext";
import { Timeline } from "@/components/ui/timeline";

function HowItWorksTimeline() {
  const { dictionary } = useLanguage();

  const howItWorksTimelineData = [
    {
      title: dictionary["Fill Out the Form"],
      content: (
        <div>
          {/* Description */}
          <p className="mb-8 font-normal text-neutral-800">
            {dictionary.timelineFillOutTheFormDescriptionLookingForHousing}
          </p>
        </div>
      ),
    },
    {
      title: dictionary["Let's Talk"],
      content: (
        <div>
          {/* Description */}
          <p className="mb-8 font-normal text-neutral-800">
            {dictionary.timelineLetsTalkDescriptionLookingForHousing}
          </p>
        </div>
      ),
    },
    {
      title: dictionary["Personal Interview"],
      content: (
        <div>
          {/* Description */}
          <p className="mb-8 font-normal text-neutral-800">
            {dictionary.timelinePersonalInterviewDescriptionLookingForHousing}
          </p>
        </div>
      ),
    },
    {
      title: dictionary["Our Selection Process"],
      content: (
        <div>
          {/* Description */}
          <p className="mb-8 font-normal text-neutral-800">
            {dictionary.timelineOurSelectionProcessDescriptionLookingForHousing}
          </p>
        </div>
      ),
    },
  ];

  return <Timeline data={howItWorksTimelineData} />;
}

export default HowItWorksTimeline;
