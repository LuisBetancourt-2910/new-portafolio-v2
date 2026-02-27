"use client";

import { useState, useCallback } from "react";

interface UseMatrixModeReturn {
  matrixMode: boolean;
  setMatrixMode: (mode: boolean) => void;
  toggleMatrixMode: () => void;
}

/**
 * Encapsulates the `matrixMode` state with stable callback references
 * to prevent unnecessary re-renders when passed as props.
 */
export function useMatrixMode(): UseMatrixModeReturn {
  const [matrixMode, setMatrixModeState] = useState(false);

  const setMatrixMode = useCallback((mode: boolean) => {
    setMatrixModeState(mode);
  }, []);

  const toggleMatrixMode = useCallback(() => {
    setMatrixModeState((prev) => !prev);
  }, []);

  return { matrixMode, setMatrixMode, toggleMatrixMode };
}
