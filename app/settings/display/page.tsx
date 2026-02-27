"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Monitor, Palette, Type, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const bgColors = [
  { name: "Default Light", value: "#f5f7fa", text: "#1a1a2e" },
  { name: "Pure White", value: "#ffffff", text: "#1a1a2e" },
  { name: "Cool Gray", value: "#e8ecf1", text: "#1a1a2e" },
  { name: "Warm Beige", value: "#faf6f1", text: "#2d2a26" },
  { name: "Dark Blue", value: "#1a1a2e", text: "#e8ecf1" },
  { name: "Deep Charcoal", value: "#1e1e1e", text: "#f0f0f0" },
]

const fontColors = [
  { name: "Dark Navy", value: "#1a1a2e" },
  { name: "Charcoal", value: "#333333" },
  { name: "Ocean Blue", value: "#1a6fc4" },
  { name: "Forest Green", value: "#16a34a" },
  { name: "Slate Gray", value: "#64748b" },
  { name: "Deep Purple", value: "#7c3aed" },
]

const fontSizes = [
  { label: "Small", value: "14px" },
  { label: "Medium", value: "16px" },
  { label: "Large", value: "18px" },
  { label: "Extra Large", value: "20px" },
]

export default function DisplaySettingsPage() {
  const [selectedBg, setSelectedBg] = useState("#f5f7fa")
  const [selectedFontColor, setSelectedFontColor] = useState("#1a1a2e")
  const [selectedFontSize, setSelectedFontSize] = useState("16px")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout title="Display Settings">
      <div className="p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              Display Settings
            </h2>
            <p className="mt-1 text-muted-foreground">
              Customize the visual appearance of your dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Background Color */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Palette className="size-4 text-primary" />
                  Background Screen Color
                </CardTitle>
                <CardDescription>Choose the main background color for the interface.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {bgColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedBg(color.value)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                        selectedBg === color.value
                          ? "border-primary shadow-md"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div
                        className="size-10 rounded-lg border border-border shadow-sm"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs font-medium text-foreground">{color.name}</span>
                      {selectedBg === color.value && (
                        <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary">
                          <Check className="size-3 text-primary-foreground" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Font Color */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Type className="size-4 text-primary" />
                  Font Color
                </CardTitle>
                <CardDescription>Select the primary text color used throughout the app.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {fontColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedFontColor(color.value)}
                      className={cn(
                        "relative flex items-center gap-3 rounded-xl border-2 p-3 transition-all",
                        selectedFontColor === color.value
                          ? "border-primary shadow-md"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <div
                        className="size-6 shrink-0 rounded-full border border-border"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-xs font-medium text-foreground">{color.name}</span>
                      {selectedFontColor === color.value && (
                        <Check className="ml-auto size-4 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Font Size */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Monitor className="size-4 text-primary" />
                  Font Size
                </CardTitle>
                <CardDescription>Adjust the base font size for readability.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {fontSizes.map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setSelectedFontSize(size.value)}
                      className={cn(
                        "flex flex-col items-center gap-1.5 rounded-xl border-2 p-4 transition-all",
                        selectedFontSize === size.value
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <span style={{ fontSize: size.value }} className="font-semibold text-foreground">
                        Aa
                      </span>
                      <span className="text-xs text-muted-foreground">{size.label}</span>
                      <span className="text-[10px] text-muted-foreground/60">{size.value}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="rounded-xl border border-border p-6"
                  style={{ backgroundColor: selectedBg }}
                >
                  <p
                    style={{ color: selectedFontColor, fontSize: selectedFontSize }}
                    className="font-medium"
                  >
                    This is a preview of your display settings.
                  </p>
                  <p
                    style={{ color: selectedFontColor, fontSize: selectedFontSize, opacity: 0.6 }}
                    className="mt-2"
                  >
                    Secondary text will look like this with reduced opacity.
                  </p>
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
                "Save Display Settings"
              )}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
