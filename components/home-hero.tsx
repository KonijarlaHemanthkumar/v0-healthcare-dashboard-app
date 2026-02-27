"use client"

import Link from "next/link"
import { Activity, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 py-24 text-center md:py-32 lg:py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
          <Activity className="size-4" />
          <span>AI-Powered Health Monitoring</span>
        </div>
        <h1 className="text-balance font-[family-name:var(--font-heading)] text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Remote Patient{" "}
          <span className="text-primary">Monitoring</span>{" "}
          Agent
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Advanced IoT-based health monitoring system that tracks vital signs in real-time, 
          detects emergencies with AI, and instantly alerts doctors for rapid response.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2 rounded-full px-8">
            <Link href="/dashboard">
              Start Monitoring
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 rounded-full px-8">
            <Link href="/features">
              Explore Features
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
