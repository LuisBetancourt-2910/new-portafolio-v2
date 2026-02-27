"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSharedIntersectionObserver } from "@/hooks/useSharedIntersectionObserver";
import { useTranslations } from "next-intl";

const AnimatedCounter = dynamic(
  () =>
    import("@/components/ui/animated-counter").then((mod) => ({
      default: mod.AnimatedCounter,
    })),
  {
    ssr: false,
    loading: () => <span className="inline-block min-w-[2ch]">&nbsp;</span>,
  }
);

const MetricsSection = React.memo(function MetricsSection() {
  const t = useTranslations();
  const { ref, isInView } = useSharedIntersectionObserver({ threshold: 0.3, once: true, rootMargin: "0px 0px 200px 0px" });

  return (
    <motion.div
      id="metrics"
      ref={ref}
      className="flex flex-col items-center gap-8 w-full pointer-events-auto pt-16"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationStart={() => {
        const el = document.getElementById("metrics");
        if (el) el.style.willChange = "transform, opacity";
      }}
      onAnimationComplete={() => {
        const el = document.getElementById("metrics");
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
        {t("metrics.title")}
      </motion.h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
        {/* Proyectos */}
        <motion.div
          className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
            <AnimatedCounter to={7} suffix="+" duration={2.5} />
          </div>
          <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
            {t("metrics.projects")}
          </p>
        </motion.div>

        {/* Experiencia */}
        <motion.div
          className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent mb-2">
            <AnimatedCounter to={2} suffix="+" duration={2.5} />
          </div>
          <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
            {t("metrics.experience")}
          </p>
        </motion.div>

        {/* Tecnologías */}
        <motion.div
          className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent mb-2">
            <AnimatedCounter to={24} suffix="+" duration={2.5} />
          </div>
          <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
            {t("metrics.technologies")}
          </p>
        </motion.div>

        {/* Clientes */}
        <motion.div
          className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-300 bg-clip-text text-transparent mb-2">
            <AnimatedCounter to={10} suffix="+" duration={2.5} />
          </div>
          <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
            {t("metrics.clients")}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default MetricsSection;