import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import Providers from "@/app/providers"
import Header from "../components/Header"
import Script from "next/script" 

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Phone Time | On-site Phone Repair Kilsyth & Eastern Suburbs", 
  description: "Phone Time provides professional, affordable on-site phone repair services in Kilsyth and surrounding Melbourne Eastern suburbs. We use the best quality parts to fix your screen or battery at your door.",
  keywords: "Phone Repair Kilsyth, On-site Phone Repair Melbourne, Mobile Phone Repair Kilsyth, Cheap iPhone Repair, Phone Time Repair",
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
      <head>
        {/* Google Tag (gtag.js) 基础脚本 - 使用 Ads ID 作为主加载源 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17522228043"
          strategy="afterInteractive"
        />
        {/* 配置 Google Ads 和 Google Analytics */}
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17522228043');
            gtag('config', 'G-94D6CCRGY8');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}