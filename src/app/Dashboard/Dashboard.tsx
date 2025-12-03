"use client";

import React, { useEffect, useState } from "react";
import Particles from "@/components/Backgrounds/Particles";
import { AnimatedThemeToggler } from "@/components/Theme Toggler/animated-theme-toggler";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Verificar el tema inicial
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Observar cambios en el tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-400">
      {/* Theme Toggler */}
      <div className="fixed top-6 right-6 z-50">
        <AnimatedThemeToggler className="p-3 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all text-slate-900 dark:text-white" />
      </div>

      {/* Particles Background */}
      <div className="absolute inset-0" style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0 }}>
        <Particles
          particleColors={isDark ? ["#ffffff", "#ffffff"] : ["#1e293b", "#334155", "#475569"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
    </div>
  );
}
