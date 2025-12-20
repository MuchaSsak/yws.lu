"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { AVAILABLE_LANGUAGES } from "@/lib/dictionary";
import { useLanguage } from "@/contexts/LanguageContext";
import useViewportSize from "@/hooks/useViewportSize";
import { CONTACT_SECTION_ID } from "@/app/(components)/contact/ContactSection";
import HamburgerMenu from "@/components/layout/HamburgerMenu";
import LanguagePicker from "@/components/layout/LanguagePicker";

function NavBar() {
  const { dictionary, language } = useLanguage();
  const { width } = useViewportSize();

  const NAVBAR_LINKS = [
    {
      href: "/AboutUs",
      label: dictionary["About us"],
    },
    {
      href: "/LookingForHousing",
      label: dictionary["Apply for housing"],
    },
    {
      href: "/RentYourProperty",
      label: dictionary["Rent your property"],
    },
    {
      href: "/WeSparkProjects",
      label: dictionary["We Spark Projects"],
    },
    {
      href: `/?#${CONTACT_SECTION_ID}`,
      label: dictionary["Contact us"],
    },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 flex items-center justify-between w-screen h-20 gap-12 py-4 font-medium tracking-wide text-white sm:px-16 max-sm:px-5 bg-black/25">
      <div className="flex items-center flex-1 gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="transition-transform hover:scale-105 focus-within:scale-105"
        >
          <Image
            src="/logo.png"
            alt="Youth Work Synergy (YWS) Logo"
            width={80}
            height={60}
            priority
          />
        </Link>

        {/* Language picker */}
        <LanguagePicker
          className="xl:hidden"
          label={
            width > 400
              ? AVAILABLE_LANGUAGES.find(
                  (availableLanguage) => availableLanguage.value === language
                )!.labelNative
              : undefined
          }
        />

        {/* LInks */}
        {NAVBAR_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="hover:underline max-xl:hidden focus-within:underline hover:tracking-wider focus-within:tracking-wider transition-[letter-spacing] p-1"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Settings buttons */}
      <div className="flex items-center justify-end w-10">
        <LanguagePicker className="max-xl:hidden" />
        <HamburgerMenu />
      </div>
    </nav>
  );
}

export default NavBar;
