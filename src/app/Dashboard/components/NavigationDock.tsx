"use client";

import React from "react";
import dynamic from "next/dynamic";
import { User, Briefcase, Mail, Github, Linkedin, Code, FileText, BarChart3 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";

const Dock = dynamic(() => import("@/components/ui/dock").then(mod => ({ default: mod.Dock })), { ssr: false });
const DockIcon = dynamic(() => import("@/components/ui/dock").then(mod => ({ default: mod.DockIcon })), { ssr: false });

interface NavigationDockProps {
  scrollToSection: (sectionId: string) => void;
}

const dockIconClassName = "bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 hover:border-slate-900/30 dark:hover:border-white/30 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 dark:hover:shadow-white/10";
const iconClassName = "w-5 h-5 text-slate-900 dark:text-white drop-shadow-md transition-transform duration-300 hover:scale-110";

export default function NavigationDock({ scrollToSection }: NavigationDockProps) {
  return (
    <div className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <TooltipProvider>
        <Dock iconSize={48} iconMagnification={64} iconDistance={100} className="mt-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon onClick={() => scrollToSection('about')} className={dockIconClassName}>
                <User className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>About</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon onClick={() => scrollToSection('projects')} className={dockIconClassName}>
                <Briefcase className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>Projects</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon onClick={() => scrollToSection('techstack')} className={dockIconClassName}>
                <Code className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>Tech Stack</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon onClick={() => scrollToSection('metrics')} className={dockIconClassName}>
                <BarChart3 className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>Metrics</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon
                className={dockIconClassName}
                onClick={() => (window.location.href = `mailto:${siteConfig.email}`)}
              >
                <Mail className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>{siteConfig.email}</p></TooltipContent>
          </Tooltip>

          <div className="w-px h-8 bg-slate-900/20 dark:bg-white/20 mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon
                className={dockIconClassName}
                onClick={() => window.open(siteConfig.socials.github, "_blank")}
              >
                <Github className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>GitHub</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon
                className={dockIconClassName}
                onClick={() => window.open(siteConfig.socials.linkedin, "_blank")}
              >
                <Linkedin className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>LinkedIn</p></TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <DockIcon onClick={() => scrollToSection('cv')} className={dockIconClassName}>
                <FileText className={iconClassName} />
              </DockIcon>
            </TooltipTrigger>
            <TooltipContent><p>CV</p></TooltipContent>
          </Tooltip>
        </Dock>
      </TooltipProvider>
    </div>
  );
}
