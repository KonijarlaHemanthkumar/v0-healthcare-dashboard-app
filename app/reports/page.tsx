"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, FileBarChart, TrendingUp, TrendingDown, Minus } from "lucide-react"

const reports = [
  {
    id: "RPT-001",
    date: "Feb 25, 2026",
    type: "Weekly Summary",
    status: "Normal",
    heartAvg: 74,
    bpAvg: "118/76",
    spo2Avg: 97.5,
    trend: "stable",
  },
  {
    id: "RPT-002",
    date: "Feb 18, 2026",
    type: "Weekly Summary",
    status: "Warning",
    heartAvg: 88,
    bpAvg: "135/88",
    spo2Avg: 96.2,
    trend: "up",
  },
  {
    id: "RPT-003",
    date: "Feb 11, 2026",
    type: "Weekly Summary",
    status: "Normal",
    heartAvg: 72,
    bpAvg: "120/78",
    spo2Avg: 98.1,
    trend: "stable",
  },
  {
    id: "RPT-004",
    date: "Feb 4, 2026",
    type: "Monthly Analysis",
    status: "Critical",
    heartAvg: 95,
    bpAvg: "148/95",
    spo2Avg: 93.8,
    trend: "up",
  },
  {
    id: "RPT-005",
    date: "Jan 28, 2026",
    type: "Weekly Summary",
    status: "Normal",
    heartAvg: 70,
    bpAvg: "115/72",
    spo2Avg: 98.4,
    trend: "down",
  },
]

const stats = [
  { label: "Total Reports", value: "24", description: "Generated this quarter" },
  { label: "Avg Heart Rate", value: "76 BPM", description: "Last 30 days" },
  { label: "Avg SpO2", value: "97.2%", description: "Last 30 days" },
  { label: "Alerts Triggered", value: "3", description: "Last 30 days" },
]

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <TrendingUp className="size-4 text-destructive" />
  if (trend === "down") return <TrendingDown className="size-4 text-success" />
  return <Minus className="size-4 text-muted-foreground" />
}

export default function ReportsPage() {
  const [, setDownloading] = useState<string | null>(null)

  function handleDownload(id: string) {
    setDownloading(id)
    setTimeout(() => setDownloading(null), 1500)
  }

  return (
    <DashboardLayout title="Reports">
      <div className="p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              Health Reports
            </h2>
            <p className="mt-1 text-muted-foreground">
              View and download patient health reports and analytics.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-border/60">
                <CardContent className="p-5">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileBarChart className="size-5 text-primary" />
                <CardTitle className="text-base">Report History</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Heart Avg</TableHead>
                    <TableHead className="text-right">BP Avg</TableHead>
                    <TableHead className="text-right">SpO2 Avg</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={
                            report.status === "Normal"
                              ? "bg-success/10 text-success border-success/20"
                              : report.status === "Warning"
                                ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                : "bg-destructive/10 text-destructive border-destructive/20"
                          }
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{report.heartAvg} BPM</TableCell>
                      <TableCell className="text-right">{report.bpAvg}</TableCell>
                      <TableCell className="text-right">{report.spo2Avg}%</TableCell>
                      <TableCell>
                        <TrendIcon trend={report.trend} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1.5"
                          onClick={() => handleDownload(report.id)}
                        >
                          <Download className="size-3.5" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
