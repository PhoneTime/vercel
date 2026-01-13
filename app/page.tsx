import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  PhoneIcon,
  WrenchIcon,
  CalendarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from "lucide-react"

export const metadata = {
  title: 'Phone Time | On-site Phone Repair Kilsyth & Eastern Suburbs',
  description: 'Phone Time provides professional, affordable on-site phone repair services in Kilsyth and surrounding Melbourne Eastern suburbs.',
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section (保持不变，已统一按钮颜色) */}
      <section className="bg-gradient-to-b from-teal-600 to-teal-500 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <Image src="/images/phonetime-logo.png" alt="Phone Time" width={112} height={112} className="object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">On-site Phone Repairs Kilsyth & Eastern Suburbs</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Cheap prices, best parts, at your door across Melbourne's East.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/price-check">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100">Check Repair Prices</Button>
            </Link>
            <Link href="/appointment">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100">Repair Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. 新增：配件分类区域 (位于 Our Services 上方) */}
      <section className="py-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Shop Accessories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* iPhone 配件 */}
            <CategoryCard 
              image="/images/iphone-acc.jpg" // 请确保上传并命名图片
              title="iPhone Accessories"
              link="https://phonehero.odoo.com/shop/category/accessories-phone-case-iphone-case-1"
            />

            {/* Samsung 配件 */}
            <CategoryCard 
              image="/images/samsung-acc.jpg" // 使用你已有的图片
              title="Samsung Accessories"
              link="https://phonehero.odoo.com/shop/category/accessories-phone-case-samsung-case-7"
            />

            {/* 全部商店 */}
            <CategoryCard 
              image="/images/shop-all.jpg" // 请确保上传并命名图片
              title="Shop All"
              link="https://phonehero.odoo.com/shop"
              isHighlight
            />

          </div>
        </div>
      </section>

      {/* 3. Our Services Section (保持不变) */}
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

      {/* 后续的 Why Choose Us 部分保持不变... */}
    </div>
  )
}

// 配件分类卡片组件
function CategoryCard({ image, title, link, isHighlight = false }: { image: string, title: string, link: string, isHighlight?: boolean }) {
  return (
    <Link href={link} target="_blank" className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border-2 border-transparent group-hover:border-teal-500">
        <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        </div>
        <div className="p-6 text-center">
          <h3 className={`text-xl font-bold mb-2 ${isHighlight ? 'text-teal-600' : 'text-slate-800'}`}>{title}</h3>
          <div className="flex items-center justify-center text-teal-500 font-medium group-hover:underline">
            Shop Now <ArrowRightIcon className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

function ServiceCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border">
      <div className="text-teal-500 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}