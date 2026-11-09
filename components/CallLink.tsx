"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { MessageCircle, Phone, Copy, Check } from "lucide-react"

const clean = (n: string | null) => (n || "").replace(/[^\d+]/g, "").slice(0, 16)
const pretty = (n: string) => (/^04\d{8}$/.test(n) ? `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}` : n)

export default function CallLink() {
  const sp = useSearchParams()
  const num = useMemo(() => clean(sp.get("n")), [sp])
  const sms = sp.get("s") === "1"
  const body = (sp.get("b") || "").slice(0, 1500)
  const href = sms ? `sms:${num}${body ? `?&body=${encodeURIComponent(body)}` : ""}` : `tel:${num}`
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (num) window.location.href = href
  }, [num, href])

  if (!num) {
    return (
      <div className="mx-auto max-w-md rounded-[28px] border border-line bg-white p-7 text-center">
        <p className="text-lg font-bold">No phone number in this link.</p>
      </div>
    )
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sms && body ? body : num)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  return (
    <div className="mx-auto max-w-md rounded-[28px] border border-line bg-white p-7 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-500/10 text-teal-600">
        {sms ? <MessageCircle size={30} /> : <Phone size={30} />}
      </span>
      <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted2">{sms ? "Text" : "Call"}</p>
      <p className="mt-1 text-[34px] font-extrabold tracking-[-0.02em]">{pretty(num)}</p>
      {sms && body && <p className="mt-4 whitespace-pre-line rounded-2xl bg-paper p-4 text-left text-[15px] leading-relaxed text-ink/80">{body}</p>}
      <a
        href={href}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-4 text-lg font-bold text-white"
      >
        {sms ? <MessageCircle size={20} /> : <Phone size={20} />}
        {sms ? "Open Messages" : "Call now"}
      </a>
      <button onClick={copy} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-semibold">
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied ? "Copied" : sms && body ? "Copy message" : "Copy number"}
      </button>
    </div>
  )
}
