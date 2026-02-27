"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Plus, Check } from "lucide-react"

const products = [
  {
    name: "Digital Blood Pressure Monitor",
    category: "Devices",
    price: "$49.99",
    inStock: true,
    description: "Automatic upper arm BP monitor with memory storage.",
  },
  {
    name: "Pulse Oximeter",
    category: "Devices",
    price: "$29.99",
    inStock: true,
    description: "Fingertip SpO2 and heart rate monitor with OLED display.",
  },
  {
    name: "Insulin Test Strips (50ct)",
    category: "Supplies",
    price: "$34.99",
    inStock: true,
    description: "Compatible with major glucose monitors. Fast results.",
  },
  {
    name: "Digital Thermometer",
    category: "Devices",
    price: "$12.99",
    inStock: true,
    description: "Instant-read infrared thermometer, non-contact.",
  },
  {
    name: "First Aid Kit - Premium",
    category: "Kits",
    price: "$39.99",
    inStock: false,
    description: "Comprehensive 250-piece kit for home and travel.",
  },
  {
    name: "Compression Socks (3-Pack)",
    category: "Wellness",
    price: "$24.99",
    inStock: true,
    description: "Medical-grade graduated compression for circulation.",
  },
  {
    name: "ECG Monitor Wearable",
    category: "Devices",
    price: "$199.99",
    inStock: true,
    description: "Continuous ECG recording with AI arrhythmia detection.",
  },
  {
    name: "Medication Organizer Weekly",
    category: "Supplies",
    price: "$14.99",
    inStock: true,
    description: "7-day pill organizer with AM/PM compartments.",
  },
]

export default function MedicalStorePage() {
  const [search, setSearch] = useState("")
  const [cart, setCart] = useState<string[]>([])

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  function toggleCart(name: string) {
    setCart((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  return (
    <DashboardLayout title="Medical Store">
      <div className="p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
                Medical Store
              </h2>
              <p className="mt-1 text-muted-foreground">
                Browse medical devices, supplies, and wellness products.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <ShoppingCart className="size-4" />
                <span>{cart.length}</span>
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {filtered.map((product) => {
              const inCart = cart.includes(product.name)
              return (
                <Card
                  key={product.name}
                  className="border-border/60 transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div className="flex items-start justify-between">
                      <Badge
                        variant="secondary"
                        className="bg-primary/5 text-primary border-primary/10 text-xs"
                      >
                        {product.category}
                      </Badge>
                      {!product.inStock && (
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground leading-tight">{product.name}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-foreground">
                        {product.price}
                      </span>
                      <Button
                        size="sm"
                        variant={inCart ? "secondary" : "default"}
                        className="gap-1.5"
                        disabled={!product.inStock}
                        onClick={() => toggleCart(product.name)}
                      >
                        {inCart ? (
                          <>
                            <Check className="size-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="size-3.5" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
