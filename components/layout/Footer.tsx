"use client";

import React from "react";
import Link from "next/link";

import CreditsDialog from "@/components/layout/CreditsDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  YWS_ADDRESS,
  YWS_EMAIL,
  YWS_FACEBOOK_LINK,
  YWS_GOOGLE_MAPS_LOCATION_LINK,
  YWS_INSTAGRAM_LINK,
  YWS_LINKEDIN_LINK,
  YWS_PHONE_NUMBER,
  YWS_WEBSITE_LINK,
  YWS_WEBSITE_LINK_AESTHETIC,
} from "@/lib/constants";
import { Facebook, Instagram, Linkedin } from "@/lib/icons";

function Footer() {
  const { dictionary } = useLanguage();

  return (
    <footer className="sticky flex justify-between py-4 bg-foreground/80 backdrop-blur-xs bottom-[attr(height)] sm:items-center text-white/80 max-sm:px-5 sm:px-16 xl:px-48">
      <div>
        <h4 className="pb-1">
          ©2025. Youth Work Synergy ASBL. {dictionary["All rights reserved"]}.
        </h4>
        <h5 className="text-white/60">
          <Link
            href={YWS_GOOGLE_MAPS_LOCATION_LINK}
            target="_blank"
            className="hover:text-white focus-within:text-white hover:underline focus-within:underline"
          >
            {YWS_ADDRESS}
          </Link>
        </h5>

        {/* Contact links */}
        <h5 className="text-white/60 max-sm:flex max-sm:flex-col max-sm:pt-2">
          <Link
            className="hover:text-white focus-within:text-white hover:underline focus-within:underline"
            href={`mailto:${YWS_EMAIL}`}
            target="_blank"
          >
            {YWS_EMAIL}
          </Link>
          <span className="px-3 max-sm:hidden">•</span>
          <Link
            className="hover:text-white focus-within:text-white hover:underline focus-within:underline"
            href={`tel:${YWS_PHONE_NUMBER}`}
            target="_blank"
          >
            {YWS_PHONE_NUMBER}
          </Link>
          <span className="px-3 max-sm:hidden">•</span>
          <Link
            className="hover:text-white focus-within:text-white hover:underline focus-within:underline"
            href={YWS_WEBSITE_LINK}
          >
            {YWS_WEBSITE_LINK_AESTHETIC}
          </Link>
        </h5>
      </div>

      <div className="flex flex-col items-end gap-4 text-right max-sm:justify-end">
        {/* Social media links */}
        <div className="flex items-center justify-end gap-4">
          <Link
            href={YWS_FACEBOOK_LINK}
            target="_blank"
            className="[&:hover_svg]:fill-white [&:focus-within_svg]:fill-white p-0.5"
          >
            <Facebook />
          </Link>
          <Link
            href={YWS_LINKEDIN_LINK}
            target="_blank"
            className="[&:hover_svg]:fill-white [&:focus-within_svg]:fill-white p-0.5"
          >
            <Linkedin />
          </Link>
          <Link
            href={YWS_INSTAGRAM_LINK}
            target="_blank"
            className="[&:hover_svg]:stroke-3 [&:hover_svg]:stroke-white [&:focus-within_svg]:stroke-3 [&:focus-within_svg]:stroke-white p-0.5"
          >
            <Instagram />
          </Link>
        </div>

        {/* See credits */}
        <Dialog>
          <DialogTrigger className="hover:text-white w-fit focus-within:text-white cursor-help hover:underline focus-within:underline">
            {dictionary["See credits"]}
          </DialogTrigger>

          <CreditsDialog />
        </Dialog>
      </div>
    </footer>
  );
}

export default Footer;
