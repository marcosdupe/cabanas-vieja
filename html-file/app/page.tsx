import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { NpkwSection } from "@/components/npkw-section"
import { CabinsSection } from "@/components/cabins-section"
import { ExperienceSection } from "@/components/experience-section"
import { BookingSection } from "@/components/booking-section"
import { LocationSection } from "@/components/location-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <HeroSection />
      <NpkwSection />
      <CabinsSection />
      <ExperienceSection />
      <BookingSection />
      <LocationSection />
      <SiteFooter />
    </main>
  )
}
