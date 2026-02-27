"use client"

import { use } from "react"
import { Phone, Mail, MapPin, Heart, Calendar, MessageCircle, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import DashboardLayout from "@/components/dashboard-layout"

const contactsData: Record<string, {
  name: string
  relation: string
  phone: string
  email: string
  location: string
  bloodGroup: string
  avatar: string
  color: string
  emergencyContact: boolean
  notes: string
}> = {
  kavya: {
    name: "Kavya",
    relation: "Daughter",
    phone: "+91 98765 43210",
    email: "kavya@email.com",
    location: "Hyderabad, India",
    bloodGroup: "B+",
    avatar: "K",
    color: "#E8567F",
    emergencyContact: true,
    notes: "Primary caretaker. Available on weekdays after 6 PM.",
  },
  hema: {
    name: "Hema",
    relation: "Spouse",
    phone: "+91 91234 56789",
    email: "hema@email.com",
    location: "Hyderabad, India",
    bloodGroup: "O+",
    avatar: "H",
    color: "#6366F1",
    emergencyContact: true,
    notes: "Available at all times. Knows full medical history.",
  },
  vijay: {
    name: "Vijay",
    relation: "Son",
    phone: "+91 99887 76655",
    email: "vijay@email.com",
    location: "Bangalore, India",
    bloodGroup: "A+",
    avatar: "V",
    color: "#0EA5E9",
    emergencyContact: true,
    notes: "Works in IT. Best reachable via WhatsApp during work hours.",
  },
  indrika: {
    name: "Indrika",
    relation: "Friend",
    phone: "+91 98001 12233",
    email: "indrika@email.com",
    location: "Visakhapatnam, India",
    bloodGroup: "AB+",
    avatar: "I",
    color: "#14B8A6",
    emergencyContact: false,
    notes: "Neighbor and close family friend. Can help in local emergencies.",
  },
}

export default function PersonalContactPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params)
  const contact = contactsData[name]

  if (!contact) {
    return (
      <DashboardLayout>
        <div className="flex flex-1 items-center justify-center p-8">
          <Card className="max-w-md text-center">
            <CardHeader>
              <CardTitle>Contact Not Found</CardTitle>
              <CardDescription>The contact you are looking for does not exist.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col gap-6 p-6">
        {/* Contact Header */}
        <Card>
          <CardContent className="flex flex-col items-center gap-4 p-6 sm:flex-row sm:items-start">
            <Avatar className="size-20">
              <AvatarFallback
                className="text-2xl font-bold text-white"
                style={{ backgroundColor: contact.color }}
              >
                {contact.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                  {contact.name}
                </h1>
                <Badge variant="secondary">{contact.relation}</Badge>
                {contact.emergencyContact && (
                  <Badge className="bg-destructive/10 text-destructive">Emergency Contact</Badge>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{contact.notes}</p>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <Button size="sm" className="gap-1.5">
                  <Phone className="size-4" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <MessageCircle className="size-4" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Video className="size-4" />
                  Video Call
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Phone className="size-4 text-primary" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-foreground">{contact.phone}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="size-4 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-foreground">{contact.email}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="size-4 text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-foreground">{contact.location}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Heart className="size-4 text-primary" />
                Blood Group
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-foreground">{contact.bloodGroup}</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="size-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { action: "Last called", time: "Today at 2:30 PM", type: "call" },
                { action: "Message received", time: "Yesterday at 10:15 AM", type: "message" },
                { action: "Video call", time: "3 days ago", type: "video" },
              ].map((activity) => (
                <div
                  key={activity.action}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === "call" && <Phone className="size-4 text-primary" />}
                      {activity.type === "message" && <MessageCircle className="size-4 text-primary" />}
                      {activity.type === "video" && <Video className="size-4 text-primary" />}
                    </div>
                    <span className="text-sm font-medium text-foreground">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
