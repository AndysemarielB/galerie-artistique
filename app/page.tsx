"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ArtCanvas } from "@/components/art-canvas"
import { ParticleField } from "@/components/particle-field"
import { LiquidButton } from "@/components/liquid-button"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useCursorStyle } from "@/hooks/use-cursor-style"
import { FluidCursor } from "@/components/fluid-cursor"
import { TypewriterText } from "@/components/typewriter-text"
import { DeveloperContact } from "@/components/developer-contact"

export default function Home() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const mousePosition = useMousePosition()
  const { cursorVariant, cursorText, setCursorVariant, setCursorText } = useCursorStyle()

  // Valeurs pour l'animation de défilement fluide
  const scrollYProgress = useMotionValue(0)
  const smoothScrollYProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 })

  // Données des œuvres d'art avec des images réelles
  const artworks = [
    {
      id: "metamorphosis",
      title: "Métamorphose",
      artist: "Elena Vostrikova",
      description: "Une exploration des transformations perpétuelles de l'être et de la nature.",
      image: "/images/metamorphosis.jpg",
      color: "#FF3366",
    },
    {
      id: "digital-dreams",
      title: "Rêves Digitaux",
      artist: "Maxime Dubois",
      description: "La frontière entre conscience et technologie s'estompe dans un flux onirique.",
      image: "/images/digital-dreams.jpg",
      color: "#3366FF",
    },
    {
      id: "quantum-echoes",
      title: "Échos Quantiques",
      artist: "Sophia Chen",
      description: "Les résonances invisibles de l'univers capturées dans un instant suspendu.",
      image: "/images/quantum-echoes.jpg",
      color: "#9933FF",
    },
    {
      id: "neural-garden",
      title: "Jardin Neural",
      artist: "Léo Moreau",
      description: "Une symbiose organique entre nature et intelligence artificielle.",
      image: "/images/neural-garden.jpg",
      color: "#33CC99",
    },
    {
      id: "temporal-fragments",
      title: "Fragments Temporels",
      artist: "Amara Diallo",
      description: "Les strates du temps se superposent et se fragmentent en une mosaïque éthérée.",
      image: "/images/temporal-fragments.jpg",
      color: "#FFCC33",
    },
  ]

  // Effet pour l'animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  // Gestion du défilement
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.body.scrollHeight

      // Calculer la progression du défilement (0 à 1)
      const progress = scrollPosition / (documentHeight - windowHeight)
      scrollYProgress.set(progress)

      // Déterminer l'œuvre active basée sur la position de défilement
      const newIndex = Math.min(
        Math.floor((scrollPosition / (documentHeight - windowHeight)) * artworks.length),
        artworks.length - 1,
      )

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeIndex, artworks.length, scrollYProgress])

  // Fonction pour naviguer vers une œuvre
  const navigateToArtwork = (id: string) => {
    router.push(`/oeuvre/${id}`)
  }

  return (
    <main className="relative h-[500vh] bg-black overflow-hidden">
      {/* Canvas d'art génératif en arrière-plan */}
      <div className="fixed inset-0 z-0">
        <ArtCanvas activeColor={artworks[activeIndex]?.color || "#000000"} />
      </div>

      {/* Champ de particules réactif */}
      <div className="fixed inset-0 z-10 opacity-40 pointer-events-none">
        <ParticleField mousePosition={mousePosition} color={artworks[activeIndex]?.color} />
      </div>

      {/* Curseur fluide personnalisé */}
      <FluidCursor variant={cursorVariant} text={cursorText} position={mousePosition} />

      {/* Élément de contact du développeur */}
      <DeveloperContact />

      {/* Conteneur principal avec effet de parallaxe */}
      <div ref={containerRef} className="fixed inset-0 z-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between"
          >
            {/* Image de l'œuvre avec effet de distorsion */}
            <div
              className="relative w-full md:w-1/2 h-[60vh] md:h-[80vh] overflow-hidden rounded-2xl"
              onMouseEnter={() => {
                setCursorVariant("artwork")
                setCursorText("Voir")
              }}
              onMouseLeave={() => {
                setCursorVariant("default")
                setCursorText("")
              }}
              onClick={() => navigateToArtwork(artworks[activeIndex].id)}
            >
              <motion.div
                initial={{ filter: "blur(20px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={artworks[activeIndex].image || "/placeholder.svg"}
                  alt={artworks[activeIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </motion.div>

              {/* Effet de distorsion sur l'image */}
              <div className="distortion-mesh absolute inset-0 z-10 opacity-70 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Texte de l'œuvre avec animation */}
            <div className="w-full md:w-1/2 pl-0 md:pl-12 mt-8 md:mt-0 text-white">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h2 className="text-sm font-light tracking-widest text-white/70 uppercase mb-2">
                  <TypewriterText text={artworks[activeIndex].artist} />
                </h2>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                  <span
                    className="inline-block"
                    style={{
                      background: `linear-gradient(to right, white, ${artworks[activeIndex].color})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {artworks[activeIndex].title}
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
                  {artworks[activeIndex].description}
                </p>

                <div className="flex items-center gap-6">
                  <LiquidButton
                    onClick={() => navigateToArtwork(artworks[activeIndex].id)}
                    color={artworks[activeIndex].color}
                  >
                    Explorer l'œuvre
                  </LiquidButton>

                  <motion.div
                    className="text-sm text-white/60 flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <span className="inline-block w-12 h-[1px] bg-white/30" />
                    {activeIndex + 1}/{artworks.length}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateur de progression */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex gap-3">
          {artworks.map((artwork, index) => (
            <motion.button
              key={artwork.id}
              className={cn(
                "w-3 h-3 rounded-full transition-colors duration-500",
                index === activeIndex ? "bg-white" : "bg-white/30",
              )}
              style={{ backgroundColor: index === activeIndex ? artwork.color : "rgba(255,255,255,0.3)" }}
              onClick={() => {
                const targetPosition = (index / artworks.length) * (document.body.scrollHeight - window.innerHeight)
                window.scrollTo({ top: targetPosition, behavior: "smooth" })
              }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Écran d'introduction */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold text-white mb-4"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                  color: ["#FFFFFF", "#FFFFFF00"],
                }}
                transition={{
                  duration: 2,
                  repeat: 0,
                  ease: "linear",
                }}
                style={{
                  backgroundImage: "linear-gradient(to right, #FFFFFF, #FF3366, #3366FF, #9933FF, #33CC99, #FFFFFF)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                }}
              >
                ARTIS
              </motion.h1>
              <motion.p
                className="text-xl text-white/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <TypewriterText text="Une nouvelle dimension artistique" />
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
