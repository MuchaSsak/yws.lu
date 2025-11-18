"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import {
  AVAILABLE_LANGUAGES,
  DICTIONARY,
  LanguageLocale,
} from "@/lib/dictionary";

/**
 * Types
 */
type LanguageContext = {
  language: LanguageLocale;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageLocale>>;
  dictionary: (typeof DICTIONARY)[LanguageLocale];
};

/**
 * Initialization
 */
let defaultLanguage: LanguageLocale;
// Check if window mounted
if (typeof window !== "undefined") {
  const isNavigatorLanguageSupported = AVAILABLE_LANGUAGES.some(
    (language) => language.value === window.navigator.language.split("-")[0]
  );
  defaultLanguage = isNavigatorLanguageSupported
    ? (window.navigator.language.split("-")[0] as LanguageLocale)
    : "en";
} else defaultLanguage = "en";

const initialLanguageContext: LanguageContext = {
  language: defaultLanguage,
  setLanguage: () => {},

  dictionary: DICTIONARY[defaultLanguage],
};

const LanguageContext = createContext<LanguageContext>(initialLanguageContext);

/**
 * Provider
 */
export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<LanguageLocale>(() => {
    // Check if window mounted
    if (typeof window === "undefined") return defaultLanguage;

    // Load from localStorage
    if (!localStorage.getItem("language")) return defaultLanguage;
    // Fallback to default if the stored value in localStorage is invalid
    else if (
      !AVAILABLE_LANGUAGES.some(
        (availableLanguage) =>
          availableLanguage.value === localStorage.getItem("language")
      )
    )
      return defaultLanguage;
    else return JSON.parse(localStorage.getItem("language")!);
  });
  const [dictionary, setDictionary] = useState(DICTIONARY[language]);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("language", JSON.stringify(language));

    // Update dictionary
    setDictionary({ ...DICTIONARY[language] });
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Hook
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined)
    throw new Error("useLanguage was used outside of LanguageContextProvider!");
  return context;
}
