import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import Providers from "@/app/providers"
import Header from "../components/Header"
import Script from "next/script" 
import Link from "next/link"
import { MessageCircleIcon, PhoneCallIcon } from "lucide-react"

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
        {/* Google Tag (gtag.js) 基础脚本 */}
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

        {/* --- 全站通用：右下角悬浮按钮组 (WhatsApp & Call) --- */}
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
          {/* WhatsApp 按钮 - 绿色 */}
          <Link 
            href="https://wa.me/61468897890" 
            target="_blank"
            className="bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          >
            <MessageCircleIcon className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
              WhatsApp
            </span>
          </Link>

          {/* 拨号按钮 - 蓝色/原色 */}
          <Link 
            href="tel:0468897890"
            className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          >
            <PhoneCallIcon className="h-6 w-6" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
              Call Now
            </span>
          </Link>
        </div>
      </body>
    </html>
  )
}