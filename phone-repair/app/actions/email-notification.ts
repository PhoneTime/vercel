"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingNotification(bookingData: {
  name: string
  email: string
  phone: string
  brand: string
  model: string
  repairType: string
  date: string
  time: string
  dropOff: string
  notes?: string
  confirmationNumber: string
}) {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #0D9488; text-align: center;">New Booking Received</h1>
        <div style="border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin-top: 20px;">
          <h2 style="color: #334155; margin-top: 0;">Booking Details</h2>
          <p><strong>Confirmation Number:</strong> ${bookingData.confirmationNumber}</p>
          <p><strong>Customer:</strong> ${bookingData.name}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Phone:</strong> ${bookingData.phone}</p>
          <p><strong>Device:</strong> ${bookingData.brand} ${bookingData.model}</p>
          <p><strong>Repair Type:</strong> ${bookingData.repairType}</p>
          <p><strong>Date:</strong> ${bookingData.date}</p>
          <p><strong>Time:</strong> ${bookingData.time}</p>
          <p><strong>Service Type:</strong> ${bookingData.dropOff === "in-store" ? "In-store Drop-off" : "Mail-in Repair"}</p>
          ${bookingData.notes ? `<p><strong>Notes:</strong> ${bookingData.notes}</p>` : ""}
        </div>
        <div style="text-align: center; margin-top: 20px; color: #64748B; font-size: 14px;">
          <p>This is an automated notification from Phone Time Phone Repair.</p>
        </div>
      </div>
    `

    // Send to your store
    await resend.emails.send({
      from: "Phone Time <info@phonetime.com.au>",
      to: "info@phonetime.com.au",
      subject: `New Repair Booking: ${bookingData.confirmationNumber}`,
      html: htmlContent,
    })

    // Send to customer
    await resend.emails.send({
      from: "Phone Time <info@phonetime.com.au>",
      to: bookingData.email,
      subject: `Your Repair Booking Confirmation: ${bookingData.confirmationNumber}`,
      html: htmlContent,
    })

    return { success: true, message: "Emails sent successfully" }
  } catch (error) {
    console.error("Failed to send email notification:", error)
    return { success: false, message: "Failed to send email notification" }
  }
}
