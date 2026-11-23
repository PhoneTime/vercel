"use client"

import { useState } from "react"
import { SITE } from "@/lib/site"

const inputCls = "mt-1.5 w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-base outline-none focus:border-teal-500 focus:bg-white"
const KINDS = ["Business / office", "School", "Trades / field team", "Other"]

export default function BusinessForm() {
  const [f, setF] = useState({ org: "", kind: KINDS[0], name: "", phone: "", email: "", devices: "", message: "" })
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      const r = await fetch(SITE.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Business / school enquiry",
          organisation: f.org,
          kind: f.kind,
          name: f.name,
          phone: f.phone,
          email: f.email || undefined,
          devices: f.devices,
          message: f.message,
          _subject: `Business enquiry from ${f.org || f.name}`,
        }),
      })
      if (!r.ok) throw new Error()
      setState("sent")
    } catch {
      setState("error")
    }
  }

  if (state === "sent") return <p className="rounded-2xl bg-mat p-6 text-lg font-semibold">Thanks, your enquiry is in. I&apos;ll get back to you with a quote soon.</p>

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="block"><span className="text-[15px] font-medium text-muted2">Business or school name</span><input required value={f.org} onChange={set("org")} autoComplete="organization" className={inputCls} /></label>
      <label className="block"><span className="text-[15px] font-medium text-muted2">Type</span>
        <select value={f.kind} onChange={set("kind")} className={inputCls}>{KINDS.map((k) => <option key={k}>{k}</option>)}</select>
      </label>
      <label className="block"><span className="text-[15px] font-medium text-muted2">Your name</span><input required value={f.name} onChange={set("name")} autoComplete="name" className={inputCls} /></label>
      <label className="block"><span className="text-[15px] font-medium text-muted2">Mobile</span><input required value={f.phone} onChange={set("phone")} type="tel" autoComplete="tel" className={inputCls} /></label>
      <label className="block"><span className="text-[15px] font-medium text-muted2">Email</span><input value={f.email} onChange={set("email")} type="email" autoComplete="email" className={inputCls} /></label>
      <label className="block"><span className="text-[15px] font-medium text-muted2">How many devices (roughly)</span><input value={f.devices} onChange={set("devices")} inputMode="numeric" className={inputCls} /></label>
      <label className="block sm:col-span-2"><span className="text-[15px] font-medium text-muted2">Which devices and what&apos;s wrong</span>
        <textarea required value={f.message} onChange={set("message")} rows={5} placeholder="e.g. 3 × iPhone 13 cracked screens, 5 × iPad 9th gen cracked glass" className={inputCls} />
      </label>
      <div className="sm:col-span-2">
        <button disabled={state === "sending"} className="rounded-full bg-ink px-7 py-3.5 font-semibold text-white hover:bg-teal-800 disabled:opacity-70">
          {state === "sending" ? "Sending…" : "Request a quote"}
        </button>
        {state === "error" && <p className="mt-3 font-medium text-red-700">That didn&apos;t send. Please call or WhatsApp {SITE.phone} instead.</p>}
      </div>
    </form>
  )
}
