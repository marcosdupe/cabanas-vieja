import { PawPrint, Baby, WifiOff } from "lucide-react"

const PILLARS = [
  {
    letter: "P",
    icon: PawPrint,
    title: "No Pets",
    text: "Garantizamos el silencio absoluto y el respeto por el hábitat de las aves y la fauna rural autóctona que rodea las cabañas.",
  },
  {
    letter: "K",
    icon: Baby,
    title: "No Kids",
    text: "Un entorno de calma contemplativa pensado exclusivamente para adultos. Ideal para la concentración, lectura y meditación post-entrenamiento.",
  },
  {
    letter: "W",
    icon: WifiOff,
    title: "No WiFi",
    text: "Desconexión digital real. Apagá las notificaciones e intercambiá la pantalla por el pedaleo, el fogón de asado y charlas genuinas.",
  },
]

export function NpkwSection() {
  return (
    <section id="concepto" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Filosofía del Refugio
          </span>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-balance md:text-5xl">
            El Manifiesto <span className="text-primary">NPKW</span>
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Diseñamos un entorno libre de estímulos urbanos cotidianos para garantizar un descanso
            profundo y reparador del cuerpo y la mente.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ letter, icon: Icon, title, text }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <span className="pointer-events-none absolute -right-2 top-2 font-heading text-[7rem] font-bold leading-none text-primary/5 transition-colors group-hover:text-accent/10">
                {letter}
              </span>
              <div className="relative">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={26} strokeWidth={1.6} />
                </span>
                <h3 className="mt-6 font-heading text-2xl font-semibold text-card-foreground">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-7 text-center md:px-10">
          <p className="text-pretty leading-relaxed text-foreground">
            <strong className="font-semibold text-primary">Un oasis saludable:</strong> fomentamos el
            cicloturismo, la alimentación consciente con desayunos caseros y la reconexión con los
            ritmos naturales del sol.
          </p>
        </div>
      </div>
    </section>
  )
}
