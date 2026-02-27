"use client";

import { useState, useEffect } from "react";

/**
 * Detects if the viewport matches a mobile breakpoint using `window.matchMedia`.
 * Returns `false` as SSR fallback when `window.matchMedia` is not available.
 *
 * @param breakpoint - Max-width breakpoint in pixels (default: 768)
 * @returns `true` if viewport width is less than or equal to the breakpoint
 */
export function useMobileDetect(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return false;
    }
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    setIsMobile(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [breakpoint]);

  return isMobile;
}
