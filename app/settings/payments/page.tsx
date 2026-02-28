"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Check,
  Smartphone,
  Wallet,
  IndianRupee,
  ShieldCheck,
  ArrowRight,
  QrCode,
  History,
  CreditCard,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

type PaymentMethod = "gpay" | "phonepe" | null

const transactionHistory = [
  { id: 1, type: "Medicine Purchase", amount: 450, date: "2026-02-27", method: "gpay", status: "success" },
  { id: 2, type: "Doctor Consultation", amount: 800, date: "2026-02-25", method: "phonepe", status: "success" },
  { id: 3, type: "Lab Test", amount: 1200, date: "2026-02-22", method: "gpay", status: "success" },
  { id: 4, type: "Medical Equipment", amount: 2500, date: "2026-02-20", method: "phonepe", status: "pending" },
  { id: 5, type: "Health Checkup", amount: 3000, date: "2026-02-18", method: "gpay", status: "success" },
  { id: 6, type: "Pharmacy Order", amount: 680, date: "2026-02-15", method: "phonepe", status: "success" },
]

export default function PaymentsPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null)
  const [gpayUPI, setGpayUPI] = useState("")
  const [phonepeUPI, setPhonepeUPI] = useState("")
  const [gpayLinked, setGpayLinked] = useState(false)
  const [phonepeLinked, setPhonepeLinked] = useState(false)
  const [payAmount, setPayAmount] = useState("")
  const [payDescription, setPayDescription] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleLinkGPay = () => {
    if (gpayUPI.includes("@")) {
      setGpayLinked(true)
    }
  }

  const handleLinkPhonePe = () => {
    if (phonepeUPI.includes("@")) {
      setPhonepeLinked(true)
    }
  }

  const handlePay = () => {
    if (selectedMethod && payAmount && Number(payAmount) > 0) {
      setPaymentSuccess(true)
      setTimeout(() => {
        setPaymentSuccess(false)
        setPayAmount("")
        setPayDescription("")
        setSelectedMethod(null)
      }, 3000)
    }
  }

  return (
    <DashboardLayout title="GPay & PhonePe">
      <div className="space-y-6">

        {/* Payment Methods */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          {/* GPay Card */}
          <Card className={`relative cursor-pointer transition-all ${gpayLinked ? "border-[#4285F4]/40 bg-[#4285F4]/5" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#4285F4]/10">
                    <svg viewBox="0 0 24 24" className="size-7" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Google Pay</CardTitle>
                    <CardDescription>Fast UPI payments via GPay</CardDescription>
                  </div>
                </div>
                {gpayLinked && (
                  <Badge className="bg-[#34A853] text-white hover:bg-[#34A853]">
                    <Check className="mr-1 size-3" /> Linked
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {!gpayLinked ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="gpay-upi" className="text-sm">UPI ID</Label>
                    <Input
                      id="gpay-upi"
                      placeholder="yourname@okaxis"
                      value={gpayUPI}
                      onChange={(e) => setGpayUPI(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleLinkGPay}
                    disabled={!gpayUPI.includes("@")}
                    className="w-full bg-[#4285F4] text-white hover:bg-[#3367D6]"
                  >
                    <Smartphone className="mr-2 size-4" />
                    Link Google Pay
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-lg bg-[#4285F4]/10 p-3">
                    <ShieldCheck className="size-5 text-[#34A853]" />
                    <div>
                      <p className="text-sm font-medium text-foreground">UPI: {gpayUPI}</p>
                      <p className="text-xs text-muted-foreground">Verified and active</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setGpayLinked(false); setGpayUPI("") }}
                    className="w-full"
                  >
                    Unlink Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* PhonePe Card */}
          <Card className={`relative cursor-pointer transition-all ${phonepeLinked ? "border-[#5f259f]/40 bg-[#5f259f]/5" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#5f259f]/10">
                    <svg viewBox="0 0 24 24" className="size-7" fill="none">
                      <rect width="24" height="24" rx="4" fill="#5f259f"/>
                      <path d="M7.5 6h3.2c2.8 0 4.5 1.4 4.5 3.6 0 1.8-1 3-2.7 3.5l3.2 4.9h-2.8l-2.9-4.5H9.7V18H7.5V6zm2.2 5.6h1.1c1.5 0 2.3-.7 2.3-1.9 0-1.2-.8-1.8-2.3-1.8H9.7v3.7z" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-lg">PhonePe</CardTitle>
                    <CardDescription>Secure UPI payments via PhonePe</CardDescription>
                  </div>
                </div>
                {phonepeLinked && (
                  <Badge className="bg-[#5f259f] text-white hover:bg-[#5f259f]">
                    <Check className="mr-1 size-3" /> Linked
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {!phonepeLinked ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phonepe-upi" className="text-sm">UPI ID</Label>
                    <Input
                      id="phonepe-upi"
                      placeholder="yourname@ybl"
                      value={phonepeUPI}
                      onChange={(e) => setPhonepeUPI(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={handleLinkPhonePe}
                    disabled={!phonepeUPI.includes("@")}
                    className="w-full bg-[#5f259f] text-white hover:bg-[#4a1d7a]"
                  >
                    <Smartphone className="mr-2 size-4" />
                    Link PhonePe
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-lg bg-[#5f259f]/10 p-3">
                    <ShieldCheck className="size-5 text-[#5f259f]" />
                    <div>
                      <p className="text-sm font-medium text-foreground">UPI: {phonepeUPI}</p>
                      <p className="text-xs text-muted-foreground">Verified and active</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setPhonepeLinked(false); setPhonepeUPI("") }}
                    className="w-full"
                  >
                    Unlink Account
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Pay Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="size-5 text-primary" />
              Quick Pay
            </CardTitle>
            <CardDescription>Make a quick payment for medical services</CardDescription>
          </CardHeader>
          <CardContent>
            {paymentSuccess ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <div className="flex size-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="size-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Payment Successful</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedMethod === "gpay" ? "Google Pay" : "PhonePe"} payment of INR {payAmount} completed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Select Payment Method */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Select Payment Method</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedMethod("gpay")}
                      disabled={!gpayLinked}
                      className={`flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all ${
                        selectedMethod === "gpay"
                          ? "border-[#4285F4] bg-[#4285F4]/5"
                          : "border-border hover:border-[#4285F4]/40"
                      } ${!gpayLinked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-[#4285F4]/10">
                        <CreditCard className="size-4 text-[#4285F4]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">GPay</p>
                        <p className="text-xs text-muted-foreground">{gpayLinked ? "Linked" : "Not linked"}</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedMethod("phonepe")}
                      disabled={!phonepeLinked}
                      className={`flex items-center gap-2 rounded-lg border-2 p-3 text-left transition-all ${
                        selectedMethod === "phonepe"
                          ? "border-[#5f259f] bg-[#5f259f]/5"
                          : "border-border hover:border-[#5f259f]/40"
                      } ${!phonepeLinked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    >
                      <div className="flex size-8 items-center justify-center rounded-lg bg-[#5f259f]/10">
                        <CreditCard className="size-4 text-[#5f259f]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">PhonePe</p>
                        <p className="text-xs text-muted-foreground">{phonepeLinked ? "Linked" : "Not linked"}</p>
                      </div>
                    </button>
                  </div>
                </div>

                <Separator />

                {/* Amount & Description */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pay-amount" className="text-sm">Amount (INR)</Label>
                    <div className="relative">
                      <IndianRupee className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="pay-amount"
                        type="number"
                        placeholder="0.00"
                        className="pl-9"
                        value={payAmount}
                        onChange={(e) => setPayAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pay-desc" className="text-sm">Description</Label>
                    <Input
                      id="pay-desc"
                      placeholder="Medicine, consultation..."
                      value={payDescription}
                      onChange={(e) => setPayDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2">
                  {[100, 250, 500, 1000, 2000, 5000].map((amt) => (
                    <Button
                      key={amt}
                      variant="outline"
                      size="sm"
                      onClick={() => setPayAmount(String(amt))}
                      className={payAmount === String(amt) ? "border-primary bg-primary/5 text-primary" : ""}
                    >
                      <IndianRupee className="mr-0.5 size-3" />{amt}
                    </Button>
                  ))}
                </div>

                <Button
                  onClick={handlePay}
                  disabled={!selectedMethod || !payAmount || Number(payAmount) <= 0}
                  className="w-full"
                  size="lg"
                >
                  Pay <IndianRupee className="mx-1 size-4" />{payAmount || "0"} via {selectedMethod === "gpay" ? "GPay" : selectedMethod === "phonepe" ? "PhonePe" : "..."}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code Section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <QrCode className="size-4 text-[#4285F4]" />
                GPay QR Code
              </CardTitle>
              <CardDescription>Scan to receive payments via GPay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-3">
                <div className="flex size-40 items-center justify-center rounded-xl border-2 border-dashed border-[#4285F4]/30 bg-[#4285F4]/5">
                  <div className="grid grid-cols-5 grid-rows-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`size-5 rounded-sm ${
                          [0,1,2,4,5,6,8,10,12,14,18,20,22,23,24].includes(i)
                            ? "bg-[#4285F4]"
                            : "bg-[#4285F4]/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{gpayLinked ? gpayUPI : "Link GPay first"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <QrCode className="size-4 text-[#5f259f]" />
                PhonePe QR Code
              </CardTitle>
              <CardDescription>Scan to receive payments via PhonePe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-3">
                <div className="flex size-40 items-center justify-center rounded-xl border-2 border-dashed border-[#5f259f]/30 bg-[#5f259f]/5">
                  <div className="grid grid-cols-5 grid-rows-5 gap-1">
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className={`size-5 rounded-sm ${
                          [0,2,4,5,7,9,10,12,14,15,17,19,20,22,24].includes(i)
                            ? "bg-[#5f259f]"
                            : "bg-[#5f259f]/15"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{phonepeLinked ? phonepeUPI : "Link PhonePe first"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="size-5 text-primary" />
              Transaction History
            </CardTitle>
            <CardDescription>Recent payments made through linked accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactionHistory.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-lg ${
                      tx.method === "gpay" ? "bg-[#4285F4]/10" : "bg-[#5f259f]/10"
                    }`}>
                      <CreditCard className={`size-5 ${
                        tx.method === "gpay" ? "text-[#4285F4]" : "text-[#5f259f]"
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tx.type}</p>
                      <p className="text-xs text-muted-foreground">
                        {tx.date} &middot; {tx.method === "gpay" ? "Google Pay" : "PhonePe"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center text-sm font-semibold text-foreground">
                      <IndianRupee className="size-3" />{tx.amount}
                    </span>
                    <Badge variant={tx.status === "success" ? "default" : "secondary"} className={
                      tx.status === "success"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    }>
                      {tx.status === "success" ? "Success" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}
