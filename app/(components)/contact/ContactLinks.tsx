import React from "react";
import Link from "next/link";

import { Email, Facebook, Instagram, Linkedin, Phone } from "@/lib/icons";
import {
  YWS_EMAIL,
  YWS_FACEBOOK_LINK,
  YWS_INSTAGRAM_LINK,
  YWS_LINKEDIN_LINK,
  YWS_PHONE_NUMBER,
} from "@/lib/constants";

function ContactLinks() {
  return (
    <>
      <Link
        className="flex [&:hover_span]:translate-x-1.5 [&:focus-visible_span]:translate-x-1.5 w-fit items-center gap-2.5 text-2xl font-semibold hover:underline focus-within:underline"
        href={YWS_FACEBOOK_LINK}
        target="_blank"
      >
        <Facebook />
        <span className="transition-transform">Facebook</span>
      </Link>
      <Link
        className="flex [&:hover_span]:translate-x-1.5 [&:focus-visible_span]:translate-x-1.5 w-fit items-center gap-2.5 text-2xl font-semibold hover:underline focus-within:underline"
        href={YWS_LINKEDIN_LINK}
        target="_blank"
      >
        <Linkedin />
        <span className="transition-transform">Linkedin</span>
      </Link>
      <Link
        className="flex [&:hover_span]:translate-x-1.5 [&:focus-visible_span]:translate-x-1.5 w-fit items-center gap-2.5 text-2xl font-semibold hover:underline focus-within:underline"
        href={YWS_INSTAGRAM_LINK}
        target="_blank"
      >
        <Instagram />
        <span className="transition-transform">Instagram</span>
      </Link>
      <Link
        className="flex [&:hover_span]:translate-x-1.5 [&:focus-visible_span]:translate-x-1.5 w-fit items-center gap-2.5 text-2xl font-semibold hover:underline focus-within:underline"
        href={`mailto:${YWS_EMAIL}`}
        target="_blank"
      >
        <Email />
        <span className="transition-transform">{YWS_EMAIL}</span>
      </Link>
      <Link
        className="flex [&:hover_span]:translate-x-1.5 [&:focus-visible_span]:translate-x-1.5 w-fit items-center gap-2.5 text-2xl font-semibold hover:underline focus-within:underline"
        href={`tel:${YWS_PHONE_NUMBER.replaceAll(" ", "")}`}
        target="_blank"
      >
        <Phone />
        <span className="transition-transform">{YWS_PHONE_NUMBER}</span>
      </Link>
    </>
  );
}

export default ContactLinks;
