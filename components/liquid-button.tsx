"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useCursorStyle } from "@/hooks/use-cursor-style"

interface LiquidButtonProps {
  children: React.ReactNode
  onClick?: () => void
  color?: string
}

export function LiquidButton({ children, onClick, color = "#FFFFFF" }: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { setCursorVariant, setCursorText } = useCursorStyle()

  // Effet de liquide avec Canvas
  useEffect(() => {
    if (!buttonRef.current || !isHovered) return

    const button = buttonRef.current
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurer le canvas
    canvas.width = button.offsetWidth
    canvas.height = button.offsetHeight
    canvas.style.position = "absolute"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "1"
    button.appendChild(canvas)

    // Paramètres pour l'effet de liquide
    const points = []
    const pointCount = 20
    const maxAmplitude = 15
    const frequency = 0.05
    const speed = 0.05

    // Créer les points
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: (canvas.width / (pointCount - 1)) * i,
        y: canvas.height,
        originalY: canvas.height,
        amplitude: Math.random() * maxAmplitude,
        phase: Math.random() * Math.PI * 2,
      })
    }

    // Fonction d'animation
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += speed

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dessiner l'effet de liquide
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)

      // Mettre à jour les points
      for (let i = 0; i < points.length; i++) {
        const point = points[i]
        point.y = point.originalY - Math.sin(time + point.phase) * point.amplitude

        if (i === 0) {
          ctx.lineTo(point.x, point.y)
        } else {
          const prevPoint = points[i - 1]
          const controlX = (point.x + prevPoint.x) / 2
          const controlY = (point.y + prevPoint.y) / 2
          ctx.quadraticCurveTo(prevPoint.x, prevPoint.y, controlX, controlY)
        }
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()
      ctx.fill()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Nettoyage
    return () => {
      cancelAnimationFrame(animationFrameId)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }, [isHovered, color])

  return (
    <motion.button
      ref={buttonRef}
      className="relative overflow-hidden px-8 py-3 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true)
        setCursorVariant("button")
        setCursorText("Cliquer")
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setCursorVariant("default")
        setCursorText("")
      }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{ background: `linear-gradient(45deg, ${color}00, ${color}00)` }}
        animate={{
          background: isHovered
            ? `linear-gradient(45deg, ${color}40, ${color}20)`
            : `linear-gradient(45deg, ${color}00, ${color}00)`,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
