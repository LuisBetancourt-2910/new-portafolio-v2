"use client";

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  techStack?: string[];
  speed?: number;
  fontSize?: number;
  density?: number;
  className?: string;
}

const DEFAULT_TECH = [
  'React', 'TypeScript', 'Next.js', 'Node.js', 'JavaScript',
  'Laravel', 'PHP', 'SQL', 'AWS', 'Docker', 'Git', 'API',
  'HTML', 'CSS', 'Redux', 'REST', 'C#', '.NET', 'Angular',
  'MySQL', 'MongoDB', 'GraphQL', 'Tailwind', 'Express'
];

const MATRIX_CHARS = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01';

export default function MatrixRain({
  techStack = DEFAULT_TECH,
  speed = 1,
  fontSize = 16,
  density = 0.95,
  className = ''
}: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Configurar canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Configurar columnas
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    const speeds: number[] = [];
    const isTech: boolean[] = [];

    // Inicializar cada columna con posición y velocidad aleatoria
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -canvas.height;
      speeds[i] = 0.5 + Math.random() * 1.5;
      isTech[i] = Math.random() > density; // Algunas columnas mostrarán tech stack
    }

    let animationFrameId: number;
    let lastTime = 0;

    const draw = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Fade effect para la estela
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < columns; i++) {
        // Decidir qué mostrar: tech o caracteres Matrix
        let text: string;
        if (isTech[i] && drops[i] > 0) {
          text = techStack[Math.floor(Math.random() * techStack.length)];
          ctx.fillStyle = '#0f0'; // Verde para tech
          ctx.font = `bold ${fontSize}px monospace`;
        } else {
          text = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          // Verde brillante para el caracter principal
          const brightness = Math.random() > 0.98 ? 255 : 200;
          ctx.fillStyle = `rgb(0, ${brightness}, 0)`;
          ctx.font = `${fontSize}px monospace`;
        }

        const x = i * fontSize;
        const y = drops[i];

        if (y > 0 && y < canvas.height) {
          ctx.fillText(text, x, y);
        }

        // Resetear cuando llega al fondo
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          isTech[i] = Math.random() > density;
        }

        // Mover hacia abajo
        drops[i] += speeds[i] * speed * (deltaTime / 16);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [techStack, speed, fontSize, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
        backgroundColor: '#000'
      }}
    />
  );
}
