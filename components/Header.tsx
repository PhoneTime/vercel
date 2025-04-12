"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Accessories", href: "/accessories" },
    { name: "Contact", href: "/contact" },
    { name: "Our Services", href: "/#services" },
    { name: "Get a Quote", href: "/quote" },
  ]

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo and Brand Name */}
        <Link href="/" className="flex items-center space-x-2">
          {/* Logo Image */}
          <img src="/images/phonetime-logo.png" alt="PhoneTime Logo" className="h-12" /> {/* Adjust the height here */}

          {/* Brand Name */}
          <div className="text-left">
            <span className="text-2xl font-bold text-teal-600">PhoneTime</span>
            <br />
            <span className="text-lg font-medium text-teal-600">Phone Repair</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-teal-600 transition"
            >
              {link.name}
            </Link>
          ))}
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
            {navLinks.map((link) => (
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
