/**
 * The developer who built the site (wiki: site/seo.md § JSON-LD graph; Q4 answered 2026-10-15). Markup only: no
 * visible credit. The `@id`, name and profiles are copied from the Person node on muszarski.com, so search engines
 * read one entity across both sites (the developer's Knowledge Panel). Change them there first, then here.
 */
export const DEVELOPER = {
  id: "https://muszarski.com/#person",
  name: "Mateusz Muszarski",
  alternateName: "MuchaSsak",
  url: "https://muszarski.com/",
  jobTitle: "Full-stack product engineer",
  /** Small portrait the developer chose for this site; an absolute URL on their own domain. */
  image: "https://muszarski.com/_astro/mateusz-muszarski-palanga.C5K2NUzD_9ofRe.webp",
  sameAs: [
    "https://github.com/MuchaSsak",
    "https://www.linkedin.com/in/mateusz-muszarski-b1168a28a/",
    "https://www.npmjs.com/~muchassakkk",
    "https://play.google.com/store/apps/dev?id=7961731162261862815",
    "https://apps.apple.com/developer/mateusz-muszarski/id1896558654",
    "https://www.instagram.com/mat.muszarski/",
    "https://www.facebook.com/muszarski",
    "https://discord.com/users/440900720334602242",
    "https://t.me/MateuszMuszarski",
  ],
} as const;
