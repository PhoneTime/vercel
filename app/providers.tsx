"use client"

import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Tawk.to live chat. On phones it sits above the bottom action bar. */}
      <Script id="tawk-style" strategy="afterInteractive">
        {`window.Tawk_API=window.Tawk_API||{};window.Tawk_API.customStyle={visibility:{mobile:{position:'br',xOffset:12,yOffset:84},desktop:{position:'br',xOffset:20,yOffset:20}}};`}
      </Script>
      <Script strategy="lazyOnload" src="https://embed.tawk.to/67f7c2d06eecad190d7c0390/1ioft201c" />
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </>
  )
}
