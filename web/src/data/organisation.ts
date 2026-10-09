/**
 * The organisation's facts: the ONE source (wiki: content/content-model.md § The organisation). Header, footer,
 * contact sections, legal pages, JSON-LD and llms.txt all read this module; organisation.test.ts checks the shapes.
 * Facts come from the client (2025 site constants, commit 188082f); unknown ones stay out, never invented.
 */
export const ORGANISATION = {
  name: "Youth Work Synergy",
  shortName: "YWS",
  /** As the 2025 footer writes it; the registered name and RCS/LBR number are an open question (Q1). */
  legalName: "Youth Work Synergy ASBL",
  email: "contact@yws.lu",
  phones: [
    { e164: "+352286622", display: "28 66 22" },
    { e164: "+352661597312", display: "661 597 312" },
  ],
  office: {
    label: "Bureau YWS a.s.b.l.",
    street: "136-138, rue Adolphe Fischer",
    postalCode: "L-1521",
    locality: "Luxembourg",
    country: "LU",
    maps: "https://www.google.com/maps/search/?api=1&query=136-138%2C%20rue%20Adolphe%20Fischer%2C%20L-1521%20Luxembourg",
    embed: "https://www.google.com/maps?q=136-138%2C%20rue%20Adolphe%20Fischer%2C%20L-1521%20Luxembourg&output=embed",
  },
  seat: {
    label: "Siège (adresse postale) YWS a.s.b.l.",
    street: "16, rue Pierre Weydert",
    postalCode: "L-5891",
    locality: "Fentange",
    country: "LU",
    maps: "https://www.google.com/maps/search/?api=1&query=16%2C%20rue%20Pierre%20Weydert%2C%20L-5891%20Fentange",
  },
  socials: [
    { id: "facebook", name: "Facebook", href: "https://www.facebook.com/profile.php?id=61557997643374" },
    { id: "instagram", name: "Instagram", href: "https://www.instagram.com/yws.lu/" },
    { id: "linkedin", name: "LinkedIn", href: "https://www.linkedin.com/in/ywslu/" },
  ],
  since: 2023,
  links: {
    applyForHousing:
      "https://docs.google.com/forms/d/e/1FAIpQLSeak3NN_4Ds3Iv7q8kCcJC7us8QsNb3FD2wZi1ausdO0mMstA/viewform",
    housesMap: "https://www.google.com/maps/d/u/0/edit?mid=1aPvVQqtHy7bmTQoetB5RWpCkIUjlEOg&usp=sharing",
    tecPractices: "https://tecpractices.eu/web/",
    tecZoom: "https://us06web.zoom.us/meeting/register/9XF6fSz_SuuP-9CLQ19ldw#/",
  },
} as const;

