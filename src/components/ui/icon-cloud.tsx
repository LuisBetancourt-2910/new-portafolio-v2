"use client"

import React, { useEffect, useRef, useState, useMemo } from "react"
import { renderToString } from "react-dom/server"

interface Icon {
  x: number
  y: number
  z: number
  scale: number
  opacity: number
  id: number
}

interface IconCloudProps {
  icons?: React.ReactNode[]
  images?: string[]
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// Memoized component wrapper for better performance
const IconCloudComponent = ({ icons, images }: IconCloudProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [iconPositions, setIconPositions] = useState<Icon[]>([])
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [targetRotation, setTargetRotation] = useState<{
    x: number
    y: number
    startX: number
    startY: number
    distance: number
    startTime: number
    duration: number
  } | null>(null)
  const animationFrameRef = useRef<number>(0)
  const rotationRef = useRef(rotation)
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([])
  const imagesLoadedRef = useRef<boolean[]>([])
  const loadedCountRef = useRef(0)

  // Memoize items to prevent unnecessary recalculations
  const items = useMemo(() => icons || images || [], [icons, images])
  const itemCount = useMemo(() => items.length, [items])

  // Lazy load images with better error handling
  useEffect(() => {
    if (!items.length) return

    let mounted = true
    imagesLoadedRef.current = new Array(itemCount).fill(false)
    loadedCountRef.current = 0

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas")
      offscreen.width = 40
      offscreen.height = 40
      const offCtx = offscreen.getContext("2d", { alpha: true })

      if (offCtx) {
        if (images) {
          // Handle image URLs
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.src = items[index] as string
          
          img.onload = () => {
            if (!mounted) return
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height)

            // Create circular clipping path
            offCtx.beginPath()
            offCtx.arc(20, 20, 20, 0, Math.PI * 2)
            offCtx.closePath()
            offCtx.clip()

            // Draw the image
            offCtx.drawImage(img, 0, 0, 40, 40)

            imagesLoadedRef.current[index] = true
            loadedCountRef.current++
            
            if (loadedCountRef.current >= itemCount) {
              setIsLoaded(true)
            }
          }
          
          img.onerror = () => {
            if (!mounted) return
            imagesLoadedRef.current[index] = false
            loadedCountRef.current++
            if (loadedCountRef.current >= itemCount) {
              setIsLoaded(true)
            }
          }
        } else {
          // Handle SVG icons
          try {
            offCtx.scale(0.4, 0.4)
            const svgString = renderToString(item as React.ReactElement)
            const img = new Image()
            img.src = "data:image/svg+xml;base64," + btoa(svgString)
            img.onload = () => {
              if (!mounted) return
              offCtx.clearRect(0, 0, offscreen.width, offscreen.height)
              offCtx.drawImage(img, 0, 0)
              imagesLoadedRef.current[index] = true
              loadedCountRef.current++
              if (loadedCountRef.current >= itemCount) {
                setIsLoaded(true)
              }
            }
            img.onerror = () => {
              if (!mounted) return
              imagesLoadedRef.current[index] = false
              loadedCountRef.current++
              if (loadedCountRef.current >= itemCount) {
                setIsLoaded(true)
              }
            }
          } catch (err) {
            imagesLoadedRef.current[index] = false
            loadedCountRef.current++
            if (loadedCountRef.current >= itemCount) {
              setIsLoaded(true)
            }
          }
        }
      }
      return offscreen
    })

    iconCanvasesRef.current = newIconCanvases
    
    return () => {
      mounted = false
    }
  }, [items, itemCount, images])

  // Generate initial icon positions on a sphere (memoized)
  useEffect(() => {
    const numIcons = itemCount || 20

    // Fibonacci sphere parameters
    const offset = 2 / numIcons
    const increment = Math.PI * (3 - Math.sqrt(5))

    const newIcons: Icon[] = Array.from({ length: numIcons }, (_, i) => {
      const y = i * offset - 1 + offset / 2
      const r = Math.sqrt(1 - y * y)
      const phi = i * increment

      const x = Math.cos(phi) * r
      const z = Math.sin(phi) * r

      return {
        x: x * 160,
        y: y * 160,
        z: z * 160,
        scale: 1,
        opacity: 1,
        id: i,
      }
    })
    
    setIconPositions(newIcons)
  }, [itemCount])

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect || !canvasRef.current) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x)
      const sinX = Math.sin(rotationRef.current.x)
      const cosY = Math.cos(rotationRef.current.y)
      const sinY = Math.sin(rotationRef.current.y)

      const rotatedX = icon.x * cosY - icon.z * sinY
      const rotatedZ = icon.x * sinY + icon.z * cosY
      const rotatedY = icon.y * cosX + rotatedZ * sinX

      const screenX = canvasRef.current!.width / 2 + rotatedX
      const screenY = canvasRef.current!.height / 2 + rotatedY

      const scale = (rotatedZ + 200) / 300
      const radius = 20 * scale
      const dx = x - screenX
      const dy = y - screenY

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        )
        const targetY = Math.atan2(icon.x, icon.z)

        const currentX = rotationRef.current.x
        const currentY = rotationRef.current.y
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        )

        const duration = Math.min(2000, Math.max(800, distance * 1000))

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        })
        return
      }
    })

    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x
      const deltaY = e.clientY - lastMousePos.y

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      }

      setLastMousePos({ x: e.clientX, y: e.clientY })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY)
      const dx = mousePos.x - centerX
      const dy = mousePos.y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const speed = 0.003 + (distance / maxDistance) * 0.01

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime
        const progress = Math.min(1, elapsed / targetRotation.duration)
        const easedProgress = easeOutCubic(progress)

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        }

        if (progress >= 1) {
          setTargetRotation(null)
        }
      } else if (!isDragging) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        }
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x)
        const sinX = Math.sin(rotationRef.current.x)
        const cosY = Math.cos(rotationRef.current.y)
        const sinY = Math.sin(rotationRef.current.y)

        const rotatedX = icon.x * cosY - icon.z * sinY
        const rotatedZ = icon.x * sinY + icon.z * cosY
        const rotatedY = icon.y * cosX + rotatedZ * sinX

        const scale = (rotatedZ + 280) / 450
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 230) / 280))

        ctx.save()
        ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY)
        ctx.scale(scale, scale)
        ctx.globalAlpha = opacity

        if (icons || images) {
          // Only try to render icons/images if they exist
          if (
            iconCanvasesRef.current[index] &&
            imagesLoadedRef.current[index]
          ) {
            // Only show outline in dark mode
            const isDarkMode = document.documentElement.classList.contains('dark')
            
            if (isDarkMode) {
              // Draw outline by rendering icon with offsets
              ctx.globalCompositeOperation = 'source-over'
              const outlineWidth = 2
              for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                const offsetX = Math.cos(angle) * outlineWidth
                const offsetY = Math.sin(angle) * outlineWidth
                ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
                ctx.shadowBlur = 1
                ctx.shadowOffsetX = offsetX
                ctx.shadowOffsetY = offsetY
                ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40)
              }
            }
            
            // Draw the main icon on top
            ctx.shadowColor = 'transparent'
            ctx.shadowBlur = 0
            ctx.shadowOffsetX = 0
            ctx.shadowOffsetY = 0
            ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40)
          }
        } else {
          // Show numbered circles if no icons/images are provided
          ctx.beginPath()
          ctx.arc(0, 0, 20, 0, Math.PI * 2)
          ctx.fillStyle = "#4444ff"
          ctx.fill()
          ctx.fillStyle = "white"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.font = "16px Arial"
          ctx.fillText(`${icon.id + 1}`, 0, 0)
        }

        ctx.restore()
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [icons, images, iconPositions, isDragging, mousePos, targetRotation])

  return (
    <div className="relative">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-slate-300 dark:border-slate-700 border-t-slate-900 dark:border-t-white rounded-full animate-spin" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={650}
        height={650}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`rounded-lg transition-opacity duration-300 w-full max-w-[520px] md:max-w-[650px] h-auto ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Interactive 3D Icon Cloud - Tech Stack Visualization"
        role="img"
        style={{ willChange: 'transform' }}
      />
    </div>
  )
}

// Export memoized version
export const IconCloud = React.memo(IconCloudComponent)
