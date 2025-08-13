"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { AVAILABLE_LANGUAGES, type LanguageLocale } from "@/lib/dictionary";
import { notoColorEmoji } from "@/lib/fonts";
import { cn } from "@/lib/utils";

function LanguagePicker({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  const { language, setLanguage } = useLanguage();

  return (
    <Select
      value={language}
      onValueChange={(newValue: LanguageLocale) => setLanguage(newValue)}
    >
      <SelectTrigger
        className={cn(
          "px-2 cursor-pointer border-muted-foreground bg-muted-foreground/40 text-background",
          className
        )}
        hasIcon={false}
      >
        {label && <span>{label}</span>}
        <span className={notoColorEmoji.className}>
          {
            AVAILABLE_LANGUAGES.find(
              (availableLanguage) => availableLanguage.value === language
            )!.Icon
          }
        </span>
      </SelectTrigger>

      <SelectContent
        className="shadow-xl border-muted-foreground bg-muted-foreground/60 text-background"
        sideOffset={6}
        align="end"
      >
        {/* Languages list */}
        {AVAILABLE_LANGUAGES.map((availableLanguage) => (
          <SelectItem
            key={availableLanguage.value}
            className="cursor-pointer focus:bg-foreground/25 focus:text-background"
            disabled={language === availableLanguage.value}
            value={availableLanguage.value}
          >
            <span>{availableLanguage.label}</span>
            <span className={notoColorEmoji.className}>
              {availableLanguage.Icon}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default LanguagePicker;
