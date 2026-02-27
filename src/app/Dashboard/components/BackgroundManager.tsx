"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Particles = dynamic(() => import("@/components/Backgrounds/Particles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

const MatrixRain = dynamic(
  () => import("@/components/Backgrounds/MatrixRain"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0" />,
  }
);

interface BackgroundManagerProps {
  matrixMode: boolean;
  isDark: boolean;
}

export default function BackgroundManager({
  matrixMode,
  isDark,
}: BackgroundManagerProps) {
  const isMobile = useMobileDetect();
  const reducedMotion = useReducedMotion();

  const particleConfig = useMemo(
    () => ({
      particleCount: isMobile ? 80 : 200,
      moveParticlesOnHover: !isMobile,
      speed: reducedMotion ? 0.02 : 0.1,
      disableRotation: reducedMotion,
      pixelRatio:
        typeof window !== "undefined"
          ? Math.min(window.devicePixelRatio, 1.5)
          : 1,
    }),
    [isMobile, reducedMotion]
  );

  return (
    <AnimatePresence mode="wait">
      {matrixMode ? (
        <motion.div
          key="matrix"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
          <MatrixRain
            techStack={[
              "React",
              "TypeScript",
              "Next.js",
              "Node.js",
              "JavaScript",
              "Laravel",
              "PHP",
              "SQL Server",
              "AWS",
              "Docker",
              "Git",
              "HTML",
              "CSS",
              "Tailwind",
              "C#",
              ".NET",
              "Angular",
              "MySQL",
              "Express",
              "REST API",
              "GraphQL",
              "Vite",
            ]}
            speed={1.2}
            fontSize={14}
            density={0.92}
          />
        </motion.div>
      ) : (
        <motion.div
          key="particles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
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
              particleCount={particleConfig.particleCount}
              particleSpread={10}
              speed={particleConfig.speed}
              particleBaseSize={100}
              moveParticlesOnHover={particleConfig.moveParticlesOnHover}
              alphaParticles={false}
              disableRotation={particleConfig.disableRotation}
              pixelRatio={particleConfig.pixelRatio}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
