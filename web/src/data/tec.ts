import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";

/**
 * The TEC closing conference (wiki: site/structure.md § TEC conference): a past event kept as a record (Q8), from the
 * 2025 page [repo: app/TecConference]. The countries are the project's partners' (NINFEA, Kultur Nest e.V., YWS);
 * `location` is each country's centre, where the globe draws its marker (not a city or an address).
 */
export const TEC_CONFERENCE = {
  date: "2026-04-09",
} as const;

export interface PartnerCountry {
  name: MessageDescriptor;
  location: [number, number];
}

export const TEC_COUNTRIES: PartnerCountry[] = [
  { name: msg`Italy`, location: [41.8719, 12.5674] },
  { name: msg`Germany`, location: [51.1657, 10.4515] },
  { name: msg`Luxembourg`, location: [49.8153, 6.1296] },
];
