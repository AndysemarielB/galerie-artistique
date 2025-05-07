"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface FluidCursorProps {
  variant: string
  text: string
  position: { x: number; y: number }
}

export function FluidCursor({ variant, text, position }: FluidCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Variants du curseur
  const cursorVariants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      x: position.x - 10,
      y: position.y - 10,
    },
    text: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      x: position.x - 40,
      y: position.y - 40,
    },
    button: {
      width: 60,
      height: 60,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
      x: position.x - 30,
      y: position.y - 30,
    },
    artwork: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "normal" as const,
      x: position.x - 50,
      y: position.y - 50,
    },
  }

  // Effet pour l'animation fluide du curseur
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajuster la taille du canvas
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Paramètres pour l'effet fluide
    const particles: Particle[] = []
    const particleCount = 15
    const maxDistance = 100
    let animationFrameId: number

    // Classe pour les particules
    class Particle {
      x: number
      y: number
      size: number
      targetX: number
      targetY: number
      speed: number

      constructor() {
        this.x = position.x
        this.y = position.y
        this.size = Math.random() * 2 + 1
        this.targetX = position.x
        this.targetY = position.y
        this.speed = Math.random() * 0.1 + 0.05
      }

      update() {
        // Suivre la position du curseur avec un délai
        this.targetX = position.x
        this.targetY = position.y

        // Mouvement fluide vers la cible
        this.x += (this.targetX - this.x) * this.speed
        this.y += (this.targetY - this.y) * this.speed
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()
      }
    }

    // Initialiser les particules
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Fonction d'animation
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Mettre à jour et dessiner les particules
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Dessiner les connexions entre particules
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxDistance})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Démarrer l'animation
    init()
    animate()

    // Nettoyage
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [position])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-50 pointer-events-none"
        style={{ opacity: variant === "default" ? 0 : 0.7 }}
      />
      <motion.div
        ref={cursorRef}
        className="fixed rounded-full pointer-events-none z-50"
        variants={cursorVariants}
        animate={variant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        {text && (
          <div className="absolute inset-0 flex items-center justify-center text-black text-xs font-medium">{text}</div>
        )}
      </motion.div>
    </>
  )
}
