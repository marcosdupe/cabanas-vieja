import Image from "next/image"

const FEATURES = [
  { val: "2", lbl: "Cabañas Exclusivas" },
  { val: "NPKW", lbl: "Filosofía de Calma" },
  { val: "8 AM", lbl: "Early Check-in" },
  { val: "1.5 hs", lbl: "Desde Buenos Aires" },
]

export function HeroSection() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Ciclista de gravel en un camino rural al atardecer en Carlos Keen"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/30" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-14 pt-32 md:px-8 md:pb-20">
        <div className="max-w-2xl text-background">
          <span className="inline-flex items-center rounded-full border border-background/30 bg-background/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] backdrop-blur-sm">
            Escape de Campo Premium
          </span>
          <h1 className="mt-6 font-heading text-4xl font-semibold leading-[0.95] text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Cabañas
            <br />
            <span className="text-accent">Only Bikers</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-background/85 md:text-lg">
            El refugio exclusivo para ciclistas en Carlos Keen. Diseñado para quienes buscan
            desconexión digital total, naturaleza virgen y un descanso saludable y reconfortante.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#cotizador"
              className="rounded-full bg-accent px-7 py-3.5 text-center text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              Cotizar Estadía
            </a>
            <a
              href="#concepto"
              className="rounded-full border border-background/40 bg-background/5 px-7 py-3.5 text-center text-sm font-semibold text-background backdrop-blur-sm transition-colors hover:bg-background/15"
            >
              Ver Manifiesto NPKW
            </a>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-background/15 bg-background/10 backdrop-blur-md md:mt-16 md:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.lbl} className="flex flex-col gap-1 px-5 py-5 md:px-6 md:py-6">
              <span className="font-heading text-2xl font-semibold text-background md:text-3xl">{f.val}</span>
              <span className="text-xs uppercase tracking-wide text-background/70">{f.lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
