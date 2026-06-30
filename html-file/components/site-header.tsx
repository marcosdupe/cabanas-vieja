"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#concepto", label: "NPKW" },
  { href: "#cabanas", label: "Las Cabañas" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#ubicacion", label: "Cómo Llegar" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#inicio"
          className={cn(
            "flex items-center gap-3 transition-colors",
            scrolled ? "text-foreground" : "text-background",
          )}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current/40">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v18M3 12h18" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-semibold tracking-wide">ONLY BIKERS</span>
            <span className="text-[0.62rem] font-medium uppercase tracking-[0.3em] opacity-80">Carlos Keen</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors hover:text-accent",
                scrolled ? "text-foreground" : "text-background/90",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cotizador"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Reservar / Consultar
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-current/30 lg:hidden",
              scrolled ? "text-foreground" : "text-background",
            )}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/60 py-3 text-base font-medium text-foreground last:border-0 hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cotizador"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-foreground"
            >
              Reservar / Consultar
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
