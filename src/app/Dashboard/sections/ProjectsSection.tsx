"use client";

import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSharedIntersectionObserver } from "@/hooks/useSharedIntersectionObserver";
import { useTranslations } from "next-intl";
import {
  Briefcase,
  Code,
  Database,
  FileCheck,
  FileText,
  Rocket,
  Shield,
} from "lucide-react";
import { siteConfig, type Project } from "@/config/site";

/** Tiny 1x1 pixel base64 placeholder for blur-up effect on project images */
const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg==";

const BentoGrid = dynamic(
  () =>
    import("@/components/ui/bento-grid").then((mod) => ({
      default: mod.BentoGrid,
    })),
  { ssr: true }
);
const BentoCard = dynamic(
  () =>
    import("@/components/ui/bento-grid").then((mod) => ({
      default: mod.BentoCard,
    })),
  { ssr: true }
);

/** Map project IDs to their corresponding Lucide icons */
const projectIcons: Record<string, React.ElementType> = {
  "erp-ggl": Database,
  legacy: Rocket,
  cosmocarrier: FileText,
  sigil: Shield,
  noc: Code,
  acca: Briefcase,
  multas: FileCheck,
};

const ProjectsSection = React.memo(function ProjectsSection() {
  const t = useTranslations();
  const { ref, isInView } = useSharedIntersectionObserver({ threshold: 0.1, once: true, rootMargin: "0px 0px 200px 0px" });

  return (
    <motion.div
      id="projects"
      ref={ref}
      className="flex flex-col items-center gap-8 pt-32 pointer-events-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onAnimationStart={() => {
        const el = document.getElementById("projects");
        if (el) el.style.willChange = "transform, opacity";
      }}
      onAnimationComplete={() => {
        const el = document.getElementById("projects");
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
        {t("projects.title")}
      </motion.h3>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <BentoGrid className="w-full">
          {(siteConfig.projects as readonly Project[]).map((project) => {
            const Icon = projectIcons[project.id] ?? Rocket;
            const translationKey = projectTranslationKeys[project.id];

            return (
              <BentoCard
                key={project.id}
                name={t(`projects.${translationKey}.title`)}
                className={projectGridClasses[project.id] ?? "col-span-3"}
                background={
                  <>
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={`${project.name} – ${t(`projects.${translationKey}.description`)}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={Icon}
                description={t(`projects.${translationKey}.description`)}
                href={project.url}
                cta={project.url ? t("projects.viewProject") : undefined}
                hasImage={true}
              />
            );
          })}

          {/* "Your Project" placeholder card */}
          <BentoCard
            name={t("projects.yourProject.title")}
            className="col-span-3 lg:col-span-2"
            background={
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900" />
                <div className="absolute inset-0 opacity-20">
                  <svg
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="20" cy="20" r="1.5" fill="white" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                <div className="absolute inset-0 flex items-start lg:items-center justify-center pt-8 lg:pt-0 p-4">
                  <div className="text-center space-y-2 lg:space-y-4 px-4 lg:px-6 max-w-full">
                    <div className="text-4xl lg:text-6xl mb-2 lg:mb-4">💼</div>
                    <div className="text-base lg:text-lg font-semibold text-white drop-shadow-lg leading-snug lg:leading-relaxed">
                      {t("projects.yourProject.reserved")}
                    </div>
                    <div className="text-sm lg:text-base text-white/90 drop-shadow-md leading-snug">
                      {t("projects.yourProject.subtitle")}
                    </div>
                  </div>
                </div>
              </>
            }
            Icon={Rocket}
            description={t("projects.yourProject.description")}
            href={`mailto:${siteConfig.email}`}
            cta={t("projects.yourProject.cta")}
            hasImage={true}
          />
        </BentoGrid>
      </motion.div>
    </motion.div>
  );
});

export default ProjectsSection;

/** Map project IDs to their i18n translation key prefixes */
const projectTranslationKeys: Record<string, string> = {
  "erp-ggl": "erp",
  legacy: "legacy",
  cosmocarrier: "cosmocarrier",
  sigil: "sigil",
  noc: "noc",
  acca: "acca",
  multas: "multas",
};

/** Map project IDs to their BentoGrid column classes */
const projectGridClasses: Record<string, string> = {
  "erp-ggl": "col-span-3 lg:col-span-2",
  legacy: "col-span-3 lg:col-span-1",
  cosmocarrier: "col-span-3 lg:col-span-1",
  sigil: "col-span-3 lg:col-span-2",
  noc: "col-span-3 lg:col-span-2",
  acca: "col-span-3 lg:col-span-1",
  multas: "col-span-3 lg:col-span-1",
};
