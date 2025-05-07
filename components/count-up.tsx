"use client"

import { useState, useEffect, useRef } from "react"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
}

export function CountUp({ end, start = 0, duration = 2, decimals = 0, prefix = "", suffix = "" }: CountUpProps) {
  const [count, setCount] = useState(start)
  const countRef = useRef(start)
  const frameRef = useRef(0)
  const startTimeRef = useRef(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
    const step = () => {
      const now = Date.now()
      const progress = Math.min((now - startTimeRef.current) / (duration * 1000), 1)

      // Fonction d'easing pour une animation plus naturelle
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4)
      const easedProgress = easeOutQuart(progress)

      const currentCount = start + (end - start) * easedProgress
      countRef.current = currentCount
      setCount(currentCount)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)

    return () => cancelAnimationFrame(frameRef.current)
  }, [start, end, duration])

  const formatNumber = (num: number) => {
    return prefix + num.toFixed(decimals) + suffix
  }

  return <>{formatNumber(count)}</>
}
