"use client";

import { useState, useCallback, useSyncExternalStore, useEffect } from "react";
import {
  ConsentRecord,
  CONSENT_CHANGE_EVENT,
  OPEN_PREFERENCES_EVENT,
} from "./types";
import {
  DEFAULT_DENIED_CONSENT,
  getStoredConsent,
  hasAnalyticsConsent as checkHasConsent,
  acceptAllConsent,
  rejectAllConsent,
  saveCustomConsent,
  withdrawConsent,
  openConsentPreferences,
} from "./state";

// Global in-memory cache of current record to provide a stable reference for useSyncExternalStore
let cachedRecord: ConsentRecord = DEFAULT_DENIED_CONSENT;

function subscribeConsentStore(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handleUpdate = () => {
    cachedRecord = getStoredConsent();
    callback();
  };

  window.addEventListener(CONSENT_CHANGE_EVENT, handleUpdate);
  window.addEventListener("storage", handleUpdate);

  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, handleUpdate);
    window.removeEventListener("storage", handleUpdate);
  };
}

function getConsentSnapshot(): ConsentRecord {
  if (typeof window === "undefined") {
    return DEFAULT_DENIED_CONSENT;
  }
  const current = getStoredConsent();
  if (JSON.stringify(current) !== JSON.stringify(cachedRecord)) {
    cachedRecord = current;
  }
  return cachedRecord;
}

function getServerConsentSnapshot(): ConsentRecord {
  return DEFAULT_DENIED_CONSENT;
}

// Idiomatic React 18/19 hydration detection without cascading render effects
const emptySubscribe = () => () => {};
const getClientHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

export function useConsent() {
  const record = useSyncExternalStore(
    subscribeConsentStore,
    getConsentSnapshot,
    getServerConsentSnapshot
  );

  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    getClientHydratedSnapshot,
    getServerHydratedSnapshot
  );

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const handleOpenPreferences = () => {
      setIsPreferencesOpen(true);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
    };
  }, []);

  const acceptAll = useCallback(() => {
    acceptAllConsent();
  }, []);

  const rejectAll = useCallback(() => {
    rejectAllConsent();
  }, []);

  const saveCustom = useCallback((analyticsOptIn: boolean) => {
    saveCustomConsent(analyticsOptIn);
  }, []);

  const withdraw = useCallback(() => {
    withdrawConsent();
  }, []);

  const openPreferences = useCallback(() => {
    openConsentPreferences();
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const hasConsent = isHydrated && checkHasConsent();

  return {
    record,
    hasConsent,
    isHydrated,
    isPreferencesOpen,
    acceptAll,
    rejectAll,
    saveCustom,
    withdraw,
    openPreferences,
    closePreferences,
  };
}
