"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ArtCanvasProps {
  activeColor: string
}

export function ArtCanvas({ activeColor }: ArtCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const colorRef = useRef(activeColor)

  // Mettre à jour la référence de couleur lorsque activeColor change
  useEffect(() => {
    colorRef.current = activeColor
  }, [activeColor])

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
    let particles: Particle[] = []
    const particleCount = 50
    const maxDistance = 200
    const mousePosition = { x: 0, y: 0 }
    let animationFrameId: number

    // Classe pour les particules
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      opacity: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 1 - 0.5
        this.speedY = Math.random() * 1 - 0.5
        this.color = colorRef.current
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Rebondir sur les bords
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }

        // Effet de souris
        const dx = this.x - mousePosition.x
        const dy = this.y - mousePosition.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.speedX += dx * 0.01
          this.speedY += dy * 0.01
        }

        // Limiter la vitesse
        this.speedX = Math.min(Math.max(this.speedX, -2), 2)
        this.speedY = Math.min(Math.max(this.speedY, -2), 2)

        // Mettre à jour la couleur
        this.color = colorRef.current
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.fill()
      }
    }

    // Initialiser les particules
    const init = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    // Dessiner les connexions entre particules
    const drawConnections = () => {
      if (!ctx) return

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = colorRef.current
            ctx.globalAlpha = 1 - distance / maxDistance
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Fonction d'animation
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Fond noir avec dégradé
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width,
      )
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 1)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Mettre à jour et dessiner les particules
      drawConnections()
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Gestionnaire d'événements de souris
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.x = e.clientX
      mousePosition.y = e.clientY
    }

    // Ajouter les écouteurs d'événements
    window.addEventListener("mousemove", handleMouseMove)

    // Démarrer l'animation
    init()
    animate()

    // Nettoyage
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  )
}
