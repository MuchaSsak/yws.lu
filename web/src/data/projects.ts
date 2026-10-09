import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";
import type { ImageMetadata } from "astro";

import gyh1 from "~/assets/projects/get-your-home/get-your-home-1.jpg";
import gyh2 from "~/assets/projects/get-your-home/get-your-home-2.jpg";
import gyh3 from "~/assets/projects/get-your-home/get-your-home-3.jpg";
import gyh4 from "~/assets/projects/get-your-home/get-your-home-4.jpg";
import gyh5 from "~/assets/projects/get-your-home/get-your-home-5.jpg";
import gyh6 from "~/assets/projects/get-your-home/get-your-home-6.jpg";
import getYourHomeLogo from "~/assets/projects/get-your-home-logo.png";
import lo1 from "~/assets/projects/locked-out/locked-out-1.jpg";
import lo2 from "~/assets/projects/locked-out/locked-out-2.jpg";
import lo3 from "~/assets/projects/locked-out/locked-out-3.jpg";
import lo4 from "~/assets/projects/locked-out/locked-out-4.jpg";
import lockedOutLogo from "~/assets/projects/locked-out-logo.png";
import safePathsEn from "~/assets/projects/safe-paths-poster-en.jpg";
import safePathsFr from "~/assets/projects/safe-paths-poster-fr.jpg";
import type { Locale } from "~/lib/locales";
import type { RouteId } from "~/lib/routes";

/**
 * What each We Spark project shows besides its text (wiki: site/structure.md § We Spark Projects): logo, pictures with
 * an alt that says what is in them, the link out, and the frame colour of its card (the 2025 shine colours). The texts
 * are the `projects` content collection; this list is keyed by the same slug, which is also the card's anchor.
 * Links are copied from the 2025 ProjectsList (Q9: past dates kept as a record).
 */
export interface Picture {
  image: ImageMetadata;
  alt: MessageDescriptor;
}

export interface ProjectExtras {
  /** The project's logo, decorative: the card's title says the same name. */
  logo?: ImageMetadata;
  pictures: Picture[];
  /** Pictures shown only in one locale (the Safe Paths poster per language). */
  localePictures?: Partial<Record<Locale, Picture[]>>;
  /** Wider thumbnails for posters. */
  pictureWidth?: number;
  /** A link out (opens a new tab), or a page of this site. */
  link?: { href: string; label: MessageDescriptor } | { route: RouteId; label: MessageDescriptor };
  shine: string;
}

const learnMore = msg`Learn more`;

export const PROJECT_EXTRAS: Record<string, ProjectExtras> = {
  "get-your-home": {
    logo: getYourHomeLogo,
    pictures: [
      { image: gyh1, alt: msg`Workshop handouts on a table at Get Your Home` },
      {
        image: gyh2,
        alt: msg`Two participants reading the handouts at the Get Your Home workshop while a third person leans in behind them`,
      },
      { image: gyh3, alt: msg`Two participants reading the workshop handouts` },
      { image: gyh4, alt: msg`Participants around a U-shaped table at the Get Your Home workshop` },
      { image: gyh5, alt: msg`Two participants filling in a worksheet together` },
      { image: gyh6, alt: msg`A participant smiling at the camera during the Get Your Home workshop` },
    ],
    link: {
      href: "https://docs.google.com/forms/d/e/1FAIpQLSdNnphOFE95EwvyIlIrZLubIiV-VRsMfgFElhcldRqpWb6zXQ/viewform",
      label: msg`Register now`,
    },
    shine: "#ff7820",
  },
  "locked-out": {
    logo: lockedOutLogo,
    pictures: [
      { image: lo1, alt: msg`The audience in the red seats of a cinema at a Locked Out event` },
      { image: lo2, alt: msg`Smiling audience members in red cinema seats at a Locked Out event` },
      { image: lo3, alt: msg`A participant listening in the cinema hall at a Locked Out event` },
      { image: lo4, alt: msg`Four people in front of the Locked Out title on the cinema screen` },
    ],
    link: { href: "https://drive.google.com/file/d/1ywjehKL5FkDrsATRWOlFnFHiNXir-mNr/view?usp=sharing", label: learnMore },
    shine: "#2757F5",
  },
  "safe-paths": {
    pictures: [],
    localePictures: {
      en: [{ image: safePathsEn, alt: msg`Safe Paths Luxembourg workshop poster` }],
      fr: [{ image: safePathsFr, alt: msg`Safe Paths Luxembourg workshop poster` }],
    },
    pictureWidth: 400,
    link: { href: "https://forms.gle/rncBigsjMoAbYVr4A", label: learnMore },
    shine: "#3BFFAA",
  },
  girlssective: { pictures: [], shine: "#8D30FF" },
  // The revamp links Projet V to its closing conference, the TEC page (site/structure.md § We Spark Projects).
  "mobile-learning": { pictures: [], link: { route: "tec", label: msg`The closing conference` }, shine: "#F5276F" },
  sport: { pictures: [], shine: "#54F527" },
  "self-chronicle": { pictures: [], shine: "#F2F527" },
};
