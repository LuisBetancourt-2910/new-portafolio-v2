"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";

const ProfileCard = dynamic(
  () => import("@/components/ProfileCard/ProfileCard"),
  {
    ssr: true,
    loading: () => (
      <div className="w-full h-[540px] rounded-[30px] bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 animate-pulse" />
    ),
  }
);

export default function AboutSection() {
  const t = useTranslations();
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      id="about"
      ref={aboutRef}
      className="w-full"
      initial={{ opacity: 0, y: 50 }}
      animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* About Me - Left on Desktop, Bottom on Mobile */}
        <div className="flex items-center justify-center lg:justify-end pointer-events-auto w-full lg:flex-1">
          <div className="h-auto lg:h-[80svh] lg:max-h-[540px] w-full p-8 rounded-[30px] bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent text-left">
              {t("about.title")}
            </h2>

            {/* Texto corto para móviles */}
            <p className="lg:hidden text-slate-700 dark:text-slate-300 leading-relaxed text-left">
              {t("about.descriptionShort")}
            </p>

            {/* Texto completo para desktop */}
            <p className="hidden lg:block text-slate-700 dark:text-slate-300 leading-relaxed text-left">
              {t("about.description")}
            </p>
          </div>
        </div>

        {/* Profile Card - Right on Desktop, Top on Mobile */}
        <div className="flex items-center justify-center lg:justify-start pointer-events-auto w-full lg:w-auto">
          <ProfileCard
            name={t("profile.name")}
            title={t("profile.title")}
            handle={t("profile.handle")}
            status={t("profile.status")}
            contactText={t("profile.contactBtn")}
            avatarUrl="/avatar.webp"
            grainUrl="/noise.svg"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() =>
              (window.location.href = `mailto:${siteConfig.email}`)
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
