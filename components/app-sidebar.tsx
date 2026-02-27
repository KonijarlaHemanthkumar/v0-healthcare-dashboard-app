"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  LayoutDashboard,
  Sparkles,
  UserRound,
  Stethoscope,
  ShoppingBag,
  FileBarChart,
  AlertTriangle,
  LogIn,
  Activity,
  Globe,
  Check,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "hi", label: "Hindi", flag: "HI" },
  { code: "es", label: "Spanish", flag: "ES" },
  { code: "fr", label: "French", flag: "FR" },
  { code: "de", label: "German", flag: "DE" },
  { code: "zh", label: "Chinese", flag: "ZH" },
  { code: "ar", label: "Arabic", flag: "AR" },
  { code: "pt", label: "Portuguese", flag: "PT" },
  { code: "ja", label: "Japanese", flag: "JA" },
  { code: "bn", label: "Bengali", flag: "BN" },
]

const navItems = [
  { title: "Home", href: "/", icon: Home },
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Features", href: "/features", icon: Sparkles },
  { title: "Patient Details", href: "/patient-details", icon: UserRound },
  { title: "Contact Doctor", href: "/contact-doctor", icon: Stethoscope },
  { title: "Medical Store", href: "/medical-store", icon: ShoppingBag },
  { title: "Reports", href: "/reports", icon: FileBarChart },
  { title: "Emergency Alerts", href: "/emergency-alerts", icon: AlertTriangle },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [selectedLang, setSelectedLang] = useState("en")

  const currentLang = languages.find((l) => l.code === selectedLang) || languages[0]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Activity className="size-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold text-sidebar-foreground">RPM Agent</span>
            <span className="text-xs text-sidebar-foreground/60">Health Monitor</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton tooltip="Language">
                  <Globe className="size-4" />
                  <span className="flex items-center gap-2">
                    <span className="inline-flex size-5 items-center justify-center rounded bg-sidebar-accent text-[10px] font-bold text-sidebar-accent-foreground">
                      {currentLang.flag}
                    </span>
                    {currentLang.label}
                  </span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end" className="w-48">
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="inline-flex size-5 items-center justify-center rounded bg-muted text-[10px] font-bold text-muted-foreground">
                        {lang.flag}
                      </span>
                      {lang.label}
                    </span>
                    {selectedLang === lang.code && (
                      <Check className="size-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/login"} tooltip="Login">
              <Link href="/login">
                <LogIn className="size-4" />
                <span>Login</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
