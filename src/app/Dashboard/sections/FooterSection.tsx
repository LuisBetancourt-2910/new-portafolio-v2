"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useSharedIntersectionObserver } from "@/hooks/useSharedIntersectionObserver";
import { siteConfig } from "@/config/site";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

const FooterSection = React.memo(function FooterSection() {
    const t = useTranslations();
    const { ref, isInView } = useSharedIntersectionObserver({
        threshold: 0.1,
        once: true,
        rootMargin: "0px 0px 100px 0px",
    });

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentYear = new Date().getFullYear();

    const navLinks = [
        { id: "about", label: t("nav.about") },
        { id: "projects", label: t("nav.projects") },
        { id: "techstack", label: t("skills.title") },
        { id: "metrics", label: t("metrics.title") },
        { id: "cv", label: "CV" },
    ];

    return (
        <motion.footer
            ref={ref}
            className="w-full pointer-events-auto pt-16 pb-8 mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {/* Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-900/20 dark:via-white/20 to-transparent mb-12" />

            <div className="max-w-7xl mx-auto px-4">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 border-b border-slate-900/10 dark:border-white/10">
                    {/* Brand / Identity */}
                    <motion.div
                        className="flex flex-col gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                            {siteConfig.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {t("profile.title")}
                        </p>
                        <span className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            {t("profile.status")}
                        </span>
                    </motion.div>

                    {/* Quick navigation */}
                    <motion.div
                        className="flex flex-col gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                            {t("footer.quickLinks")}
                        </p>
                        <nav className="flex flex-wrap gap-x-6 gap-y-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                >
                    {/* Copyright */}
                    <p className="text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
                        © {currentYear} {siteConfig.name} · {t("footer.rights")}
                    </p>

                    {/* Made with */}
                    <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                        {t("footer.madeWith")}{" "}
                        <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
                        {t("footer.by")} {siteConfig.name}
                    </p>

                    {/* Social icons + scroll to top */}
                    <div className="flex items-center gap-2">
                        <a
                            href={`mailto:${siteConfig.email}`}
                            aria-label="Email"
                            className="p-2 rounded-full bg-white/10 dark:bg-black/20 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-200"
                        >
                            <Mail className="w-4 h-4" />
                        </a>
                        <a
                            href={siteConfig.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="p-2 rounded-full bg-white/10 dark:bg-black/20 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-200"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href={siteConfig.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="p-2 rounded-full bg-white/10 dark:bg-black/20 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-200"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>

                        <div className="w-px h-5 bg-slate-900/20 dark:bg-white/20 mx-1" />

                        <button
                            onClick={scrollToTop}
                            aria-label={t("footer.scrollToTop")}
                            className="p-2 rounded-full bg-white/10 dark:bg-black/20 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-200"
                        >
                            <ArrowUp className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.footer>
    );
});

export default FooterSection;
