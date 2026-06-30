import Image from "next/image"
import { Coffee, Flame, Plug, Snowflake, Check } from "lucide-react"

const CABINS = [
  {
    name: "Cabaña Aromo",
    capacity: "Hasta 3 Personas",
    image: "/images/cabanas-collage.png",
    imagePosition: "75% 20%",
    alt: "Exterior de la cabaña Aromo entre los árboles del jardín",
    description:
      "Refugio de madera natural rodeado de árboles, con jardín privado, deck con reposeras y fogón. Pensada para desconectarse de todo y recargar energías entre salidas.",
    gallery: ["20% 20%", "50% 65%"],
    galleryAlts: ["Deck con reposeras de la cabaña Aromo", "Jardín con flores y entrada de la cabaña"],
  },
  {
    name: "Cabaña Ceibo",
    capacity: "Hasta 3 Personas",
    image: "/images/cabanas-collage.png",
    imagePosition: "20% 20%",
    alt: "Interior con camas de la cabaña Ceibo en madera natural",
    description:
      "Interior cálido en madera con camas cómodas, baño con bañadera y rincones de descanso en el jardín. El lugar perfecto para llegar, soltar el cuerpo y dormir bien.",
    gallery: ["20% 88%", "85% 88%"],
    galleryAlts: ["Baño con bañadera de la cabaña Ceibo", "Rincón de descanso en el jardín"],
  },
]

const COMFORTS = [
  "Desayuno de campo casero",
  "Fogón individual para asados",
  "Vajilla completa y heladera",
  "Pava eléctrica y tostadora",
]

const AMENITIES = [
  { icon: Coffee, title: "Desayuno Incluido", text: "Pan casero, delicias locales y café de campo servido directo en tu cabaña." },
  { icon: Flame, title: "Fogón para Asados", text: "Espacio exterior rústico para cocinar al fuego. Estilo asador de campo." },
  { icon: Plug, title: "Pava & Tostadora", text: "Comodidades eléctricas básicas para recargar energía cómodamente." },
  { icon: Snowflake, title: "Heladera & Vajilla", text: "Espacio para bebidas, frutas e hidratación fría para el pedaleo." },
]

export function CabinsSection() {
  return (
    <section id="cabanas" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Alojamiento Premium
          </span>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-balance md:text-5xl">
            Nuestras Cabañas
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Contamos con dos unidades idénticas totalmente integradas con el entorno, optimizadas
            para grupos pequeños de deportistas o parejas.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {CABINS.map((cabin) => (
            <article
              key={cabin.name}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              {/* Main photo — different region of the collage per cabin */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cabin.image}
                  alt={cabin.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  style={{ objectPosition: cabin.imagePosition }}
                />
              </div>

              {/* Two-thumbnail gallery strip */}
              <div className="grid grid-cols-2 gap-px border-t border-border">
                {cabin.gallery.map((pos, i) => (
                  <div key={i} className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src="/images/cabanas-collage.png"
                      alt={cabin.galleryAlts[i]}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      style={{ objectPosition: pos }}
                    />
                  </div>
                ))}
              </div>

              <div className="p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-heading text-2xl font-semibold text-card-foreground">{cabin.name}</h3>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {cabin.capacity}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">{cabin.description}</p>
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {COMFORTS.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-foreground">
                      <Check size={16} className="shrink-0 text-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-center font-heading text-2xl font-semibold md:text-3xl">
            Comodidades del Complejo
          </h3>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AMENITIES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon size={22} strokeWidth={1.7} />
                </span>
                <h4 className="mt-4 font-heading text-lg font-semibold text-card-foreground">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
