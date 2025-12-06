"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "@/components/Backgrounds/Particles";
import { AnimatedThemeToggler } from "@/components/Theme Toggler/animated-theme-toggler";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Home, User, Briefcase, Mail, Github, Linkedin, Code, FileText, Rocket, Database, Shield, Menu, X, Download, FileCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* Theme Toggler */}
      <div className="fixed top-6 right-6 z-50">
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
          <div id="about" className="w-full">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-8 lg:gap-12">
              {/* About Me - Left on Desktop, Bottom on Mobile */}
              <div className="flex items-center justify-center lg:justify-end pointer-events-auto w-full lg:flex-1">
                <div className="h-auto lg:h-[80svh] lg:max-h-[540px] w-full p-8 rounded-[30px] bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent text-left">
                    Acerca de Mí
                  </h2>
                  
                  {/* Texto corto para móviles */}
                  <p className="lg:hidden text-slate-700 dark:text-slate-300 leading-relaxed text-left">
                    Ingeniero en Sistemas Computacionales con especialidad en Ciberseguridad y desarrollo Full Stack. 
                    Experiencia diseñando sistemas empresariales (ERP, plataformas financieras, networking) con React, Node.js, 
                    Laravel y SQL Server. Enfocado en crear soluciones escalables, seguras y de alto impacto bajo metodologías ágiles.
                  </p>
                  
                  {/* Texto completo para desktop */}
                  <p className="hidden lg:block text-slate-700 dark:text-slate-300 leading-relaxed text-left">
                    Ingeniero en Sistemas Computacionales con especialidad en
                    Ciberseguridad y experiencia en desarrollo Full Stack. He
                    participado en el diseño y desarrollo de sistemas
                    empresariales (ERP, cotizadores financieros, plataformas de
                    networking, etc.) utilizando tecnologías como React, Node.js,
                    Laravel y SQL Server. Hábil en la implementación de medidas de
                    seguridad, optimización de bases de datos y desarrollo bajo
                    metodologías ágiles (Scrum). Orientado a generar soluciones
                    escalables que mejoren la eficiencia, reduzcan errores y
                    aporten valor directo al negocio.
                  </p>
                </div>
              </div>

              {/* Profile Card - Right on Desktop, Top on Mobile */}
              <div className="flex items-center justify-center lg:justify-start pointer-events-auto w-full lg:w-auto">
                <ProfileCard
                  name="Luis Betancourt"
                  title="Full Stack Developer"
                  handle="LuisBetancourt-2910"
                  status="Available for work"
                  contactText="Contact Me"
                  avatarUrl="/avatar.png"
                  grainUrl="https://grainy-gradients.vercel.app/noise.svg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => window.location.href = 'mailto:joseluisgarciabeta@gmail.com'}
                />
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div id="projects" className="flex flex-col items-center gap-8 pt-32 pointer-events-auto">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Proyectos en los que he participado
            </h3>
            <BentoGrid className="w-full">
              <BentoCard
                name="ERP GGL"
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
                description="Sistema ERP corporativo completo para finanzas, compras, inventarios y RRHH. Desarrollo en Laravel, PHP y AngularJS con MariaDB."
                href="#"
                cta="Ver proyecto"
                hasImage={true}
              />
              <BentoCard
                name="LEGACY"
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
                description="Plataforma de networking empresarial con cursos, eventos y salas de comunicación. SPA con React, Inertia.js y Laravel Sanctum."
                href="#"
                cta="Ver proyecto"
                hasImage={true}
              />
              <BentoCard
                name="COSMOCARRIER"
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
                description="Sistema de cotización automatizada para servicios de internet con ROI en tiempo real y calculadora dinámica."
                href="#"
                cta="Ver proyecto"
                hasImage={true}
              />
              <BentoCard
                name="SIGIL"
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
                description="Sistema de gestión de incidencias laborales para SICT Durango. Dashboard interactivo con React, Leaflet y SQL Server."
                href="#"
                cta="Ver proyecto"
                hasImage={true}
              />
              <BentoCard
                name="NOC"
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
                description="Plataforma de reporte de fallas de internet. Construcción modular con React y Vite, integrada con backend existente."
                href="#"
                cta="Ver proyecto"
                hasImage={true}
              />
              <BentoCard
                name="ACCA"
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
                description="Plataforma de gestión de recursos para asociación contra el cáncer. Módulos de donaciones con React y .NET."
                href="#"
                cta="Ver proyecto"
                hasImage={true}
              />
              <BentoCard
                name="Centro Multipagos"
                className="col-span-3 lg:col-span-2"
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
                description="Sistema integral de gestión de multas de tránsito con wizard de 4 pasos, firmas digitales, PDFs con QR y notificaciones automáticas. Laravel + React + AWS S3."
                href="#"
                cta="Ver proyecto"
                hasImage={true}
              />
            </BentoGrid>
          </div>

          {/* Bottom Section: Tech Stack */}
          <div id="techstack" className="flex flex-col items-center gap-6 pb-8 pt-32 pointer-events-auto">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Tech Stack
            </h3>
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
          </div>
        </div>
      </div>

        {/* CV Section */}
          <div id="cv" className="flex flex-col items-center gap-8 pt-32 pointer-events-auto">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Curriculum Vitae
            </h3>
            <div className="w-full max-w-4xl">
              <div className="relative group overflow-hidden rounded-3xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl">
                {/* CV Image Preview Background */}
                <div className="relative w-full h-[600px] overflow-hidden">
                  <img
                    src="/cv.png"
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
                      Descargar CV
                    </InteractiveHoverButton>
                  </div>
                </div>
              </div>
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
                      <User className="w-5 h-5 text-slate-900 dark:text-white" />
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
                      <Briefcase className="w-5 h-5 text-slate-900 dark:text-white" />
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
                      <Code className="w-5 h-5 text-slate-900 dark:text-white" />
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
                      <Mail className="w-5 h-5 text-slate-900 dark:text-white" />
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
                      <Github className="w-5 h-5 text-slate-900 dark:text-white" />
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
                      <Linkedin className="w-5 h-5 text-slate-900 dark:text-white" />
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
                      <FileText className="w-5 h-5 text-slate-900 dark:text-white" />
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
                  <User className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
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
                  <Briefcase className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
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
                  <Code className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tech Stack</p>
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
                  <Mail className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
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
                  <Github className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
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
                  <Linkedin className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
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
                  <FileText className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
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
