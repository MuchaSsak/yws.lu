import React from "react";

import WhyRentToUsHeader from "@/app/RentYourProperty/(components)/whyRentToUs/WhyRentToUsHeader";
import WhyRentToUsCards from "@/app/RentYourProperty/(components)/whyRentToUs/WhyRentToUsCards";

function WhyRentToUsSection() {
  return (
    <section className="px-side pb-36">
      {/* Header */}
      <WhyRentToUsHeader />

      {/* Cards */}
      <WhyRentToUsCards />
    </section>
  );
}

export default WhyRentToUsSection;
