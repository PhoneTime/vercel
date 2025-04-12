import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import Providers from "@/app/providers" // 引入 Providers
import Header from "../components/Header" // 引入 Header

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Phone Time Phone Repair",
  description: "Timely repairs, timeless quality - Phone repair services in Mooroolbark, Melbourne",
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <Providers>
          <Header /> {/* 顶部导航 */}
          {children} {/* 页面内容 */}
        </Providers>
      </body>
    </html>
  )
}
