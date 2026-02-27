"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface MatrixEasterEggProps {
  matrixMode: boolean;
  setMatrixMode: (mode: boolean) => void;
}

/**
 * Invisible component that handles the Matrix easter egg detection.
 * Listens for the "M" key pressed 3 times within 2 seconds to activate Matrix mode.
 * Press Escape to deactivate.
 * 
 * Manages mKeyPresses state internally; exposes matrixMode/setMatrixMode to parent.
 */
export default function MatrixEasterEgg({ matrixMode, setMatrixMode }: MatrixEasterEggProps) {
  const [mKeyPresses, setMKeyPresses] = useState(0);
  const mKeyTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "m") {
        setMKeyPresses((prev) => {
          const newCount = prev + 1;

          // Reset counter after 2 seconds of inactivity
          if (mKeyTimerRef.current) {
            clearTimeout(mKeyTimerRef.current);
          }
          mKeyTimerRef.current = setTimeout(() => {
            setMKeyPresses(0);
          }, 2000);

          // Activate Matrix mode on the third press
          if (newCount === 3) {
            setMatrixMode(true);
            setMKeyPresses(0);
            if (mKeyTimerRef.current) {
              clearTimeout(mKeyTimerRef.current);
            }
          }

          return newCount;
        });
      }

      // Exit Matrix mode with Escape
      if (e.key === "Escape" && matrixMode) {
        setMatrixMode(false);
      }
    },
    [matrixMode, setMatrixMode]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      if (mKeyTimerRef.current) {
        clearTimeout(mKeyTimerRef.current);
      }
    };
  }, [handleKeyPress]);

  // This component renders nothing — it only sets up the keyboard listener
  return null;
}
