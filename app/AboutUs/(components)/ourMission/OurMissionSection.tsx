import React from "react";

import OurMissionHeader from "@/app/AboutUs/(components)/ourMission/OurMissionHeader";
import OurMissionCards from "@/app/AboutUs/(components)/ourMission/OurMissionCards";

function OurMissionSection() {
  return (
    <section className="px-side pb-36">
      {/* Header */}
      <OurMissionHeader />

      {/* Cards */}
      <OurMissionCards />
    </section>
  );
}

export default OurMissionSection;
