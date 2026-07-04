import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Geist } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MetaPixel } from "@/components/meta-pixel"

export const metadata: Metadata = {
  title: "Vecel ENEM - Seja aprovado em 2026",
  description:
    "Seja aprovado no ENEM: curso intensivo para 30 dias com inteligência artificial e 7 professores. Acelere sua preparação com técnicas focadas no exame.",
  generator: "v0.app",
  icons: {
    icon: "/vercel-school-logo-transparent.png",
    apple: "/vercel-school-logo-transparent.png",
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Vecel ENEM - Seja aprovado em 2026",
    description:
      "Seja aprovado no ENEM: curso intensivo para 30 dias com inteligência artificial e 7 professores.",
    url: "/",
    siteName: "Vecel ENEM",
    images: [
      {
        url: "/vercel-school-logo-transparent.png",
        width: 1200,
        height: 1200,
        alt: "Vecel ENEM logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vecel ENEM - Seja aprovado em 2026",
    description:
      "Seja aprovado no ENEM: curso intensivo para 30 dias com inteligência artificial e 7 professores.",
    images: ["/vercel-school-logo-transparent.png"],
  },
  other: [
    { name: "keywords", content: "ENEM,ENEM 2026,preparacao ENEM,estudo ENEM,redacao ENEM,simulados ENEM,inteligencia artificial estudo" },
    { name: "robots", content: "index,follow" },
    { name: "author", content: "Vecel ENEM" },
  ],
}

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${geist.variable} antialiased dark`}>
      <body>
        <MetaPixel />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "Vecel ENEM",
              "url": "http://localhost:3000",
              "logo": "http://localhost:3000/vercel-school-logo-transparent.png"
            },
            {
              "@type": "WebSite",
              "name": "Vecel ENEM",
              "url": "http://localhost:3000",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "http://localhost:3000/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "WebPage",
              "name": "Vecel ENEM - Seja aprovado em 2026",
              "url": "http://localhost:3000",
              "description": "Seja aprovado no ENEM: curso intensivo para 30 dias com inteligência artificial e 7 professores."
            }
          ]
        }) }} />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1547784333801355&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
