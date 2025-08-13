import React from "react";
import Link from "next/link";

import { YWS_EMAIL, YWS_PHONE_NUMBER } from "@/lib/constants";
import { Email, Phone } from "@/lib/icons";

function InterestedInRentingContactLinks() {
  return (
    <>
      <Link
        className="flex [&:hover_span]:translate-x-1.5 [&:focus-visible_span]:translate-x-1.5 w-fit items-center gap-2.5 text-2xl font-semibold hover:underline focus-within:underline"
        href={`mailto:${YWS_EMAIL}`}
        target="_blank"
      >
        <Email />
        <span className="transition-transform">{YWS_EMAIL}</span>
      </Link>
      <Link
        className="flex [&:hover_span]:translate-x-1.5 [&:focus-visible_span]:translate-x-1.5 w-fit items-center gap-2.5 text-2xl font-semibold hover:underline focus-within:underline pt-2"
        href={`tel:${YWS_PHONE_NUMBER.replaceAll(" ", "")}`}
        target="_blank"
      >
        <Phone />
        <span className="transition-transform">{YWS_PHONE_NUMBER}</span>
      </Link>
    </>
  );
}

export default InterestedInRentingContactLinks;
