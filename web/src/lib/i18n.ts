import { type I18n, setupI18n } from "@lingui/core";

import { messages as en } from "~/locales/en/messages.po";
import { messages as fr } from "~/locales/fr/messages.po";

import { type Locale } from "./locales";

/**
 * One cached Lingui instance per locale (wiki: tech/usage/lingui.md). Never a global `activate()`: the static build
 * renders every locale in one process. `.po` files are compiled on import by `@lingui/vite-plugin`.
 */
const CATALOGS = { en, fr } satisfies Record<Locale, unknown>;
const cache = new Map<Locale, I18n>();

export function getI18n(locale: Locale): I18n {
  let i18n = cache.get(locale);
  if (!i18n) {
    i18n = setupI18n({ locale, messages: { [locale]: CATALOGS[locale] } });
    cache.set(locale, i18n);
  }
  return i18n;
}
