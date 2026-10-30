"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, Phone } from "lucide-react"
import { SITE, telHref } from "@/lib/site"

const NAV = [
  { name: "Prices", href: "/prices" },
  { name: "Guides", href: "/guides" },
  { name: "Areas", href: "/areas" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  useEffect(() => setOpen(false), [path])

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Phone Time home">
          <img src="/logo-256.png" alt="" width={36} height={40} className="h-10 w-auto" />
          <span className="leading-none">
            <span className="block text-[19px] font-extrabold tracking-tight text-ink">Phone Time</span>
            <span className="block text-[12px] font-medium text-teal-700">Mobile phone repair</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-mat ${path.startsWith(l.href) ? "text-teal-700" : "text-ink/80"}`}
            >
              {l.name}
            </Link>
          ))}
          <a href={SITE.shop} target="_blank" rel="noopener" className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink/80 hover:bg-mat">
            Accessories
          </a>
          <a href={telHref} className="ml-2 hidden items-center gap-2 px-2 text-[15px] font-semibold text-ink tnum xl:flex">
            <Phone className="h-4 w-4 text-teal-600" aria-hidden />
            {SITE.phone}
          </a>
          <Link href="/book?mode=quote" className="ml-2 rounded-full border border-ink/20 px-5 py-2.5 text-[15px] font-semibold text-ink hover:border-ink">
            Get a quote
          </Link>
          <Link href="/book" className="ml-2 rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-teal-800">
            Book a repair
          </Link>
        </nav>

        <button
          className="ml-auto -mr-2 rounded-full p-2 text-ink lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile">
          {[...NAV, { name: "Get a quote", href: "/book?mode=quote" }, { name: "Book a repair", href: "/book" }].map((l) => (
            <Link key={l.href} href={l.href} className="block border-b border-line/70 py-3.5 text-lg font-semibold text-ink">
              {l.name}
            </Link>
          ))}
          <a href={SITE.shop} target="_blank" rel="noopener" className="block py-3.5 text-lg font-semibold text-ink">
            Accessories shop
          </a>
        </nav>
      )}
    </header>
  )
}
