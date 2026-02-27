"use client"

import { useState, useEffect } from "react"
import { Heart, Gauge, Wind, Thermometer, AlertTriangle, Phone } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { VitalCard } from "@/components/vital-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const vitals = [
  { title: "Heart Rate", unit: "BPM", icon: Heart, min: 40, max: 160, safeMin: 60, safeMax: 100 },
  { title: "Blood Pressure", unit: "mmHg", icon: Gauge, min: 70, max: 200, safeMin: 90, safeMax: 140 },
  { title: "Oxygen Level", unit: "%", icon: Wind, min: 85, max: 100, safeMin: 95, safeMax: 100 },
  { title: "Temperature", unit: "\u00B0F", icon: Thermometer, min: 95, max: 104, safeMin: 97, safeMax: 99, decimals: 1 },
]

export default function DashboardPage() {
  const [alertActive, setAlertActive] = useState(false)
  const [alertMessage, setAlertMessage] = useState("All vitals are within normal range.")

  useEffect(() => {
    const interval = setInterval(() => {
      const chance = Math.random()
      if (chance < 0.15) {
        setAlertActive(true)
        const alerts = [
          "Heart rate spike detected for Patient #1042",
          "Low oxygen saturation alert for Patient #2087",
          "Temperature anomaly detected for Patient #3015",
          "Blood pressure elevation for Patient #4091",
        ]
        setAlertMessage(alerts[Math.floor(Math.random() * alerts.length)])
      } else {
        setAlertActive(false)
        setAlertMessage("All vitals are within normal range.")
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col gap-6 p-6">
        {/* Alert Banner */}
        <div
          className={cn(
            "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-all",
            alertActive
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-success/30 bg-success/5 text-success"
          )}
        >
          <AlertTriangle className="size-4 shrink-0" />
          <span className="flex-1">{alertMessage}</span>
          {alertActive && (
            <Button size="sm" variant="destructive" className="shrink-0 gap-1.5 rounded-full text-xs">
              <Phone className="size-3" />
              Call Doctor
            </Button>
          )}
        </div>

        {/* Vital Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {vitals.map((v) => (
            <VitalCard key={v.title} {...v} />
          ))}
        </div>

        {/* Emergency Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="destructive"
            className="gap-2 rounded-full px-10 text-base shadow-lg"
            onClick={() => {
              setAlertActive(true)
              setAlertMessage("EMERGENCY ALERT: Manual emergency triggered! Contacting on-call physician...")
            }}
          >
            <AlertTriangle className="size-5" />
            Emergency SOS
          </Button>
        </div>

        {/* Chart Placeholders */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Heart Rate Trend (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <HeartRateChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Blood Pressure Trend (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BloodPressureChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

function HeartRateChart() {
  const [data] = useState(() => {
    const points: number[] = []
    for (let i = 0; i < 24; i++) {
      points.push(Math.floor(Math.random() * 30) + 65)
    }
    return points
  })
  const maxVal = Math.max(...data)
  const minVal = Math.min(...data)
  const range = maxVal - minVal || 1

  return (
    <div className="flex h-32 items-end gap-1">
      {data.map((val, i) => {
        const height = ((val - minVal) / range) * 100
        return (
          <div key={i} className="group relative flex-1">
            <div
              className="w-full rounded-t-sm bg-primary/25 transition-all hover:bg-primary/40"
              style={{ height: `${Math.max(height, 5)}%` }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
              {val}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function BloodPressureChart() {
  const [data] = useState(() => {
    const points: number[] = []
    for (let i = 0; i < 24; i++) {
      points.push(Math.floor(Math.random() * 40) + 100)
    }
    return points
  })
  const maxVal = Math.max(...data)
  const minVal = Math.min(...data)
  const range = maxVal - minVal || 1

  return (
    <div className="flex h-32 items-end gap-1">
      {data.map((val, i) => {
        const height = ((val - minVal) / range) * 100
        return (
          <div key={i} className="group relative flex-1">
            <div
              className="w-full rounded-t-sm bg-secondary/25 transition-all hover:bg-secondary/40"
              style={{ height: `${Math.max(height, 5)}%` }}
            />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] text-background opacity-0 transition-opacity group-hover:opacity-100">
              {val}
            </div>
          </div>
        )
      })}
    </div>
  )
}
