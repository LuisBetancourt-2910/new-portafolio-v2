"use client";

import { useEffect } from "react";

interface AnimatedTitleProps {
  title: string;
}

export function AnimatedTitle({ title }: AnimatedTitleProps) {
  useEffect(() => {
    let position = 0;
    
    const scrollTitle = () => {
      // Crear el efecto de desplazamiento circular
      const displayText = title.slice(position) + " | " + title.slice(0, position);
      document.title = displayText;
      
      position = (position + 1) % title.length;
    };

    // Iniciar animación después de 3 segundos (dar tiempo para leer el título completo)
    const initialDelay = setTimeout(() => {
      const interval = setInterval(scrollTitle, 300); // Velocidad de desplazamiento
      
      return () => clearInterval(interval);
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      // Restaurar título original al desmontar
      document.title = title;
    };
  }, [title]);

  return null;
}
