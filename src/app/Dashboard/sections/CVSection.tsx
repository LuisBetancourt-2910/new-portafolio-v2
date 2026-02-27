"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSharedIntersectionObserver } from "@/hooks/useSharedIntersectionObserver";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

const CV_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg==";

const InteractiveHoverButton = dynamic(
  () =>
    import("@/components/ui/interactive-hover-button").then((mod) => ({
      default: mod.InteractiveHoverButton,
    })),
  { ssr: false }
);

const CVSection = React.memo(function CVSection() {
  const t = useTranslations();
  const { ref, isInView } = useSharedIntersectionObserver({ threshold: 0.3, once: true, rootMargin: "0px 0px 200px 0px" });
  const [locale, setLocale] = useState<"es" | "en">("es");

  useEffect(() => {
    const currentLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] as "es" | "en" | undefined;

    if (currentLocale) {
      setLocale(currentLocale);
    }

    const handleLocaleChange = (event: CustomEvent) => {
      setLocale(event.detail.locale);
    };

    window.addEventListener("localeChange", handleLocaleChange as EventListener);
    return () => {
      window.removeEventListener("localeChange", handleLocaleChange as EventListener);
    };
  }, []);

  const altCvImage = locale === "es" ? "/cv-en.webp" : "/cv-es.webp";

  const downloadCV = () => {
    window.location.href = siteConfig.cv.apiEndpoint;
  };

  return (
    <>
      <link rel="prefetch" href={altCvImage} as="image" />
      <motion.div
      id="cv"
      ref={ref}
      className="flex flex-col items-center gap-8 pt-32 pb-16 pointer-events-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationStart={() => {
        const el = document.getElementById("cv");
        if (el) el.style.willChange = "transform, opacity";
      }}
      onAnimationComplete={() => {
        const el = document.getElementById("cv");
        if (el) el.style.willChange = "auto";
      }}
    >
      <motion.h3
        className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Curriculum Vitae
      </motion.h3>
      <motion.div
        className="w-full max-w-4xl"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="relative group overflow-hidden rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl">
          {/* CV Image Preview Background */}
          <div className="relative w-full h-[600px] overflow-hidden">
            <Image
              src={locale === "en" ? "/cv-en.webp" : "/cv-es.webp"}
              alt={`Curriculum Vitae preview - ${siteConfig.fullName}, ${siteConfig.title}`}
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={CV_BLUR_DATA_URL}
              className="object-cover object-center bg-white"
            />
            {/* Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent pointer-events-none" />
          </div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              <div>
                <h4 className="text-2xl font-bold text-white mb-2">
                  {siteConfig.fullName}
                </h4>
                <p className="text-slate-200 text-sm">
                  {t("profile.title")} | {t("profile.subtitle")}
                </p>
              </div>
              <InteractiveHoverButton
                onClick={downloadCV}
                className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 pointer-events-auto"
              >
                {t("profile.downloadCV")}
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
});

export default CVSection;
