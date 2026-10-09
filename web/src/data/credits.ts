/**
 * Third-party works the site shows, credited in the footer's credits dialog (wiki: design/assets.md § 3D models,
 * THIRD_PARTY_NOTICES.md). Every CC BY work needs title, author, source, licence and whether it was modified.
 * The 2025 dialog's "Heart in Love" (no model anywhere) and "Loft Bedroom" (dead code, model removed) are gone.
 * Links are the canonical Sketchfab URLs recorded in assets.md (copied, not retyped).
 */
export interface Credit {
  title: string;
  source: string;
  author: string;
  authorUrl: string;
  /** Re-encoded or otherwise changed from the original (CC BY 4.0 § 3(a)(1)(B)). */
  modified: boolean;
}

export const CC_BY_4 = "https://creativecommons.org/licenses/by/4.0/";

export const CREDITS: Credit[] = [
  {
    title: "Cat House",
    source: "https://sketchfab.com/3d-models/cat-house-3ccdeded08134525acfa5b59a734a6d3",
    author: "Roman_Nilikovskii",
    authorUrl: "https://sketchfab.com/Roman_Nilikovskii",
    modified: true,
  },
  {
    title: "Cosmonaut on a rocket",
    source: "https://sketchfab.com/3d-models/cosmonaut-on-a-rocket-e93cbbdb9a2144fb9f63d062566f3e63",
    author: "Yury Misiyuk",
    authorUrl: "https://sketchfab.com/Tim0",
    modified: true,
  },
  {
    title: "Stylized Wardrobe",
    source: "https://sketchfab.com/3d-models/stylized-wardrobe-66aa34d1c9964289860e4c557036d99e",
    author: "stefan",
    authorUrl: "https://sketchfab.com/stefanhagewoud",
    modified: true,
  },
];

/** The 2025 dialog's last line, kept as it was (Q4: no new developer credit without the client's OK). */
export const LEAD_DEVELOPER = { name: "Mateusz Muszarski", href: "https://github.com/MuchaSsak" } as const;
