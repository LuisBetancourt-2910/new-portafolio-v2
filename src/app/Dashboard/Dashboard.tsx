"use client";

import React, { useEffect, useState } from "react";
import Particles from "@/components/Backgrounds/Particles";
import { AnimatedThemeToggler } from "@/components/Theme Toggler/animated-theme-toggler";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { IconCloud } from "@/components/ui/icon-cloud";

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
      <div className="absolute inset-0 pointer-events-auto" style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1 }}>
        <Particles
          particleColors={isDark ? ["#ffffff", "#ffffff"] : ["#1e293b", "#334155", "#475569"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16 pointer-events-none">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 pointer-events-auto">
          {/* Profile Card */}
          <div className="flex-shrink-0">
            <ProfileCard
              name="Luis Betancourt"
              title="Full Stack Developer"
              handle="luisbetancourt"
              status="Available for work"
              contactText="Contact Me"
              avatarUrl="/avatar.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>

          {/* Icon Cloud */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tech Stack</h3>
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
    </div>
  );
}
