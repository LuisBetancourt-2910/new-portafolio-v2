"use client";

import { useState, useEffect, useRef } from "react";

interface UseVisibilityPauseReturn {
  isVisible: boolean;
}

/**
 * Pauses/resumes animation loops based on `document.visibilityState`.
 * Invokes `onPause` when the tab becomes hidden and `onResume` when it becomes visible.
 * Assumes visible if the Visibility API is not available.
 *
 * @param onPause - Callback invoked when the tab becomes hidden
 * @param onResume - Callback invoked when the tab becomes visible
 * @returns `{ isVisible: boolean }` indicating current tab visibility
 */
export function useVisibilityPause(
  onPause: () => void,
  onResume: () => void
): UseVisibilityPauseReturn {
  const onPauseRef = useRef(onPause);
  const onResumeRef = useRef(onResume);

  // Keep refs in sync with latest callbacks to avoid stale closures
  useEffect(() => {
    onPauseRef.current = onPause;
  }, [onPause]);

  useEffect(() => {
    onResumeRef.current = onResume;
  }, [onResume]);

  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof document === "undefined" || typeof document.hidden === "undefined") {
      return true;
    }
    return !document.hidden;
  });

  useEffect(() => {
    if (typeof document === "undefined" || typeof document.hidden === "undefined") {
      return;
    }

    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      setIsVisible(visible);

      if (visible) {
        onResumeRef.current();
      } else {
        onPauseRef.current();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { isVisible };
}
