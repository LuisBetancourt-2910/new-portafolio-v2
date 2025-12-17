"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Particles from "@/components/Backgrounds/Particles";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    const t = useTranslations();
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
        <div className="relative w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-400 overflow-hidden">
            {/* Particles Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    willChange: "transform",
                    transform: "translateZ(0)",
                }}
            >
                <div className="pointer-events-none w-full h-full">
                    <Particles
                        particleColors={
                            isDark
                                ? ["#ffffff", "#ffffff"]
                                : ["#1e293b", "#334155", "#475569"]
                        }
                        particleCount={150}
                        particleSpread={10}
                        speed={0.08}
                        particleBaseSize={80}
                        moveParticlesOnHover={true}
                        alphaParticles={false}
                        disableRotation={false}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-16">
                <div className="w-full max-w-4xl mx-auto">
                    <motion.div
                        className="flex flex-col items-center text-center gap-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {/* Animated 404 */}
                        <motion.div
                            className="relative"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute inset-0 blur-3xl opacity-30"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                            </motion.div>

                            {/* 404 Number */}
                            <div className="relative flex items-center justify-center gap-4">
                                <motion.span
                                    className="text-[120px] md:text-[200px] lg:text-[280px] font-black bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-none"
                                    initial={{ rotateY: -90, opacity: 0 }}
                                    animate={{ rotateY: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    style={{
                                        textShadow: "0 0 80px rgba(147, 51, 234, 0.5)",
                                    }}
                                >
                                    4
                                </motion.span>

                                {/* Animated Circle (0) */}
                                <motion.div
                                    className="relative w-[120px] h-[120px] md:w-[200px] md:h-[200px] lg:w-[280px] lg:h-[280px]"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                >
                                    {/* Rotating gradient border */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 p-[6px] md:p-[8px]"
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        <div className="w-full h-full rounded-full bg-white dark:bg-slate-950" />
                                    </motion.div>

                                    {/* Alert Icon in center */}
                                    <motion.div
                                        className="absolute inset-0 flex items-center justify-center"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                    >
                                        <AlertCircle className="w-12 h-12 md:w-20 md:h-20 lg:w-28 lg:h-28 text-purple-600 dark:text-purple-400" />
                                    </motion.div>
                                </motion.div>

                                <motion.span
                                    className="text-[120px] md:text-[200px] lg:text-[280px] font-black bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-none"
                                    initial={{ rotateY: 90, opacity: 0 }}
                                    animate={{ rotateY: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    style={{
                                        textShadow: "0 0 80px rgba(147, 51, 234, 0.5)",
                                    }}
                                >
                                    4
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Error Message Card */}
                        <motion.div
                            className="w-full max-w-2xl p-8 md:p-12 rounded-[30px] bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            {/* Error Code */}
                            <motion.p
                                className="text-sm md:text-base font-mono text-slate-600 dark:text-slate-400 mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                            >
                                {t("notFound.errorCode")}
                            </motion.p>

                            {/* Title */}
                            <motion.h1
                                className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                            >
                                {t("notFound.title")}
                            </motion.h1>

                            {/* Subtitle */}
                            <motion.p
                                className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.3 }}
                            >
                                {t("notFound.subtitle")}
                            </motion.p>
                        </motion.div>

                        {/* Floating particles animation */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-purple-500/30 dark:bg-purple-400/30 rounded-full"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                        y: [0, -30, 0],
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
