import { YWS_TEC_CONFERENCE_ZOOM_LINK } from "@/lib/constants";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const PARTNERS_LOGOS = [
  {
    src: "/images/partners-logos/esc.png",
    alt: "European Solidarity Corps (ESC) logo",
    href: "https://youth.europa.eu/solidarity_en",
  },
  {
    src: "/images/projects/fondation_summer_logo.png",
    alt: "Fondation Summer logo",
    href: "https://fondation-sommer.lu/",
  },
  {
    src: "/images/partners-logos/gestion_locative_sociale.png",
    alt: "Gestion Locative Sociale",
    href: "https://logement.public.lu/fr/proprietaire/logement-location/gestion-locative-sociale.html",
  },
  {
    src: "/images/partners-logos/erasmus.svg",
    alt: "Erasmus+ logo",
    href: "https://erasmus-plus.ec.europa.eu/",
  },
  {
    src: "/images/partners-logos/ministry_of_housing.png",
    alt: "Ministry of Housing and Spatial Planning",
    href: "https://mlogat.gouvernement.lu/en.html",
  },
  {
    src: "/images/partners-logos/andre_losch_logo.png",
    alt: "André Losch Fondation Logo",
    href: "https://www.loschfondation.lu/en/",
  },
  {
    src: "/images/partners-logos/ministry_of_justice_logo.png",
    alt: "Ministry of Justice Logo",
    href: "https://mj.gouvernement.lu/en.html",
  },
];

function HeroPartneredLogos() {
  return (
    <Marquee loop={0} autoFill className="py-12" speed={25}>
      {PARTNERS_LOGOS.map(({ src, alt, href }) => (
        <a href={href} target="_blank" tabIndex={-1}>
          <Image
            width={150}
            height={0}
            key={src}
            className="max-sm:w-[6.25rem] sm:w-[9.375rem] max-sm:mx-8 sm:mx-16"
            src={src}
            alt={alt}
            title={alt}
            fetchPriority="high"
          />
        </a>
      ))}
    </Marquee>
  );
}

export default HeroPartneredLogos;
