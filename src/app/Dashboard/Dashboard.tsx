"use client";

import React from "react";
import Particles from "@/components/Backgrounds/Particles";

export default function Dashboard() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Particles Background */}
      <div className="absolute inset-0" style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0 }}>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
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
  );
}
