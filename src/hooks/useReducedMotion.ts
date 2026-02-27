"use client";

import { useState, useEffect } from "react";

/**
 * Detects if the user prefers reduced motion using `prefers-reduced-motion` media query.
 * Returns `false` as SSR fallback when `window.matchMedia` is not available.
 * Listens for dynamic changes to the preference.
 *
 * @returns `true` if the user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(
    () => {
      if (typeof window === "undefined" || !window.matchMedia) {
        return false;
      }
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
