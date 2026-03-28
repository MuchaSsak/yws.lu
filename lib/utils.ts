import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { DICTIONARY, type LanguageLocale } from "@/lib/dictionary";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobile() {
  if (typeof window === "undefined") return;
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function generateTranslatedMetadata(
  metadataKey: keyof typeof DICTIONARY.en.METADATA,
) {
  if (typeof window === "undefined") return;
  const locale = navigator.language.split("-")[0];

  // Fallback to English if locale not supported
  const metadata =
    DICTIONARY[locale as LanguageLocale]?.METADATA[metadataKey] ||
    DICTIONARY.en.METADATA[metadataKey];

  return metadata;
}
