"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSharedIntersectionObserver } from "@/hooks/useSharedIntersectionObserver";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

const IconCloud = dynamic(
  () =>
    import("@/components/ui/icon-cloud").then((mod) => ({
      default: mod.IconCloud,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] animate-pulse bg-white/5 rounded-full" />
    ),
  }
);

const TechStackSection = React.memo(function TechStackSection() {
  const t = useTranslations();
  const { ref, isInView } = useSharedIntersectionObserver({ threshold: 0.3, once: true, rootMargin: "0px 0px 200px 0px" });

  return (
    <motion.div
      id="techstack"
      ref={ref}
      className="flex flex-col items-center gap-6 pb-8 pt-32 pointer-events-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationStart={() => {
        const el = document.getElementById("techstack");
        if (el) el.style.willChange = "transform, opacity";
      }}
      onAnimationComplete={() => {
        const el = document.getElementById("techstack");
        if (el) el.style.willChange = "auto";
      }}
    >
      <motion.h3
        className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t("skills.title")}
      </motion.h3>
      <motion.div
        className="w-full max-w-[520px] md:max-w-[650px] flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <IconCloud images={siteConfig.techStack as unknown as string[]} />
      </motion.div>
    </motion.div>
  );
});

export default TechStackSection;
