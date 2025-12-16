"use client";

import { useEffect } from "react";

export function AnimatedTitle() {
  useEffect(() => {
    const fullText = "José Luis García Betancourt — Full Stack Developer | Portafolio";
    let position = 0;
    
    const scrollTitle = () => {
      // Crear el efecto de desplazamiento circular
      const displayText = fullText.slice(position) + " | " + fullText.slice(0, position);
      document.title = displayText;
      
      position = (position + 1) % fullText.length;
    };

    // Iniciar animación después de 3 segundos (dar tiempo para leer el título completo)
    const initialDelay = setTimeout(() => {
      const interval = setInterval(scrollTitle, 300); // Velocidad de desplazamiento
      
      return () => clearInterval(interval);
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      // Restaurar título original al desmontar
      document.title = "José Luis García Betancourt — Full Stack Developer | Portafolio";
    };
  }, []);

  return null;
}
