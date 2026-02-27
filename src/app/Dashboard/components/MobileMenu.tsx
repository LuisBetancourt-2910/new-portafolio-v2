"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, Mail, Github, Linkedin, Code, FileText, BarChart3, Menu, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";

interface MobileMenuProps {
  scrollToSection: (sectionId: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const buttonClassName = "p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-slate-900/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/40 transition-all";
const iconClassName = "w-5 h-5 text-slate-900 dark:text-white drop-shadow-lg";

export default function MobileMenu({ scrollToSection, mobileMenuOpen, setMobileMenuOpen }: MobileMenuProps) {
  return (
    <>
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
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <User className={iconClassName} />
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
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Briefcase className={iconClassName} />
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
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code className={iconClassName} />
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
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <BarChart3 className={iconClassName} />
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
                      onClick={() => window.location.href = `mailto:${siteConfig.email}`}
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className={iconClassName} />
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
                      onClick={() => window.open(siteConfig.socials.github, '_blank')}
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className={iconClassName} />
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
                      onClick={() => window.open(siteConfig.socials.linkedin, '_blank')}
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Linkedin className={iconClassName} />
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
                      className={buttonClassName}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className={iconClassName} />
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
    </>
  );
}
