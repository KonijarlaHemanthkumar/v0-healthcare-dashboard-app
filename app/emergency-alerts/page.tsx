"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, Clock, Bell, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  patient: string
  type: string
  severity: "critical" | "warning" | "info"
  message: string
  time: string
  resolved: boolean
}

const initialAlerts: Alert[] = [
  {
    id: "ALT-001",
    patient: "Patient #1042",
    type: "Heart Rate",
    severity: "critical",
    message: "Heart rate spiked to 152 BPM. Sustained tachycardia detected.",
    time: "2 min ago",
    resolved: false,
  },
  {
    id: "ALT-002",
    patient: "Patient #2087",
    type: "Oxygen Level",
    severity: "critical",
    message: "SpO2 dropped to 89%. Hypoxemia alert triggered.",
    time: "8 min ago",
    resolved: false,
  },
  {
    id: "ALT-003",
    patient: "Patient #3015",
    type: "Temperature",
    severity: "warning",
    message: "Body temperature elevated to 101.2\u00B0F. Fever monitoring initiated.",
    time: "15 min ago",
    resolved: false,
  },
  {
    id: "ALT-004",
    patient: "Patient #4091",
    type: "Blood Pressure",
    severity: "warning",
    message: "Blood pressure reading 155/98 mmHg. Hypertension stage 2.",
    time: "22 min ago",
    resolved: true,
  },
  {
    id: "ALT-005",
    patient: "Patient #1012",
    type: "Heart Rate",
    severity: "info",
    message: "Irregular heartbeat pattern detected. Monitoring continues.",
    time: "45 min ago",
    resolved: true,
  },
  {
    id: "ALT-006",
    patient: "Patient #5034",
    type: "Oxygen Level",
    severity: "critical",
    message: "SpO2 fluctuating between 88-92%. Immediate attention needed.",
    time: "1 hr ago",
    resolved: true,
  },
]

function severityConfig(severity: string) {
  switch (severity) {
    case "critical":
      return {
        badge: "bg-destructive/10 text-destructive border-destructive/20",
        border: "border-destructive/20",
        icon: "text-destructive",
      }
    case "warning":
      return {
        badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
        border: "border-amber-500/20",
        icon: "text-amber-600",
      }
    default:
      return {
        badge: "bg-primary/10 text-primary border-primary/20",
        border: "border-primary/20",
        icon: "text-primary",
      }
  }
}

export default function EmergencyAlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    setActiveCount(alerts.filter((a) => !a.resolved).length)
  }, [alerts])

  function resolveAlert(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, resolved: true } : a))
    )
  }

  return (
    <DashboardLayout title="Emergency Alerts">
      <div className="p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
                Emergency Alerts
              </h2>
              <p className="mt-1 text-muted-foreground">
                Real-time emergency notifications from patient monitoring.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-destructive/20 bg-destructive/5 px-4 py-2 text-sm">
                <Bell className="size-4 text-destructive" />
                <span className="font-medium text-destructive">{activeCount} Active</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {alerts.map((alert) => {
              const config = severityConfig(alert.severity)
              return (
                <Card
                  key={alert.id}
                  className={cn(
                    "transition-all",
                    alert.resolved ? "opacity-60 border-border/40" : config.border
                  )}
                >
                  <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div className={cn("mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg", alert.resolved ? "bg-muted" : `bg-${alert.severity === "critical" ? "destructive" : alert.severity === "warning" ? "amber-500" : "primary"}/10`)}>
                        {alert.resolved ? (
                          <CheckCircle className="size-5 text-muted-foreground" />
                        ) : (
                          <AlertTriangle className={cn("size-5", config.icon)} />
                        )}
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-foreground">{alert.patient}</span>
                          <Badge variant="secondary" className={config.badge}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70">
                          <Clock className="size-3" />
                          {alert.time}
                        </div>
                      </div>
                    </div>
                    {!alert.resolved && (
                      <div className="flex shrink-0 gap-2 sm:ml-4">
                        <Button size="sm" variant="outline" className="gap-1.5" onClick={() => resolveAlert(alert.id)}>
                          <CheckCircle className="size-3.5" />
                          Resolve
                        </Button>
                        <Button size="sm" className="gap-1.5">
                          <Phone className="size-3.5" />
                          Call Doctor
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
