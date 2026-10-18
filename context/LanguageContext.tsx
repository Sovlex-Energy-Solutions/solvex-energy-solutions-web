"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import enMessages from "@/messages/en.json";
import hiMessages from "@/messages/hi.json";

export type Locale = "en" | "hi";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (
    key: string,
    fallbackOrParams?: string | Record<string, string | number>,
    params?: Record<string, string | number>
  ) => string;
  isHindi: boolean;
}

type MessagesDict = Record<string, unknown>;

const dictionaries: Record<Locale, MessagesDict> = {
  en: enMessages as MessagesDict,
  hi: hiMessages as MessagesDict,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const COOKIE_NAME = "solvex_locale";
const STORAGE_KEY = "solvex_locale";


function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Synchronize client-side preference (URL query param, localStorage, or cookie) after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("lang");
        if (urlLang === "hi" || urlLang === "en") {
          setLocaleState(urlLang);
          return;
        }

        const storedLang = localStorage.getItem(STORAGE_KEY);
        if (storedLang === "hi" || storedLang === "en") {
          setLocaleState(storedLang);
          return;
        }

        const match = document.cookie.match(new RegExp("(^|;\\s*)" + COOKIE_NAME + "=([^;]*)"));
        const cookieLang = match ? decodeURIComponent(match[2]) : null;
        if (cookieLang === "hi" || cookieLang === "en") {
          setLocaleState(cookieLang);
        }
      } catch {
        // Safe fallback
      }
    }, 0);

    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get("lang");
        if (urlLang === "en" || urlLang === "hi") {
          setLocaleState(urlLang);
        }
      } catch {
        // Safe fallback
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Synchronize document attributes, cookies, title, and query params when locale changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      document.documentElement.lang = locale;
      if (locale === "hi") {
        document.documentElement.classList.add("lang-hi");
        document.title = "Solvex Energy Solutions | स्वच्छ ऊर्जा एवं सोलर फ्रैंचाइज़ी इकोसिस्टम";
      } else {
        document.documentElement.classList.remove("lang-hi");
        document.title = "Solvex Energy Solutions | Clean Energy & Solar Franchise Ecosystem";
      }

      setCookie(COOKIE_NAME, locale);
      localStorage.setItem(STORAGE_KEY, locale);

      const currentUrl = new URL(window.location.href);
      if (locale === "hi") {
        currentUrl.searchParams.set("lang", "hi");
      } else {
        currentUrl.searchParams.delete("lang");
      }
      window.history.replaceState({}, "", currentUrl.toString());
    } catch {
      // Safe fallback
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => (prev === "en" ? "hi" : "en"));
  }, []);

  const t = useCallback(
    (
      key: string,
      fallbackOrParams?: string | Record<string, string | number>,
      params?: Record<string, string | number>
    ): string => {
      const fallback = typeof fallbackOrParams === "string" ? fallbackOrParams : undefined;
      const actualParams =
        typeof fallbackOrParams === "object" && fallbackOrParams !== null
          ? fallbackOrParams
          : params;

      const keys = key.split(".");

      // Helper to traverse object
      const lookup = (dict: MessagesDict): unknown => {
        let current: unknown = dict;
        for (const k of keys) {
          if (current == null || typeof current !== "object") return undefined;
          current = (current as Record<string, unknown>)[k];
        }
        return current;
      };

      // 1. Try active locale
      let result: unknown = lookup(dictionaries[locale]);

      // 2. Fallback to English if missing
      if (result === undefined && locale !== "en") {
        result = lookup(dictionaries.en);
      }

      // 3. Fallback to passed fallback or key itself if still missing
      if (result === undefined) {
        return fallback !== undefined ? fallback : key;
      }

      // 4. Interpolate parameters if string
      if (typeof result === "string") {
        if (!actualParams) return result;
        let formatted = result;
        for (const [pKey, pVal] of Object.entries(actualParams)) {
          formatted = formatted.replace(new RegExp(`\\{${pKey}\\}`, "g"), String(pVal));
        }
        return formatted;
      }

      return String(result);
    },
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
      isHindi: locale === "hi",
    }),
    [locale, setLocale, toggleLocale, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
