"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSharedIntersectionObserver } from "@/hooks/useSharedIntersectionObserver";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { LogoItem } from "@/components/LogoLoop";

const LogoLoop = dynamic(() => import("@/components/LogoLoop"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[60px] animate-pulse bg-white/5 rounded-lg" />
  ),
});

const techLogos: LogoItem[] = siteConfig.techStack.map(({ src, label }) => ({
  src,
  alt: label,
  title: label,
}));

const TechStackSection = React.memo(function TechStackSection() {
  const t = useTranslations();
  const { ref, isInView } = useSharedIntersectionObserver({ threshold: 0.3, once: true, rootMargin: "0px 0px 200px 0px" });

  const renderItem = React.useCallback((item: LogoItem, _key: React.Key) => {
    const src = (item as { src: string }).src;
    const label = (item as { title?: string }).title ?? "";
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            src={src}
            alt={label}
            className="h-[var(--logoloop-logoHeight)] w-auto block object-contain brightness-0 dark:invert transition-[filter] duration-300 cursor-default select-none [-webkit-user-drag:none]"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </TooltipTrigger>
        <TooltipContent side="top">{label}</TooltipContent>
      </Tooltip>
    );
  }, []);

  return (
    <motion.div
      id="techstack"
      ref={ref}
      className="flex flex-col items-center gap-8 pb-8 pt-32 pointer-events-auto"
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
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t("skills.title")}
      </motion.h3>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={48}
          gap={48}
          pauseOnHover
          fadeOut
          renderItem={renderItem}
        />
      </motion.div>
    </motion.div>
  );
});

export default TechStackSection;
