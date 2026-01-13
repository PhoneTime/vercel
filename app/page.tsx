import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  PhoneIcon,
  WrenchIcon,
  CalendarIcon,
  CheckCircleIcon
} from "lucide-react"

export const metadata = {
  title: 'Phone Time | On-site Phone Repair Kilsyth & Eastern Suburbs',
  description: 'Phone Time provides professional, affordable on-site phone repair services in Kilsyth and surrounding Melbourne Eastern suburbs.',
  keywords: ['phone repair Kilsyth', 'on-site phone repair Melbourne', 'mobile phone repair Eastern Suburbs', 'cheap iPhone repair', 'Phone Time'],
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-teal-600 to-teal-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/phonetime-logo.png"
              alt="Phone Time Logo"
              width={112}
              height={112}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">On-site Phone Repairs Kilsyth & Eastern Suburbs</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Cheap prices, best parts, at your door across Melbourne's East.</p>
          
          {/* 按钮组：已修复文字显示问题，统一为白底绿字 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/price-check">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100">
                Check Repair Prices
              </Button>
            </Link>
            <Link href="/appointment">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100">
                Repair Now
              </Button>
            </Link>
          </div>

          {/* S26 海报区域：已链接至 Odoo Store */}
          <div className="max-w-4xl mx-auto px-4">
            <Link href="https://phonehero.odoo.com/shop" target="_blank">
              <div className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border-4 border-white/20">
                <Image 
                  src="/images/accessories-banner.jpg" 
                  alt="Samsung Galaxy S26 Accessories" 
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                {/* 悬停时的光泽交互效果 */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
            <p className="mt-4 text-sm text-teal-500 font-medium bg-white/90 inline-block px-4 py-1 rounded-full shadow-sm">
              ✨ Click to shop S26 series cases & protectors
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard icon={<PhoneIcon className="h-10 w-10" />} title="Screen Repairs" description="Fast screen replacement at your location." />
            <ServiceCard icon={<WrenchIcon className="h-10 w-10" />} title="Battery Replacement" description="Restore your phone's battery life." />
            <ServiceCard icon={<CheckCircleIcon className="h-10 w-10" />} title="Charging Port" description="Expert fix for charging issues." />
            <ServiceCard icon={<CalendarIcon className="h-10 w-10" />} title="Same-Day Service" description="Repairs completed at your door." />
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="text-teal-500 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}