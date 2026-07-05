"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="font-orbitron text-xl font-bold text-black">
              VERCEL<span className="text-red-500"> ENEM</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/#bonus"
                className="font-geist text-white hover:text-red-500 transition-colors duration-200"
              >
                Benefícios
              </a>
              <a
                href="/#applications"
                className="font-geist text-white hover:text-red-500 transition-colors duration-200"
              >
                Método
              </a>
              <a href="/#faq" className="font-geist text-white hover:text-red-500 transition-colors duration-200">
                Dúvidas
              </a>
              <a href="/#pricing" className="font-geist text-white hover:text-red-500 transition-colors duration-200">
                Preço
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="bg-red-500 hover:bg-red-600 text-white font-geist border-0">
              <a href="/#pricing">Garantir Acesso</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-red-500 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/98 border-t border-red-500/20">
              <a
                href="/#bonus"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Benefícios
              </a>
              <a
                href="/#applications"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Método
              </a>
              <a
                href="/#faq"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Dúvidas
              </a>
              <a
                href="/#pricing"
                className="block px-3 py-2 font-geist text-white hover:text-red-500 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Preço
              </a>
              <div className="px-3 py-2">
                <Button
                  asChild
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-geist border-0"
                >
                  <a href="/#pricing" onClick={() => setIsOpen(false)}>
                    Garantir Acesso
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
