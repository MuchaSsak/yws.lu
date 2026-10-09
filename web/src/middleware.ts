import { defineMiddleware } from "astro:middleware";
import { setLinguiContext } from "lingui-for-astro";

import { getI18n } from "~/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "~/lib/locales";

/**
 * Request-scoped Lingui context from the `[locale]` route param (wiki: tech/usage/lingui.md). In a static build Astro
 * runs this once per prerendered page; pages without the param (root fallback) render in the default locale.
 */
export const onRequest = defineMiddleware((context, next) => {
  const param = context.params.locale;
  const locale = isLocale(param) ? param : DEFAULT_LOCALE;
  context.locals.locale = locale;
  setLinguiContext(context.locals, getI18n(locale));
  return next();
});
