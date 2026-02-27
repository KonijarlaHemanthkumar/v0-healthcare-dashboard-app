"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface DataPoint {
  time: string
  value: number
  timestamp: number
}

interface LiveVitalChartProps {
  title: string
  unit: string
  icon: LucideIcon
  min: number
  max: number
  safeMin: number
  safeMax: number
  decimals?: number
  color: string
  gradientId: string
  intervalMs?: number
  maxPoints?: number
}

function getRandomInRange(min: number, max: number, decimals: number) {
  const value = Math.random() * (max - min) + min
  return Number(value.toFixed(decimals))
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

export function LiveVitalChart({
  title,
  unit,
  icon: Icon,
  min,
  max,
  safeMin,
  safeMax,
  decimals = 0,
  color,
  gradientId,
  intervalMs = 2000,
  maxPoints = 30,
}: LiveVitalChartProps) {
  const [data, setData] = useState<DataPoint[]>(() => {
    const now = Date.now()
    const points: DataPoint[] = []
    for (let i = maxPoints - 1; i >= 0; i--) {
      const time = new Date(now - i * intervalMs)
      points.push({
        time: formatTime(time),
        value: getRandomInRange(safeMin, safeMax, decimals),
        timestamp: time.getTime(),
      })
    }
    return points
  })

  const [currentValue, setCurrentValue] = useState<number>(
    () => data[data.length - 1]?.value ?? getRandomInRange(safeMin, safeMax, decimals)
  )
  const [isLive, setIsLive] = useState(true)
  const prevValueRef = useRef(currentValue)

  const generateValue = useCallback(() => {
    const emergencyChance = Math.random()
    if (emergencyChance < 0.04) {
      return getRandomInRange(min, safeMin - 1, decimals)
    } else if (emergencyChance < 0.08) {
      return getRandomInRange(safeMax + 1, max, decimals)
    }
    // Slight drift from previous value for realistic movement
    const prev = prevValueRef.current
    const drift = (Math.random() - 0.5) * (safeMax - safeMin) * 0.3
    const next = Math.max(min, Math.min(max, prev + drift))
    return Number(next.toFixed(decimals))
  }, [min, max, safeMin, safeMax, decimals])

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => {
      const now = new Date()
      const newValue = generateValue()
      prevValueRef.current = newValue
      setCurrentValue(newValue)
      setData((prev) => {
        const next = [
          ...prev.slice(-(maxPoints - 1)),
          {
            time: formatTime(now),
            value: newValue,
            timestamp: now.getTime(),
          },
        ]
        return next
      })
    }, intervalMs)
    return () => clearInterval(interval)
  }, [isLive, generateValue, intervalMs, maxPoints])

  const isSafe = currentValue >= safeMin && currentValue <= safeMax
  const statusColor = isSafe ? "text-success" : "text-destructive"
  const statusLabel = isSafe ? "Normal" : "Critical"

  // Compute Y-axis domain with padding
  const yMin = Math.min(min, ...data.map((d) => d.value)) - 2
  const yMax = Math.max(max, ...data.map((d) => d.value)) + 2

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="flex size-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="size-4" style={{ color }} />
          </div>
          <div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <p className="text-xs text-muted-foreground">Real-time monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "gap-1.5 text-xs font-medium",
              isSafe
                ? "border-success/30 bg-success/5 text-success"
                : "border-destructive/30 bg-destructive/5 text-destructive"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isSafe ? "bg-success animate-pulse" : "bg-destructive animate-pulse"
              )}
            />
            {statusLabel}
          </Badge>
          <button
            onClick={() => setIsLive((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors",
              isLive
                ? "bg-success/10 text-success"
                : "bg-muted text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                isLive ? "bg-success animate-pulse" : "bg-muted-foreground"
              )}
            />
            {isLive ? "Live" : "Paused"}
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {/* Current Value */}
        <div className="mb-3 flex items-baseline gap-2">
          <span
            className={cn(
              "font-[family-name:var(--font-heading)] text-3xl font-bold tabular-nums",
              statusColor
            )}
          >
            {currentValue}
          </span>
          <span className="text-sm text-muted-foreground">{unit}</span>
          <span className="ml-auto text-xs text-muted-foreground">
            Safe: {safeMin}-{safeMax} {unit}
          </span>
        </div>

        {/* Chart */}
        <ChartContainer
          config={{
            value: {
              label: title,
              color: color,
            },
          }}
          className="h-[200px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--border)"
                strokeOpacity={0.5}
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                minTickGap={40}
              />
              <YAxis
                domain={[yMin, yMax]}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <ReferenceLine
                y={safeMax}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeOpacity={0.4}
                label={{
                  value: `High (${safeMax})`,
                  position: "right",
                  style: { fontSize: 9, fill: "#ef4444" },
                }}
              />
              <ReferenceLine
                y={safeMin}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeOpacity={0.4}
                label={{
                  value: `Low (${safeMin})`,
                  position: "right",
                  style: { fontSize: 9, fill: "#ef4444" },
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => (
                      <span className="font-mono font-bold">
                        {value} {unit}
                      </span>
                    )}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: color,
                  stroke: "var(--background)",
                  strokeWidth: 2,
                }}
                isAnimationActive={true}
                animationDuration={300}
                animationEasing="ease-in-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
