"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface ObserverOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface UseSharedObserverReturn {
  ref: React.RefCallback<Element>;
  isInView: boolean;
}

type ObserverCallback = (entry: IntersectionObserverEntry) => void;

interface ObserverEntry {
  callback: ObserverCallback;
  once: boolean;
}

/**
 * Shared observer instances keyed by "threshold|rootMargin".
 * Each key maps to a single IntersectionObserver and its element→callback map.
 */
const observerMap = new Map<
  string,
  {
    observer: IntersectionObserver;
    elements: Map<Element, ObserverEntry>;
  }
>();

function getObserverKey(threshold: number, rootMargin: string): string {
  return `${threshold}|${rootMargin}`;
}

function getOrCreateObserver(
  threshold: number,
  rootMargin: string
): { observer: IntersectionObserver; elements: Map<Element, ObserverEntry> } {
  const key = getObserverKey(threshold, rootMargin);

  const existing = observerMap.get(key);
  if (existing) {
    return existing;
  }

  const elements = new Map<Element, ObserverEntry>();

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const tracked = elements.get(entry.target);
        if (!tracked) continue;

        tracked.callback(entry);

        if (tracked.once && entry.isIntersecting) {
          observer.unobserve(entry.target);
          elements.delete(entry.target);
        }
      }
    },
    { threshold, rootMargin }
  );

  const record = { observer, elements };
  observerMap.set(key, record);
  return record;
}

/**
 * Shared IntersectionObserver hook that uses a singleton observer per
 * threshold+rootMargin combination. Reduces the number of active observers
 * when many sections need intersection detection.
 *
 * @param options.threshold - Intersection threshold (default: 0)
 * @param options.rootMargin - Root margin (default: "0px 0px -50px 0px")
 * @param options.once - Disconnect element after first intersection (default: true)
 * @returns `{ ref, isInView }` — attach `ref` to the target element
 */
export function useSharedIntersectionObserver(
  options?: ObserverOptions
): UseSharedObserverReturn {
  const { threshold = 0, rootMargin = "0px 0px -50px 0px", once = true } = options ?? {};

  // SSR / unsupported browser fallback
  const isSupported =
    typeof window !== "undefined" && typeof IntersectionObserver !== "undefined";

  const [isInView, setIsInView] = useState<boolean>(!isSupported);

  const elementRef = useRef<Element | null>(null);
  const disconnectedRef = useRef(false);

  // Cleanup: unobserve the current element
  const unobserve = useCallback(
    (element: Element) => {
      if (!isSupported) return;
      const key = getObserverKey(threshold, rootMargin);
      const record = observerMap.get(key);
      if (record) {
        record.observer.unobserve(element);
        record.elements.delete(element);
      }
    },
    [isSupported, threshold, rootMargin]
  );

  // Ref callback: observe new element, unobserve previous
  const ref: React.RefCallback<Element> = useCallback(
    (node: Element | null) => {
      // Unobserve previous element
      if (elementRef.current) {
        unobserve(elementRef.current);
      }

      elementRef.current = node;

      if (!node || !isSupported || disconnectedRef.current) return;

      const { observer, elements } = getOrCreateObserver(threshold, rootMargin);

      const callback: ObserverCallback = (entry) => {
        const intersecting = entry.isIntersecting;
        setIsInView(intersecting);

        if (once && intersecting) {
          disconnectedRef.current = true;
        }
      };

      elements.set(node, { callback, once });
      observer.observe(node);
    },
    [isSupported, threshold, rootMargin, once, unobserve]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (elementRef.current && isSupported) {
        const key = getObserverKey(threshold, rootMargin);
        const record = observerMap.get(key);
        if (record) {
          record.observer.unobserve(elementRef.current);
          record.elements.delete(elementRef.current);
        }
      }
    };
  }, [isSupported, threshold, rootMargin]);

  return { ref, isInView };
}
