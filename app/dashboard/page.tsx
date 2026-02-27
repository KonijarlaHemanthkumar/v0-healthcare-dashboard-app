"use client"

import { useState, useEffect } from "react"
import { Heart, Gauge, Wind, Thermometer, AlertTriangle, Phone, Activity } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LiveVitalChart } from "@/components/live-vital-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const vitalCharts = [
  {
    title: "Heart Rate",
    unit: "BPM",
    icon: Heart,
    min: 40,
    max: 160,
    safeMin: 60,
    safeMax: 100,
    color: "#e74c3c",
    gradientId: "heartGrad",
  },
  {
    title: "Blood Pressure",
    unit: "mmHg",
    icon: Gauge,
    min: 70,
    max: 200,
    safeMin: 90,
    safeMax: 140,
    color: "#2980b9",
    gradientId: "bpGrad",
  },
  {
    title: "Oxygen Level",
    unit: "%",
    icon: Wind,
    min: 85,
    max: 100,
    safeMin: 95,
    safeMax: 100,
    color: "#27ae60",
    gradientId: "spo2Grad",
  },
  {
    title: "Temperature",
    unit: "\u00B0F",
    icon: Thermometer,
    min: 95,
    max: 104,
    safeMin: 97,
    safeMax: 99,
    decimals: 1,
    color: "#e67e22",
    gradientId: "tempGrad",
  },
]

export default function DashboardPage() {
  const [alertActive, setAlertActive] = useState(false)
  const [alertMessage, setAlertMessage] = useState("All vitals are within normal range.")
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    }
    updateTime()
    const tick = setInterval(updateTime, 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const chance = Math.random()
      if (chance < 0.12) {
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
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <DashboardLayout title="Dashboard">
      <div className="flex flex-col gap-6 p-6">
        {/* Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <Activity className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                Live Vital Signs Monitor
              </h2>
              <p className="text-xs text-muted-foreground">
                Continuous real-time data from IoT sensors
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Badge
              variant="outline"
              className="gap-1.5 border-success/30 bg-success/5 text-success"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-success" />
              Sensors Online
            </Badge>
            <span className="rounded-lg bg-muted px-3 py-1.5 font-mono text-xs font-medium tabular-nums text-muted-foreground">
              {currentTime}
            </span>
          </div>
        </div>

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
            <Button
              size="sm"
              variant="destructive"
              className="shrink-0 gap-1.5 rounded-full text-xs"
            >
              <Phone className="size-3" />
              Call Doctor
            </Button>
          )}
        </div>

        {/* Live Charts Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {vitalCharts.map((chart) => (
            <LiveVitalChart key={chart.title} {...chart} />
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
              setAlertMessage(
                "EMERGENCY ALERT: Manual emergency triggered! Contacting on-call physician..."
              )
            }}
          >
            <AlertTriangle className="size-5" />
            Emergency SOS
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <SummaryCard
            label="Avg Heart Rate"
            value="78 BPM"
            trend="stable"
            color="#e74c3c"
          />
          <SummaryCard
            label="Avg Blood Pressure"
            value="118 mmHg"
            trend="up"
            color="#2980b9"
          />
          <SummaryCard
            label="Avg SpO2"
            value="97.2%"
            trend="stable"
            color="#27ae60"
          />
          <SummaryCard
            label="Avg Temperature"
            value="98.4\u00B0F"
            trend="down"
            color="#e67e22"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

function SummaryCard({
  label,
  value,
  trend,
  color,
}: {
  label: string
  value: string
  trend: "up" | "down" | "stable"
  color: string
}) {
  const trendIcon =
    trend === "up" ? "\u2191" : trend === "down" ? "\u2193" : "\u2192"
  const trendColor =
    trend === "up"
      ? "text-destructive"
      : trend === "down"
        ? "text-success"
        : "text-muted-foreground"

  return (
    <Card>
      <CardContent className="flex items-center gap-3 py-4">
        <div
          className="size-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
            {value}
          </p>
        </div>
        <span className={cn("text-sm font-medium", trendColor)}>
          {trendIcon}
        </span>
      </CardContent>
    </Card>
  )
}
