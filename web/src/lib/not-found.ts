import { msg } from "@lingui/core/macro";
import type { MessageDescriptor } from "@lingui/core";

import type { RouteId } from "./routes";

/**
 * The 404's copy (wiki: site/structure.md § 404). The page renders it in every locale at once, so it lives here as
 * descriptors that `getI18n(locale)._()` can read in any language. The link labels reuse the 2025 dictionary's
 * strings (same messages as the header and footer); the heading and lead are new copy (placeholders.md).
 */
export const NOT_FOUND = {
  heading: msg({ message: "Page not found", context: "404 heading" }),
  lead: msg({ message: "This page does not exist or has moved.", context: "404 lead" }),
  prompt: msg({ message: "Where to go from here:", context: "404 links heading" }),
  links: [
    { route: "home", label: msg`Homepage` },
    { route: "housing", label: msg`Looking for housing` },
    { route: "owners", label: msg`Rent your property` },
    { route: "home", hash: "contact", label: msg`Contact us` },
  ] satisfies { route: RouteId; hash?: string; label: MessageDescriptor }[],
};
