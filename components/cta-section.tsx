import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-14 px-6 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="slide-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-sans text-balance">
            Pronto Para Passar no ENEM 2026?
          </h2>
          <p className="text-base md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
            Chega de lutar contra o tempo na hora da prova. Junte-se a centenas de alunos que já aplicam o método das
            Palavras-Chave e conquiste a sua aprovação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 pulse-button text-lg px-8 py-4"
            >
              <a href="#pricing">Quero Passar no ENEM 2026</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 bg-transparent"
            >
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
