# Guía de Componentes del Portafolio

Este portafolio utiliza componentes de múltiples fuentes para crear una experiencia única.

## Fuentes de Componentes

### 1. React Bits (https://reactbits.dev/)
Biblioteca de componentes animados y personalizables.

**Instalación de componentes:**
- Visita https://reactbits.dev/get-started
- Navega a los componentes que desees usar
- Copia el código del componente y pégalo en `src/components/ui/`

**Dependencias principales:**
- ✅ framer-motion (instalado)
- ✅ Tailwind CSS (instalado)

### 2. Otras Fuentes
Puedes agregar componentes de:
- shadcn/ui
- Aceternity UI
- Magic UI
- Componentes personalizados

## Estructura de Directorios

```
src/
├── app/              # App Router de Next.js
├── components/
│   ├── ui/          # Componentes reutilizables (React Bits, etc.)
│   └── sections/    # Secciones del portafolio
└── lib/
    └── utils.ts     # Utilidades (cn helper para clases)
```

## Cómo Agregar un Componente de React Bits

1. Ve a https://reactbits.dev/
2. Selecciona el componente que desees
3. Copia el código
4. Crea un archivo en `src/components/ui/[nombre-componente].tsx`
5. Pega el código y ajusta imports si es necesario
6. Importa y usa en tus páginas

## Ejemplo de Uso

```tsx
import { MiComponente } from '@/components/ui/mi-componente';

export default function Home() {
  return (
    <main>
      <MiComponente />
    </main>
  );
}
```
