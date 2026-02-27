"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Bell,
  AlarmClock,
  MapPin,
  Navigation,
  Wifi,
  Ambulance,
  Pill,
  Eye,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ============ ALERTS DATA ============ */
interface Alert {
  id: string
  patient: string
  type: string
  level: "normal" | "warning" | "critical"
  message: string
  time: string
  resolved: boolean
}

const initialAlerts: Alert[] = [
  {
    id: "ALT-001",
    patient: "Patient #1042",
    type: "Heart Rate",
    level: "critical",
    message: "Heart rate spiked to 152 BPM. Sustained tachycardia detected.",
    time: "2 min ago",
    resolved: false,
  },
  {
    id: "ALT-002",
    patient: "Patient #2087",
    type: "Oxygen Level",
    level: "critical",
    message: "SpO2 dropped to 89%. Hypoxemia alert triggered.",
    time: "8 min ago",
    resolved: false,
  },
  {
    id: "ALT-003",
    patient: "Patient #3015",
    type: "Temperature",
    level: "warning",
    message: "Body temperature elevated to 101.2\u00B0F. Fever monitoring initiated.",
    time: "15 min ago",
    resolved: false,
  },
  {
    id: "ALT-004",
    patient: "Patient #4091",
    type: "Blood Pressure",
    level: "warning",
    message: "Blood pressure reading 155/98 mmHg. Hypertension stage 2.",
    time: "22 min ago",
    resolved: false,
  },
  {
    id: "ALT-005",
    patient: "Patient #1012",
    type: "Heart Rate",
    level: "normal",
    message: "Heart rate stable at 72 BPM. Normal sinus rhythm.",
    time: "45 min ago",
    resolved: true,
  },
  {
    id: "ALT-006",
    patient: "Patient #5034",
    type: "Oxygen Level",
    level: "normal",
    message: "SpO2 level returned to 97%. Condition stabilized.",
    time: "1 hr ago",
    resolved: true,
  },
]

function levelConfig(level: string) {
  switch (level) {
    case "critical":
      return {
        color: "bg-[#dc2626]",
        badge: "bg-[#dc2626]/10 text-[#dc2626] border-[#dc2626]/20",
        border: "border-[#dc2626]/30",
        dot: "bg-[#dc2626]",
        label: "Critical",
      }
    case "warning":
      return {
        color: "bg-[#ea580c]",
        badge: "bg-[#ea580c]/10 text-[#ea580c] border-[#ea580c]/20",
        border: "border-[#ea580c]/30",
        dot: "bg-[#ea580c]",
        label: "Warning",
      }
    default:
      return {
        color: "bg-[#ca8a04]",
        badge: "bg-[#ca8a04]/10 text-[#ca8a04] border-[#ca8a04]/20",
        border: "border-[#ca8a04]/30",
        dot: "bg-[#ca8a04]",
        label: "Normal",
      }
  }
}

/* ============ ALARM DATA ============ */
interface MedicineAlarm {
  id: string
  name: string
  dosage: string
  timing: string
  nextDose: string
  status: "upcoming" | "taken" | "missed"
}

const medicineAlarms: MedicineAlarm[] = [
  { id: "MED-001", name: "Metformin", dosage: "500mg", timing: "8:00 AM, 8:00 PM", nextDose: "8:00 PM", status: "taken" },
  { id: "MED-002", name: "Amlodipine", dosage: "5mg", timing: "9:00 AM", nextDose: "Tomorrow 9:00 AM", status: "taken" },
  { id: "MED-003", name: "Atorvastatin", dosage: "10mg", timing: "9:00 PM", nextDose: "9:00 PM", status: "upcoming" },
  { id: "MED-004", name: "Aspirin", dosage: "75mg", timing: "After Lunch", nextDose: "12:30 PM", status: "missed" },
  { id: "MED-005", name: "Insulin Glargine", dosage: "10 units", timing: "10:00 PM", nextDose: "10:00 PM", status: "upcoming" },
  { id: "MED-006", name: "Losartan", dosage: "50mg", timing: "7:00 AM", nextDose: "Tomorrow 7:00 AM", status: "taken" },
]

/* ============ LOCATION DATA ============ */
const locationData = {
  live: { lat: "17.3850", lng: "78.4867", area: "Banjara Hills, Hyderabad", updated: "Just now", gpsActive: true },
  lastKnown: { lat: "17.3840", lng: "78.4872", area: "Road No. 12, Banjara Hills", updated: "5 min ago" },
}

/* ============ ALERTS FILTER ============ */
type AlertFilter = "all" | "normal" | "warning" | "critical"

export default function EmergencyAlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [alertFilter, setAlertFilter] = useState<AlertFilter>("all")
  const [ambulanceSent, setAmbulanceSent] = useState(false)

  const activeCount = alerts.filter((a) => !a.resolved).length
  const filteredAlerts = alertFilter === "all" ? alerts : alerts.filter((a) => a.level === alertFilter)

  function resolveAlert(id: string) {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolved: true } : a)))
  }

  return (
    <DashboardLayout title="Emergency">
      <div className="p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
                Emergency Center
              </h2>
              <p className="mt-1 text-muted-foreground">
                Manage alerts, medicine alarms, and patient location tracking.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#dc2626]/20 bg-[#dc2626]/5 px-4 py-2 text-sm">
              <Bell className="size-4 text-[#dc2626]" />
              <span className="font-medium text-[#dc2626]">{activeCount} Active Alerts</span>
            </div>
          </div>

          <Tabs defaultValue="alerts">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="alerts" className="gap-2">
                <AlertTriangle className="size-4" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="alarm" className="gap-2">
                <AlarmClock className="size-4" />
                Alarm
              </TabsTrigger>
              <TabsTrigger value="location" className="gap-2">
                <MapPin className="size-4" />
                Location
              </TabsTrigger>
            </TabsList>

            {/* ===== ALERTS TAB ===== */}
            <TabsContent value="alerts">
              {/* Color-coded filter buttons */}
              <div className="mb-4 flex flex-wrap gap-2">
                {(["all", "normal", "warning", "critical"] as AlertFilter[]).map((filter) => {
                  const labels: Record<AlertFilter, { label: string; color: string }> = {
                    all: { label: "All Alerts", color: "bg-primary text-primary-foreground" },
                    normal: { label: "Normal", color: "bg-[#ca8a04] text-white" },
                    warning: { label: "Warning", color: "bg-[#ea580c] text-white" },
                    critical: { label: "Critical", color: "bg-[#dc2626] text-white" },
                  }
                  const isActive = alertFilter === filter
                  return (
                    <button
                      key={filter}
                      onClick={() => setAlertFilter(filter)}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                        isActive
                          ? labels[filter].color
                          : "border border-border bg-card text-foreground hover:bg-accent"
                      )}
                    >
                      {labels[filter].label}
                      {filter !== "all" && (
                        <span className="ml-1.5">
                          ({alerts.filter((a) => a.level === filter).length})
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="flex flex-col gap-3">
                {filteredAlerts.map((alert) => {
                  const config = levelConfig(alert.level)
                  return (
                    <Card
                      key={alert.id}
                      className={cn(
                        "transition-all",
                        alert.resolved ? "opacity-50" : config.border
                      )}
                    >
                      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                          <div className="relative mt-1">
                            <div className={cn("size-3 rounded-full", config.dot)} />
                            {!alert.resolved && (
                              <div className={cn("absolute inset-0 animate-ping rounded-full opacity-75", config.dot)} />
                            )}
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-foreground">{alert.patient}</span>
                              <Badge variant="secondary" className={config.badge}>
                                {config.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">{alert.type}</Badge>
                              {alert.resolved && <Badge variant="outline" className="text-xs text-muted-foreground">Resolved</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground/70">
                              <Clock className="size-3" />
                              {alert.time}
                            </div>
                          </div>
                        </div>
                        {!alert.resolved && (
                          <Button size="sm" variant="outline" className="shrink-0 gap-1.5" onClick={() => resolveAlert(alert.id)}>
                            <CheckCircle className="size-3.5" />
                            Resolve
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
                {filteredAlerts.length === 0 && (
                  <Card>
                    <CardContent className="flex flex-col items-center gap-2 p-8 text-center">
                      <CheckCircle className="size-10 text-muted-foreground/40" />
                      <p className="text-muted-foreground">No alerts in this category.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* ===== ALARM TAB ===== */}
            <TabsContent value="alarm">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Medicine Timings</h3>
                <p className="text-sm text-muted-foreground">Track and manage medication schedules and alarms.</p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {medicineAlarms.map((med) => {
                  const statusColors = {
                    taken: { bg: "bg-secondary/10 border-secondary/20", icon: "text-secondary", label: "Taken" },
                    missed: { bg: "bg-[#dc2626]/10 border-[#dc2626]/20", icon: "text-[#dc2626]", label: "Missed" },
                    upcoming: { bg: "bg-[#ea580c]/10 border-[#ea580c]/20", icon: "text-[#ea580c]", label: "Upcoming" },
                  }
                  const sc = statusColors[med.status]

                  return (
                    <Card key={med.id} className={cn("border", sc.bg)}>
                      <CardContent className="flex items-center gap-4 p-4">
                        <div className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", sc.bg)}>
                          {med.status === "taken" ? (
                            <CheckCircle className={cn("size-5", sc.icon)} />
                          ) : med.status === "missed" ? (
                            <AlertTriangle className={cn("size-5", sc.icon)} />
                          ) : (
                            <AlarmClock className={cn("size-5", sc.icon)} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{med.name}</span>
                            <Badge variant="secondary" className="text-xs">{med.dosage}</Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" />
                            Schedule: {med.timing}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Pill className="size-3" />
                            Next dose: {med.nextDose}
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("shrink-0 text-xs", sc.bg, sc.icon)}>
                          {sc.label}
                        </Badge>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Card className="border-secondary/20 bg-secondary/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-secondary">{medicineAlarms.filter((m) => m.status === "taken").length}</p>
                    <p className="text-xs text-muted-foreground">Taken Today</p>
                  </CardContent>
                </Card>
                <Card className="border-[#ea580c]/20 bg-[#ea580c]/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-[#ea580c]">{medicineAlarms.filter((m) => m.status === "upcoming").length}</p>
                    <p className="text-xs text-muted-foreground">Upcoming</p>
                  </CardContent>
                </Card>
                <Card className="border-[#dc2626]/20 bg-[#dc2626]/5">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-[#dc2626]">{medicineAlarms.filter((m) => m.status === "missed").length}</p>
                    <p className="text-xs text-muted-foreground">Missed</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* ===== LOCATION TAB ===== */}
            <TabsContent value="location">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Map View */}
                <Card className="lg:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Eye className="size-4 text-primary" />
                      Map View
                    </CardTitle>
                    <CardDescription>Real-time patient location tracking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-64 overflow-hidden rounded-xl bg-muted">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                      {/* Grid lines */}
                      <div className="absolute inset-0 opacity-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={`h-${i}`} className="absolute h-px w-full bg-foreground" style={{ top: `${(i + 1) * 12.5}%` }} />
                        ))}
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={`v-${i}`} className="absolute h-full w-px bg-foreground" style={{ left: `${(i + 1) * 12.5}%` }} />
                        ))}
                      </div>
                      {/* Patient marker */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="absolute -inset-6 animate-ping rounded-full bg-[#dc2626]/20" />
                        <div className="absolute -inset-3 rounded-full bg-[#dc2626]/30" />
                        <div className="relative flex size-10 items-center justify-center rounded-full bg-[#dc2626] shadow-lg">
                          <MapPin className="size-5 text-white" />
                        </div>
                      </div>
                      {/* Labels */}
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-card/90 px-2.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                        <Wifi className="size-3 text-secondary" />
                        GPS Active
                      </div>
                      <div className="absolute bottom-3 left-3 rounded-md bg-card/90 px-2.5 py-1.5 text-xs font-medium text-foreground backdrop-blur-sm">
                        Banjara Hills, Hyderabad
                      </div>
                      <div className="absolute bottom-3 right-3 rounded-md bg-card/90 px-2.5 py-1.5 text-[10px] text-muted-foreground backdrop-blur-sm">
                        17.3850, 78.4867
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Live GPS Location */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Navigation className="size-4 text-secondary" />
                      Live GPS Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <span className="text-sm text-muted-foreground">Coordinates</span>
                      <span className="text-sm font-medium text-foreground">{locationData.live.lat}, {locationData.live.lng}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <span className="text-sm text-muted-foreground">Area</span>
                      <span className="text-sm font-medium text-foreground">{locationData.live.area}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <span className="text-sm text-muted-foreground">Updated</span>
                      <span className="text-sm font-medium text-foreground">{locationData.live.updated}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-secondary/10 p-3">
                      <span className="text-sm text-secondary">GPS Status</span>
                      <Badge className="bg-secondary text-secondary-foreground">Active</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Last Known Location */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="size-4 text-primary" />
                      Last Known Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <span className="text-sm text-muted-foreground">Coordinates</span>
                      <span className="text-sm font-medium text-foreground">{locationData.lastKnown.lat}, {locationData.lastKnown.lng}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <span className="text-sm text-muted-foreground">Area</span>
                      <span className="text-sm font-medium text-foreground">{locationData.lastKnown.area}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                      <span className="text-sm text-muted-foreground">Recorded At</span>
                      <span className="text-sm font-medium text-foreground">{locationData.lastKnown.updated}</span>
                    </div>
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-sm text-primary">
                      Patient is at registered home address
                    </div>
                  </CardContent>
                </Card>

                {/* Send Ambulance */}
                <Card className="lg:col-span-2">
                  <CardContent className="p-5">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-[#dc2626]/10">
                          <Ambulance className="size-6 text-[#dc2626]" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Send Ambulance Automatically</p>
                          <p className="text-sm text-muted-foreground">
                            Dispatch an ambulance to the patient&apos;s live GPS location immediately.
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setAmbulanceSent(true)}
                        disabled={ambulanceSent}
                        className={cn(
                          "gap-2 rounded-full px-6",
                          ambulanceSent
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-[#dc2626] text-white hover:bg-[#b91c1c]"
                        )}
                      >
                        {ambulanceSent ? (
                          <>
                            <CheckCircle className="size-4" />
                            Ambulance Dispatched
                          </>
                        ) : (
                          <>
                            <Send className="size-4" />
                            Send Ambulance
                          </>
                        )}
                      </Button>
                    </div>
                    {ambulanceSent && (
                      <div className="mt-3 rounded-lg border border-secondary/20 bg-secondary/5 p-3 text-center text-sm text-secondary">
                        Ambulance dispatched to Banjara Hills, Hyderabad. ETA: ~8 minutes.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
