import {
  Activity,
  BrainCircuit,
  Stethoscope,
  FileBarChart,
  ShoppingBag,
  MessageCircle,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description:
      "Continuously track heart rate, blood pressure, oxygen saturation, and body temperature through IoT wearable sensors with sub-second latency.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: BrainCircuit,
    title: "AI Emergency Detection",
    description:
      "Machine learning models analyze vital patterns to predict and detect health emergencies before they become critical, reducing response time by 70%.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Stethoscope,
    title: "Doctor Connectivity",
    description:
      "Seamless communication between patients and healthcare providers through instant messaging, video calls, and automated alert routing.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: FileBarChart,
    title: "Health Reports",
    description:
      "Comprehensive health analytics with daily, weekly, and monthly reports. Exportable PDF summaries with trend analysis and doctor annotations.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: ShoppingBag,
    title: "Medical Store",
    description:
      "Integrated pharmacy with AI-recommended medications based on patient health data. Quick ordering with home delivery tracking.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    title: "AI Chatbot",
    description:
      "24/7 AI health assistant that answers patient queries, provides medication reminders, and offers preliminary health guidance.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
]

export default function FeaturesPage() {
  return (
    <DashboardLayout title="Features">
      <div className="p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              Platform Features
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need for comprehensive remote patient monitoring.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-border/60 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className={`flex size-12 items-center justify-center rounded-xl ${feature.bg}`}>
                    <feature.icon className={`size-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
