import React from "react";

import { YWS_EMAIL, YWS_PHONE_NUMBER } from "@/lib/constants";
import { Email, Phone } from "@/lib/icons";

function InterestedInRentingContactLinks() {
  return (
    <>
      <span className="flex w-fit items-center gap-2.5 text-2xl font-semibold">
        <Email />
        <span className="transition-transform">{YWS_EMAIL}</span>
      </span>
      <span className="flex w-fit items-center gap-2.5 text-2xl font-semibold pt-2">
        <Phone />
        <span className="transition-transform">{YWS_PHONE_NUMBER}</span>
      </span>
    </>
  );
}

export default InterestedInRentingContactLinks;
