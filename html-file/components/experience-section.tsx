import Image from "next/image"
import { Clock } from "lucide-react"

export function ExperienceSection() {
  return (
    <section id="experiencia" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
              El Destino Ideal
            </span>
            <h2 className="mt-4 font-heading text-4xl font-semibold text-balance md:text-5xl">
              Pedalear en Carlos Keen
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Carlos Keen es el polo de cicloturismo de Buenos Aires por excelencia. Con sus caminos
              rurales consolidados y paisajes de llanura infinitos, es ideal para entrenar gravel,
              mountain bike o realizar salidas recreativas en pelotón.
            </p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-7">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold text-card-foreground">
                <Clock size={20} className="text-accent" />
                Diseñado para Ciclistas del Fin de Semana
              </h3>

              <div className="mt-5 space-y-5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Early Check-in</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      Sábado 8:00 AM
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Llegás temprano, guardás tus cosas, te ponés la indumentaria y salís a pedalear la
                    mañana entera sin perder el día.
                  </p>
                </div>
                <div className="h-px bg-border" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Late Check-out</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      Domingo 20:00 PM
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Aprovechás el domingo para rodar hasta el atardecer, volvés para una ducha
                    relajante y regresás a Capital descansado y sin apuro.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: stacked single column. lg+: 2-column bento with tall left */}
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2">
            {/* Cyclists — full width on mobile, tall left on lg */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:aspect-auto lg:row-span-2 lg:min-h-[380px]">
              <Image
                src="/images/rural-roads.png"
                alt="Grupo de ciclistas pedaleando en los caminos rurales de Carlos Keen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            {/* Station 1 */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="/images/carlos-keen-station.png"
                alt="Estación histórica de Carlos Keen con molino y vías del tren"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover object-center"
              />
            </div>
            {/* Station 2 */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src="/images/carlos-keen-feria.png"
                alt="Pueblo de Carlos Keen con galpón de ladrillos y feria artesanal"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
