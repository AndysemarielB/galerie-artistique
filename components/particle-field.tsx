"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ParticleFieldProps {
  mousePosition: { x: number; y: number }
  color?: string
}

export function ParticleField({ mousePosition, color = "#FFFFFF" }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(color)

  // Mettre à jour la référence de couleur lorsque color change
  useEffect(() => {
    colorRef.current = color
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajuster la taille du canvas à la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Paramètres pour l'animation
    const particles: Particle[] = []
    const particleCount = 100
    let animationFrameId: number

    // Classe pour les particules
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 3 + 1
        this.density = Math.random() * 30 + 1
      }

      update() {
        // Calculer la distance entre la particule et la souris
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Force directionnelle
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance

        // Distance maximale d'effet
        const maxDistance = 100

        // Force proportionnelle à la distance
        const force = (maxDistance - distance) / maxDistance

        // Appliquer la force si la distance est inférieure à maxDistance
        if (distance < maxDistance) {
          this.x -= forceDirectionX * force * this.density
          this.y -= forceDirectionY * force * this.density
        } else {
          // Retour à la position d'origine
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy / 10
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = colorRef.current
        ctx.fill()
      }
    }

    // Initialiser les particules
    const init = () => {
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push(new Particle(x, y))
      }
    }

    // Fonction d'animation
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Démarrer l'animation
    init()
    animate()

    // Nettoyage
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePosition])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
  )
}
