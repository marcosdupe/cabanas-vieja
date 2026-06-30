import { MapPin } from "lucide-react"

const STEPS = [
  {
    title: "Desde Capital Federal en Auto (1.5 hs)",
    text: "Tomá la Autopista Acceso Oeste hasta Luján, luego desviá por la Ruta Nacional 7 hasta el km 72, doblá a la derecha y seguí el camino pavimentado directo a Carlos Keen.",
  },
  {
    title: "Ubicación Física Real",
    text: "Las cabañas están en las coordenadas -34.482839, -59.218787. Google Maps tiene una dirección desactualizada para la ficha comercial, pero el mapa muestra el pin exacto en el predio rural.",
  },
  {
    title: "Acceso en Bicicleta",
    text: "Los caminos que conducen al predio son de tierra compacta (típica huella rural bonaerense), perfectamente transitables con cubiertas gravel (+35c) o MTB.",
  },
]

export function LocationSection() {
  return (
    <section id="ubicacion" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">Ubicación</span>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-balance md:text-5xl">
            El Camino al Refugio
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Nos encontramos en una zona tranquila y rural de Carlos Keen, apartados del ruido y
            rodeados de verde. Ideal para llegar pedaleando.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7 md:p-8">
            <h3 className="font-heading text-xl font-semibold text-card-foreground">
              Indicaciones de Acceso
            </h3>
            <ol className="mt-6 space-y-6">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-card-foreground">{step.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href="https://www.google.com.ar/maps/search/-34.482839,+-59.218787"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex items-center justify-center gap-2 rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <MapPin size={18} />
              Ver Ubicación Exacta en Google Maps
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="relative h-72 w-full lg:h-full lg:min-h-[420px]">
              <iframe
                src="https://maps.google.com/maps?q=-34.482839,-59.218787&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", inset: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Cabañas Only Bikers en Carlos Keen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
