// lib/email.ts
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type EmailOptions = {
  to: string
  subject: string
  html: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const response = await resend.emails.send({
      from: "Phone Time <info@phonetime.com.au>", // 发件邮箱必须是你 Resend 验证过的
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log("Email sent:", response)
    return response
  } catch (error) {
    console.error("Email send failed:", error)
    throw error
  }
}

export function generateBookingEmailHtml(bookingData: any) {
  return `
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
}
