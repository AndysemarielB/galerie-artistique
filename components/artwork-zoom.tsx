"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react"
import { useCursorStyle } from "@/hooks/use-cursor-style"

interface ArtworkZoomProps {
  image: string
  onClose: () => void
}

export function ArtworkZoom({ image, onClose }: ArtworkZoomProps) {
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
  const { setCursorVariant, setCursorText } = useCursorStyle()

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5))
  }

  const handleRotate = () => {
    setRotation((prev) => prev + 90)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true)
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute top-6 right-6 z-10 flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleZoomIn()
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onMouseEnter={() => {
            setCursorVariant("button")
            setCursorText("Zoom +")
          }}
          onMouseLeave={() => {
            setCursorVariant("default")
            setCursorText("")
          }}
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleZoomOut()
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onMouseEnter={() => {
            setCursorVariant("button")
            setCursorText("Zoom -")
          }}
          onMouseLeave={() => {
            setCursorVariant("default")
            setCursorText("")
          }}
        >
          <ZoomOut className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleRotate()
          }}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onMouseEnter={() => {
            setCursorVariant("button")
            setCursorText("Rotation")
          }}
          onMouseLeave={() => {
            setCursorVariant("default")
            setCursorText("")
          }}
        >
          <RotateCw className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          onMouseEnter={() => {
            setCursorVariant("button")
            setCursorText("Fermer")
          }}
          onMouseLeave={() => {
            setCursorVariant("default")
            setCursorText("")
          }}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      <motion.div
        className="relative w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default",
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale,
            rotate: rotation,
            x: position.x,
            y: position.y,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt="Détail de l'œuvre"
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </motion.div>
      </motion.div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
        {scale > 1
          ? "Cliquez et faites glisser pour déplacer l'image"
          : "Utilisez les boutons pour zoomer et faire pivoter l'image"}
      </div>
    </motion.div>
  )
}
