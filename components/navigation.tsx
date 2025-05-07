"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCursorStyle } from "@/hooks/use-cursor-style"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { setCursorVariant, setCursorText } = useCursorStyle()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/galerie", label: "Galerie" },
  ]

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 3rem) 3rem)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 20,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "bg-black/50 backdrop-blur-md py-3" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-white hover:text-purple-300 transition-colors"
            onMouseEnter={() => {
              setCursorVariant("text")
              setCursorText("Accueil")
            }}
            onMouseLeave={() => {
              setCursorVariant("default")
              setCursorText("")
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="wave-gradient bg-clip-text text-transparent"
            >
              ARTIS
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-purple-300 relative overflow-hidden group",
                  pathname === link.href ? "text-white" : "text-gray-400",
                )}
                onMouseEnter={() => {
                  setCursorVariant("text")
                  setCursorText(link.label)
                }}
                onMouseLeave={() => {
                  setCursorVariant("default")
                  setCursorText("")
                }}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-purple-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Menu"
            onMouseEnter={() => {
              setCursorVariant("button")
              setCursorText("Menu")
            }}
            onMouseLeave={() => {
              setCursorVariant("default")
              setCursorText("")
            }}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-purple-300 transition-colors"
                aria-label="Fermer"
                onMouseEnter={() => {
                  setCursorVariant("button")
                  setCursorText("Fermer")
                }}
                onMouseLeave={() => {
                  setCursorVariant("default")
                  setCursorText("")
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-4xl font-medium transition-colors hover:text-purple-300 relative group",
                      pathname === link.href ? "text-white" : "text-gray-400",
                    )}
                    onClick={() => setIsOpen(false)}
                    onMouseEnter={() => {
                      setCursorVariant("text")
                      setCursorText(link.label)
                    }}
                    onMouseLeave={() => {
                      setCursorVariant("default")
                      setCursorText("")
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-purple-400 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
