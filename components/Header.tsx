"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // 按照你的要求重新排列了链接的顺序
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Get a Quote", href: "/price-check" },
    { name: "Repair Now", href: "/appointment" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo Image */}
          <img src="/images/phonetime-logo.png" alt="PhoneTime Logo" className="h-12" />

          {/* Brand Name */}
          <div className="text-left">
            <span className="text-2xl font-bold text-teal-600">PhoneTime</span>
            <br />
            <span className="text-lg font-medium text-teal-600">Phone Repair</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {/* 循环渲染的内部链接 */}
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-teal-600 transition"
            >
              {link.name}
            </Link>
          ))}
          {/* Accessories 链接依然独立存在，放在 Home 之后 */}
          <a
            href="https://auphonetime.myshopify.com"
            className="text-gray-700 hover:text-teal-600 transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            Accessories
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 py-4 shadow-md">
          <nav className="space-y-2">
            {/* Mobile端导航栏也相应调整了顺序 */}
            <Link
              href="/"
              className="block text-gray-700 hover:text-teal-600 transition"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="https://auphonetime.myshopify.com"
              className="block text-gray-700 hover:text-teal-600 transition"
              onClick={() => setMenuOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Accessories
            </a>
            {navLinks.slice(1).map((link) => ( // 从第二个链接开始循环，Home已单独处理
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-teal-600 transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}