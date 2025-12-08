"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function LanguageToggler() {
    const [locale, setLocale] = useState<"es" | "en">("es");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Get current locale from cookie
        const currentLocale = document.cookie
            .split("; ")
            .find((row) => row.startsWith("locale="))
            ?.split("=")[1] as "es" | "en" | undefined;

        if (currentLocale) {
            setLocale(currentLocale);
        }
    }, []);

    const toggleLanguage = () => {
        const newLocale = locale === "es" ? "en" : "es";
        
        // Save current theme state IMMEDIATELY before any changes
        const isDarkMode = document.documentElement.classList.contains('dark');
        const themeToSave = isDarkMode ? 'dark' : 'light';
        
        // Force save theme to localStorage
        localStorage.setItem('theme', themeToSave);
        
        // Also save as data attribute for immediate restoration
        document.documentElement.setAttribute('data-theme-backup', themeToSave);

        // Set locale cookie
        document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year

        // Update state
        setLocale(newLocale);

        // Reload page to apply new locale
        window.location.reload();
    };

    if (!mounted) {
        return (
            <button
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20"
                aria-label="Toggle language"
            >
                <span className="text-sm font-bold text-slate-900 dark:text-white">ES</span>
            </button>
        );
    }

    return (
        <button
            onClick={toggleLanguage}
            className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all hover:scale-105"
            aria-label={`Switch to ${locale === "es" ? "English" : "Español"}`}
        >
            <motion.div
                initial={false}
                animate={{
                    scale: locale === "es" ? 1 : 0,
                    opacity: locale === "es" ? 1 : 0,
                    rotate: locale === "es" ? 0 : 180,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="absolute"
            >
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                    ES
                </span>
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: locale === "en" ? 1 : 0,
                    opacity: locale === "en" ? 1 : 0,
                    rotate: locale === "en" ? 0 : -180,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                }}
                className="absolute"
            >
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                    EN
                </span>
            </motion.div>
        </button>
    );
}
