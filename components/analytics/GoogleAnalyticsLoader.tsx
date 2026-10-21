"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useConsent } from "@/lib/consent/useConsent";
import {
  getMeasurementId,
  initGoogleAnalytics,
  trackPageView,
  withdrawAnalyticsTracking,
} from "@/lib/analytics";

function NavigationTracker({ hasConsent }: { hasConsent: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!hasConsent) return;

    // Skip the very first mount because it is already tracked on script load
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const currentUrl =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    trackPageView(currentUrl);
  }, [pathname, searchParams, hasConsent]);

  return null;
}

export default function GoogleAnalyticsLoader() {
  const { hasConsent, isHydrated } = useConsent();
  const buildGaId = getMeasurementId();
  const [activeGaId, setActiveGaId] = useState<string | null>(buildGaId);
  const scriptLoadedRef = useRef(false);

  // If no build-time GA ID is present (kept hidden in .env server-side),
  // fetch it dynamically ONLY AFTER explicit affirmative consent is granted.
  useEffect(() => {
    if (!isHydrated || !hasConsent || activeGaId) return;

    let isMounted = true;

    async function fetchRuntimeConfig() {
      try {
        const res = await fetch("/api/analytics/config", {
          cache: "no-store",
        });
        const data = await res.json();
        if (isMounted && data.enabled && data.measurementId) {
          setActiveGaId(data.measurementId);
        }
      } catch {
        // Fail closed gracefully on network error
      }
    }

    fetchRuntimeConfig();

    return () => {
      isMounted = false;
    };
  }, [hasConsent, isHydrated, activeGaId]);

  // If consent is withdrawn after being granted, invoke immediate shutdown
  useEffect(() => {
    if (isHydrated && !hasConsent && scriptLoadedRef.current) {
      withdrawAnalyticsTracking(activeGaId || undefined);
    }
  }, [hasConsent, isHydrated, activeGaId]);

  // Fail-closed gate: Absolutely NO script is rendered until hydration, explicit opt-in, AND resolved ID
  if (!isHydrated || !hasConsent || !activeGaId) {
    return null;
  }

  const handleScriptLoad = () => {
    scriptLoadedRef.current = true;
    const initialized = initGoogleAnalytics(activeGaId);
    if (initialized) {
      trackPageView();
    }
  };

  return (
    <>
      <Script
        id="google-analytics-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${activeGaId}`}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <Suspense fallback={null}>
        <NavigationTracker hasConsent={hasConsent} />
      </Suspense>
    </>
  );
}
