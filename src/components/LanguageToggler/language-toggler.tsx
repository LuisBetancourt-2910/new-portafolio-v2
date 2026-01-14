"use client";

import React, { useEffect, useState, useTransition, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

export function LanguageToggler() {
    const [locale, setLocale] = useState<"es" | "en">("es");
    const [mounted, setMounted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const buttonRef = useRef<HTMLButtonElement>(null);

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

    const toggleLanguage = async () => {
        if (!buttonRef.current) return;

        const newLocale = locale === "es" ? "en" : "es";

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const x = left + width / 2;
        const y = top + height / 2;
        const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
        );

        // Crear overlay visual para el efecto de ola
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            inset: 0;
            z-index: 9999;
            pointer-events: none;
            background: radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.3) 60%, transparent 100%);
            clip-path: circle(0px at ${x}px ${y}px);
        `;
        document.body.appendChild(overlay);

        // Animar el overlay con clipPath circular
        const overlayAnimation = overlay.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
                opacity: [1, 0],
            },
            {
                duration: 600,
                easing: "ease-out",
            }
        );

        // Animación circular de transición
        await document.startViewTransition(() => {
            flushSync(() => {
                // Set locale cookie
                document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year

                // Update state immediately for visual feedback
                setLocale(newLocale);

                // Dispatch custom event for other components to listen
                window.dispatchEvent(new CustomEvent('localeChange', { detail: { locale: newLocale } }));
            });
        }).ready;

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 400,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        );

        // Remover overlay después de la animación
        overlayAnimation.onfinish = () => {
            overlay.remove();
        };

        // Use Next.js router to refresh without full page reload
        startTransition(() => {
            router.refresh();
        });
    };

    if (!mounted) {
        return (
            <button
                ref={buttonRef}
                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20"
                aria-label="Toggle language"
            >
                <div className="absolute text-4xl opacity-10 text-slate-900 dark:text-white">文</div>
                <span className="relative z-10 text-sm font-bold text-slate-900 dark:text-white">ES</span>
            </button>
        );
    }

    return (
        <button
            ref={buttonRef}
            onClick={toggleLanguage}
            disabled={isPending}
            className="group relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-wait"
            aria-label={`Switch to ${locale === "es" ? "English" : "Español"}`}
        >
            {/* Kanji/Symbol background - always visible */}
            <div className="absolute text-4xl font-bold text-slate-900 dark:text-white opacity-10">
                文
            </div>

            {/* ES text */}
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
                className="absolute z-10"
            >
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                    ES
                </span>
            </motion.div>

            {/* EN text */}
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
                className="absolute z-10"
            >
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                    EN
                </span>
            </motion.div>
        </button>
    );
}
