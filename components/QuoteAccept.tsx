"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { Check, MessageCircle, Phone, CalendarDays } from "lucide-react"
import { money, SITE, telHref, waHref } from "@/lib/site"

/* A quote link from the Phone Time repair app: /q?d=<base64url JSON>.
   Accepting opens the customer's Messages app with a ready-made text to my mobile –
   no form service, so nothing counts against the Formspree limit. */

type Q = {
  no: string // ticket number, e.g. R261108-1326
  n?: string // customer name
  m?: string // device
  r?: { n: string; p: number; o?: number }[] // lines: name, price, normal price
  t?: number // total
  v?: string // valid until (YYYY-MM-DD)
  a?: string // address
  e?: string // earliest visit (YYYY-MM-DD)
  et?: string // time I suggested on that day (HH:MM)
  dp?: number // deposit amount
  dl?: string // deposit payment link
}

const WINDOWS = [
  ["Morning", "9am – 12pm"],
  ["Afternoon", "12pm – 4pm"],
  ["Evening", "4pm – 8pm"],
  ["Any time", "Whatever suits"],
] as const

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const dayLabel = (k: string) => new Date(k + "T12:00").toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })
const tLabel = (t: string) => { const [h, m] = t.split(":").map(Number); return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}` }
const isTime = (w: string) => /^\d{1,2}:\d{2}$/.test(w)
const winLabel = (w: string) => (isTime(w) ? tLabel(w) : w)
const longDay = (k: string) => new Date(k + "T12:00").toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })

function decode(s: string | null): Q | null {
  if (!s) return null
  try {
    const b = s.replace(/-/g, "+").replace(/_/g, "/")
    const j = JSON.parse(decodeURIComponent(escape(atob(b + "===".slice((b.length + 3) % 4)))))
    return j && j.no ? (j as Q) : null
  } catch {
    return null
  }
}

const inputCls = "w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-base outline-none transition-colors focus:border-teal-500 focus:bg-white"

export default function QuoteAccept() {
  const sp = useSearchParams()
  const q = useMemo(() => decode(sp.get("d")), [sp])
  const [mode, setMode] = useState<"accept" | "ask">("accept")
  const [day, setDay] = useState(q?.e && q.e >= dayKey(new Date()) ? q.e : "")
  const [win, setWin] = useState(q?.e && q.e >= dayKey(new Date()) && q?.et && isTime(q.et) ? q.et : "")
  const [addr, setAddr] = useState(q?.a || "")
  const [note, setNote] = useState("")
  const [state, setState] = useState<"idle" | "sent">("idle")

  const days = useMemo(() => {
    const out: string[] = []
    const d0 = new Date()
    const min = q?.e && q.e > dayKey(d0) ? q.e : dayKey(d0)
    for (let i = 0; out.length < 14 && i < 60; i++) {
      const d = new Date(d0)
      d.setDate(d0.getDate() + i)
      if (dayKey(d) >= min) out.push(dayKey(d))
    }
    return out
  }, [q])

  /* Link from the "Accept" button on the quote PDF (?go=1): the day and time are already set,
     so go straight to the ready-made text. */
  const sendRef = useRef<() => void>(() => {})
  const went = useRef(false)
  const preset = !!q && !!day && !!win && addr.trim().length > 4
  useEffect(() => {
    if (went.current || sp.get("go") !== "1" || !preset) return
    went.current = true
    sendRef.current()
  }, [preset, sp])

  if (!q) {
    return (
      <div className="rounded-[28px] border border-line bg-white p-8 text-center sm:p-12">
        <h2 className="text-2xl font-extrabold tracking-tight">This quote link doesn&apos;t work</h2>
        <p className="mx-auto mt-3 max-w-md text-muted2">It may have been cut short when it was copied. Call or text me and I&apos;ll sort it out.</p>
        <a href={telHref} className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white"><Phone className="h-4 w-4" aria-hidden />{SITE.phone}</a>
      </div>
    )
  }

  const first = (q.n || "").trim().split(" ")[0]
  const expired = !!q.v && q.v < dayKey(new Date())
  const ok = mode === "ask" ? note.trim().length > 2 : !!day && !!win && addr.trim().length > 4

  const lineTxt = (q.r || []).filter((x) => x.p > 0 || (x.o || 0) > 0).map((x) => x.n).join(", ")
  const msg =
    mode === "ask"
      ? `Hi, it's ${first || q.n || ""} (quote Q-${q.no}${q.m ? ", " + q.m : ""}). ${note.trim()}`
      : `Hi, it's ${first || q.n || ""}. I accept quote Q-${q.no} for my ${q.m || "phone"}` +
        (lineTxt ? `: ${lineTxt}` : "") +
        (q.t != null ? ` – total ${money(q.t)}` : "") +
        `.\nBooking: ${day ? longDay(day) : ""}${win ? (isTime(win) ? " at " + tLabel(win) : ", " + win.toLowerCase()) : ""}` +
        (addr.trim() ? `\nAddress: ${addr.trim()}` : "") +
        (note.trim() ? `\nNote: ${note.trim()}` : "") +
        `\nConfirmed ✅`
  const smsHref = "sms:" + SITE.phone.replace(/\s/g, "") + "?&body=" + encodeURIComponent(msg)

  /* No form service: the customer's own Messages app opens with the text ready to send to me. */
  const send = () => {
    if (!ok) return
    setState("sent")
    const w = window as unknown as { gtag?: (...a: unknown[]) => void }
    if (mode === "accept") w.gtag?.("event", "quote_accepted", { value: q.t || undefined, currency: "AUD" })
    window.location.href = smsHref
  }

  sendRef.current = send

  if (state === "sent") {
    return (
      <div className="rounded-[28px] border border-line bg-white p-8 text-center sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-600 text-white">
          <MessageCircle className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight">Almost done – just tap Send</h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted2">
          Your Messages app opens with the text ready to send to me ({SITE.phone}). {mode === "accept" ? "Once it arrives I'll text you back to confirm." : "I'll reply as soon as I can."}
        </p>
        <div className="mx-auto mt-5 max-w-md whitespace-pre-line rounded-2xl bg-paper p-4 text-left text-[15px] text-ink">{msg}</div>
        <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
          <a href={smsHref} className="inline-flex items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-semibold text-white"><MessageCircle className="h-4 w-4" aria-hidden />Open Messages again</a>
          <a href={waHref(msg)} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 font-semibold hover:bg-mat">Send by WhatsApp</a>
        </div>
        {mode === "accept" && q.dp && q.dl ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-mat p-5 text-left">
            <p className="font-semibold">Deposit: {money(q.dp)}</p>
            <p className="mt-1 text-sm text-muted2">It comes off your final bill. I order the part as soon as it arrives.</p>
            <a href={q.dl} target="_blank" rel="noopener" className="mt-4 inline-block rounded-full bg-teal-600 px-6 py-3 font-semibold text-white">Pay the deposit</a>
          </div>
        ) : null}
        <p className="mt-6 text-sm text-muted2">Or call <a href={telHref} className="font-semibold text-ink underline">{SITE.phone}</a> · <button type="button" onClick={() => setState("idle")} className="font-semibold text-ink underline">Change my answer</button></p>
      </div>
    )
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_380px] lg:items-start">
      <div className="min-w-0 space-y-5">
        <section className="rounded-[28px] border border-line bg-white p-5 sm:p-7">
          <div className="flex gap-2 rounded-full bg-mat p-1">
            {(
              [
                ["accept", "Accept quote"],
                ["ask", "Ask a question"],
              ] as const
            ).map(([k, l]) => (
              <button key={k} type="button" onClick={() => setMode(k)} className={`flex-1 rounded-full px-4 py-2.5 text-[15px] font-semibold transition-colors ${mode === k ? "bg-ink text-white" : "text-muted2"}`}>
                {l}
              </button>
            ))}
          </div>

          {mode === "accept" ? (
            <div className="mt-6 space-y-6">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight"><CalendarDays className="h-5 w-5 text-teal-600" aria-hidden />Which day suits you?</h2>
                {q.e ? <p className="mt-1 text-sm text-muted2">Earliest I can come: {longDay(q.e)}{q.et && isTime(q.et) ? ` at ${tLabel(q.et)}` : ""}</p> : null}
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {days.map((k) => (
                    <button key={k} type="button" onClick={() => { setDay(k); if (isTime(win) && k !== q.e) setWin("") }} className={`shrink-0 rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition-colors ${day === k ? "border-teal-600 bg-teal-600 text-white" : "border-line bg-paper hover:border-teal-500"}`}>
                      {dayLabel(k)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">What time?</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {q.et && isTime(q.et) && day === q.e ? (
                    <button type="button" onClick={() => setWin(q.et!)} className={`col-span-2 rounded-2xl border px-4 py-3 text-left transition-colors ${win === q.et ? "border-teal-600 bg-teal-50" : "border-line bg-paper hover:border-teal-500"}`}>
                      <span className="block font-semibold">{tLabel(q.et)}</span>
                      <span className="block text-sm text-muted2">The time I suggested</span>
                    </button>
                  ) : null}
                  {WINDOWS.map(([w, t]) => (
                    <button key={w} type="button" onClick={() => setWin(w)} className={`rounded-2xl border px-4 py-3 text-left transition-colors ${win === w ? "border-teal-600 bg-teal-50" : "border-line bg-paper hover:border-teal-500"}`}>
                      <span className="block font-semibold">{w}</span>
                      <span className="block text-sm text-muted2">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="qa-addr" className="text-lg font-bold tracking-tight">Where should I come?</label>
                <input id="qa-addr" className={inputCls + " mt-3"} value={addr} onChange={(e) => setAddr(e.target.value)} placeholder="Street address and suburb" autoComplete="street-address" />
              </div>
              <div>
                <label htmlFor="qa-note" className="text-lg font-bold tracking-tight">Anything I should know? <span className="font-normal text-muted2">(optional)</span></label>
                <textarea id="qa-note" className={inputCls + " mt-3"} rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Ring the bell at the side gate" />
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <label htmlFor="qa-q" className="text-lg font-bold tracking-tight">Your question</label>
              <textarea id="qa-q" className={inputCls + " mt-3"} rows={5} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Can you do it on the weekend?" />
            </div>
          )}

                    <button type="button" onClick={send} disabled={!ok} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-4 text-lg font-bold text-white transition-opacity disabled:opacity-40">
            {mode === "accept" ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
            {mode === "accept" ? "Accept quote" : "Text my question"}
          </button>
          {mode === "accept" ? <p className="mt-3 text-center text-sm text-muted2">Opens a text to me with your booking details – just tap Send. You only pay once it&apos;s fixed.</p> : null}
        </section>
      </div>

      <aside className="order-first rounded-[28px] border border-line bg-white p-5 sm:p-7 lg:order-none lg:sticky lg:top-24">
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">Quote Q-{q.no}</p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{q.m || "Your repair"}</h2>
        {first ? <p className="text-muted2">For {first}</p> : null}
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {(q.r || []).map((x, i) => (
            <li key={i} className="flex items-baseline justify-between gap-3 py-3">
              <span>{x.n}</span>
              <span className="tnum whitespace-nowrap font-semibold">
                {x.o != null && x.o > x.p ? <s className="mr-1.5 font-normal text-muted2">{money(x.o)}</s> : null}
                {money(x.p)}
              </span>
            </li>
          ))}
        </ul>
        {q.t != null ? (
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-bold">Total</span>
            <span className="tnum text-2xl font-extrabold text-teal-700">{money(q.t)}</span>
          </div>
        ) : null}
        {q.v ? <p className={`mt-3 text-sm ${expired ? "font-semibold text-red-600" : "text-muted2"}`}>{expired ? `This quote expired on ${dayLabel(q.v)} – accept anyway and I'll confirm the price.` : `Valid until ${dayLabel(q.v)}`}</p> : null}
        <p className="mt-4 text-sm text-muted2">No call-out fee. {SITE.warranty}-day warranty on parts and labour. Questions? <a href={telHref} className="font-semibold text-ink underline">{SITE.phone}</a></p>
      </aside>
    </div>
  )
}
