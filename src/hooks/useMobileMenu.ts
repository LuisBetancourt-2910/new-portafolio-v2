"use client";

import { useState, useCallback } from "react";

interface UseMobileMenuReturn {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  closeMobileMenu: () => void;
}

/**
 * Encapsulates the `mobileMenuOpen` state with stable callback references
 * to prevent unnecessary re-renders when passed as props.
 */
export function useMobileMenu(): UseMobileMenuReturn {
  const [mobileMenuOpen, setMobileMenuOpenState] = useState(false);

  const setMobileMenuOpen = useCallback((open: boolean) => {
    setMobileMenuOpenState(open);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpenState(false);
  }, []);

  return { mobileMenuOpen, setMobileMenuOpen, closeMobileMenu };
}
