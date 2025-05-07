"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Filter, X, ChevronDown } from "lucide-react"
import { useCursorStyle } from "@/hooks/use-cursor-style"
import { CursorProvider } from "@/hooks/use-cursor-style"
import { FluidCursor } from "@/components/fluid-cursor"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { CustomCursor } from "@/components/custom-cursor"

// Données des œuvres d'art
const artworks = [
  {
    id: "metamorphosis",
    title: "Métamorphose",
    artist: "Elena Vostrikova",
    year: 2023,
    medium: "Art numérique / Intelligence artificielle",
    description: "Une exploration des transformations perpétuelles de l'être et de la nature.",
    image: "/images/metamorphosis.jpg",
    color: "#FF3366",
  },
  {
    id: "digital-dreams",
    title: "Rêves Digitaux",
    artist: "Maxime Dubois",
    year: 2023,
    medium: "Photographie numérique / Manipulation digitale",
    description: "La frontière entre conscience et technologie s'estompe dans un flux onirique.",
    image: "/images/digital-dreams.jpg",
    color: "#3366FF",
  },
  {
    id: "quantum-echoes",
    title: "Échos Quantiques",
    artist: "Sophia Chen",
    year: 2022,
    medium: "Génératif / Algorithme quantique",
    description: "Les résonances invisibles de l'univers capturées dans un instant suspendu.",
    image: "/images/quantum-echoes.jpg",
    color: "#9933FF",
  },
  {
    id: "neural-garden",
    title: "Jardin Neural",
    artist: "Léo Moreau",
    year: 2023,
    medium: "Réseaux de neurones / Impression sur aluminium",
    description: "Une symbiose organique entre nature et intelligence artificielle.",
    image: "/images/neural-garden.jpg",
    color: "#33CC99",
  },
  {
    id: "temporal-fragments",
    title: "Fragments Temporels",
    artist: "Amara Diallo",
    year: 2022,
    medium: "Photogrammétrie / Réalité mixte",
    description: "Les strates du temps se superposent et se fragmentent en une mosaïque éthérée.",
    image: "/images/temporal-fragments.jpg",
    color: "#FFCC33",
  },
]

// Types de filtres disponibles
const filterOptions = [
  { id: "all", label: "Tous" },
  { id: "digital", label: "Art numérique" },
  { id: "generative", label: "Art génératif" },
  { id: "photography", label: "Photographie" },
]

export default function GalleryPage() {
  const router = useRouter()
  const mousePosition = useMousePosition()
  const { cursorVariant, cursorText, setCursorVariant, setCursorText } = useCursorStyle()

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredArtwork, setHoveredArtwork] = useState<string | null>(null)

  // Filtrer les œuvres en fonction de la recherche et du filtre actif
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "all") return matchesSearch

    const filterMap = {
      digital: ["Art numérique", "Manipulation digitale"],
      generative: ["Génératif", "Algorithme", "Réseaux de neurones"],
      photography: ["Photographie", "Photogrammétrie"],
    }

    const matchesFilter = filterMap[activeFilter as keyof typeof filterMap].some((term) =>
      artwork.medium.toLowerCase().includes(term.toLowerCase()),
    )

    return matchesSearch && matchesFilter
  })

  return (
    <CursorProvider>
      <main className="min-h-screen bg-black text-white pt-24 pb-16">
        <FluidCursor variant={cursorVariant} text={cursorText} position={mousePosition} />
        <CustomCursor />

        <div className="container mx-auto px-6">
          {/* En-tête de la galerie */}
          <div className="mb-12">
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Galerie
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-white/70 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explorez notre collection d'œuvres numériques avant-gardistes qui repoussent les frontières de l'art
              contemporain.
            </motion.p>
          </div>

          {/* Barre de recherche et filtres */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Rechercher une œuvre ou un artiste..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onMouseEnter={() => {
                  setCursorVariant("text")
                  setCursorText("Rechercher")
                }}
                onMouseLeave={() => {
                  setCursorVariant("default")
                  setCursorText("")
                }}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white hover:bg-white/10 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
                onMouseEnter={() => {
                  setCursorVariant("button")
                  setCursorText("Filtrer")
                }}
                onMouseLeave={() => {
                  setCursorVariant("default")
                  setCursorText("")
                }}
              >
                <Filter className="w-5 h-5" />
                <span>Filtrer</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-black border border-white/10 rounded-lg shadow-lg z-10"
                  >
                    <div className="p-2">
                      {filterOptions.map((option) => (
                        <button
                          key={option.id}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${activeFilter === option.id ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10"}`}
                          onClick={() => {
                            setActiveFilter(option.id)
                            setShowFilters(false)
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Grille des œuvres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtworks.length > 0 ? (
              filteredArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  whileHover={{ y: -10 }}
                  onClick={() => router.push(`/oeuvre/${artwork.id}`)}
                  onMouseEnter={() => {
                    setHoveredArtwork(artwork.id)
                    setCursorVariant("artwork")
                    setCursorText("Voir")
                  }}
                  onMouseLeave={() => {
                    setHoveredArtwork(null)
                    setCursorVariant("default")
                    setCursorText("")
                  }}
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Effet de bordure colorée au survol */}
                    <motion.div
                      className="absolute inset-0 border-2 rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredArtwork === artwork.id ? 1 : 0,
                        borderColor: artwork.color,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                    <p className="text-sm text-white/70 mb-3">{artwork.artist}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                        {artwork.year}
                      </span>
                      <span
                        className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                        style={{ color: artwork.color }}
                      >
                        {artwork.medium.split("/")[0].trim()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="text-xl font-medium mb-2">Aucune œuvre trouvée</h3>
                  <p className="text-white/60">Essayez de modifier vos critères de recherche ou de filtrage.</p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </main>
    </CursorProvider>
  )
}
