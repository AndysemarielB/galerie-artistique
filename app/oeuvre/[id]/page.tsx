"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowLeft, ZoomIn, Heart, Share2, Download } from "lucide-react"
import { useCursorStyle } from "@/hooks/use-cursor-style"
import { LiquidButton } from "@/components/liquid-button"
import { CountUp } from "@/components/count-up"
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
    description:
      "Une exploration des transformations perpétuelles de l'être et de la nature. Cette œuvre capture le moment précis où une forme évolue vers une autre, symbolisant les cycles constants de changement qui définissent notre existence.",
    longDescription:
      "Dans 'Métamorphose', Elena Vostrikova explore la frontière entre l'organique et le numérique, créant un dialogue visuel sur la transformation constante qui caractérise notre monde. L'œuvre capture ce moment insaisissable où une forme commence à se transformer en une autre, évoquant les cycles naturels de naissance, de croissance et de renouvellement.\n\nUtilisant des algorithmes d'intelligence artificielle comme co-créateurs, Vostrikova guide le processus créatif tout en permettant à l'imprévisibilité de l'IA d'influencer le résultat final. Cette collaboration entre l'humain et la machine reflète elle-même une métamorphose - celle de notre relation évolutive avec la technologie.\n\nLes couleurs vibrantes et les formes fluides créent une tension visuelle qui invite le spectateur à contempler sa propre nature changeante et sa place dans un univers en perpétuelle évolution.",
    image: "/images/metamorphosis.jpg",
    detailImages: [
      "/images/metamorphosis-detail-1.jpg",
      "/images/metamorphosis-detail-2.jpg",
      "/images/metamorphosis-detail-3.jpg",
    ],
    color: "#FF3366",
    dimensions: "4000 x 6000 px",
    views: 1287,
    likes: 342,
  },
  {
    id: "digital-dreams",
    title: "Rêves Digitaux",
    artist: "Maxime Dubois",
    year: 2023,
    medium: "Photographie numérique / Manipulation digitale",
    description:
      "La frontière entre conscience et technologie s'estompe dans un flux onirique. Cette œuvre explore les paysages mentaux qui émergent à l'intersection de nos rêves et de l'univers numérique.",
    longDescription:
      "Dans 'Rêves Digitaux', Maxime Dubois nous invite à explorer un monde où la conscience humaine et la réalité numérique se fondent en une seule expérience. L'œuvre représente ces espaces mentaux éphémères qui existent entre la veille et le sommeil, entre le tangible et le virtuel.\n\nDubois utilise des techniques de photographie numérique avancées, combinées à des manipulations algorithmiques pour créer des paysages qui semblent familiers mais impossibles, évoquant cette sensation étrange que l'on ressent parfois dans nos rêves.\n\nLes structures géométriques qui émergent des formes organiques symbolisent la façon dont notre esprit tente de donner un sens et une structure à l'inconnu, tandis que les couleurs vibrantes représentent l'intensité émotionnelle de nos expériences oniriques.\n\nÀ travers cette œuvre, l'artiste nous interroge sur la nature de la réalité à l'ère numérique et sur la façon dont nos esprits s'adaptent à un monde de plus en plus médiatisé par la technologie.",
    image: "/images/metamorphosis.jpg",
    detailImages: [
      "/images/metamorphosis-detail-1.jpg",
      "/images/metamorphosis-detail-2.jpg",
      "/images/metamorphosis-detail-3.jpg",
    ],
    color: "#3366FF",
    dimensions: "5000 x 3000 px",
    views: 956,
    likes: 278,
  },
  {
    id: "quantum-echoes",
    title: "Échos Quantiques",
    artist: "Sophia Chen",
    year: 2022,
    medium: "Génératif / Algorithme quantique",
    description:
      "Les résonances invisibles de l'univers capturées dans un instant suspendu. Cette œuvre visualise les patterns quantiques qui sous-tendent la réalité, rendant visible l'invisible.",
    longDescription:
      "Avec 'Échos Quantiques', Sophia Chen repousse les frontières de l'art génératif en incorporant des données issues de véritables ordinateurs quantiques. L'œuvre est le résultat d'une collaboration unique entre l'intuition artistique de Chen et les patterns émergents des fluctuations quantiques.\n\nChaque élément visuel de cette pièce correspond à des données quantiques réelles, transformées par des algorithmes conçus par l'artiste pour traduire l'imperceptible en expérience visuelle. Les formes qui semblent se répéter tout en variant subtilement évoquent la nature probabiliste de la mécanique quantique - où plusieurs réalités coexistent jusqu'à l'observation.\n\nLes couleurs profondes et les structures complexes invitent le spectateur à contempler les mystères fondamentaux de notre univers, créant un pont entre la science théorique et l'expérience esthétique.\n\nChen nous rappelle que la beauté existe à toutes les échelles de la réalité, même dans les dimensions subatomiques qui échappent habituellement à notre perception.",
    image: "/images/quantum-echoes.jpg",
    detailImages: [
      "/images/quantum-echoes-detail-1.jpg",
      "/images/quantum-echoes-detail-2.jpg",
      "/images/quantum-echoes-detail-3.jpg",
    ],
    color: "#9933FF",
    dimensions: "4500 x 4500 px",
    views: 1105,
    likes: 315,
  },
  {
    id: "neural-garden",
    title: "Jardin Neural",
    artist: "Léo Moreau",
    year: 2023,
    medium: "Réseaux de neurones / Impression sur aluminium",
    description:
      "Une symbiose organique entre nature et intelligence artificielle. Cette œuvre explore comment les systèmes artificiels peuvent générer des formes qui imitent et réinterprètent la beauté naturelle.",
    longDescription:
      "Dans 'Jardin Neural', Léo Moreau cultive un écosystème visuel où les algorithmes d'intelligence artificielle et les formes botaniques s'entremêlent pour créer une nouvelle forme de nature. Utilisant des réseaux antagonistes génératifs (GAN) spécialement entraînés sur des milliers d'images de plantes et de jardins, Moreau a créé un système capable de 'rêver' de nouvelles espèces végétales.\n\nL'œuvre existe simultanément comme une création numérique et comme une impression physique sur aluminium, brouillant la frontière entre le virtuel et le tangible. Les textures métalliques de l'aluminium interagissent avec la lumière ambiante, donnant à l'œuvre une qualité vivante qui évolue avec l'environnement.\n\nLes structures organiques générées par l'IA posent des questions profondes sur notre définition de la nature à l'ère de l'Anthropocène. Ces plantes qui n'existent pas dans notre réalité mais qui semblent pourtant familières nous invitent à reconsidérer notre relation avec le monde naturel et les technologies que nous créons.\n\nMoreau suggère que l'intelligence artificielle, loin d'être opposée à la nature, pourrait nous aider à redécouvrir et à réimaginer notre connexion avec le monde vivant.",
    image: "/images/neural-garden.jpg",
    detailImages: [
      "/images/neural-garden-detail-1.jpg",
      "/images/neural-garden-detail-2.jpg",
      "/images/neural-garden-detail-3.jpg",
    ],
    color: "#33CC99",
    dimensions: "6000 x 4000 px",
    views: 876,
    likes: 231,
  },
  {
    id: "temporal-fragments",
    title: "Fragments Temporels",
    artist: "Amara Diallo",
    year: 2022,
    medium: "Photogrammétrie / Réalité mixte",
    description:
      "Les strates du temps se superposent et se fragmentent en une mosaïque éthérée. Cette œuvre capture la nature non-linéaire de la mémoire et de l'expérience temporelle.",
    longDescription:
      "Avec 'Fragments Temporels', Amara Diallo explore la nature subjective et fragmentée de notre expérience du temps. Utilisant des techniques avancées de photogrammétrie, l'artiste a capturé des centaines d'instants d'un même lieu sur une période d'une année, créant une cartographie temporelle complexe.\n\nCes captures ont ensuite été fragmentées et réassemblées selon un algorithme qui simule les processus de la mémoire humaine - privilégiant certains moments, en effaçant d'autres, créant des connexions inattendues entre des instants temporellement distants.\n\nL'œuvre existe à la fois comme une pièce visuelle et comme une expérience de réalité mixte, où les spectateurs peuvent interagir avec ces fragments temporels à travers une application dédiée, créant leur propre parcours à travers cette mémoire artificielle.\n\nDiallo nous invite à réfléchir sur la façon dont nous construisons notre perception du temps et de l'histoire, tant au niveau personnel que collectif. Les discontinuités et les juxtapositions dans l'œuvre évoquent la manière dont nos souvenirs et nos récits sont constamment reconstruits et réinterprétés, jamais fixes, toujours en mouvement.",
    image: "/images/temporal-fragments.jpg",
    detailImages: [
      "/images/temporal-fragments-detail-1.jpg",
      "/images/temporal-fragments-detail-2.jpg",
      "/images/temporal-fragments-detail-3.jpg",
    ],
    color: "#FFCC33",
    dimensions: "Variable (installation)",
    views: 1432,
    likes: 389,
  },
]

export default function ArtworkPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const mousePosition = useMousePosition()
  const { cursorVariant, cursorText, setCursorVariant, setCursorText } = useCursorStyle()

  const [artwork, setArtwork] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showZoom, setShowZoom] = useState(false)
  const [zoomImage, setZoomImage] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeDetailIndex, setActiveDetailIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1.1, 1.05, 1])
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])

  useEffect(() => {
    // Trouver l'œuvre correspondante
    const foundArtwork = artworks.find((art) => art.id === id)
    if (foundArtwork) {
      setArtwork(foundArtwork)
      setLoading(false)
    } else {
      // Rediriger vers la page d'accueil si l'œuvre n'est pas trouvée
      router.push("/")
    }

    // Mettre à jour la progression du défilement
    const unsubscribe = scrollYProgress.onChange((v) => setScrollProgress(v))
    return () => unsubscribe()
  }, [id, router, scrollYProgress])

  const handleZoomImage = (image: string) => {
    setZoomImage(image)
    setShowZoom(true)
    setCursorVariant("default")
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="w-24 h-24 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <CursorProvider>
      <main className="bg-black text-white min-h-screen">
        <FluidCursor variant={cursorVariant} text={cursorText} position={mousePosition} />
        <CustomCursor />

        {/* Image d'en-tête avec texte */}
        <motion.div
          className="relative w-full h-[50vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/metamorphosis.jpg"
            alt="Galerie Artistique"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Exploration Artistique
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-white/80 max-w-3xl"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Découvrez l'univers captivant de l'art numérique contemporain
            </motion.p>
          </div>
        </motion.div>

        {/* Hero section avec image principale */}
        <motion.div ref={containerRef} className="relative h-screen overflow-hidden" style={{ opacity, scale }}>
          <motion.div className="absolute inset-0 z-0" style={{ y }}>
            <Image
              src={artwork.image || "/placeholder.svg"}
              alt={artwork.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          </motion.div>

          <div className="absolute top-0 left-0 right-0 z-20 p-6">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              onMouseEnter={() => {
                setCursorVariant("button")
                setCursorText("Retour")
              }}
              onMouseLeave={() => {
                setCursorVariant("default")
                setCursorText("")
              }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour à la galerie</span>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl"
            >
              <h2 className="text-sm font-light tracking-widest text-white/70 uppercase mb-2">
                {artwork.artist}, {artwork.year}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                <span
                  style={{
                    background: `linear-gradient(to right, white, ${artwork.color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {artwork.title}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8 max-w-3xl">{artwork.description}</p>

              <div className="flex items-center gap-4">
                <LiquidButton
                  color={artwork.color}
                  onClick={() => {
                    const detailsSection = document.getElementById("artwork-details")
                    if (detailsSection) {
                      detailsSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Explorer l'œuvre
                </LiquidButton>

                <motion.button
                  className={`p-3 rounded-full ${isLiked ? "bg-pink-500/20" : "bg-white/10"} hover:bg-white/20 transition-colors`}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleLike}
                  onMouseEnter={() => {
                    setCursorVariant("button")
                    setCursorText(isLiked ? "J'aime déjà" : "J'aime")
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default")
                    setCursorText("")
                  }}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "text-pink-500 fill-pink-500" : "text-white"}`} />
                </motion.button>

                <motion.button
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => {
                    setCursorVariant("button")
                    setCursorText("Partager")
                  }}
                  onMouseLeave={() => {
                    setCursorVariant("default")
                    setCursorText("")
                  }}
                >
                  <Share2 className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Indicateur de défilement */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-xs text-white/60">Défiler pour découvrir</span>
            <motion.div
              className="w-1 h-12 bg-white/20 rounded-full overflow-hidden"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="w-full bg-white"
                style={{
                  height: "100%",
                  scaleY: 0.3,
                  originY: 0,
                  y: scrollProgress * 100 + "%",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Section détails de l'œuvre */}
        <section id="artwork-details" className="relative z-10 bg-black py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Colonne d'informations */}
              <div className="md:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div>
                    <h3 className="text-sm font-medium text-white/60 uppercase mb-2">Artiste</h3>
                    <p className="text-xl font-medium">{artwork.artist}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white/60 uppercase mb-2">Année</h3>
                    <p className="text-xl">{artwork.year}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white/60 uppercase mb-2">Medium</h3>
                    <p className="text-xl">{artwork.medium}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white/60 uppercase mb-2">Dimensions</h3>
                    <p className="text-xl">{artwork.dimensions}</p>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center gap-8">
                      <div>
                        <h3 className="text-sm font-medium text-white/60 uppercase mb-1">Vues</h3>
                        <p className="text-2xl font-medium">
                          <CountUp end={artwork.views} />
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-white/60 uppercase mb-1">Likes</h3>
                        <p className="text-2xl font-medium">
                          <CountUp end={isLiked ? artwork.likes + 1 : artwork.likes} />
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <LiquidButton color={artwork.color} onClick={() => {}}>
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger HD
                    </LiquidButton>
                  </div>
                </div>
              </div>

              {/* Colonne de contenu principal */}
              <div className="md:col-span-2 space-y-16">
                <div>
                  <h2 className="text-3xl font-bold mb-8">À propos de l'œuvre</h2>
                  <div className="prose prose-lg prose-invert">
                    {artwork.longDescription.split("\n\n").map((paragraph: string, i: number) => (
                      <p key={i} className="mb-6 text-white/80 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Galerie d'images détaillées */}
                <div>
                  <h2 className="text-3xl font-bold mb-8">Détails de l'œuvre</h2>

                  {/* Image principale */}
                  <div className="mb-6">
                    <motion.div
                      className="relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      onClick={() => handleZoomImage(artwork.detailImages[activeDetailIndex])}
                      onMouseEnter={() => {
                        setCursorVariant("artwork")
                        setCursorText("Zoom")
                      }}
                      onMouseLeave={() => {
                        setCursorVariant("default")
                        setCursorText("")
                      }}
                    >
                      <Image
                        src={artwork.detailImages[activeDetailIndex] || "/placeholder.svg"}
                        alt={`Détail de ${artwork.title}`}
                        fill
                        className="object-cover transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ZoomIn className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Miniatures */}
                  <div className="grid grid-cols-3 gap-4">
                    {artwork.detailImages.map((image: string, index: number) => (
                      <motion.div
                        key={index}
                        className={`relative aspect-square overflow-hidden rounded-md cursor-pointer ${index === activeDetailIndex ? "ring-2 ring-offset-2 ring-offset-black ring-" + artwork.color : ""}`}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setActiveDetailIndex(index)}
                        onMouseEnter={() => {
                          setCursorVariant("button")
                          setCursorText("Voir")
                        }}
                        onMouseLeave={() => {
                          setCursorVariant("default")
                          setCursorText("")
                        }}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Miniature ${index + 1} de ${artwork.title}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section de navigation entre œuvres */}
        <section className="relative z-10 bg-black py-24 border-t border-white/10">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Découvrir d'autres œuvres</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {artworks
                .filter((art) => art.id !== id)
                .slice(0, 3)
                .map((art) => (
                  <motion.div
                    key={art.id}
                    className="group relative overflow-hidden rounded-lg cursor-pointer"
                    whileHover={{ y: -10 }}
                    onClick={() => router.push(`/oeuvre/${art.id}`)}
                    onMouseEnter={() => {
                      setCursorVariant("artwork")
                      setCursorText("Voir")
                    }}
                    onMouseLeave={() => {
                      setCursorVariant("default")
                      setCursorText("")
                    }}
                  >
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={art.image || "/placeholder.svg"}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold mb-2">{art.title}</h3>
                      <p className="text-sm text-white/70">{art.artist}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* Modal de zoom */}
        <AnimatePresence>
          {showZoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center"
              onClick={() => setShowZoom(false)}
            >
              <button
                onClick={() => setShowZoom(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                onMouseEnter={() => {
                  setCursorVariant("button")
                  setCursorText("Fermer")
                }}
                onMouseLeave={() => {
                  setCursorVariant("default")
                  setCursorText("")
                }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              <motion.div
                className="relative max-w-[90vw] max-h-[90vh]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={zoomImage || "/placeholder.svg"}
                  alt="Détail de l'œuvre"
                  width={1200}
                  height={800}
                  className="rounded-lg object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </CursorProvider>
  )
}
