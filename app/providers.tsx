'use client'

import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 插入 Tawk.to 聊天脚本 */}
      <Script
        strategy="afterInteractive"
        src="https://embed.tawk.to/67f7c2d06eecad190d7c0390/1ioft201c"
      />
      
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  )
}
