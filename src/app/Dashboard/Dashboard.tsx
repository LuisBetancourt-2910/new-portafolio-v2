"use client";

import { useCallback, useEffect, useState } from "react";
import { useMatrixMode } from "@/hooks/useMatrixMode";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Section components
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import TechStackSection from "./sections/TechStackSection";
import MetricsSection from "./sections/MetricsSection";
import CVSection from "./sections/CVSection";
import FooterSection from "./sections/FooterSection";

// UI components
import NavigationDock from "./components/NavigationDock";
import MobileMenu from "./components/MobileMenu";
import MatrixEasterEgg from "./components/MatrixEasterEgg";
import BackgroundManager from "./components/BackgroundManager";

// Dynamic imports for theme and language togglers
const AnimatedThemeToggler = dynamic(
  () => import("@/components/ThemeToggler/animated-theme-toggler").then(mod => ({ default: mod.AnimatedThemeToggler })),
  { ssr: false }
);

const LanguageToggler = dynamic(
  () => import("@/components/LanguageToggler/language-toggler").then(mod => ({ default: mod.LanguageToggler })),
  { ssr: false }
);

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const { matrixMode, setMatrixMode } = useMatrixMode();
  const { mobileMenuOpen, setMobileMenuOpen, closeMobileMenu } = useMobileMenu();

  // Observe dark mode from html element's class
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    closeMobileMenu();
  }, [closeMobileMenu]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-400">
      {/* Background: Particles or Matrix Rain */}
      <BackgroundManager matrixMode={matrixMode} isDark={isDark} />

      {/* Easter egg keyboard listener */}
      <MatrixEasterEgg matrixMode={matrixMode} setMatrixMode={setMatrixMode} />

      {/* Matrix Mode Badge */}
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-black/80 border border-green-500/50 backdrop-blur-md pointer-events-none"
          >
            <p className="text-green-400 font-mono text-sm flex items-center gap-2">
              <span className="animate-pulse">●</span>
              MATRIX MODE ACTIVATED • Press ESC to exit
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Mode Style Override */}
      {matrixMode && (
        <style jsx global>{`
          .dark, html { color-scheme: dark !important; }
          * { color: #4ade80 !important; }
          h1, h2, h3, h4, h5, h6 { background: linear-gradient(to right, #4ade80, #22c55e) !important; -webkit-background-clip: text !important; background-clip: text !important; -webkit-text-fill-color: transparent !important; }
          .bg-white\\/10, .dark\\:bg-black\\/20, .bg-slate-900\\/10, .dark\\:bg-white\\/10 { background-color: rgba(0, 0, 0, 0.4) !important; }
          .border-slate-900\\/10, .dark\\:border-white\\/10, .border-slate-900\\/20, .dark\\:border-white\\/20 { border-color: rgba(34, 197, 94, 0.3) !important; }
          button, a { color: #4ade80 !important; }
          [class*="dock"] button, [class*="Dock"] button, nav button { background-color: rgba(74, 222, 128, 0.15) !important; border-color: rgba(74, 222, 128, 0.4) !important; }
          [class*="dock"] button:hover, [class*="Dock"] button:hover, nav button:hover { background-color: rgba(74, 222, 128, 0.25) !important; border-color: rgba(74, 222, 128, 0.6) !important; }
          [class*="dock"] svg, [class*="Dock"] svg, nav svg { color: #22c55e !important; fill: currentColor !important; filter: drop-shadow(0 0 2px rgba(74, 222, 128, 0.5)); }
        `}</style>
      )}

      {/* Theme and Language Togglers */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <LanguageToggler />
        <AnimatedThemeToggler className="p-3 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all text-slate-900 dark:text-white" />
      </div>

      {/* Navigation */}
      <NavigationDock scrollToSection={scrollToSection} />
      <MobileMenu scrollToSection={scrollToSection} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8 pt-32 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pointer-events-none">
          <AboutSection />
          <ProjectsSection />
          <TechStackSection />
          <MetricsSection />
          <CVSection />
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
