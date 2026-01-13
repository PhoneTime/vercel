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
  description: 'Phone Time provides professional, affordable on-site phone repair services in Kilsyth and surrounding Melbourne Eastern suburbs. Cheap prices and best parts at your door.',
  keywords: ['phone repair Kilsyth', 'on-site phone repair Melbourne', 'mobile phone repair Eastern Suburbs', 'cheap iPhone repair', 'Phone Time'],
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - 头部横幅 */}
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

      {/* 2. Shop Accessories - 6个分类卡片布局 */}
      <section className="py-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-10 text-slate-800">Shop Accessories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <CategoryCard image="/images/iphone-acc.jpg" title="iPhone Accessories" link="https://phonehero.odoo.com/shop/category/accessories-phone-case-iphone-case-1" />
            <CategoryCard image="/images/samsung-acc.jpg" title="Samsung Accessories" link="https://phonehero.odoo.com/shop/category/accessories-phone-case-samsung-case-7" />
            <CategoryCard image="/images/charger-cable.jpg" title="Charger & Cables" link="https://phonehero.odoo.com/shop/category/accessories-charges-cables-54" />
            <CategoryCard image="/images/power-bank.jpg" title="Power Bank" link="https://phonehero.odoo.com/shop/category/accessories-power-bank-55" />
            <CategoryCard image="/images/car-holder.jpg" title="Car Holders" link="https://phonehero.odoo.com/shop/category/accessories-mounts-car-accessories-57" />
            <CategoryCard image="/images/shop-all.jpg" title="Shop All" link="https://phonehero.odoo.com/shop" isHighlight />
          </div>
        </div>
      </section>

      {/* 3. Our Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <ServiceCard icon={<PhoneIcon className="h-10 w-10" />} title="Screen Repairs" description="Fast screen replacement at your location." />
            <ServiceCard icon={<WrenchIcon className="h-10 w-10" />} title="Battery Replacement" description="Restore your phone's battery life." />
            <ServiceCard icon={<CheckCircleIcon className="h-10 w-10" />} title="Charging Port" description="Expert fix for charging issues." />
            <ServiceCard icon={<CalendarIcon className="h-10 w-10" />} title="Same-Day Service" description="Repairs completed at your door." />
          </div>
        </div>
      </section>

      {/* 4. Why Choose Phone Time Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-slate-800">Why Choose Phone Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard number="1" title="We Come To You" description="Serving Kilsyth and all Eastern Suburbs. No extra travel fees applied!" />
            <FeatureCard number="2" title="Best Quality Parts" description="We use only the highest-grade parts to ensure your phone lasts." />
            <FeatureCard number="3" title="Cheap & Fast" description="Professional service at a price that won't break the bank." />
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action Section */}
      <section className="py-16 bg-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Your Phone Fixed Today?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Mobile phone repair at your door in Kilsyth and Eastern Suburbs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="tel:0468897890">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100">Call 0468 897 890</Button>
            </Link>
            <Link href="/appointment">
              <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white">Book Online</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer - 页脚 */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Phone Time</h3>
              <p className="text-sm">Your trusted on-site phone repair specialist in Kilsyth and Melbourne's East. Best parts & cheap prices.</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/price-check" className="hover:text-teal-400">Repair Prices</Link></li>
                <li><Link href="/appointment" className="hover:text-teal-400">Book a Repair</Link></li>
                <li><Link href="https://phonehero.odoo.com/shop" target="_blank" className="hover:text-teal-400">Shop Accessories</Link></li>
              </ul>
            </div>
            <div className="text-center md:text-right text-sm">
              <h3 className="text-white font-bold text-lg mb-4">Service Area</h3>
              <p>Kilsyth, Victoria & Eastern Suburbs</p>
              <p className="mt-2 text-teal-500 font-bold">0468 897 890</p>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>© {new Date().getFullYear()} Phone Time Phone Repair. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// 辅助组件：配件分类卡片
function CategoryCard({ image, title, link, isHighlight = false }: { image: string, title: string, link: string, isHighlight?: boolean }) {
  return (
    <Link href={link} target="_blank" className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 border-2 border-transparent group-hover:border-teal-500">
        <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="p-6 text-center">
          <h3 className={`text-xl font-bold mb-1 ${isHighlight ? 'text-teal-600' : 'text-slate-800'}`}>{title}</h3>
          <div className="flex items-center justify-center text-teal-500 font-medium group-hover:underline text-sm uppercase tracking-wider">
            Shop Now <ArrowRightIcon className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// 辅助组件：服务展示卡片
function ServiceCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border">
      <div className="text-teal-500 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  )
}

// 辅助组件：特色优势卡片
function FeatureCard({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="bg-teal-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto">{number}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  )
}