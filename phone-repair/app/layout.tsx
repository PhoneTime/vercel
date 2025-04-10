import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Phone Time Phone Repair",
  description: "Timely repairs, timeless quality - Phone repair services in Mooroolbark, Melbourne",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <header className="border-b">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
              <div className="flex items-center">
                <img
  src="/images/phonetime-logo.png"
  alt="Phone Time Logo"
  className="w-12 h-12 object-contain mr-3"
/>
                <div>
                  <div className="font-bold text-xl text-teal-500">Phone Time</div>
                  <div className="text-xs text-teal-600">Phone Repair</div>
                </div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-slate-600 hover:text-teal-500">
                  Home
                </a>
                <a href="/price-check" className="text-slate-600 hover:text-teal-500">
                  Price Check
                </a>
                <a href="/appointment" className="text-slate-600 hover:text-teal-500">
                  Book Appointment
                </a>
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="bg-slate-900 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">Phone Time Phone Repair</h3>
                  <p className="text-slate-300">
                    Timely repairs, timeless quality. Professional phone repair services with competitive prices.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                  <p className="text-slate-300">Mooroolbark</p>
                  <p className="text-slate-300">Melbourne, Australia</p>
                  <p className="text-slate-300">Phone: 0468897890</p>
                  <p className="text-slate-300">Email: info@phonetime.com.au</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Hours</h3>
                  <p className="text-slate-300">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-slate-300">Saturday: 10AM - 4PM</p>
                  <p className="text-slate-300">Sunday: Closed</p>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400">
                <p>© {new Date().getFullYear()} Phone Time Phone Repair. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'