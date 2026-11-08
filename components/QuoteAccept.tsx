"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { Check, Loader2, MessageCircle, Phone, CalendarDays } from "lucide-react"
import { money, SITE, telHref } from "@/lib/site"

/* A quote link from the Phone Time repair app: /q?d=<base64url JSON>.
   The answer goes to Formspree with a [PTA:...] code that the app reads from Gmail
   and puts straight onto the right ticket. */

type Q = {
  no: string // ticket number, e.g. R261108-1326
  n?: string // customer name
  m?: string // device
  r?: { n: string; p: number; o?: number }[] // lines: name, price, normal price
  t?: number // total
  v?: string // valid until (YYYY-MM-DD)
  a?: string // address
  e?: string // earliest visit (YYYY-MM-DD)
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
const encode = (o: object) => btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, "")

const inputCls = "w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-base outline-none transition-colors focus:border-teal-500 focus:bg-white"

export default function QuoteAccept() {
  const sp = useSearchParams()
  const q = useMemo(() => decode(sp.get("d")), [sp])
  const [mode, setMode] = useState<"accept" | "ask">("accept")
  const [day, setDay] = useState("")
  const [win, setWin] = useState("")
  const [addr, setAddr] = useState(q?.a || "")
  const [note, setNote] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")

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

  const send = async () => {
    if (!ok) return
    setState("sending")
    const act = mode === "ask" ? "question" : "accept"
    const tok = encode({ v: 1, no: q.no, act, d: mode === "accept" ? day : "", w: mode === "accept" ? win : "", a: addr.trim(), nt: note.trim() })
    const msg =
      (act === "accept" ? "Quote accepted\n" : "Question about a quote\n") +
      `Quote: Q-${q.no}\nName: ${q.n || ""}\nDevice: ${q.m || ""}` +
      (q.t != null ? `\nTotal: ${money(q.t)}` : "") +
      (act === "accept" ? `\nPreferred: ${longDay(day)}, ${win}\nAddress: ${addr.trim()}` : "") +
      (note.trim() ? `\nNote: ${note.trim()}` : "") +
      `\n\nCode for the repair app:\n[PTA:${tok}]`
    try {
      const r = await fetch(SITE.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: q.n || "Customer",
          _subject: `${act === "accept" ? "Quote accepted" : "Quote question"}: Q-${q.no} – ${q.n || ""}`,
          message: msg,
        }),
      })
      if (!r.ok) throw new Error(String(r.status))
      setState("sent")
      const w = window as unknown as { gtag?: (...a: unknown[]) => void }
      if (act === "accept") w.gtag?.("event", "quote_accepted", { value: q.t || undefined, currency: "AUD" })
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      setState("error")
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-[28px] border border-line bg-white p-8 text-center sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-600 text-white">
          <Check className="h-8 w-8" strokeWidth={3} aria-hidden />
        </div>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight">{mode === "accept" ? `Thanks${first ? ", " + first : ""}. Quote accepted.` : "Question sent."}</h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted2">
          {mode === "accept"
            ? `I'll text you shortly to confirm ${longDay(day)} (${win.toLowerCase()}) for your ${q.m || "repair"}.`
            : "I'll get back to you by text as soon as I can."}
        </p>
        {mode === "accept" && q.dp && q.dl ? (
          <div className="mx-auto mt-6 max-w-md rounded-2xl bg-mat p-5 text-left">
            <p className="font-semibold">Deposit: {money(q.dp)}</p>
            <p className="mt-1 text-sm text-muted2">It comes off your final bill. I order the part as soon as it arrives.</p>
            <a href={q.dl} target="_blank" rel="noopener" className="mt-4 inline-block rounded-full bg-teal-600 px-6 py-3 font-semibold text-white">Pay the deposit</a>
          </div>
        ) : null}
        <Link href="/" className="mt-8 inline-block rounded-full border border-line px-6 py-3 font-semibold hover:bg-mat">Back to home</Link>
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
                {q.e ? <p className="mt-1 text-sm text-muted2">Earliest: {longDay(q.e)}</p> : null}
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {days.map((k) => (
                    <button key={k} type="button" onClick={() => setDay(k)} className={`shrink-0 rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition-colors ${day === k ? "border-teal-600 bg-teal-600 text-white" : "border-line bg-paper hover:border-teal-500"}`}>
                      {dayLabel(k)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight">What time?</h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
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

          {state === "error" ? <p className="mt-5 rounded-2xl bg-red-50 p-4 text-red-700">That didn&apos;t send. Please try again, or call {SITE.phone}.</p> : null}
          <button type="button" onClick={send} disabled={!ok || state === "sending"} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 px-6 py-4 text-lg font-bold text-white transition-opacity disabled:opacity-40">
            {state === "sending" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : mode === "accept" ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
            {mode === "accept" ? "Accept quote" : "Send question"}
          </button>
          {mode === "accept" ? <p className="mt-3 text-center text-sm text-muted2">I&apos;ll text you to confirm the exact time. You only pay once it&apos;s fixed.</p> : null}
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
