"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslations } from 'next-intl';
import Particles from "@/components/Backgrounds/Particles";
import { AnimatedThemeToggler } from "@/components/Theme Toggler/animated-theme-toggler";
import { LanguageToggler } from "@/components/LanguageToggler/language-toggler";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Home, User, Briefcase, Mail, Github, Linkedin, Code, FileText, Rocket, Database, Shield, Menu, X, Download, FileCheck, BarChart3 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function Dashboard() {
  const t = useTranslations();
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locale, setLocale] = useState<"es" | "en">("es");

  // Refs para scroll animations
  const aboutRef = useRef(null);
  const metricsRef = useRef(null);
  const projectsRef = useRef(null);
  const techStackRef = useRef(null);
  const cvRef = useRef(null);

  // InView hooks
  const aboutInView = useInView(aboutRef, { once: true, amount: 0.3 });
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.1 });
  const techStackInView = useInView(techStackRef, { once: true, amount: 0.3 });
  const cvInView = useInView(cvRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Detectar el idioma actual
    const currentLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1] as "es" | "en" | undefined;
    
    if (currentLocale) {
      setLocale(currentLocale);
    }

    // Escuchar cambios de idioma
    const handleLocaleChange = (event: CustomEvent) => {
      setLocale(event.detail.locale);
    };

    window.addEventListener('localeChange', handleLocaleChange as EventListener);

    return () => {
      window.removeEventListener('localeChange', handleLocaleChange as EventListener);
    };
  }, []);

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const downloadCV = () => {
    window.location.href = '/api/cv';
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-400">
      {/* Theme and Language Togglers */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <LanguageToggler />
        <AnimatedThemeToggler className="p-3 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all text-slate-900 dark:text-white" />
      </div>

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
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8 pt-32 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pointer-events-none">
          {/* Top Section: About Me (Left) and Profile Card (Right) */}
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
                    {t('about.title')}
                  </h2>
                  
                  {/* Texto corto para móviles */}
                  <p className="lg:hidden text-slate-700 dark:text-slate-300 leading-relaxed text-left">
                    {t('about.descriptionShort')}
                  </p>
                  
                  {/* Texto completo para desktop */}
                  <p className="hidden lg:block text-slate-700 dark:text-slate-300 leading-relaxed text-left">
                    {t('about.description')}
                  </p>
                </div>
              </div>

              {/* Profile Card - Right on Desktop, Top on Mobile */}
              <div className="flex items-center justify-center lg:justify-start pointer-events-auto w-full lg:w-auto">
                <ProfileCard
                  name={t('profile.name')}
                  title={t('profile.title')}
                  handle={t('profile.handle')}
                  status={t('profile.status')}
                  contactText={t('profile.contactBtn')}
                  avatarUrl="/avatar.png"
                  grainUrl="https://grainy-gradients.vercel.app/noise.svg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.location.href = 'mailto:joseluisgarciabeta@gmail.com'}
                />
              </div>
            </div>
          </motion.div>

          {/* Projects Section */}
          <motion.div
            id="projects"
            ref={projectsRef}
            className="flex flex-col items-center gap-8 pt-32 pointer-events-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={projectsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('projects.title')}
            </motion.h3>
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={projectsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <BentoGrid className="w-full">
              <BentoCard
                name={t('projects.erp.title')}
                className="col-span-3 lg:col-span-2"
                background={
                  <>
                    <img 
                      src="/projects/erp-ggl/cover.png" 
                      alt="ERP GGL Dashboard"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={Database}
                description={t('projects.erp.description')}
                href="#"
                cta={t('projects.viewProject')}
                hasImage={true}
              />
              <BentoCard
                name={t('projects.legacy.title')}
                className="col-span-3 lg:col-span-1"
                background={
                  <>
                    <img 
                      src="/projects/legacy/cover.png" 
                      alt="LEGACY Platform"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={Rocket}
                description={t('projects.legacy.description')}
                href="#"
                cta={t('projects.viewProject')}
                hasImage={true}
              />
              <BentoCard
                name={t('projects.cosmocarrier.title')}
                className="col-span-3 lg:col-span-1"
                background={
                  <>
                    <img 
                      src="/projects/cosmocarrier/cover.png" 
                      alt="COSMOCARRIER Platform"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={FileText}
                description={t('projects.cosmocarrier.description')}
                href="#"
                cta={t('projects.viewProject')}
                hasImage={true}
              />
              <BentoCard
                name={t('projects.sigil.title')}
                className="col-span-3 lg:col-span-2"
                background={
                  <>
                    <img 
                      src="/projects/sigil/cover.svg" 
                      alt="SIGIL Dashboard"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={Shield}
                description={t('projects.sigil.description')}
                href="#"
                cta={t('projects.viewProject')}
                hasImage={true}
              />
              <BentoCard
                name={t('projects.noc.title')}
                className="col-span-3 lg:col-span-2"
                background={
                  <>
                    <img 
                      src="/projects/noc/cover.png" 
                      alt="NOC Platform"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={Code}
                description={t('projects.noc.description')}
                href="#"
                cta={t('projects.viewProject')}
                hasImage={true}
              />
              <BentoCard
                name={t('projects.acca.title')}
                className="col-span-3 lg:col-span-1"
                background={
                  <>
                    <img 
                      src="/projects/acca/cover.svg" 
                      alt="ACCA Platform"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={Briefcase}
                description={t('projects.acca.description')}
                href="#"
                cta={t('projects.viewProject')}
                hasImage={true}
              />
              <BentoCard
                name={t('projects.multas.title')}
                className="col-span-3 lg:col-span-1"
                background={
                  <>
                    <img 
                      src="/projects/MultasDGO/cover.png" 
                      alt="Centro Multipagos"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                  </>
                }
                Icon={FileCheck}
                description={t('projects.multas.description')}
                href="#"
                cta={t('projects.viewProject')}
                hasImage={true}
              />
              <BentoCard
                name={t('projects.yourProject.title')}
                className="col-span-3 lg:col-span-2"
                background={
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900" />
                    <div className="absolute inset-0 opacity-20">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
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
                          {t('projects.yourProject.reserved')}
                        </div>
                        <div className="text-sm lg:text-base text-white/90 drop-shadow-md leading-snug">
                          {t('projects.yourProject.subtitle')}
                        </div>
                      </div>
                    </div>
                  </>
                }
                Icon={Rocket}
                description={t('projects.yourProject.description')}
                href="mailto:joseluisgarciabeta@gmail.com"
                cta={t('projects.yourProject.cta')}
                hasImage={true}
              />
              </BentoGrid>
            </motion.div>
          </motion.div>

          {/* Bottom Section: Tech Stack */}
          <motion.div
            id="techstack"
            ref={techStackRef}
            className="flex flex-col items-center gap-6 pb-8 pt-32 pointer-events-auto px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={techStackInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={techStackInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('skills.title')}
            </motion.h3>
            <motion.div
              className="w-full max-w-[520px] md:max-w-[650px] flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={techStackInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <IconCloud
              images={[
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg",
                "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg",
              ]}
            />
            </motion.div>
          </motion.div>

          {/* Metrics Section */}
          <motion.div
            id="metrics"
            ref={metricsRef}
            className="flex flex-col items-center gap-8 w-full pointer-events-auto pt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={metricsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('metrics.title')}
            </motion.h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
              {/* Proyectos */}
              <motion.div
                className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={metricsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter to={7} suffix="+" duration={2.5} />
                </div>
                <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
                  {t('metrics.projects')}
                </p>
              </motion.div>

              {/* Experiencia */}
              <motion.div
                className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={metricsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter to={2} suffix="+" duration={2.5} />
                </div>
                <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
                  {t('metrics.experience')}
                </p>
              </motion.div>

              {/* Tecnologías */}
              <motion.div
                className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={metricsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter to={24} suffix="+" duration={2.5} />
                </div>
                <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
                  {t('metrics.technologies')}
                </p>
              </motion.div>

              {/* Clientes */}
              <motion.div
                className="flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={metricsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 dark:from-orange-400 dark:to-orange-300 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter to={10} suffix="+" duration={2.5} />
                </div>
                <p className="text-sm lg:text-base text-slate-700 dark:text-slate-300 text-center font-medium">
                  {t('metrics.clients')}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* CV Section */}
          <motion.div
            id="cv"
            ref={cvRef}
            className="flex flex-col items-center gap-8 pt-32 pb-16 pointer-events-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={cvInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h3
              className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={cvInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Curriculum Vitae
            </motion.h3>
            <motion.div
              className="w-full max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={cvInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative group overflow-hidden rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl">
                {/* CV Image Preview Background */}
                <div className="relative w-full h-[600px] overflow-hidden">
                  <img
                    src={locale === "en" ? "/cv-en.png" : "/cv-es.png"}
                    alt="CV Preview"
                    className="w-full h-full object-contain object-center bg-white"
                  />
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent pointer-events-none" />
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">
                        José Luis García Betancourt
                      </h4>
                      <p className="text-slate-200 text-sm">
                        Full Stack Developer | Ingeniero en Sistemas Computacionales
                      </p>
                    </div>
                    <InteractiveHoverButton
                      onClick={downloadCV}
                      className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 pointer-events-auto"
                    >
                      {t('profile.downloadCV')}
                    </InteractiveHoverButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-6 left-6 z-50 p-3 rounded-full bg-slate-900/10 dark:bg-white/10 backdrop-blur-sm border border-slate-900/20 dark:border-white/20 hover:bg-slate-900/20 dark:hover:bg-white/20 transition-all text-slate-900 dark:text-white pointer-events-auto"
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mobileMenuOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.15 }}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed top-20 left-6 z-50 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-3 p-3 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl">
            <TooltipProvider>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => scrollToSection('about')}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <User className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>About</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => scrollToSection('projects')}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Briefcase className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Projects</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => scrollToSection('techstack')}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Tech Stack</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => scrollToSection('metrics')}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BarChart3 className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Metrics</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => window.location.href = 'mailto:joseluisgarciabeta@gmail.com'}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Email</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              <motion.div 
                className="w-full h-px bg-slate-900/20 dark:bg-white/20 my-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              />

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => window.open('https://github.com/LuisBetancourt-2910', '_blank')}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>GitHub</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => window.open('https://www.linkedin.com/in/luisbetancourt2910', '_blank')}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button 
                      onClick={() => scrollToSection('cv')}
                      className="p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>CV</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            </TooltipProvider>
          </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Dock Navigation */}
      <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <TooltipProvider>
          <Dock iconSize={48} iconMagnification={64} iconDistance={100} className="mt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon 
                  onClick={() => scrollToSection('about')}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                >
                  <User className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>About</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon 
                  onClick={() => scrollToSection('projects')}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                >
                  <Briefcase className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>Projects</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon 
                  onClick={() => scrollToSection('techstack')}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                >
                  <Code className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tech Stack</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon 
                  onClick={() => scrollToSection('metrics')}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                >
                  <BarChart3 className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>Metrics</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                  onClick={() =>
                    (window.location.href =
                      "mailto:joseluisgarciabeta@gmail.com")
                  }
                >
                  <Mail className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>joseluisgarciabeta@gmail.com</p>
              </TooltipContent>
            </Tooltip>

            <div className="w-px h-8 bg-slate-900/20 dark:bg-white/20 mx-1" />

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                  onClick={() =>
                    window.open(
                      "https://github.com/LuisBetancourt-2910",
                      "_blank"
                    )
                  }
                >
                  <Github className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>GitHub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/luisbetancourt2910",
                      "_blank"
                    )
                  }
                >
                  <Linkedin className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>LinkedIn</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon 
                  onClick={() => scrollToSection('cv')}
                  className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10"
                >
                  <FileText className="w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>CV</p>
              </TooltipContent>
            </Tooltip>  
          </Dock>
        </TooltipProvider>
      </div>
    </div>
  );
}
