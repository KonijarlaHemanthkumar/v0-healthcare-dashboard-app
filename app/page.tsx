import { DashboardLayout } from "@/components/dashboard-layout"
import { HomeHero } from "@/components/home-hero"
import { HowItWorks } from "@/components/how-it-works"

export default function HomePage() {
  return (
    <DashboardLayout title="Home">
      <HomeHero />
      <HowItWorks />
    </DashboardLayout>
  )
}
