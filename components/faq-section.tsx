import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Serve para quem está começando do zero?",
      answer:
        "Sim. O método é desenhado para qualquer nível: ele te ensina a interpretar os comandos da prova, então mesmo que você ainda esteja revisando conteúdo, já começa a ganhar tempo e segurança.",
    },
    {
      question: "Funciona para Matemática também?",
      answer:
        "Sim. A técnica das palavras-chave se aplica a todas as áreas do ENEM, incluindo Matemática, Ciências da Natureza, Humanas e Linguagens.",
    },
    {
      question: "Como acesso a Comunidade no Telegram?",
      answer:
        "Após a compra, você recebe por e-mail e WhatsApp o link de acesso à Comunidade de Elite no Telegram, onde tira dúvidas e recebe conteúdos extras.",
    },
    {
      question: "Por quanto tempo terei acesso ao material?",
      answer:
        "O acesso é vitalício. Você paga uma única vez e pode consultar o material quantas vezes quiser, além de receber as atualizações gratuitas de 2026.",
    },
    {
      question: "Como recebo o material depois de comprar?",
      answer:
        "O acesso é liberado na hora, enviado automaticamente para o seu e-mail e WhatsApp logo após a confirmação do pagamento.",
    },
    {
      question: "E se eu não gostar do conteúdo?",
      answer:
        "Você tem 7 dias de garantia. Se achar que não consegue aplicar ou não gostar do material, devolvemos 100% do seu dinheiro, sem perguntas.",
    },
  ]

  return (
    <section className="py-14 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 font-orbitron">Perguntas Frequentes</h2>
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Tire suas principais dúvidas sobre o método das Palavras-Chave, o acesso ao material e a garantia.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
