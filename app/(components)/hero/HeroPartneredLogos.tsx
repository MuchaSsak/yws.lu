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
    src: "/images/partners-logos/erasmus.svg",
    alt: "Erasmus+ logo",
    href: "https://erasmus-plus.ec.europa.eu/",
  },
  {
    src: "/images/projects/get_your_home_logo.png",
    alt: "Get Your Home logo",
    href: "https://drive.google.com/file/d/1z0IkpH7yZADfVEk9vvXN6S5iAnTdvVjn/view?usp=share_link",
  },
  {
    src: "/images/projects/locked_out_logo.png",
    alt: "Locked Out logo",
    href: "https://fondation-sommer.lu/en/projects/locked-out-youth-lens-on-housing/",
  },
];

function HeroPartneredLogos() {
  return (
    <Marquee loop={0} autoFill className="py-12" speed={25}>
      {PARTNERS_LOGOS.map(({ src, alt, href }) => (
        <a href={href} target="_blank" tabIndex={-1}>
          <img
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
