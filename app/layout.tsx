import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Geist } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MetaPixel } from "@/components/meta-pixel"
import { META_PIXEL_ID } from "@/lib/meta-pixel"

export const metadata: Metadata = {
  title: "Vercel ENEM - Seja aprovado em 2026",
  description:
    "Seja aprovado no ENEM: curso intensivo para 30 dias com inteligência artificial e 7 professores. Acelere sua preparação com técnicas focadas no exame.",
  generator: "v0.app",
  icons: {
    icon: "/vercel-school-logo-transparent.png",
    apple: "/vercel-school-logo-transparent.png",
  },
  metadataBase: new URL("https://vercelenem.vercel.app"),
  openGraph: {
    title: "Vercel ENEM - Seja aprovado em 2026",
    description:
      "Seja aprovado no ENEM: curso intensivo para 30 dias com inteligência artificial e 7 professores.",
    url: "https://vercelenem.vercel.app/",
    siteName: "Vercel ENEM",
    images: [
      {
        url: "https://vercelenem.vercel.app/vercel-school-logo-transparent.png",
        width: 1200,
        height: 1200,
        alt: "Vercel ENEM logo",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vercel ENEM - Seja aprovado em 2026",
    description:
      "Seja aprovado no ENEM: curso intensivo para 30 dias com inteligência artificial e 7 professores.",
    images: ["https://vercelenem.vercel.app/vercel-school-logo-transparent.png"],
  },
  other: {
    keywords: "ENEM,ENEM 2026,preparacao ENEM,estudo ENEM,redacao ENEM,simulados ENEM,inteligencia artificial estudo",
    robots: "index,follow",
    author: "Vercel ENEM",
  },
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
              "name": "Vercel ENEM",
              "url": "https://vercelenem.vercel.app",
              "logo": "https://vercelenem.vercel.app/vercel-school-logo-transparent.png"
            },
            {
              "@type": "WebSite",
              "name": "Vercel ENEM",
              "url": "https://vercelenem.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://vercelenem.vercel.app/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "WebPage",
              "name": "Vercel ENEM - Seja aprovado em 2026",
              "url": "https://vercelenem.vercel.app",
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
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
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
