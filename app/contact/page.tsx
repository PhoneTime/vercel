import Link from "next/link"
import { Phone, MessageCircle, Mail, Clock, MapPin } from "lucide-react"
import ContactForm from "@/components/ContactForm"
import { Container } from "@/components/Blocks"
import { SITE, telHref, waHref, abnFmt } from "@/lib/site"

export const metadata = {
  title: "Contact Phone Time – Call, WhatsApp or Message",
  description: `Call or WhatsApp ${SITE.phone} for on-site phone repair in ${SITE.area}. Open 24 hours, 7 days.`,
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  const rows = [
    { icon: Phone, label: "Call", value: SITE.phone, href: telHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Message me", href: waHref("Hi Phone Time") },
    { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  ]
  return (
    <>
      <section className="bg-ink pb-14 pt-12 text-white sm:pt-16">
        <Container>
          <h1 className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">Get in touch</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Phone Time is a mobile repair service, so there&apos;s no shop to visit. I come to you. Call, message, or <Link href="/book" className="font-semibold text-aqua underline underline-offset-4">book online</Link>.
          </p>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {rows.map((r) => (
                <li key={r.label}>
                  <a href={r.href} target={r.label === "WhatsApp" ? "_blank" : undefined} rel="noopener" className="flex items-center gap-4 py-5 hover:text-teal-700">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-mat"><r.icon className="h-5 w-5 text-teal-800" aria-hidden /></span>
                    <span><span className="block text-sm text-muted2">{r.label}</span><span className="block text-lg font-semibold">{r.value}</span></span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-4 py-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mat"><Clock className="h-5 w-5 text-teal-800" aria-hidden /></span>
                <span><span className="block text-sm text-muted2">Hours</span><span className="block text-lg font-semibold">Open 24 hours, 7 days</span></span>
              </li>
              <li className="flex items-center gap-4 py-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mat"><MapPin className="h-5 w-5 text-teal-800" aria-hidden /></span>
                <span><span className="block text-sm text-muted2">Based in</span><span className="block text-lg font-semibold">Kilsyth VIC 3137 – <Link href="/areas" className="text-teal-700 underline underline-offset-4">areas I cover</Link></span></span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-muted2">{SITE.legal} · ABN {abnFmt}</p>
            <a href={SITE.google} target="_blank" rel="noopener" className="mt-2 inline-block text-sm font-semibold text-teal-700 underline underline-offset-4">Phone Time on Google</a>
          </div>
          <div className="rounded-[28px] border border-line bg-white p-6 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight">Send a message</h2>
            <p className="mt-1 text-muted2">For a repair, <Link href="/book" className="font-semibold text-teal-700 underline">booking online</Link> is quicker and shows the price.</p>
            <div className="mt-6"><ContactForm /></div>
          </div>
        </Container>
      </section>
    </>
  )
}
