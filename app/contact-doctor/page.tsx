import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Phone } from "lucide-react"

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialization: "Cardiologist",
    initials: "SM",
    online: true,
  },
  {
    name: "Dr. James Chen",
    specialization: "Pulmonologist",
    initials: "JC",
    online: true,
  },
  {
    name: "Dr. Emily Rodriguez",
    specialization: "General Physician",
    initials: "ER",
    online: false,
  },
  {
    name: "Dr. Michael Thompson",
    specialization: "Neurologist",
    initials: "MT",
    online: true,
  },
  {
    name: "Dr. Priya Sharma",
    specialization: "Endocrinologist",
    initials: "PS",
    online: false,
  },
  {
    name: "Dr. David Kim",
    specialization: "Emergency Medicine",
    initials: "DK",
    online: true,
  },
]

export default function ContactDoctorPage() {
  return (
    <DashboardLayout title="Contact Doctor">
      <div className="p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
              Available Doctors
            </h2>
            <p className="mt-2 text-muted-foreground">
              Connect with healthcare professionals for consultation and emergency support.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <Card
                key={doctor.name}
                className="border-border/60 transition-all hover:border-primary/20 hover:shadow-md"
              >
                <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                  <div className="relative">
                    <Avatar className="size-16 border-2 border-border">
                      <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                        {doctor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-card ${
                        doctor.online ? "bg-success" : "bg-muted-foreground/40"
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                  <Badge
                    variant={doctor.online ? "default" : "secondary"}
                    className={
                      doctor.online
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {doctor.online ? "Online" : "Offline"}
                  </Badge>
                  <div className="flex w-full gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-1.5"
                      disabled={!doctor.online}
                    >
                      <MessageCircle className="size-4" />
                      Chat
                    </Button>
                    <Button
                      className="flex-1 gap-1.5"
                      disabled={!doctor.online}
                    >
                      <Phone className="size-4" />
                      Call
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
