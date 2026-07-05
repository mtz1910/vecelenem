"use client"
import { Timeline } from "@/components/ui/timeline"

export function ApplicationsTimeline() {
  const data = [
    {
      title: "Decodifique o Enunciado",
      content: (
        <div>
          <p className="text-black text-sm md:text-base font-normal mb-6 leading-relaxed">
            A maioria das questões possui gatilhos escondidos no enunciado. Ao bater o olho nessas palavras-chave
            específicas, você entende exatamente o que a banca está pedindo.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Identifique o comando real da questão
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Reconheça as pegadinhas mais cobradas
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Interprete textos longos em segundos
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Elimine as Alternativas",
      content: (
        <div>
          <p className="text-black text-sm md:text-base font-normal mb-6 leading-relaxed">
            Com a palavra-chave em mãos, você descarta automaticamente as alternativas absurdas e reduz a prova a uma
            escolha simples e objetiva.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Descarte respostas erradas na hora
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Fuja das armadilhas da banca
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Resolva mais questões com menos esforço
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Garanta a Resposta Certa",
      content: (
        <div>
          <p className="text-black text-sm md:text-base font-normal mb-6 leading-relaxed">
            Chegue à alternativa correta com segurança e sobre tempo para revisar. Menos chute, mais pontos e uma nota
            que reflete tudo o que você estudou.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Marque a resposta com confiança
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Termine a prova com tempo de sobra
            </div>
            <div className="flex items-center gap-3 text-red-400 text-sm">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Aumente sua nota em até 400 pontos
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="applications" className="py-14 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-black mb-4">Esse material é pra você</h2>
          <p className="text-gray-700 text-base md:text-xl max-w-3xl mx-auto leading-relaxed">
            A Apostila completa do ENEM funciona como um{" "}
            <span className="text-red-500 font-bold">decodificador da prova</span>. Em três passos simples você deixa de
            perder tempo e passa a marcar a resposta certa com segurança.
          </p>
        </div>

        <div className="relative">
          <Timeline data={data} />
        </div>
      </div>
    </section>
  )
}
