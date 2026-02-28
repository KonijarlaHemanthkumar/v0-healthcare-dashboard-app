"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, CheckCircle2, XCircle, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DashboardLayout } from "@/components/dashboard-layout"

const passwordRules = [
  { label: "At least 8 characters", test: (pw: string) => pw.length >= 8 },
  { label: "One uppercase letter", test: (pw: string) => /[A-Z]/.test(pw) },
  { label: "One lowercase letter", test: (pw: string) => /[a-z]/.test(pw) },
  { label: "One number", test: (pw: string) => /\d/.test(pw) },
  { label: "One special character", test: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
]

export default function CreateAccountPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const passwordsMatch = password.length > 0 && password === confirmPassword

  if (submitted) {
    return (
      <DashboardLayout title="Create Account">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="flex size-20 items-center justify-center rounded-full bg-secondary/15">
            <CheckCircle2 className="size-10 text-secondary" />
          </div>
          <h2 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
            Account Created Successfully
          </h2>
          <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
            Your account has been registered. You can now sign in with your credentials to access the monitoring dashboard.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Create Another
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Create Account">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-heading)] text-2xl">
              Create New Account
            </CardTitle>
            <CardDescription>
              Register a new patient, doctor, or caretaker account for the monitoring system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              {/* Personal Information */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select>
                      <SelectTrigger id="bloodGroup">
                        <SelectValue placeholder="Select blood group" />
                      </SelectTrigger>
                      <SelectContent>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Role Selection */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Account Role</h3>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="role">Select Role</Label>
                  <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Choose account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="patient">Patient</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="caretaker">Caretaker</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Address */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Address</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Textarea id="street" placeholder="House/Flat No., Street, Landmark" rows={2} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter city" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter state" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="pincode">Pin Code</Label>
                    <Input id="pincode" placeholder="500001" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="India" defaultValue="India" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Login Credentials */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Login Credentials</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="newPassword">Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {/* Password strength */}
                    {password.length > 0 && (
                      <ul className="mt-1 flex flex-col gap-1">
                        {passwordRules.map((rule) => {
                          const passed = rule.test(password)
                          return (
                            <li key={rule.label} className="flex items-center gap-1.5 text-xs">
                              {passed ? (
                                <CheckCircle2 className="size-3 text-secondary" />
                              ) : (
                                <XCircle className="size-3 text-destructive" />
                              )}
                              <span className={passed ? "text-secondary" : "text-muted-foreground"}>
                                {rule.label}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowConfirm(!showConfirm)}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && (
                      <p className={`text-xs ${passwordsMatch ? "text-secondary" : "text-destructive"}`}>
                        {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Profile Photo */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Profile Photo (Optional)</h3>
                <label
                  htmlFor="avatar"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 transition-colors hover:border-primary/50 hover:bg-accent/50"
                >
                  <Upload className="mb-2 size-8 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Click to upload</span>
                  <span className="mt-1 text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                  <input id="avatar" type="file" accept="image/*" className="sr-only" />
                </label>
              </div>

              <Separator />

              {/* Submit */}
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Button variant="outline" type="reset" className="sm:w-auto">
                  Reset Form
                </Button>
                <Button type="submit" className="sm:w-auto">
                  Create Account
                </Button>
              </div>
            </form>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                or
              </span>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
