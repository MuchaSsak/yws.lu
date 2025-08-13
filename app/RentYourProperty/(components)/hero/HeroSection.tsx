import React from "react";

import HeroHeader from "@/app/RentYourProperty/(components)/hero/HeroHeader";
import { BackgroundLines } from "@/components/ui/background-lines";

function HeroSection() {
  return (
    <section className="px-side xl:pt-64 max-md:pt-36 md:pt-48 min-h-screen">
      {/* Background */}
      <BackgroundLines className="flex bg-transparent items-center w-full flex-col px-4">
        <HeroHeader />
      </BackgroundLines>
    </section>
  );
}

export default HeroSection;
