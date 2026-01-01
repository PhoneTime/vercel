import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import Providers from "@/app/providers"
import Header from "../components/Header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Phone Time | On-site Phone Repair Kilsyth & Eastern Suburbs", 
  description: "Phone Time provides professional, affordable on-site phone repair services in Kilsyth and surrounding Melbourne Eastern suburbs. We use the best quality parts to fix your screen or battery at your door.",
  keywords: "Phone Repair Kilsyth, On-site Phone Repair Melbourne, Mobile Phone Repair Kilsyth, Cheap iPhone Repair, Phone Time Repair",
  // 以下部分修复了你在截图源代码里看到的旧标题问题
  openGraph: {
    title: "Phone Time | On-site Phone Repair Kilsyth & Eastern Suburbs",
    description: "Affordable on-site phone repair services in Kilsyth and Eastern Suburbs.",
    type: "website",
    url: "https://phonetime.com.au",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Time | On-site Phone Repair Kilsyth & Eastern Suburbs",
    description: "Professional mobile phone repair at your door in Kilsyth.",
  },
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}