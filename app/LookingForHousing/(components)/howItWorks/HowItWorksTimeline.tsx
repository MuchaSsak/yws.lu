"use client";

import React from "react";
import Image from "next/image";

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

          {/* Image */}
          <Image
            src="/images/yws_apply_for_housing_form_screenshot.jpg"
            alt="Youth Work Synergy (YWS) Fill Out the Form timeline image"
            width={1000}
            height={1000}
            className="h-64 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] lg:h-96"
          />
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

          {/* Image */}
          <Image
            src="/images/yws_group_photo.jpg"
            alt="Youth Work Synergy (YWS) Let's Talk timeline image"
            width={1000}
            height={1000}
            className="h-64 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] lg:h-96"
          />
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

          {/* Image */}
          <Image
            src="/images/yws_group_photo.jpg"
            alt="Youth Work Synergy (YWS) Personal Interview timeline image"
            width={1000}
            height={1000}
            className="h-64 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] lg:h-96"
          />
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

          {/* Image */}
          <Image
            src="/images/yws_group_photo.jpg"
            alt="Youth Work Synergy (YWS) Our Selection Process timeline image"
            width={1000}
            height={1000}
            className="h-64 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] lg:h-96"
          />
        </div>
      ),
    },
  ];

  return <Timeline data={howItWorksTimelineData} />;
}

export default HowItWorksTimeline;
