"use client"

import { useState } from "react"
import { MapPin, X, Navigation, Clock, Wifi } from "lucide-react"
import { cn } from "@/lib/utils"

export function WorkflowLocationButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Small Red Workflow Button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg transition-all hover:scale-105",
          "bg-[#dc2626] text-white",
          open && "bg-[#991b1b]"
        )}
        aria-label="Track patient live location"
      >
        <MapPin className="size-4 animate-pulse" />
        <span className="hidden sm:inline">Live Location</span>
      </button>

      {/* Location Panel */}
      {open && (
        <div className="fixed bottom-20 left-6 z-50 w-[340px] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between bg-[#dc2626] px-4 py-3">
            <div className="flex items-center gap-2">
              <Navigation className="size-4 text-white" />
              <span className="text-sm font-semibold text-white">Patient Live Tracking</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close location panel"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-40 bg-muted">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="relative">
                <div className="absolute -inset-4 animate-ping rounded-full bg-[#dc2626]/20" />
                <div className="absolute -inset-2 rounded-full bg-[#dc2626]/30" />
                <div className="relative flex size-8 items-center justify-center rounded-full bg-[#dc2626] shadow-lg">
                  <MapPin className="size-4 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 rounded-md bg-card/90 px-2 py-1 text-[10px] font-medium text-foreground backdrop-blur-sm">
              Banjara Hills, Hyderabad
            </div>
            <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-[#dc2626] px-2 py-1 text-[10px] font-medium text-white">
              <Wifi className="size-3" />
              GPS Active
            </div>
          </div>

          {/* Location Info */}
          <div className="flex flex-col gap-2 p-3">
            <div className="flex items-center justify-between rounded-lg bg-muted p-2.5">
              <div className="flex items-center gap-2">
                <Navigation className="size-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Current Location</span>
              </div>
              <span className="text-[11px] text-muted-foreground">17.385, 78.487</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted p-2.5">
              <div className="flex items-center gap-2">
                <Clock className="size-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Last Updated</span>
              </div>
              <span className="text-[11px] text-muted-foreground">Just now</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted p-2.5">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Area</span>
              </div>
              <span className="text-[11px] text-muted-foreground">Banjara Hills, Hyderabad</span>
            </div>
            <div className="mt-1 rounded-lg border border-[#dc2626]/20 bg-[#dc2626]/5 p-2.5 text-center text-[11px] font-medium text-[#dc2626]">
              Patient is at registered home address
            </div>
          </div>
        </div>
      )}
    </>
  )
}
