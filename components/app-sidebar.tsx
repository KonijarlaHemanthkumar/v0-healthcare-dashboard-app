"use client"

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
  Watch,
  ChevronRight,
  Users,
  User,
  Settings,
  Monitor,
  Globe,
  BellRing,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


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

const watchBrands = [
  { name: "Firebolt", href: "/watch-brand/firebolt" },
  { name: "Noise", href: "/watch-brand/noise" },
  { name: "Apple", href: "/watch-brand/apple" },
  { name: "Samsung", href: "/watch-brand/samsung" },
  { name: "OnePlus", href: "/watch-brand/oneplus" },
  { name: "Boat", href: "/watch-brand/boat" },
  { name: "Casio", href: "/watch-brand/casio" },
]

const personalContacts = [
  { name: "Kavya", href: "/personal-contacts/kavya" },
  { name: "Hema", href: "/personal-contacts/hema" },
  { name: "Vijay", href: "/personal-contacts/vijay" },
  { name: "Indrika", href: "/personal-contacts/indrika" },
]

export function AppSidebar() {
  const pathname = usePathname()

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

              {/* Watch Brand */}
              <Collapsible asChild className="group/watchbrand">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Watch Brand"
                      isActive={pathname.startsWith("/watch-brand")}
                    >
                      <Watch className="size-4" />
                      <span>Watch Brand</span>
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/watchbrand:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {watchBrands.map((brand) => (
                        <SidebarMenuSubItem key={brand.name}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === brand.href}
                          >
                            <Link href={brand.href}>
                              <span>{brand.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Personal Contacts */}
              <Collapsible asChild className="group/contacts">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Personal Contacts"
                      isActive={pathname.startsWith("/personal-contacts")}
                    >
                      <Users className="size-4" />
                      <span>Personal Contacts</span>
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/contacts:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {personalContacts.map((contact) => (
                        <SidebarMenuSubItem key={contact.name}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname === contact.href}
                          >
                            <Link href={contact.href}>
                              <User className="size-3" />
                              <span>{contact.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Settings */}
              <Collapsible asChild className="group/settings">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip="Settings"
                      isActive={pathname.startsWith("/settings")}
                    >
                      <Settings className="size-4" />
                      <span>Settings</span>
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/settings:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/settings/display"}>
                          <Link href="/settings/display">
                            <Monitor className="size-3" />
                            <span>Display Settings</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/settings/languages"}>
                          <Link href="/settings/languages">
                            <Globe className="size-3" />
                            <span>Languages</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton asChild isActive={pathname === "/settings/notifications"}>
                          <Link href="/settings/notifications">
                            <BellRing className="size-3" />
                            <span>Notification Sounds</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
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
