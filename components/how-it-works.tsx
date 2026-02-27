import { Cpu, BrainCircuit, ShieldAlert, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Cpu,
    title: "IoT Sensors",
    description: "Wearable IoT sensors continuously collect heart rate, blood pressure, SpO2, and temperature data from patients.",
    step: "01",
  },
  {
    icon: BrainCircuit,
    title: "AI Monitoring",
    description: "Our AI engine analyzes incoming data streams in real-time, learning each patient's baseline and detecting anomalies.",
    step: "02",
  },
  {
    icon: ShieldAlert,
    title: "Emergency Detection",
    description: "When critical thresholds are breached, the system immediately classifies the severity and triggers emergency protocols.",
    step: "03",
  },
  {
    icon: Phone,
    title: "Doctor Alert",
    description: "Assigned doctors receive instant notifications with patient context, enabling rapid clinical decision-making.",
    step: "04",
  },
]

export function HowItWorks() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            From data collection to doctor response, our end-to-end pipeline ensures patient safety around the clock.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="group relative overflow-hidden border-border/60 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardContent className="flex flex-col items-start gap-4 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="size-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-muted-foreground/40">STEP {step.step}</span>
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-muted-foreground/20 lg:block">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
