"use client";

import React, { useEffect, useState } from "react";
import Particles from "@/components/Backgrounds/Particles";
import { AnimatedThemeToggler } from "@/components/Theme Toggler/animated-theme-toggler";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Home, User, Briefcase, Mail, Github, Linkedin, Code, FileText, Rocket, Database, Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";

export default function Dashboard() {
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
        }}
      >
        <div className="pointer-events-auto w-full h-full">
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
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8 pt-32 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-12 pointer-events-none">
          {/* Top Section: About Me (Left) and Profile Card (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* About Me - Left */}
            <div className="flex items-center justify-center lg:justify-end pointer-events-auto">
              <div className="h-[80svh] max-h-[540px] w-full max-w-[387px] p-8 rounded-[30px] bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
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

            {/* Profile Card - Right */}
            <div className="flex items-center justify-center lg:justify-start pointer-events-auto">
              <ProfileCard
                name="Luis Betancourt"
                title="Full Stack Developer"
                handle="luisbetancourt"
                status="Available for work"
                contactText="Contact Me"
                avatarUrl="/avatar.png"
                grainUrl="https://grainy-gradients.vercel.app/noise.svg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
              />
            </div>
          </div>

          {/* Projects Section */}
          <div className="flex flex-col items-center gap-8 pt-32 pointer-events-auto">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Featured Projects
            </h3>
            <BentoGrid className="w-full">
              <BentoCard
                name="ERP GGL"
                className="col-span-3 lg:col-span-2"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                }
                Icon={Database}
                description="Sistema ERP corporativo completo para finanzas, compras, inventarios y RRHH. Desarrollo en Laravel, PHP y AngularJS con MariaDB."
                href="#"
                cta="Ver proyecto"
              />
              <BentoCard
                name="LEGACY"
                className="col-span-3 lg:col-span-1"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                }
                Icon={Rocket}
                description="Plataforma de networking empresarial con cursos, eventos y salas de comunicación. SPA con React, Inertia.js y Laravel Sanctum."
                href="#"
                cta="Ver proyecto"
              />
              <BentoCard
                name="COSMOCARRIER"
                className="col-span-3 lg:col-span-1"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20" />
                }
                Icon={FileText}
                description="Sistema de cotización automatizada para servicios de internet con ROI en tiempo real y calculadora dinámica."
                href="#"
                cta="Ver proyecto"
              />
              <BentoCard
                name="SIGIL"
                className="col-span-3 lg:col-span-2"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20" />
                }
                Icon={Shield}
                description="Sistema de gestión de incidencias laborales para SICT Durango. Dashboard interactivo con React, Leaflet y SQL Server."
                href="#"
                cta="Ver proyecto"
              />
              <BentoCard
                name="NOC"
                className="col-span-3 lg:col-span-2"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />
                }
                Icon={Code}
                description="Plataforma de reporte de fallas de internet. Construcción modular con React y Vite, integrada con backend existente."
                href="#"
                cta="Ver proyecto"
              />
              <BentoCard
                name="ACCA"
                className="col-span-3 lg:col-span-1"
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-rose-500/20" />
                }
                Icon={Briefcase}
                description="Plataforma de gestión de recursos para asociación contra el cáncer. Módulos de donaciones con React y .NET."
                href="#"
                cta="Ver proyecto"
              />
            </BentoGrid>
          </div>

          {/* Bottom Section: Tech Stack */}
          <div className="flex flex-col items-center gap-6 pb-8 pt-32 pointer-events-auto">
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

      {/* Dock Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <TooltipProvider>
          <Dock iconSize={48} iconMagnification={64} iconDistance={100} className="mt-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10">
                  <User className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>About</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10">
                  <Code className="w-5 h-5 text-slate-900 dark:text-white transition-transform duration-300 hover:scale-110" />
                </DockIcon>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tech Stack</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <DockIcon className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10">
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
                <DockIcon className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10">
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
