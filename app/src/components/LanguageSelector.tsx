"use client";

import { useEffect } from "react";
import { LANG_KEY } from "./i18n-provider";
import { useI18nContext } from "@/i18n/i18n-react";
import type { Locales } from "@/i18n/i18n-types";
import { loadLocale } from "@/i18n/i18n-util.sync";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function LanguageSelector() {
  const { locale, setLocale } = useI18nContext();

  useEffect(() => {
    const stored = localStorage.getItem(LANG_KEY);
    if (stored === "en" || stored === "ar") {
      setLocale(stored);
      document.documentElement.lang = stored;
      loadLocale(stored);
    }
  }, [setLocale]);

  const changeLanguage = (newLang: Locales) => {
    setLocale(newLang);
    document.documentElement.lang = newLang;
    localStorage.setItem(LANG_KEY, newLang);
    loadLocale(newLang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{locale === "en" ? "English" : "العربية"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("ar")}>
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

