"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"

const languages = [
  { code: "en", label: "English", native: "English", flag: "EN" },
  { code: "hi", label: "Hindi", native: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "HI" },
  { code: "te", label: "Telugu", native: "\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41", flag: "TE" },
  { code: "es", label: "Spanish", native: "Espa\u00f1ol", flag: "ES" },
  { code: "fr", label: "French", native: "Fran\u00e7ais", flag: "FR" },
  { code: "de", label: "German", native: "Deutsch", flag: "DE" },
  { code: "zh", label: "Chinese", native: "\u4e2d\u6587", flag: "ZH" },
  { code: "ar", label: "Arabic", native: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "AR" },
  { code: "pt", label: "Portuguese", native: "Portugu\u00eas", flag: "PT" },
  { code: "ja", label: "Japanese", native: "\u65e5\u672c\u8a9e", flag: "JA" },
  { code: "bn", label: "Bengali", native: "\u09ac\u09be\u0982\u09b2\u09be", flag: "BN" },
]

export default function LanguagesSettingsPage() {
  const [selectedLang, setSelectedLang] = useState("en")
  const [search, setSearch] = useState("")
  const [saved, setSaved] = useState(false)

  const filtered = languages.filter(
    (l) =>
      l.label.toLowerCase().includes(search.toLowerCase()) ||
      l.native.toLowerCase().includes(search.toLowerCase())
  )

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <DashboardLayout title="Languages">
      <div className="p-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              Language Settings
            </h2>
            <p className="mt-1 text-muted-foreground">
              Choose your preferred language for the application interface.
            </p>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="size-4 text-primary" />
                Select Language
              </CardTitle>
              <CardDescription>
                The selected language will be applied across all pages.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search languages..."
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Language Grid */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {filtered.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border-2 p-3.5 text-left transition-all",
                      selectedLang === lang.code
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/30"
                    )}
                  >
                    <div className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                      selectedLang === lang.code
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {lang.flag}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{lang.label}</p>
                      <p className="text-xs text-muted-foreground">{lang.native}</p>
                    </div>
                    {selectedLang === lang.code && (
                      <Check className="size-5 shrink-0 text-primary" />
                    )}
                  </button>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No languages found matching your search.
                </div>
              )}
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="mt-4 w-full gap-2">
            {saved ? (
              <>
                <Check className="size-4" />
                Language Saved
              </>
            ) : (
              "Save Language Preference"
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
