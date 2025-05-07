"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"

interface CursorContextType {
  cursorVariant: string
  cursorText: string
  setCursorVariant: (variant: string) => void
  setCursorText: (text: string) => void
}

const CursorContext = createContext<CursorContextType>({
  cursorVariant: "default",
  cursorText: "",
  setCursorVariant: () => {},
  setCursorText: () => {},
})

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, setCursorVariant, setCursorText }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursorStyle() {
  return useContext(CursorContext)
}
