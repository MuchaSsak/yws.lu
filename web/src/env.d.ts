/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import("~/lib/locales").Locale;
  }
}

declare module "*.po" {
  import type { Messages } from "@lingui/core";
  export const messages: Messages;
}
