"use client"

import { useMemo, useState } from "react"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5491131963906"
const PRICE_PER_CABIN = 150000

const CABIN_OPTIONS = [
  { value: "Cabaña Aromo", label: "Cabaña Aromo (Hasta 3 Personas)", cabins: 1 },
  { value: "Cabaña Ceibo", label: "Cabaña Ceibo (Hasta 3 Personas)", cabins: 1 },
  { value: "Completo (Ambas)", label: "Ambas Cabañas (Grupos hasta 6 Personas)", cabins: 2 },
]

const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n)

export function BookingSection() {
  const [form, setForm] = useState({
    cabin: "Cabaña Aromo",
    checkin: "",
    checkout: "",
    guests: "2",
    name: "",
    phone: "",
    email: "",
    message: "",
  })
  const [error, setError] = useState("")

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    setError("")
  }

  const { nights, total, cabinsCount } = useMemo(() => {
    const cabins = CABIN_OPTIONS.find((c) => c.value === form.cabin)?.cabins ?? 1
    if (!form.checkin || !form.checkout) return { nights: 0, total: 0, cabinsCount: cabins }
    const inDate = new Date(form.checkin)
    const outDate = new Date(form.checkout)
    const diff = Math.round((outDate.getTime() - inDate.getTime()) / 86_400_000)
    const n = diff > 0 ? diff : 0
    return { nights: n, total: n * PRICE_PER_CABIN * cabins, cabinsCount: cabins }
  }, [form.cabin, form.checkin, form.checkout])

  const validate = () => {
    if (!form.name.trim()) return "Por favor ingresá tu nombre completo."
    if (!form.phone.trim()) return "Por favor ingresá un teléfono de contacto."
    if (!form.checkin || !form.checkout) return "Seleccioná las fechas de entrada y salida."
    if (nights <= 0) return "La fecha de salida debe ser posterior a la de entrada."
    return ""
  }

  const buildMessage = () => {
    const lines = [
      "¡Hola! Quiero consultar disponibilidad en Cabañas Only Bikers.",
      "",
      `🏡 Cabaña: ${form.cabin}`,
      `📅 Entrada: ${form.checkin}`,
      `📅 Salida: ${form.checkout}`,
      `🌙 Noches: ${nights}`,
      `👥 Huéspedes: ${form.guests}`,
      `💰 Estimado: ${formatARS(total)}`,
      "",
      `👤 Nombre: ${form.name}`,
      `📞 Teléfono: ${form.phone}`,
    ]
    if (form.email.trim()) lines.push(`✉️ Email: ${form.email}`)
    if (form.message.trim()) lines.push("", `📝 Mensaje: ${form.message}`)
    return lines.join("\n")
  }

  const sendWhatsApp = () => {
    const err = validate()
    if (err) {
      setError(err)
      return
    }
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`
    if (window.self !== window.top) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = url
    }
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
  const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"

  return (
    <section id="cotizador" className="bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            Cotizador Online
          </span>
          <h2 className="mt-4 font-heading text-4xl font-semibold text-balance md:text-5xl">
            Consultá Disponibilidad
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Calculá el costo estimado y envianos tu consulta directa. Te responderemos al instante por
            WhatsApp.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="cabin" className={labelClass}>Cabaña a Reservar</label>
              <select id="cabin" className={inputClass} value={form.cabin} onChange={(e) => update("cabin", e.target.value)}>
                {CABIN_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="checkin" className={labelClass}>Fecha de Entrada</label>
              <input id="checkin" type="date" className={inputClass} value={form.checkin} onChange={(e) => update("checkin", e.target.value)} />
            </div>
            <div>
              <label htmlFor="checkout" className={labelClass}>Fecha de Salida</label>
              <input id="checkout" type="date" className={inputClass} value={form.checkout} onChange={(e) => update("checkout", e.target.value)} />
            </div>
            <div>
              <label htmlFor="guests" className={labelClass}>Huéspedes</label>
              <select id="guests" className={inputClass} value={form.guests} onChange={(e) => update("guests", e.target.value)}>
                <option value="1">1 Huésped</option>
                <option value="2">2 Huéspedes</option>
                <option value="3">3 Huéspedes</option>
                <option value="4">4 Huéspedes (Requiere ambas cabañas)</option>
                <option value="5">5 Huéspedes (Requiere ambas cabañas)</option>
                <option value="6">6 Huéspedes (Requiere ambas cabañas)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tarifa por Cabaña / Noche</label>
              <div className="flex h-[42px] items-center rounded-lg border border-dashed border-border bg-muted px-3.5 text-sm font-semibold text-foreground">
                {formatARS(PRICE_PER_CABIN)}
              </div>
            </div>
          </div>

          {/* Live summary */}
          <div className="mt-6 rounded-2xl bg-primary/5 p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {nights} {nights === 1 ? "noche" : "noches"}
                {cabinsCount > 1 ? " · 2 cabañas" : ""}
              </span>
              <span>{formatARS(nights * PRICE_PER_CABIN * cabinsCount)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-primary/15 pt-3">
              <span className="font-semibold text-foreground">Estimado Total</span>
              <span className="font-heading text-2xl font-semibold text-primary">{formatARS(total)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              *Tarifa por cabaña / noche para hasta 3 personas. Incluye early check-in (sábado 8 AM) y late check-out (domingo 20 PM). Puede variar en feriados.
            </p>
          </div>

          <div className="my-7 h-px bg-border" />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>Nombre Completo</label>
              <input id="name" type="text" className={inputClass} placeholder="Ej: Marcos Pérez" value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div>
              <label htmlFor="phone" className={labelClass}>Teléfono de Contacto</label>
              <input id="phone" type="tel" className={inputClass} placeholder="Ej: 11 3196 3906" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className={labelClass}>Correo Electrónico (Opcional)</label>
              <input id="email" type="email" className={inputClass} placeholder="Ej: marcos@correo.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelClass}>Mensaje o Pedido Especial</label>
              <textarea id="message" rows={3} className={inputClass} placeholder="Contanos si venís con tu bicicleta, si requerís algún ajuste horario o tenés restricciones dietarias para el desayuno." value={form.message} onChange={(e) => update("message", e.target.value)} />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={sendWhatsApp}
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-4 text-base font-semibold text-accent-foreground transition-transform hover:scale-[1.01]"
          >
            <MessageCircle size={20} />
            Enviar Consulta por WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
