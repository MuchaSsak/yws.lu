import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";

import type { RouteId } from "./routes";

/**
 * Title and description per page (wiki: site/seo.md § Metadata table; new copy for the client's approval,
 * placeholders.md). The title is the page part: BaseLayout adds " | Youth Work Synergy", except on home, whose title
 * names the organisation first. meta.test.ts checks lengths and uniqueness in every locale.
 */
export interface PageMeta {
  title: MessageDescriptor;
  description: MessageDescriptor;
  /** The full title, without the suffix (home only). */
  full?: boolean;
}

export const META: Record<RouteId, PageMeta> = {
  home: {
    title: msg({ message: "Youth Work Synergy | Homes for young people in Luxembourg", context: "home page title" }),
    description: msg`Youth Work Synergy (YWS) is a Luxembourg non-profit: we rent homes from private owners and offer young people aged 18–34 affordable, stable coliving.`,
    full: true,
  },
  housing: {
    title: msg({ message: "Youth housing in Luxembourg, ages 18–34", context: "page title" }),
    description: msg`Aged 18–34 and need stable, affordable housing in Luxembourg? Fully furnished rooms in shared homes, with coaching and support. Fill in our quick form.`,
  },
  owners: {
    title: msg({ message: "Rent out your property in Luxembourg", context: "page title" }),
    description: msg`Rent your house, apartment or room to Youth Work Synergy: guaranteed rent every month, a 90% tax exemption on net rental income and tenant support.`,
  },
  about: {
    title: msg({ message: "About us: our mission and real impact", context: "page title" }),
    description: msg`A Luxembourg non-profit (ASBL) with Gestion Locative Sociale (GLS) status, working with the Ministry of Housing to solve the youth housing crisis.`,
  },
  projects: {
    title: msg({ message: "We Spark Projects: youth-led projects", context: "page title" }),
    description: msg`Youth-led projects we support: a housing workshop, a documentary on the housing crisis, Erasmus+ and European Solidarity Corps projects.`,
  },
  tec: {
    title: msg({ message: "TEC conference: Much More Than a Method", context: "page title" }),
    description: msg`The closing conference of V – Comprehensive Guide to Best Practices in Mobile Learning for Adults took place online on 9 April 2026. See tecpractices.eu.`,
  },
  privacy: {
    title: msg({ message: "Privacy policy", context: "page title" }),
    description: msg`How Youth Work Synergy ASBL handles personal data when you visit this website or contact us, and how to exercise your rights under the GDPR.`,
  },
  legal: {
    title: msg({ message: "Legal notice", context: "page title" }),
    description: msg`Legal notice of Youth Work Synergy ASBL: registered name and seat, registration number, contact details and the host of this website.`,
  },
};

/** The organisation's one-line mission (2025 `ourMissionDescriptionAboutUs`): footer, JSON-LD, llms.txt. */
export const MISSION = msg`We help young people transition into independent, fulfilling lives by combining access to housing with educational and emotional support.`;

export const SITE_NAME = "Youth Work Synergy";
export const fullTitle = (page: string, full = false) => (full ? page : `${page} | ${SITE_NAME}`);
