import React from "react";

import WhoWeAreHeader from "@/app/(components)/whoWeAre/WhoWeAreHeader";
import { WarpBackground } from "@/components/magicui/warp-background";

function WhoWeAreSection() {
  return (
    <section className="pb-6">
      {/* Background */}
      <WarpBackground
        perspective={200}
        beamsPerSide={2}
        beamSize={2.5}
        beamDuration={5}
        className="[&>div.absolute]:[mask-image:radial-gradient(closest-side,black_50%,transparent_100%)] border-none max-sm:p-0"
        gridColor="#c8c8c8"
      >
        {/* Header */}
        <WhoWeAreHeader />
      </WarpBackground>
    </section>
  );
}

export default WhoWeAreSection;
