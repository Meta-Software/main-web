"use client";

import { useEffect, useState } from "react";
import en from "@/i18n/en";
import ar from "@/i18n/ar";
import TypesafeI18n from "@/i18n/i18n-react";
import { loadLocale } from "@/i18n/i18n-util.sync";

export const LANG_KEY = "lang";
const locales = { en, ar };

export default function I18NWrapper({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<keyof typeof locales | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY);
    const resolved = stored && stored in locales ? stored : "en";
    const finalLocale = (resolved in locales ? resolved : "en") as keyof typeof locales;
    setLocale(finalLocale);
    loadLocale(finalLocale);
    document.documentElement.lang = finalLocale;
  }, []);

  if (!locale) return null;

  return (
    <TypesafeI18n locale={locale}>
      {children}
    </TypesafeI18n>
  );
}
