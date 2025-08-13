import React from "react";
import Link from "next/link";
import {
  YWS_GOOGLE_MAPS_HOUSES_LINK,
  YWS_GOOGLE_MAPS_HOUSES_LINK_EMBED,
  YWS_HQ_LOCATION,
} from "@/lib/constants";

function RealImpactMap() {
  return (
    <Link href={YWS_GOOGLE_MAPS_HOUSES_LINK} target="_blank">
      <iframe
        className="h-full md:w-[40rem] max-md:w-max mx-auto"
        loading="lazy"
        src={YWS_GOOGLE_MAPS_HOUSES_LINK_EMBED}
        title={YWS_HQ_LOCATION}
        aria-label={YWS_HQ_LOCATION}
      />
    </Link>
  );
}

export default RealImpactMap;
