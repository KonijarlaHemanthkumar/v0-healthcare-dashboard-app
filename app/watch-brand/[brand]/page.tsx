"use client"

import { use } from "react"
import { Watch, Battery, Heart, Footprints, Wifi, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/dashboard-layout"

const brandData: Record<string, { name: string; tagline: string; color: string; models: { name: string; price: string; rating: number; features: string[] }[] }> = {
  firebolt: {
    name: "Firebolt",
    tagline: "Smart wearables for the modern lifestyle",
    color: "#E85D04",
    models: [
      { name: "Firebolt Phoenix Pro", price: "$49", rating: 4.3, features: ["SpO2 Monitor", "Heart Rate", "IP68 Waterproof"] },
      { name: "Firebolt Ninja Call", price: "$39", rating: 4.1, features: ["Bluetooth Calling", "120+ Sports", "Sleep Tracking"] },
      { name: "Firebolt Eclipse", price: "$59", rating: 4.5, features: ["AMOLED Display", "GPS", "Stress Monitor"] },
    ],
  },
  noise: {
    name: "Noise",
    tagline: "India's #1 smartwatch brand",
    color: "#1DB954",
    models: [
      { name: "NoiseFit Halo Plus", price: "$55", rating: 4.4, features: ["AMOLED Display", "SpO2", "Noise Health Suite"] },
      { name: "NoiseFit Crew", price: "$35", rating: 4.2, features: ["Bluetooth Calling", "100+ Watch Faces", "IP68"] },
      { name: "NoiseFit Force", price: "$45", rating: 4.3, features: ["Rugged Build", "GPS", "Heart Rate"] },
    ],
  },
  apple: {
    name: "Apple",
    tagline: "The ultimate health companion on your wrist",
    color: "#333333",
    models: [
      { name: "Apple Watch Ultra 2", price: "$799", rating: 4.9, features: ["Titanium Case", "Precision GPS", "Depth Gauge"] },
      { name: "Apple Watch Series 9", price: "$399", rating: 4.8, features: ["Blood Oxygen", "ECG", "Crash Detection"] },
      { name: "Apple Watch SE", price: "$249", rating: 4.6, features: ["Heart Rate", "Fall Detection", "Water Resistant"] },
    ],
  },
  samsung: {
    name: "Samsung",
    tagline: "Galaxy Watch - Smarter health, better you",
    color: "#1428A0",
    models: [
      { name: "Galaxy Watch Ultra", price: "$649", rating: 4.7, features: ["Titanium", "Dual GPS", "100m Water Resist"] },
      { name: "Galaxy Watch 6 Classic", price: "$399", rating: 4.6, features: ["Rotating Bezel", "BioActive Sensor", "Sapphire Glass"] },
      { name: "Galaxy Watch FE", price: "$199", rating: 4.3, features: ["Sleep Coaching", "Heart Rate", "Body Composition"] },
    ],
  },
  oneplus: {
    name: "OnePlus",
    tagline: "Never Settle - Smart wearables redefined",
    color: "#F5010C",
    models: [
      { name: "OnePlus Watch 2", price: "$299", rating: 4.5, features: ["Wear OS", "Dual Engine", "100h Battery"] },
      { name: "OnePlus Nord Watch", price: "$79", rating: 4.1, features: ["AMOLED", "SpO2", "105 Fitness Modes"] },
    ],
  },
  boat: {
    name: "Boat",
    tagline: "Ride the wave of smart tech",
    color: "#E31837",
    models: [
      { name: "Boat Wave Sigma", price: "$29", rating: 4.0, features: ["HD Display", "Heart Rate", "7-Day Battery"] },
      { name: "Boat Lunar Oasis", price: "$45", rating: 4.2, features: ["AMOLED", "BT Calling", "SpO2"] },
      { name: "Boat Xtend Pro", price: "$55", rating: 4.3, features: ["GPS", "Alexa Built-in", "Blood Oxygen"] },
    ],
  },
  casio: {
    name: "Casio",
    tagline: "Innovation built to last",
    color: "#003DA5",
    models: [
      { name: "G-Shock GBD-H2000", price: "$399", rating: 4.7, features: ["Heart Rate", "GPS", "Shock Resistant"] },
      { name: "Casio Pro Trek", price: "$349", rating: 4.5, features: ["Altimeter", "Barometer", "Compass"] },
      { name: "G-Shock Move DWH5600", price: "$279", rating: 4.4, features: ["SpO2", "Step Counter", "Solar Powered"] },
    ],
  },
}

export default function WatchBrandPage({ params }: { params: Promise<{ brand: string }> }) {
  const { brand } = use(params)
  const data = brandData[brand]

  if (!data) {
    return (
      <DashboardLayout>
        <div className="flex flex-1 items-center justify-center p-8">
          <Card className="max-w-md text-center">
            <CardHeader>
              <CardTitle>Brand Not Found</CardTitle>
              <CardDescription>The watch brand you are looking for does not exist.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Brand Header */}
        <div className="flex items-center gap-4">
          <div
            className="flex size-14 items-center justify-center rounded-xl"
            style={{ backgroundColor: data.color }}
          >
            <Watch className="size-7 text-white" />
          </div>
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
              {data.name}
            </h1>
            <p className="text-sm text-muted-foreground">{data.tagline}</p>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {[
            { icon: Heart, label: "Heart Rate Monitoring", desc: "24/7 tracking" },
            { icon: Battery, label: "Long Battery Life", desc: "Multi-day power" },
            { icon: Footprints, label: "Activity Tracking", desc: "Steps & calories" },
            { icon: Wifi, label: "Connectivity", desc: "Bluetooth & Wi-Fi" },
          ].map((feat) => (
            <Card key={feat.label}>
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feat.icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{feat.label}</p>
                  <p className="text-xs text-muted-foreground">{feat.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Models */}
        <div>
          <h2 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
            Available Models
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.models.map((model) => (
              <Card key={model.name} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">{model.name}</CardTitle>
                    <span className="text-lg font-bold text-primary">{model.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${
                          i < Math.floor(model.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">{model.rating}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {model.features.map((f) => (
                      <Badge key={f} variant="secondary" className="text-xs font-normal">
                        {f}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-auto pt-2">
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
