"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

const CHECKOUT_LINKS = {
  basic: "https://ggcheckout.app/checkout/v5/NBX7kZL7Z9gh3QBuGCq5", // R$ 19,90
  upsell: "https://ggcheckout.app/checkout/v5/DqIVMHV6cuRVL63VPfbV", // R$ 29,90
  full: "https://ggcheckout.app/checkout/v5/LIHSNbEsB6BYfboE4dgV", // R$ 39,90
}

const plans = [
  {
    id: "basic",
    name: "Estudo Base",
    badge: null,
    oldPrice: "R$ 69,90",
    price: "R$ 19,90",
    cta: "QUERO GARANTIR MEU DESCONTO",
    highlighted: false,
    benefits: [
      "Palavras-Chave do ENEM NOTA 1000",
      "BÔNUS: + de 200 Simulados",
      "Todas as matérias",
      "Provas ENEM + Gabaritos",
      "Comunidade de Elite no Telegram",
      "Enviado por e-mail e WhatsApp + acesso ao site",
      "PDFs de todas as metérias do ENEM",
      "Apostila completa",
      "Acesso vitalício",
      
    ],
  },
  {
    id: "full",
    name: "Estudo COMPLETO ENEM",
    badge: "MELHOR CUSTO-BENEFÍCIO",
    oldPrice: "R$ 100,00",
    price: "R$ 39,90",
    cta: "QUERO GARANTIR MEU DESCONTO",
    highlighted: true,
    benefits: [
      "Curso de INGLÊS pro ENEM",
      "Curso de ESPANHOL pro ENEM",
      "Palavras-Chave do ENEM NOTA 1000",
      "Apostila completa",	 
      "Vídeo aulas online",
      "BÔNUS SURPRESA",
      "Todas as matérias",
      "Provas ENEM + Gabarito",
      "+500 Simulados ENEM",
      "Redação Completa",
      "Plano de estudo focado no ENEM",
      "Comunidade de Elite no Telegram",
      "Suporte Individual para dúvidas",
      "Atualizações gratuitas vitálicia",
      "Enviado por e-mail e WhatsApp + Acesso ao site",
      "PDFs de todas as metérias do ENEM",
      "Acesso vitalício",
    ],
  },
]

// Abre o checkout SEMPRE em uma nova aba. A chamada de window.open é síncrona
// (dentro do clique) para não ser bloqueada pelo navegador.
// O evento de Compra (Purchase) NÃO é disparado aqui: quem envia o Purchase
// para a Meta é o próprio GGcheckout, após o pagamento ser confirmado.
function goToCheckout(url: string) {
  window.open(url, "_blank", "noopener,noreferrer")
}

export function PricingSection() {
  const [upsellOpen, setUpsellOpen] = useState(false)

  function handlePlanClick(planId: string) {
    if (planId === "basic") {
      // Antes de mandar pro checkout de R$19,90, oferece o upsell.
      setUpsellOpen(true)
      return
    }
    // Plano Full: vai direto pro checkout de R$39,90.
    goToCheckout(CHECKOUT_LINKS.full)
  }

  function acceptUpsell() {
    goToCheckout(CHECKOUT_LINKS.upsell)
  }

  function declineUpsell() {
    setUpsellOpen(false)
    goToCheckout(CHECKOUT_LINKS.basic, 19.9)
  }

  return (
    <section id="pricing" className="py-14 px-6 bg-black scroll-mt-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 font-orbitron">Escolha o Seu Acesso</h2>
          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-space-mono">
            Pagamento único e acesso vitalício. Comece hoje a garantir a sua vaga no ENEM 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                plan.highlighted
                  ? "border-2 border-red-500 bg-gradient-to-b from-neutral-900 to-black shadow-[0_0_40px_rgba(239,68,68,0.25)]"
                  : "border border-white/10 bg-gradient-to-b from-neutral-900 to-black"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-6 rounded-full bg-red-500 px-4 py-1 text-xs font-bold text-white font-space-mono">
                  {plan.badge}
                </span>
              )}

              <h3 className="text-2xl font-bold text-white mb-2 mt-1 font-orbitron">{plan.name}</h3>

              <div className="mb-5">
                <p className="text-sm text-gray-500 line-through font-space-mono">{plan.oldPrice}</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-red-500 font-orbitron">{plan.price}</span>
                  <span className="mb-1 text-sm text-gray-400 font-space-mono">à vista</span>
                </div>
              </div>

              <ul className="flex-1 space-y-2.5 mb-6">
                {plan.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2.5 text-sm text-gray-200 font-space-mono leading-snug"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePlanClick(plan.id)}
                className="w-full h-auto whitespace-normal bg-red-500 hover:bg-red-600 text-white font-geist border-0 text-sm md:text-base py-4 px-3 leading-tight"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8 font-space-mono">
          Pagamento 100% seguro · Garantia incondicional de 7 dias
        </p>
      </div>

      <Dialog open={upsellOpen} onOpenChange={setUpsellOpen}>
        <DialogContent className="border-2 border-red-500 bg-gradient-to-b from-neutral-900 to-black text-white sm:max-w-md">
          <DialogHeader>
            <span className="mx-auto mb-1 rounded-full bg-red-500 px-4 py-1 text-xs font-bold text-white font-space-mono w-fit">
              OFERTA EXCLUSIVA
            </span>
            <DialogTitle className="text-center text-2xl font-bold font-orbitron">
              Faça um upgrade agora!
            </DialogTitle>
            <DialogDescription className="text-center text-gray-300 font-space-mono leading-relaxed">
              Leve o plano <span className="font-bold text-white">Estudo Full ENEM</span> (que custa R$39,90) por
              apenas:
            </DialogDescription>
          </DialogHeader>

          <div className="text-center my-2">
            <p className="text-sm text-gray-500 line-through font-space-mono">R$ 39,90</p>
            <p className="text-5xl font-extrabold text-red-500 font-orbitron">R$ 29,90</p>
            <p className="mt-2 text-sm text-gray-300 font-space-mono">
              Vídeo aulas, simulados, redação completa e todos os bônus por só R$10 a mais.
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <Button
              onClick={acceptUpsell}
              className="w-full h-auto whitespace-normal bg-red-500 hover:bg-red-600 text-white font-geist border-0 text-sm md:text-base py-4 px-3 leading-tight"
            >
              SIM! QUERO O COMPLETO POR R$29,90
            </Button>
            <button
              onClick={declineUpsell}
              className="text-sm text-gray-400 underline hover:text-gray-200 font-space-mono"
            >
              Não, quero continuar com o básico de R$19,90
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
