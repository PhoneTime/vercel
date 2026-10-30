"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Check, ChevronDown, Search, MessageCircle, Phone, Loader2 } from "lucide-react"
import { brands, prices, FAULT_INFO, FAULT_ORDER, money, SITE, telHref, waHref } from "@/lib/site"

/* The booking request carries a [PTB:...] code that the Phone Time repair app reads
   straight from the Formspree email, so the job is created with no retyping. */

const WINDOWS = [
  ["Morning", "9am – 12pm"],
  ["Afternoon", "12pm – 4pm"],
  ["Evening", "4pm – 8pm"],
  ["Any time", "Whatever suits"],
] as const

const OTHER = "Other brand"
const NOT_SURE = "Not sure"

type Sel = Record<string, number> // fault -> chosen option index

const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
const dayLabel = (k: string) => new Date(k + "T12:00").toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })

function Step({ n, title, done, children }: { n: number; title: string; done?: boolean; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-[28px] border border-line bg-white p-5 sm:p-7" aria-labelledby={`step-${n}`}>
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[15px] font-bold tnum ${done ? "bg-teal-600 text-white" : "bg-ink text-aqua"}`}>
          {done ? <Check className="h-5 w-5" strokeWidth={3} aria-hidden /> : n}
        </span>
        <h2 id={`step-${n}`} className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

const inputCls = "w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-base outline-none transition-colors focus:border-teal-500 focus:bg-white"

export default function BookingForm() {
  const sp = useSearchParams()
  const [brand, setBrand] = useState("")
  const [model, setModel] = useState("")
  const [otherModel, setOtherModel] = useState("")
  const [q, setQ] = useState("")
  const [sel, setSel] = useState<Sel>({})
  const [day, setDay] = useState("")
  const [win, setWin] = useState("")
  const [addr, setAddr] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const [tried, setTried] = useState(false)
  const [mode, setMode] = useState<"book" | "quote">("book")
  const quote = mode === "quote"

  /* Arriving from a price page: ?model=iPhone 15&repair=Screen */
  const qs = sp.toString()
  useEffect(() => {
    const sp = new URLSearchParams(qs)
    if (sp.get("mode") === "quote") setMode("quote")
    const m = sp.get("model")
    if (!m) return
    const b = brands.find((x) => x.g.some((g) => g.ms.includes(m)))
    if (b) {
      setBrand(b.n)
      setModel(m)
      const r = sp.get("repair")
      const opts = r ? prices[m]?.[r] : undefined
      if (r && opts) setSel({ [r]: opts.reduce((bi, o, i, a) => (+o.p > +a[bi].p ? i : bi), 0) })
    } else {
      setBrand(OTHER)
      setOtherModel(m)
    }
  }, [qs])

  const days = useMemo(() => {
    const out: Date[] = []
    const d0 = new Date()
    for (let i = 0; i < 14; i++) {
      const d = new Date(d0)
      d.setDate(d0.getDate() + i)
      out.push(d)
    }
    return out
  }, [])

  const b = brands.find((x) => x.n === brand)
  const device = brand === OTHER ? otherModel.trim() : model
  const p = (brand !== OTHER && prices[model]) || {}
  const faultList = [...FAULT_ORDER.filter((f) => f !== "Other" && (p[f] || f === "Screen" || f === "Battery" || f === "Charging port" || f === "Back glass")), ...Object.keys(p).filter((f) => !FAULT_ORDER.includes(f)), NOT_SURE]

  const hits = useMemo(() => {
    const s = q.trim().toLowerCase().replace(/\s+/g, "")
    if (!b || !s) return []
    return b.g.flatMap((g) => g.ms).filter((m) => m.toLowerCase().replace(/\s+/g, "").includes(s)).slice(0, 12)
  }, [q, b])

  const lines = Object.keys(sel).map((f) => {
    const o = p[f]?.[sel[f]]
    return { n: f, v: o?.v || "", l: o?.l || "", p: o ? +o.p : null }
  })
  const total = lines.reduce((t, x) => t + (x.p || 0), 0)
  const needsQuote = lines.some((x) => x.p == null)

  const ok = {
    device: !!device,
    repair: lines.length > 0,
    when: quote ? addr.trim().length > 1 : !!day && !!win && addr.trim().length > 4,
    you: name.trim().length > 1 && phone.replace(/\D/g, "").length >= 8,
  }
  const ready = ok.device && ok.repair && ok.when && ok.you

  const toggle = (f: string) => {
    setSel((s) => {
      const n = { ...s }
      if (f in n) delete n[f]
      else {
        const opts = p[f] || []
        n[f] = opts.length ? opts.reduce((bi, o, i, a) => (+o.p > +a[bi].p ? i : bi), 0) : 0
      }
      return n
    })
  }

  const message = () => {
    const r = lines.map((x) => ({ n: x.n, v: x.v, p: x.p }))
    const payload = { v: 1, q: quote ? 1 : 0, n: name.trim(), ph: phone.trim(), em: email.trim(), a: addr.trim(), b: brand, m: device, r, d: quote ? "" : day, w: quote ? "" : win, no: notes.trim() }
    let tok = ""
    try {
      tok = btoa(unescape(encodeURIComponent(JSON.stringify(payload)))).replace(/=+$/, "")
    } catch {}
    const est = (total ? money(total) : "") + (needsQuote ? (total ? " + quote" : "quote needed") : "")
    return (
      (quote ? "New quote request\n" : "New repair booking request\n") +
      `Name: ${name.trim()}\nMobile: ${phone.trim()}` + (email.trim() ? `\nEmail: ${email.trim()}` : "") +
      `\nPhone: ${device}\nRepair: ${lines.map((x) => x.n + (x.v ? ` (${x.v})` : "") + (x.p != null ? " " + money(x.p) : "")).join(", ")}` +
      `\nEstimate: ${est}` +
      (!quote && day ? `\nWhen: ${dayLabel(day)}, ${win}` : "") +
      (addr.trim() ? `\n${quote ? "Area" : "Address"}: ${addr.trim()}` : "") +
      (notes.trim() ? `\nNotes: ${notes.trim()}` : "") +
      (tok ? `\n\nBooking code (please keep):\n[PTB:${tok}]` : "")
    )
  }

  const send = async () => {
    setTried(true)
    if (!ready) {
      document.querySelector("[data-missing='true']")?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }
    setState("sending")
    try {
      const r = await fetch(SITE.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,
          phone: phone.trim(),
          address: addr.trim(),
          device,
          _subject: `${quote ? "New quote request" : "New booking"}: ${device} – ${name.trim()}`,
          message: message(),
        }),
      })
      if (!r.ok) throw new Error(String(r.status))
      setState("sent")
      const w = window as unknown as { gtag?: (...a: unknown[]) => void }
      w.gtag?.("event", "generate_lead", { value: total || undefined, currency: "AUD" })
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
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight">Thanks, {name.trim().split(" ")[0]}. {quote ? "Quote request sent." : "Request sent."}</h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-muted2">
          {quote
            ? `I'll send your quote for the ${device} by text${email.trim() ? " or email" : ""}. No obligation – book only if you're happy with it.`
            : `I'll text you on ${phone.trim()} to confirm the time for your ${device} repair${day ? ` on ${dayLabel(day)}` : ""}.`}
        </p>
        <p className="mt-6 text-muted2">Need it sooner? Call <a href={telHref} className="font-semibold text-ink underline">{SITE.phone}</a></p>
        <Link href="/" className="mt-8 inline-block rounded-full border border-line px-6 py-3 font-semibold hover:bg-mat">Back to home</Link>
      </div>
    )
  }

  const miss = (k: keyof typeof ok) => tried && !ok[k]

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div className="min-w-0 space-y-5">
        <div className="grid grid-cols-2 gap-1.5 rounded-full border border-line bg-white p-1.5" role="radiogroup" aria-label="What would you like to do?">
          {([["book", "Book a repair"], ["quote", "Just get a quote"]] as const).map(([k, t]) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={mode === k}
              onClick={() => { setMode(k); setTried(false) }}
              className={`rounded-full px-4 py-3 text-[15px] font-semibold transition-colors sm:text-base ${mode === k ? "bg-ink text-white" : "text-ink hover:bg-mat"}`}
            >
              {t}
            </button>
          ))}
        </div>
        {quote && <p className="px-2 text-[15px] text-muted2">Tell me the phone and the problem, and I&apos;ll reply with a price. No obligation and no need to pick a time yet.</p>}
        <Step n={1} title="Your phone" done={ok.device}>
          <div data-missing={miss("device")} className="flex flex-wrap gap-2" role="radiogroup" aria-label="Brand">
            {[...brands.map((x) => x.n), OTHER].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={brand === n}
                onClick={() => { setBrand(n); setModel(""); setSel({}); setQ("") }}
                className={`rounded-full px-4 py-2.5 font-semibold transition-colors ${brand === n ? "bg-ink text-white" : "bg-mat text-ink hover:bg-teal-100"}`}
              >
                {n}
              </button>
            ))}
          </div>

          {b && (
            <div className="mt-5">
              <label className="relative block">
                <span className="sr-only">Search your model</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted2" aria-hidden />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search, e.g. 15 Pro" className={inputCls + " pl-12"} autoComplete="off" />
              </label>
              {q.trim() ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {hits.length === 0 && <p className="text-muted2">No match. Try fewer words, or pick “{OTHER}”.</p>}
                  {hits.map((m) => (
                    <button key={m} type="button" onClick={() => { setModel(m); setSel({}); setQ("") }} className="rounded-full border border-line bg-white px-4 py-2 font-medium hover:border-teal-500">{m}</button>
                  ))}
                </div>
              ) : (
                <div className="relative mt-3">
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2" aria-hidden />
                <select
                  aria-label="Model"
                  value={model}
                  onChange={(e) => { setModel(e.target.value); setSel({}) }}
                  className={inputCls + " appearance-none pr-12 font-semibold"}
                >
                  <option value="">Choose your model</option>
                  {b.g.map((g) => (
                    <optgroup key={g.l} label={g.l}>
                      {g.ms.map((m) => <option key={m}>{m}</option>)}
                    </optgroup>
                  ))}
                </select>
                </div>
              )}
              {model && <p className="mt-3 flex items-center gap-2 font-semibold text-teal-800"><Check className="h-4 w-4" strokeWidth={3} aria-hidden /> {model}</p>}
            </div>
          )}
          {brand === OTHER && (
            <label className="mt-5 block">
              <span className="text-[15px] font-medium text-muted2">Make and model</span>
              <input value={otherModel} onChange={(e) => setOtherModel(e.target.value)} placeholder="e.g. OPPO Find X8, Xiaomi 14" className={inputCls + " mt-1.5"} />
            </label>
          )}
          {miss("device") && <p className="mt-3 font-medium text-red-700">Choose your phone model to continue.</p>}
        </Step>

        <Step n={2} title="What needs fixing?" done={ok.repair}>
          {!device ? (
            <p className="text-muted2">Choose your phone first to see prices.</p>
          ) : (
            <div data-missing={miss("repair")} className="space-y-2.5">
              {faultList.map((f) => {
                const opts = p[f] || []
                const on = f in sel
                const from = opts.length ? Math.min(...opts.map((o) => +o.p)) : null
                const max = opts.length ? Math.max(...opts.map((o) => +o.p)) : null
                return (
                  <div key={f} className={`rounded-2xl border transition-colors ${on ? "border-teal-500 bg-teal-50/60" : "border-line"}`}>
                    <button type="button" aria-pressed={on} onClick={() => toggle(f)} className="flex w-full items-center gap-3 p-4 text-left">
                      <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 ${on ? "border-teal-600 bg-teal-600 text-white" : "border-line"}`}>
                        {on && <Check className="h-4 w-4" strokeWidth={3} aria-hidden />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold">{f === NOT_SURE ? "Not sure – check it for me" : FAULT_INFO[f]?.name || f}</span>
                        <span className="block text-[15px] text-muted2">{f === NOT_SURE ? "Describe the problem below and I'll confirm the price first." : FAULT_INFO[f]?.blurb}</span>
                      </span>
                      <span className="text-right">
                        {opts.length > 1 && <span className="block text-xs text-muted2">from</span>}
                        <span className="block font-bold tnum">{from != null ? money(from) : <span className="text-[15px] font-semibold text-muted2">Quote</span>}</span>
                      </span>
                    </button>
                    {on && opts.length > 1 && (
                      <div className="space-y-2 px-4 pb-4 sm:pl-[52px]" role="radiogroup" aria-label={`${f} part options`}>
                        {opts.map((o, i) => (
                          <button
                            key={i}
                            type="button"
                            role="radio"
                            aria-checked={sel[f] === i}
                            onClick={() => setSel((s) => ({ ...s, [f]: i }))}
                            className={`block w-full rounded-xl border p-3 text-left transition-colors ${sel[f] === i ? "border-ink bg-white ring-1 ring-ink" : "border-line bg-white/70 hover:border-teal-400"}`}
                          >
                            <span className="flex items-start justify-between gap-3">
                              <span className="font-semibold">
                                {o.l || o.v || f}
                                {max !== from && +o.p === max && <span className="ml-2 rounded-full bg-ink px-2 py-0.5 text-xs font-semibold text-aqua">Best quality</span>}
                                {max !== from && +o.p === from && <span className="ml-2 rounded-full bg-mat px-2 py-0.5 text-xs font-semibold text-teal-800">Best value</span>}
                              </span>
                              <span className="font-bold tnum">{money(+o.p)}</span>
                            </span>
                            {o.d && <span className="mt-1 block text-[14px] leading-relaxed text-muted2">{o.d}</span>}
                          </button>
                        ))}
                      </div>
                    )}
                    {on && opts.length === 1 && opts[0].d && <p className="px-4 pb-4 text-[14px] text-muted2 sm:pl-[52px]">{opts[0].d}</p>}
                  </div>
                )
              })}
              {miss("repair") && <p className="font-medium text-red-700">Choose at least one repair, or “Not sure”.</p>}
            </div>
          )}
        </Step>

        {quote ? (
        <Step n={3} title="Your details" done={ok.when && ok.you}>
          <div data-missing={miss("you") || miss("when")} className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[15px] font-medium text-muted2">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" autoCapitalize="words" className={inputCls + " mt-1.5"} />
            </label>
            <label className="block">
              <span className="text-[15px] font-medium text-muted2">Mobile number</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" className={inputCls + " mt-1.5"} />
            </label>
            <label className="block">
              <span className="text-[15px] font-medium text-muted2">Email (optional)</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" autoCapitalize="off" className={inputCls + " mt-1.5"} />
            </label>
            <label className="block">
              <span className="text-[15px] font-medium text-muted2">Suburb or address</span>
              <input value={addr} onChange={(e) => setAddr(e.target.value)} autoComplete="address-level2" placeholder="e.g. Croydon" className={inputCls + " mt-1.5"} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[15px] font-medium text-muted2">Describe the problem</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} placeholder="What happened and what's not working, e.g. dropped it, screen has lines and touch doesn't work at the bottom" className={inputCls + " mt-1.5"} />
            </label>
          </div>
          <p className="mt-2 text-[14px] text-muted2">Just the suburb is fine for a quote.</p>
          {(miss("you") || miss("when")) && <p className="mt-3 font-medium text-red-700">Add your name, a mobile number and your suburb.</p>}
        </Step>
        ) : (<>
        <Step n={3} title="When and where" done={ok.when}>
          <div data-missing={miss("when")}>
            <p className="text-[15px] font-medium text-muted2">Day</p>
            <div className="-mx-5 mt-2 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
              {days.map((d, i) => {
                const k = dayKey(d)
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={day === k}
                    onClick={() => setDay(k)}
                    className={`w-[68px] shrink-0 rounded-2xl border py-2.5 text-center transition-colors ${day === k ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-teal-400"}`}
                  >
                    <span className="block text-xs opacity-75">{i === 0 ? "Today" : i === 1 ? "Tmrw" : d.toLocaleDateString("en-AU", { weekday: "short" })}</span>
                    <span className="block text-xl font-bold tnum">{d.getDate()}</span>
                    <span className="block text-xs opacity-75">{d.toLocaleDateString("en-AU", { month: "short" })}</span>
                  </button>
                )
              })}
            </div>
            <p className="mt-5 text-[15px] font-medium text-muted2">Time</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {WINDOWS.map(([w, t]) => (
                <button
                  key={w}
                  type="button"
                  aria-pressed={win === w}
                  onClick={() => setWin(w)}
                  className={`rounded-2xl border px-4 py-3 text-left transition-colors ${win === w ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-teal-400"}`}
                >
                  <span className="block font-semibold">{w}</span>
                  <span className="block text-sm opacity-75">{t}</span>
                </button>
              ))}
            </div>
            <label className="mt-5 block">
              <span className="text-[15px] font-medium text-muted2">Address for the repair</span>
              <input value={addr} onChange={(e) => setAddr(e.target.value)} autoComplete="street-address" placeholder="Street address and suburb" className={inputCls + " mt-1.5"} />
            </label>
            <p className="mt-2 text-[14px] text-muted2">Your home, work, or anywhere that suits in {SITE.area}.</p>
            {miss("when") && <p className="mt-3 font-medium text-red-700">Choose a day, a time and add the address.</p>}
          </div>
        </Step>

        <Step n={4} title="Your details" done={ok.you}>
          <div data-missing={miss("you")} className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[15px] font-medium text-muted2">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" autoCapitalize="words" className={inputCls + " mt-1.5"} />
            </label>
            <label className="block">
              <span className="text-[15px] font-medium text-muted2">Mobile number</span>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" className={inputCls + " mt-1.5"} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[15px] font-medium text-muted2">Email (optional)</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" autoCapitalize="off" className={inputCls + " mt-1.5"} />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-[15px] font-medium text-muted2">Anything else I should know? (optional)</span>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Phone colour, what happened, parking or access info" className={inputCls + " mt-1.5"} />
            </label>
          </div>
          {miss("you") && <p className="mt-3 font-medium text-red-700">Add your name and a mobile number so I can confirm.</p>}
        </Step>
        </>)}
      </div>

      {/* Summary: sticky on desktop, at the end on phones */}
      <aside className="rounded-[28px] bg-ink p-6 text-white lg:sticky lg:top-24">
        <h2 className="text-lg font-bold">{quote ? "Your quote request" : "Your booking"}</h2>
        <dl className="mt-4 space-y-3 text-[15px]">
          <div className="flex justify-between gap-4"><dt className="text-white/60">Phone</dt><dd className="text-right font-semibold">{device || "–"}</dd></div>
          {lines.map((x) => (
            <div key={x.n} className="flex justify-between gap-4">
              <dt className="text-white/60">{x.n === NOT_SURE ? "Check-up" : x.l || FAULT_INFO[x.n]?.name || x.n}</dt>
              <dd className="font-semibold tnum">{x.p != null ? money(x.p) : "Quote"}</dd>
            </div>
          ))}
          {!quote && day && <div className="flex justify-between gap-4"><dt className="text-white/60">When</dt><dd className="text-right font-semibold">{dayLabel(day)}{win ? `, ${win}` : ""}</dd></div>}
        </dl>
        <div className="mt-5 flex items-baseline justify-between border-t border-white/15 pt-4">
          <span className="text-white/70">Estimate</span>
          <span className="text-3xl font-extrabold tnum">{total ? money(total) : needsQuote ? "Quote" : "$0"}{total && needsQuote ? <span className="text-base font-semibold text-white/70"> + quote</span> : null}</span>
        </div>
        <p className="mt-2 text-sm text-white/60">{quote ? "Online prices include parts, labour and coming to you. I'll confirm the final price in your quote." : "Includes parts, labour and coming to you. Price confirmed before I start."}</p>

        <button
          type="button"
          onClick={send}
          disabled={state === "sending"}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-aqua px-6 py-4 text-lg font-bold text-ink transition-colors hover:bg-white disabled:opacity-70"
        >
          {state === "sending" && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
          {state === "sending" ? "Sending…" : quote ? "Send quote request" : "Send booking request"}
        </button>
        {tried && !ready && <p className="mt-3 text-sm text-[#ffd0c9]">A few details are missing above.</p>}
        {state === "error" && (
          <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm">
            <p className="font-semibold">That didn&apos;t send. Please send it by WhatsApp or text instead – everything is filled in.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={waHref(message())} target="_blank" rel="noopener" className="flex items-center justify-center gap-1.5 rounded-full bg-[#1fa855] py-2.5 font-semibold"><MessageCircle className="h-4 w-4" aria-hidden />WhatsApp</a>
              <a href={`sms:${SITE.phone.replace(/\s/g, "")}?&body=${encodeURIComponent(message())}`} className="flex items-center justify-center gap-1.5 rounded-full bg-white/15 py-2.5 font-semibold"><Phone className="h-4 w-4" aria-hidden />Text</a>
            </div>
          </div>
        )}
        <p className="mt-5 text-center text-sm text-white/60">Rather talk? <a href={telHref} className="font-semibold text-white underline">{SITE.phone}</a></p>
      </aside>
    </div>
  )
}
