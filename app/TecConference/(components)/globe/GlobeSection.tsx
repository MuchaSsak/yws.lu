"use client";

import GlobeFlags from "@/app/TecConference/(components)/globe/GlobeFlags";
import { Globe } from "@/components/magicui/globe";
import useScroll from "@/hooks/useScroll";

function GlobeSection() {
  const { scrollY } = useScroll();

  const t = Math.min(Math.max(scrollY / 300, 0), 1);
  const scale = 1 + t * 0.3;

  return (
    <section className="xl:py-48 max-xl:pb-32 max-xl:pt-16 relative px-side flex flex-col">
      {/* Globe */}
      <div className="relative">
        <div style={{ transform: `scale(${scale})` }}>
          <Globe className="absolute max-lg:bottom-0 lg:top-1/2 lg:mt-32 lg:-translate-y-1/2" />
        </div>

        <div className="flex relative z-10 max-lg:bg-black/10 max-lg:p-4 max-lg:rounded-lg items-center max-lg:gap-32 lg:gap-4 max-lg:flex-col lg:flex-row justify-betweem">
          <div className="flex-1">
            <p className="text-xl font-semibold">
              For many years, the methodologies used by{" "}
              <span className="text-primary">TEC trainers</span> in
              international mobility and volunteering programmes have remained
              largely within a{" "}
              <span className="text-primary">
                specialised community of trainers and National Agencies
              </span>
              . Through this project, we wanted to open up that knowledge,
              document its roots, and make its practical wisdom accessible to a
              wider audience.
            </p>
          </div>

          <GlobeFlags
            className="flex-1"
            style={{ transform: `scale(${scale})` }}
          />

          <div className="flex-1">
            <p className="lg:text-right font-semibold text-xl">
              During this{" "}
              <span className="text-primary">one-hour online conference</span>,
              we will launch the results of V - Comprehensive Guide to Best
              Practices in Mobile Learning for Adults, present the new website,
              and introduce the publication developed through this work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GlobeSection;
