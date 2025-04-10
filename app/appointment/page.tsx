"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeftIcon, CalendarIcon, ClockIcon, CheckIcon } from "lucide-react"
import { sendBookingNotification } from "../actions/email-notification"

// Available time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
]

export default function AppointmentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get query parameters if coming from price check
  const brandParam = searchParams.get("brand") || ""
  const modelParam = searchParams.get("model") || ""
  const repairParam = searchParams.get("repair") || ""
  const priceParam = searchParams.get("price") || ""

  // Form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [brand, setBrand] = useState(brandParam)
  const [model, setModel] = useState(modelParam)
  const [repairType, setRepairType] = useState(repairParam)
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [notes, setNotes] = useState("")
  const [dropOff, setDropOff] = useState("in-store")

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [confirmationNumber, setConfirmationNumber] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Generate random confirmation number
    const confirmation = Math.random().toString(36).substring(2, 10).toUpperCase()
    setConfirmationNumber(confirmation)

    // Prepare booking data
    const bookingData = {
      name,
      email,
      phone,
      brand,
      model,
      repairType,
      date,
      time,
      dropOff,
      notes,
      confirmationNumber: confirmation,
    }

    try {
      // Send email notification
      const result = await sendBookingNotification(bookingData)
      setEmailSent(result.success)

      // Update UI state
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error sending notification:", error)
      setEmailSent(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-teal-200">
            <CardHeader className="bg-teal-50 border-b border-teal-100">
              <div className="flex justify-center mb-4">
                <div className="bg-teal-100 rounded-full p-3">
                  <CheckIcon className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl text-teal-700">Appointment Confirmed!</CardTitle>
              <CardDescription className="text-center text-teal-600">
                Your repair appointment has been scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm text-slate-500 mb-1">Confirmation Number</p>
                  <p className="text-lg font-bold">{confirmationNumber}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Date</p>
                    <p className="font-medium">{date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Time</p>
                    <p className="font-medium">{time}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">Service</p>
                  <p className="font-medium">
                    {repairType} - {brand} {model}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">Customer</p>
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-slate-500">{email}</p>
                  <p className="text-sm text-slate-500">{phone}</p>
                </div>

                {dropOff === "in-store" ? (
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Drop-off</p>
                    <p className="font-medium">In-store</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-slate-500 mb-1">Service</p>
                    <p className="font-medium">Mail-in Repair</p>
                    <p className="text-sm text-slate-500">You'll receive shipping instructions via email</p>
                  </div>
                )}

                {emailSent && (
                  <div className="bg-teal-50 p-3 rounded-md text-teal-700 text-sm">
                    A notification has been sent to the store. We'll contact you if we need any additional information.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full bg-teal-500 hover:bg-teal-600" onClick={() => router.push("/")}>
                Return to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-teal-500 mb-6">
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Book a Repair Appointment</CardTitle>
            <CardDescription>Fill out the form below to schedule your phone repair</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Device Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="brand">Phone Brand</Label>
                    <Input
                      id="brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      required
                      placeholder="e.g. Apple, Samsung"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Phone Model</Label>
                    <Input
                      id="model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      required
                      placeholder="e.g. iPhone 13, Galaxy S22"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="repair">Repair Type</Label>
                  <Input
                    id="repair"
                    value={repairType}
                    onChange={(e) => setRepairType(e.target.value)}
                    required
                    placeholder="e.g. Screen Replacement, Battery Replacement"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Appointment Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date" className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-slate-500" />
                      Preferred Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time" className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2 text-slate-500" />
                      Preferred Time
                    </Label>
                    <Select value={time} onValueChange={setTime} required>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="dropoff">Service Type</Label>
                  <RadioGroup
                    id="dropoff"
                    value={dropOff}
                    onValueChange={setDropOff}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-store" id="in-store" />
                      <Label htmlFor="in-store" className="font-normal">
                        In-store Drop-off
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mail-in" id="mail-in" />
                      <Label htmlFor="mail-in" className="font-normal">
                        Mail-in Repair
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional information about your device or repair needs"
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Book Appointment"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
