import { Phone, MessageCircle, MapPin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-heading text-2xl font-semibold tracking-wide">CABAÑAS ONLY BIKERS</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-primary-foreground/75">
              Naturaleza, silencio y desconexión digital para ciclistas en Carlos Keen, Argentina.
            </p>
          </div>

          <div className="md:justify-self-end">
            <h4 className="font-heading text-lg font-semibold">Contacto</h4>
            <ul className="mt-4 space-y-3 text-primary-foreground/85">
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-accent" />
                <span>+54 9 11 3196 3906</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-accent" />
                <a
                  href="https://wa.me/5491131963906"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  WhatsApp: +54 9 11 3196-3906
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-accent" />
                <span>Carlos Keen, Luján, Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Cabañas Only Bikers. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
