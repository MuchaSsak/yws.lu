import { describe, expect, it } from "vitest";

import { ORGANISATION } from "./organisation";

/** The organisation's facts have usable shapes (wiki: content/content-model.md § The organisation). */
describe("organisation facts", () => {
  it("phones are E.164 for Luxembourg, each with its display form", () => {
    expect(ORGANISATION.phones.length).toBeGreaterThan(0);
    for (const phone of ORGANISATION.phones) {
      expect(phone.e164).toMatch(/^\+352\d{6,9}$/);
      expect(phone.display.replace(/\s/g, "")).toBe(phone.e164.slice(4));
    }
  });

  it("addresses carry a Luxembourg postcode and a Google Maps link", () => {
    for (const place of [ORGANISATION.office, ORGANISATION.seat]) {
      expect(place.postalCode).toMatch(/^L-\d{4}$/);
      expect(place.country).toBe("LU");
      expect(place.maps).toMatch(/^https:\/\/www\.google\.com\/maps\//);
    }
  });

  it("email and every link are real absolute URLs", () => {
    expect(ORGANISATION.email).toMatch(/^[^@\s]+@yws\.lu$/);
    for (const social of ORGANISATION.socials)
      expect(social.href).toMatch(/^https:\/\/www\.(facebook|instagram|linkedin)\.com\//);
    for (const link of Object.values(ORGANISATION.links)) expect(link).toMatch(/^https:\/\//);
  });
});
