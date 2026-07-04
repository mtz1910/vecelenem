"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  "/depoimentos/wa1.png",
  "/depoimentos/dep1.png",
  "/depoimentos/wa2.png",
  "/depoimentos/dep2.png",
  "/depoimentos/wa3.png",
  "/depoimentos/dep3.png",
  "/depoimentos/wa4.png",
  "/depoimentos/dep4.png",
  "/depoimentos/dep5.png",
  "/depoimentos/dep6.png",
  "/depoimentos/dep7.png",
]

export function TestimonialsSection() {
  return (
    <section className="py-14 bg-card overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-red-500/10 text-red-400 border border-red-500/50 font-space-mono tracking-widest">
            PROVA SOCIAL
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-card-foreground mb-3 font-orbitron">
            Depoimentos 100% Reais
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-red-500 text-red-500" />
            ))}
          </div>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-space-mono">
            Veja as mensagens de alunos que aplicaram o método das Palavras-Chave e sentiram a diferença na prova.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee gap-4" style={{ ["--marquee-duration" as string]: "60s" }}>
          {[...testimonials, ...testimonials].map((src, index) => (
            <div key={index} className="w-[260px] sm:w-[300px] shrink-0">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Depoimento de aluno ${(index % testimonials.length) + 1}`}
                width={400}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
