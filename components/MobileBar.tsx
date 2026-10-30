"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, MessageCircle, CalendarCheck, Tag } from "lucide-react"
import { telHref, waHref } from "@/lib/site"

/* Thumb-reach action bar on phones. Hidden on the booking page so it never covers the form. */
export default function MobileBar() {
  const path = usePathname()
  if (path.startsWith("/book")) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur md:hidden">
      <div className="grid grid-cols-[1fr_1fr_1fr_1.3fr] gap-1.5">
        <a href={telHref} className="flex flex-col items-center justify-center rounded-2xl py-1.5 text-[13px] font-semibold text-ink active:bg-mat">
          <Phone className="mb-0.5 h-5 w-5 text-teal-700" aria-hidden />
          Call
        </a>
        <a href={waHref("Hi Phone Time, I need a phone repair")} target="_blank" rel="noopener" className="flex flex-col items-center justify-center rounded-2xl py-1.5 text-[13px] font-semibold text-ink active:bg-mat">
          <MessageCircle className="mb-0.5 h-5 w-5 text-[#1fa855]" aria-hidden />
          WhatsApp
        </a>
        <Link href="/book?mode=quote" className="flex flex-col items-center justify-center rounded-2xl py-1.5 text-[13px] font-semibold text-ink active:bg-mat">
          <Tag className="mb-0.5 h-5 w-5 text-teal-700" aria-hidden />
          Get quote
        </Link>
        <Link href="/book" className="flex flex-col items-center justify-center rounded-2xl bg-ink py-1.5 text-[13px] font-semibold text-white active:bg-teal-800">
          <CalendarCheck className="mb-0.5 h-5 w-5 text-aqua" aria-hidden />
          Book repair
        </Link>
      </div>
    </div>
  )
}
