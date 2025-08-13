import React from "react";
import Link from "next/link";

import {
  YWS_GOOGLE_MAPS_LOCATION_LINK,
  YWS_GOOGLE_MAPS_LOCATION_LINK_EMBED,
  YWS_HQ_LOCATION,
} from "@/lib/constants";

function ContactMap() {
  return (
    <Link
      className="flex-1"
      href={YWS_GOOGLE_MAPS_LOCATION_LINK}
      target="_blank"
    >
      <iframe
        className="h-[30rem] w-full"
        loading="lazy"
        src={YWS_GOOGLE_MAPS_LOCATION_LINK_EMBED}
        title={YWS_HQ_LOCATION}
        aria-label={YWS_HQ_LOCATION}
      />
    </Link>
  );
}

export default ContactMap;
