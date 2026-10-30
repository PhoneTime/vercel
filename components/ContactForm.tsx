"use client"

import { useState } from "react"
import { SITE } from "@/lib/site"

const inputCls = "mt-1.5 w-full rounded-2xl border border-line bg-paper px-4 py-3.5 text-base outline-none focus:border-teal-500 focus:bg-white"

export default function ContactForm() {
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "" })
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle")
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState("sending")
    try {
      const r = await fetch(SITE.formspree, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, email: f.email || undefined, _subject: `Website message from ${f.name}` }),
      })
      if (!r.ok) throw new Error()
      setState("sent")
    } catch {
      setState("error")
    }
  }

  if (state === "sent") return <p className="rounded-2xl bg-mat p-6 text-lg font-semibold">Message sent. I&apos;ll get back to you soon.</p>

  return (
    <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
      <label className="block"><span className="text-[15px] font-medium text-muted2">Name</span><input required value={f.name} onChange={set("name")} autoComplete="name" className={inputCls} /></label>
      <label className="block"><span className="text-[15px] font-medium text-muted2">Mobile</span><input required value={f.phone} onChange={set("phone")} type="tel" autoComplete="tel" className={inputCls} /></label>
      <label className="block sm:col-span-2"><span className="text-[15px] font-medium text-muted2">Email (optional)</span><input value={f.email} onChange={set("email")} type="email" autoComplete="email" className={inputCls} /></label>
      <label className="block sm:col-span-2"><span className="text-[15px] font-medium text-muted2">Message</span><textarea required value={f.message} onChange={set("message")} rows={5} className={inputCls} /></label>
      <div className="sm:col-span-2">
        <button disabled={state === "sending"} className="rounded-full bg-ink px-7 py-3.5 font-semibold text-white hover:bg-teal-800 disabled:opacity-70">
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
        {state === "error" && <p className="mt-3 font-medium text-red-700">That didn&apos;t send. Please call or WhatsApp {SITE.phone} instead.</p>}
      </div>
    </form>
  )
}
