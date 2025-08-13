"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { AVAILABLE_LANGUAGES } from "@/lib/dictionary";
import {
  BadgeDollarSign,
  House,
  Info,
  NotepadText,
  PersonStanding,
  Phone,
} from "@/lib/icons";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_SECTION_ID } from "@/app/(components)/contact/ContactSection";
import LanguagePicker from "@/components/layout/LanguagePicker";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const MAX_OPEN_VIEWPORT_WIDTH_PX = 768;

function HamburgerMenu() {
  const { dictionary, language } = useLanguage();

  const HAMBURGER_MENU_LINKS = [
    {
      href: "/",
      label: dictionary["Homepage"],
      Icon: <House className="size-7" />,
    },
    {
      href: "/LookingForHousing",
      label: dictionary["Apply for housing"],
      Icon: <NotepadText className="size-7" />,
    },
    {
      href: "/RentYourProperty",
      label: dictionary["Rent your property"],
      Icon: <BadgeDollarSign className="size-7" />,
    },
    {
      href: "/AboutUs",
      label: dictionary["About us"],
      Icon: <Info className="size-7" />,
    },
    {
      href: `/?#${CONTACT_SECTION_ID}`,
      label: dictionary["Contact us"],
      Icon: <Phone className="size-7" />,
    },
    {
      href: "/WeSparkProjects",
      label: "We Spark Projects",
      Icon: <PersonStanding className="size-7" />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  // Hide hamburger menu if screen is too wide
  useEffect(() => {
    function handleResize(e: Event) {
      if ((e.target as Window).innerWidth > MAX_OPEN_VIEWPORT_WIDTH_PX)
        setIsOpen(false);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <SheetTrigger
        className={`${
          isOpen ? "before:w-3 after:w-5" : "before:w-5 after:w-3"
        } before:h-0.5 py-2.5 px-1.5 xl:hidden before:bg-background flex flex-col gap-1.5 items-end before:block after:h-0.5 after:block after:bg-background before:transition-[width] after:transition-[width] cursor-pointer`}
      />

      <SheetContent>
        <SheetHeader>
          {/* Title */}
          <SheetTitle className="py-4 text-2xl italic font-light sm:px-4 text-muted">
            {dictionary["Choose your destination"]}
          </SheetTitle>

          <SheetDescription asChild className="pt-32">
            <ul className="flex flex-col items-end gap-8 font-medium text-right sm:pr-8">
              {/* Links */}
              {HAMBURGER_MENU_LINKS.map(({ href, label, Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex w-max items-center gap-3 max-sm:text-lg sm:text-2xl md:text-3xl transition-all text-background hover:text-primary focus-visible:text-primary hover:tracking-wide"
                  >
                    {Icon}
                    <span>{label}</span>
                  </Link>
                </li>
              ))}

              {/* Language picker */}
              <LanguagePicker
                className="sm:p-5 max-sm:p-4 mt-6 max-sm:text-base sm:text-xl [&_svg]:size-6 hover:tracking-wide transition-all focus-visible:bg-foreground/25 hover:bg-foreground/25"
                label={
                  AVAILABLE_LANGUAGES.find(
                    (availableLanguage) => availableLanguage.value === language
                  )!.labelNative
                }
              />
            </ul>
          </SheetDescription>
        </SheetHeader>

        {/* Footer */}
        <SheetFooter className="text-sm italic text-right text-muted">
          ©2025. Youth Work Synergy ASBL. {dictionary["All rights reserved"]}.
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default HamburgerMenu;
