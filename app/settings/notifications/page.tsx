"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BellRing, Volume2, Check, Play, AlertTriangle, Pill, Heart, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NotificationTone {
  id: string
  name: string
  description: string
  category: "alert" | "reminder" | "message" | "general"
}

const tones: NotificationTone[] = [
  { id: "tone-1", name: "Gentle Chime", description: "Soft bell chime, ideal for reminders", category: "reminder" },
  { id: "tone-2", name: "Urgent Pulse", description: "Rapid beeping for critical alerts", category: "alert" },
  { id: "tone-3", name: "Medical Alert", description: "Standard hospital-style alert tone", category: "alert" },
  { id: "tone-4", name: "Soft Ping", description: "Minimal notification ping", category: "general" },
  { id: "tone-5", name: "Echo Bell", description: "Echoing bell suitable for messages", category: "message" },
  { id: "tone-6", name: "Heart Beat", description: "Rhythmic heartbeat-style alert", category: "alert" },
  { id: "tone-7", name: "Calm Wave", description: "Gentle wave sound for medicine reminders", category: "reminder" },
  { id: "tone-8", name: "Quick Beep", description: "Short double beep for general notifications", category: "general" },
  { id: "tone-9", name: "Melodic Rise", description: "Rising melody for incoming messages", category: "message" },
  { id: "tone-10", name: "Emergency Siren", description: "High-priority emergency siren tone", category: "alert" },
]

const categoryConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  alert: { label: "Alert", icon: AlertTriangle, color: "text-[#dc2626] bg-[#dc2626]/10" },
  reminder: { label: "Reminder", icon: Pill, color: "text-[#ea580c] bg-[#ea580c]/10" },
  message: { label: "Message", icon: MessageCircle, color: "text-primary bg-primary/10" },
  general: { label: "General", icon: BellRing, color: "text-secondary bg-secondary/10" },
}

export default function NotificationSettingsPage() {
  const [selectedTones, setSelectedTones] = useState<Record<string, string>>({
    alert: "tone-2",
    reminder: "tone-1",
    message: "tone-5",
    general: "tone-4",
  })
  const [playing, setPlaying] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  function playTone(id: string) {
    setPlaying(id)
    setTimeout(() => setPlaying(null), 1500)
  }

  function selectTone(category: string, toneId: string) {
    setSelectedTones((prev) => ({ ...prev, [category]: toneId }))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const categories = ["alert", "reminder", "message", "general"] as const

  return (
    <DashboardLayout title="Notification Sounds">
      <div className="p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              Notification Sounds
            </h2>
            <p className="mt-1 text-muted-foreground">
              Choose different tones for each notification category.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {categories.map((category) => {
              const config = categoryConfig[category]
              const CategoryIcon = config.icon
              const categoryTones = tones.filter((t) => t.category === category)

              return (
                <Card key={category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <CategoryIcon className={cn("size-4", config.color.split(" ")[0])} />
                      {config.label} Tones
                    </CardTitle>
                    <CardDescription>
                      Select a tone for {config.label.toLowerCase()} notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {categoryTones.map((tone) => {
                        const isSelected = selectedTones[category] === tone.id
                        const isPlaying = playing === tone.id

                        return (
                          <button
                            key={tone.id}
                            onClick={() => selectTone(category, tone.id)}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all",
                              isSelected
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/30"
                            )}
                          >
                            <div className={cn(
                              "flex size-9 shrink-0 items-center justify-center rounded-lg",
                              config.color
                            )}>
                              <Volume2 className="size-4" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-foreground">{tone.name}</p>
                              <p className="text-xs text-muted-foreground">{tone.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  playTone(tone.id)
                                }}
                                className={cn(
                                  "flex size-8 items-center justify-center rounded-full border transition-all",
                                  isPlaying
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                                )}
                                aria-label={`Preview ${tone.name}`}
                              >
                                <Play className="size-3.5" />
                              </button>
                              {isSelected && (
                                <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                                  <Check className="size-3.5 text-primary-foreground" />
                                </div>
                              )}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {/* Current Selection Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Current Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {categories.map((cat) => {
                    const config = categoryConfig[cat]
                    const tone = tones.find((t) => t.id === selectedTones[cat])
                    return (
                      <div key={cat} className="rounded-xl border border-border p-3 text-center">
                        <Badge variant="secondary" className={cn("mb-2 text-[10px]", config.color)}>
                          {config.label}
                        </Badge>
                        <p className="text-xs font-medium text-foreground">{tone?.name || "None"}</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full gap-2">
              {saved ? (
                <>
                  <Check className="size-4" />
                  Settings Saved
                </>
              ) : (
                "Save Notification Settings"
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
