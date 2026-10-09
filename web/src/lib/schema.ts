import { ORGANISATION } from "~/data/organisation";

import { type Locale, LOCALES } from "./locales";
import { pathTo, type RouteId } from "./routes";

/**
 * The JSON-LD graph per page (wiki: site/seo.md § Entity plan, § JSON-LD graph): stable `@id`s on the site origin,
 * every fact from organisation.ts, markup that matches the visible page. Homes carry WebSite + NGO + WebPage; About
 * us an AboutPage whose main entity is the NGO; other pages a WebPage pointing at the NGO. No FAQ, Event or
 * JobPosting (research: seo-structured-data). The registered number, founding date and VAT stay out until Q1.
 */
export interface SchemaInput {
  site: string;
  locale: Locale;
  route: RouteId;
  /** The page part of the title (WebPage.name). */
  name: string;
  description: string;
  /** The organisation's one-line mission in this locale (NGO.description). */
  mission: string;
  /** Absolute URL of the share image (the logo stays the organisation's image). */
  image?: string;
}

const LANGS: Record<Locale, string> = { en: "en", fr: "fr" };

export function schemaGraph({ site, locale, route, name, description, mission, image }: SchemaInput) {
  const origin = new URL(site).origin;
  const id = (fragment: string) => `${origin}/#${fragment}`;
  const url = origin + pathTo(locale, route);
  const address = (place: typeof ORGANISATION.office | typeof ORGANISATION.seat) => ({
    "@type": "PostalAddress",
    streetAddress: place.street,
    postalCode: place.postalCode.replace(/^L-/, ""),
    addressLocality: place.locality,
    addressCountry: place.country,
  });

  const organisation = {
    "@type": "NGO",
    "@id": id("organization"),
    name: ORGANISATION.name,
    alternateName: ORGANISATION.shortName,
    legalName: ORGANISATION.legalName,
    url: `${origin}/`,
    logo: {
      "@type": "ImageObject",
      "@id": id("logo"),
      url: `${origin}/logo.png`,
      width: 300,
      height: 200,
      caption: ORGANISATION.name,
    },
    image: { "@id": id("logo") },
    description: mission,
    email: ORGANISATION.email,
    telephone: ORGANISATION.phones.map((phone) => phone.e164),
    address: [address(ORGANISATION.office), address(ORGANISATION.seat)],
    location: {
      "@type": "Place",
      "@id": id("office"),
      name: ORGANISATION.office.label,
      address: address(ORGANISATION.office),
      hasMap: ORGANISATION.office.maps,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: ORGANISATION.email,
      telephone: ORGANISATION.phones[0]!.e164,
    },
    areaServed: { "@type": "Country", name: "Luxembourg" },
    sameAs: ORGANISATION.socials.map((social) => social.href),
  };

  const website = {
    "@type": "WebSite",
    "@id": id("website"),
    url: `${origin}/`,
    name: ORGANISATION.name,
    alternateName: [ORGANISATION.shortName],
    inLanguage: LOCALES.map((l) => LANGS[l]),
    publisher: { "@id": id("organization") },
  };

  const page = {
    "@type": route === "about" ? "AboutPage" : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: LANGS[locale],
    isPartOf: { "@id": id("website") },
    about: { "@id": id("organization") },
    ...(route === "about" ? { mainEntity: { "@id": id("organization") } } : {}),
    ...(image ? { thumbnailUrl: image } : {}),
  };

  const graph: object[] = [page];
  // The full organisation and the site node on the homes and About us; elsewhere the page refers to them by @id.
  if (route === "home") graph.unshift(website, organisation);
  else if (route === "about") graph.unshift(organisation);
  return { "@context": "https://schema.org", "@graph": graph };
}
