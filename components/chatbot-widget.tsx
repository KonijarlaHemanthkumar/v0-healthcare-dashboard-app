"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "bot"
  text: string
}

const patientData = {
  name: "Patient #1042",
  age: 62,
  condition: "Hypertension Stage 2, Type-2 Diabetes",
  riskScore: 7.4,
  lastReadings: [
    { time: "10:00 AM", hr: 82, bp: "130/85", spo2: 97, temp: 98.4 },
    { time: "09:30 AM", hr: 78, bp: "128/82", spo2: 98, temp: 98.2 },
    { time: "09:00 AM", hr: 85, bp: "135/88", spo2: 96, temp: 98.6 },
    { time: "08:30 AM", hr: 90, bp: "140/92", spo2: 95, temp: 98.8 },
    { time: "08:00 AM", hr: 88, bp: "138/90", spo2: 96, temp: 98.5 },
    { time: "07:30 AM", hr: 76, bp: "125/80", spo2: 98, temp: 98.1 },
    { time: "07:00 AM", hr: 72, bp: "122/78", spo2: 99, temp: 97.9 },
    { time: "06:30 AM", hr: 70, bp: "120/76", spo2: 99, temp: 97.8 },
    { time: "06:00 AM", hr: 68, bp: "118/75", spo2: 99, temp: 97.6 },
    { time: "05:30 AM", hr: 65, bp: "115/72", spo2: 99, temp: 97.5 },
  ],
  medicines: [
    { name: "Metformin 500mg", timing: "8:00 AM, 8:00 PM", status: "Active" },
    { name: "Amlodipine 5mg", timing: "9:00 AM", status: "Active" },
    { name: "Atorvastatin 10mg", timing: "9:00 PM", status: "Active" },
    { name: "Aspirin 75mg", timing: "After lunch", status: "Paused" },
  ],
  location: { lat: "17.3850", lng: "78.4867", area: "Banjara Hills, Hyderabad" },
}

const quickActions = [
  "Show patient health condition",
  "Show last 10 health readings",
  "Show risk score",
  "Show medicine history",
  "Show live location",
]

function generateResponse(query: string): string {
  const q = query.toLowerCase()

  if (q.includes("health condition") || q.includes("health status")) {
    return `**Patient Health Condition**\n\nPatient: ${patientData.name}\nAge: ${patientData.age}\nCondition: ${patientData.condition}\nRisk Score: ${patientData.riskScore}/10\n\nCurrent vitals are within monitored range. Blood pressure trending slightly high. Continuous monitoring active.`
  }

  if (q.includes("last 10") || q.includes("readings") || q.includes("health reading")) {
    let response = "**Last 10 Health Readings**\n\n"
    response += "Time | HR | BP | SpO2 | Temp\n"
    response += "--- | --- | --- | --- | ---\n"
    patientData.lastReadings.forEach((r) => {
      response += `${r.time} | ${r.hr} bpm | ${r.bp} | ${r.spo2}% | ${r.temp}F\n`
    })
    return response
  }

  if (q.includes("risk score") || q.includes("risk")) {
    const score = patientData.riskScore
    const level = score >= 7 ? "HIGH" : score >= 4 ? "MODERATE" : "LOW"
    return `**Patient Risk Score**\n\nCurrent Risk Score: ${score}/10\nRisk Level: ${level}\n\nFactors:\n- Hypertension Stage 2 (+2.5)\n- Type-2 Diabetes (+2.0)\n- Age 62 (+1.5)\n- Elevated BP trend (+1.4)\n\nRecommendation: Continue monitoring. Alert threshold set to 8.0.`
  }

  if (q.includes("medicine") || q.includes("medication")) {
    let response = "**Medicine History**\n\n"
    patientData.medicines.forEach((m) => {
      response += `- **${m.name}** -- ${m.timing} (${m.status})\n`
    })
    response += "\nLast medication taken: Metformin 500mg at 8:00 AM today."
    return response
  }

  if (q.includes("location") || q.includes("live location") || q.includes("gps")) {
    return `**Live Location**\n\nArea: ${patientData.location.area}\nCoordinates: ${patientData.location.lat}, ${patientData.location.lng}\nStatus: GPS Active\nLast Updated: Just now\n\nThe patient is currently at their registered home address.`
  }

  return `I can help you with the following information:\n\n- Patient health condition\n- Last 10 health readings\n- Risk score analysis\n- Medicine history\n- Live location tracking\n\nPlease select a quick action or type your question.`
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hello! I'm your RPM Assistant. I can show you patient health data, readings, risk scores, medicine history, and live location. How can I help?",
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  function handleSend(text?: string) {
    const query = text || input
    if (!query.trim()) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: query,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")

    setTimeout(() => {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        text: generateResponse(query),
      }
      setMessages((prev) => [...prev, botMsg])
    }, 500)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="size-6" />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/20">
                <Bot className="size-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">RPM Assistant</p>
                <p className="text-[11px] text-primary-foreground/70">Online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/20 hover:text-primary-foreground"
              aria-label="Close chat"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="flex flex-col gap-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-2",
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full",
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="size-4" />
                    ) : (
                      <Bot className="size-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[280px] rounded-xl px-3 py-2 text-[13px] leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    {msg.text.split("\n").map((line, i) => {
                      const boldMatch = line.match(/^\*\*(.+)\*\*$/)
                      if (boldMatch) {
                        return (
                          <p key={i} className="mb-1 font-semibold">
                            {boldMatch[1]}
                          </p>
                        )
                      }
                      if (line.startsWith("- **")) {
                        const parts = line.replace("- **", "").split("**")
                        return (
                          <p key={i} className="ml-2">
                            <span className="font-medium">{parts[0]}</span>
                            {parts[1]}
                          </p>
                        )
                      }
                      if (line.startsWith("- ")) {
                        return (
                          <p key={i} className="ml-2">
                            {line}
                          </p>
                        )
                      }
                      if (line.startsWith("---")) return null
                      if (line.trim() === "") return <br key={i} />
                      return <p key={i}>{line}</p>
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-1.5 overflow-x-auto border-t border-border bg-muted/30 px-3 py-2">
            {quickActions.map((action) => (
              <button
                key={action}
                onClick={() => handleSend(action)}
                className="shrink-0 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors hover:bg-accent"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border bg-card px-3 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="size-9 shrink-0 rounded-lg"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
