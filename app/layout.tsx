import type React from "react"
import "./globals.css"
import { Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { CursorProvider } from "@/hooks/use-cursor-style"
import { CustomCursor } from "@/components/custom-cursor"

const manrope = Manrope({ subsets: ["latin"] })

export const metadata = {
  title: "ARTIS — Une Expérience Visuelle Révolutionnaire",
  description: "Une nouvelle dimension artistique qui transcende les conventions traditionnelles",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorProvider>
            <Navigation />
            {children}
            <CustomCursor />
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
