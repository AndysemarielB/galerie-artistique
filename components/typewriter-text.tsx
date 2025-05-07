"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface TypewriterTextProps {
  text: string
  speed?: number
  delay?: number
}

export function TypewriterText({ text, speed = 50, delay = 0 }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Réinitialiser l'animation quand le texte change
    setDisplayedText("")
    setCurrentIndex(0)
    setIsTyping(false)

    // Délai initial avant de commencer à taper
    const initialDelay = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(initialDelay)
  }, [text, delay])

  useEffect(() => {
    if (!isTyping) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, isTyping, speed, text])

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  )
}
