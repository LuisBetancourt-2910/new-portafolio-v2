"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

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
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
