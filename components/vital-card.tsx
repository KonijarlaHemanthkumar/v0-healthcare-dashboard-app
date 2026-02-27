"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface VitalCardProps {
  title: string
  unit: string
  icon: LucideIcon
  min: number
  max: number
  safeMin: number
  safeMax: number
  decimals?: number
}

function getRandomInRange(min: number, max: number, decimals: number) {
  const value = Math.random() * (max - min) + min
  return Number(value.toFixed(decimals))
}

export function VitalCard({ title, unit, icon: Icon, min, max, safeMin, safeMax, decimals = 0 }: VitalCardProps) {
  const [value, setValue] = useState(() => getRandomInRange(safeMin, safeMax, decimals))
  const [history, setHistory] = useState<number[]>(() => {
    const arr: number[] = []
    for (let i = 0; i < 20; i++) {
      arr.push(getRandomInRange(safeMin, safeMax, decimals))
    }
    return arr
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const emergencyChance = Math.random()
      let newValue: number
      if (emergencyChance < 0.05) {
        newValue = getRandomInRange(min, safeMin - 1, decimals)
      } else if (emergencyChance < 0.1) {
        newValue = getRandomInRange(safeMax + 1, max, decimals)
      } else {
        newValue = getRandomInRange(safeMin, safeMax, decimals)
      }
      setValue(newValue)
      setHistory((prev) => [...prev.slice(-19), newValue])
    }, 2000)
    return () => clearInterval(interval)
  }, [min, max, safeMin, safeMax, decimals])

  const isSafe = value >= safeMin && value <= safeMax
  const statusColor = isSafe ? "text-success" : "text-destructive"
  const statusBg = isSafe ? "bg-success/10" : "bg-destructive/10"
  const statusBorder = isSafe ? "border-success/20" : "border-destructive/20"
  const statusLabel = isSafe ? "Normal" : "Critical"

  // Mini sparkline
  const maxH = Math.max(...history)
  const minH = Math.min(...history)
  const range = maxH - minH || 1

  return (
    <Card className={cn("transition-all", statusBorder)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("flex size-8 items-center justify-center rounded-lg", statusBg)}>
          <Icon className={cn("size-4", statusColor)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className={cn("font-[family-name:var(--font-heading)] text-3xl font-bold", statusColor)}>
            {value}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <div className={cn("mt-1 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium", statusBg, statusColor)}>
          <span className={cn("size-1.5 rounded-full", isSafe ? "bg-success" : "bg-destructive")} />
          {statusLabel}
        </div>
        {/* Mini sparkline */}
        <div className="mt-4 flex h-10 items-end gap-0.5">
          {history.map((v, i) => {
            const height = ((v - minH) / range) * 100
            const barSafe = v >= safeMin && v <= safeMax
            return (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t-sm transition-all",
                  barSafe ? "bg-primary/20" : "bg-destructive/30"
                )}
                style={{ height: `${Math.max(height, 8)}%` }}
              />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
