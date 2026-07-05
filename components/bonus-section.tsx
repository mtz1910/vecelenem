"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const bonuses = [
  {
    title: "Vídeo Aulas",
    description: "Aulas em vídeo das questões mais cobradas do ENEM, com explicação direto ao ponto.",
    value: "R$ 67",
    image: "/bonus/cover-videoaulas.png",
  },
  {
    title: "+500 Questões Extras",
    description: "Banco com mais de 500 questões selecionadas para você treinar e fixar a técnica.",
    value: "R$ 47",
    image: "/bonus/cover-questoes.png",
  },
  {
    title: "Simulados ENEM",
    description: "Simulados completos no formato oficial para você medir sua nota antes da prova.",
    value: "R$ 57",
    image: "/bonus/cover-simulados.png",
  },
  {
    title: "Redação Nota 1000",
    description: "Guia com estrutura, repertório sociocultural e modelos prontos de redação nota 1000.",
    value: "R$ 47",
    image: "/bonus/cover-redacao.png",
  },
]

export function BonusSection() {
  return (
    <section id="bonus" className="py-14 px-6 bg-white scroll-mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-red-500/10 text-red-400 border border-red-500/50 font-space-mono tracking-widest">
            BÔNUS EXCLUSIVOS
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-3 font-orbitron">Você Também Leva de Graça</h2>
          <p className="text-base md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-space-mono">
            Ao garantir seu acesso hoje, você recebe todos estes bônus gratuitamente para acelerar a sua aprovação.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {bonuses.map((bonus, index) => (
            <div
              key={index}
              className="group flex flex-col sm:flex-row gap-4 rounded-2xl border border-red-500/20 bg-white p-4 transition-all duration-300 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
            >
              <div className="relative aspect-video w-full sm:w-56 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={bonus.image || "/placeholder.svg"}
                  alt={bonus.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white font-space-mono">
                  GRÁTIS
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-bold text-black mb-2 font-orbitron">{bonus.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed mb-3 font-space-mono">{bonus.description}</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 line-through font-space-mono">Valor: {bonus.value}</span>
                  <span className="text-lg font-bold text-red-500 font-orbitron">GRÁTIS</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-700 mt-8 font-space-mono">
          Todos esses bônus juntos valem mais de <span className="text-red-500 font-bold">R$ 218</span>, mas hoje você
          leva de <span className="text-red-500 font-bold">GRAÇA</span>.
        </p>
      </div>
    </section>
  )
}
