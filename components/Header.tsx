import Link from "next/link"
import Image from "next/image"

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* 左侧 Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/phonetime-logo.png"
            alt="Phone Time Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="leading-tight">
            <div className="text-xl font-bold text-teal-600">Phone Time</div>
            <div className="text-sm text-gray-600">Phone Repair</div>
          </div>
        </Link>

        {/* 右侧导航 */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-teal-600 transition">Home</Link>
          <Link href="/price-check" className="hover:text-teal-600 transition">Price Check</Link>
          <Link href="/accessories" className="hover:text-teal-600 transition">Accessories</Link>
          <Link href="/appointment" className="hover:text-teal-600 transition">Appointment</Link>
          <Link href="/contact" className="hover:text-teal-600 transition">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
