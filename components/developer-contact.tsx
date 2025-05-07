"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Instagram } from "lucide-react"
import { useCursorStyle } from "@/hooks/use-cursor-style"

export function DeveloperContact() {
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimation()
  const { setCursorVariant, setCursorText } = useCursorStyle()
  const isMounted = useRef(false)

  // Animation de flottement aléatoire
  useEffect(() => {
    // Marquer le composant comme monté
    isMounted.current = true;
    
    let animationFrameId: number;
    
    const doAnimation = () => {
      if (!isMounted.current) return;
      
      // Générer de nouvelles coordonnées aléatoires
      const newX = Math.random() * 20 - 10;
      const newY = Math.random() * 20 - 10;
      
      // Appliquer l'animation sans attendre
      controls.start({
        x: newX,
        y: newY,
        transition: { duration: 3, ease: "easeInOut" },
      }).then(() => {
        // Ne continuer que si le composant est toujours monté
        if (isMounted.current) {
          animationFrameId = requestAnimationFrame(doAnimation);
        }
      }).catch(error => {
        console.error("Animation error:", error);
      });
    };
    
    // Délai court pour s'assurer que le composant est monté
    const timeoutId = setTimeout(() => {
      if (isMounted.current) {
        doAnimation();
      }
    }, 100);
    
    // Nettoyage à la démontage
    return () => {
      isMounted.current = false;
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [controls]);

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      initial={{ x: 0, y: 0 }}
      whileHover={{ scale: 1.1 }}
      onHoverStart={() => {
        setIsHovered(true)
        setCursorVariant("button")
        setCursorText("Instagram")
      }}
      onHoverEnd={() => {
        setIsHovered(false)
        setCursorVariant("default")
        setCursorText("")
      }}
    >
      <a
        href="https://www.instagram.com/b.andysa/"
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
      >
        <motion.div
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg"
          animate={{
            boxShadow: isHovered ? "0 0 20px 5px rgba(236, 72, 153, 0.5)" : "0 0 10px 2px rgba(236, 72, 153, 0.3)",
          }}
        >
          <Instagram className="w-6 h-6 text-white" />
        </motion.div>

        <motion.div
          className="absolute -top-10 right-0 bg-white text-black text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap"
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          @b.andysa
        </motion.div>

        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 rounded-full border-2 border-white/50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </a>
    </motion.div>
  )
}
