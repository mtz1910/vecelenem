import { Card, CardContent } from "@/components/ui/card"

const pains = [
  {
    icon: "⏳",
    description: "Chega no final da prova e ainda faltam 20 questões para ler, obrigando você a chutar tudo.",
  },
  {
    icon: "🤯",
    description: "Lê o enunciado três vezes e, no final, já esqueceu o que estava no começo.",
  },
  {
    icon: "📉",
    description: "Estuda o ano inteiro, mas trava na hora da prova porque as questões parecem 'pegadinhas'.",
  },
  {
    icon: "😞",
    description: "Sente que sabe a matéria, mas não sabe fazer a prova.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-14 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-sans">Se você...</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pains.map((pain, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="flex flex-col items-center text-center gap-4 pt-6">
                <span className="text-4xl" aria-hidden="true">
                  {pain.icon}
                </span>
                <p className="text-muted-foreground leading-relaxed text-pretty">{pain.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
