import "./globals.css"
import { Inter } from "next/font/google"
import type { ReactNode } from "react"
import Providers from "@/app/providers" // 引入 Providers
import Header from "../components/Header" // 引入 Header

const inter = Inter({ subsets: ["latin"] }) 

// --- 优化后的 SEO 代码部分 ---
export const metadata = {
  // 标题：包含店名、核心服务、以及最重要的 Kilsyth 区域
  title: "Phone Time | On-site Phone Repair Kilsyth & Eastern Suburbs", 
  
  // 描述：融合了你要求的“上门服务”、“便宜价格”和“最好配件”
  description: "Phone Time provides professional, affordable on-site phone repair services in Kilsyth and surrounding Melbourne Eastern suburbs. We use the best quality parts to fix your screen or battery at your door.",
  
  // 关键词 (虽然现代 SEO 权重降低，但有助于 Google 理解服务区域)
  keywords: "Phone Repair Kilsyth, On-site Phone Repair Melbourne, Mobile Phone Repair Kilsyth, Cheap iPhone Repair, Phone Time Repair",
  
  generator: 'v0.dev',
}
// --- 优化结束 ---

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <Providers>
          <Header /> {/* 顶部导航 */}
          <main>
            {children} {/* 页面主要内容 */}
          </main>
        </Providers>
      </body>
    </html>
  )
}