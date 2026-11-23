import Link from "next/link"
import { Building2, GraduationCap, HardHat, Check, Phone } from "lucide-react"
import BusinessForm from "@/components/BusinessForm"
import { Container, SectionHead, Faq, faqJsonLd, CtaBand } from "@/components/Blocks"
import { SITE, telHref, abnFmt } from "@/lib/site"

export const metadata = {
  title: "On-site Phone & iPad Repair for Businesses and Schools",
  description: `Phone and iPad repairs at your office, site or school across ${SITE.area}. Volume discounts, repair first and pay on invoice, no travel fee. Call ${SITE.phone}.`,
  alternates: { canonical: "/business" },
}

const WHO = [
  { icon: Building2, t: "Offices and small businesses", d: "Staff phones and work iPads fixed at your desk, so nobody loses half a day going to a repair shop." },
  { icon: GraduationCap, t: "Schools", d: "Cracked iPad glass, worn batteries and loose charging ports on school and staff devices, repaired on campus." },
  { icon: HardHat, t: "Trades and field teams", d: "Phones that take a beating on site. I can meet you at the yard or the job and get the phone back to work." },
]

const STEPS = [
  { t: "Send me the list", d: "Tell me the models and what's wrong with each one. A rough list is fine." },
  { t: "Get a written quote", d: "You get a price per device before anything is booked, with a volume discount when there are several." },
  { t: "Pick a time", d: "Before you open, at lunch, after hours or in the school holidays. I'm open 24 hours, 7 days." },
  { t: "Repairs first, pay on invoice", d: "Devices are fixed at your place and tested before I leave. Nothing to pay on the day: you get one invoice for the lot, with payment terms." },
]

const FAQ_B = [
  { q: "Can you fix several devices in one visit?", a: "Yes. Send me the list first so I bring the right parts, and I'll work through them on site." },
  { q: "Do the devices leave our premises?", a: "No. Repairs are done at your office, site or school, so phones and iPads stay with you the whole time." },
  { q: "Do you offer discounts for several devices?", a: "Yes. The more devices in one job, the better the price. Send me the list and the quote will show the discount." },
  { q: "Do we have to pay on the day?", a: "No. I repair first and you pay afterwards. Businesses and schools can pay on invoice with payment terms." },
  { q: "Can I get an invoice for our accounts?", a: `Yes. Every job comes with an invoice showing my ABN (${abnFmt}), and it can be sent to your accounts team. Phone Time isn't registered for GST, so no GST is charged.` },
  { q: "Is there a call-out or travel fee?", a: "No. You pay for the repairs only." },
  { q: "What warranty do repairs have?", a: `Every repair has a ${SITE.warranty}-day warranty on the part and the labour.` },
  { q: "Which devices do you repair?", a: "iPhone, Samsung Galaxy, Google Pixel and iPad: screens, batteries, charging ports, back glass and cameras." },
]

export default function BusinessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ_B)) }} />

      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-teal-600/30 blur-3xl" />
        <Container className="relative pb-14 pt-12 sm:pt-16 lg:pb-20 lg:pt-20">
          <p className="text-[15px] font-semibold uppercase tracking-[0.14em] text-aqua">Business &amp; schools</p>
          <h1 className="mt-4 max-w-3xl text-[40px] font-extrabold leading-[1.0] tracking-[-0.03em] sm:text-[60px]">
            Phone and iPad repairs at your office or school.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            I come to your workplace, site or campus across {SITE.area}, fix the devices there and send one invoice with payment terms. Volume discounts for several devices, and no downtime waiting on a repair shop.
          </p>
          <ul className="mt-7 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-2.5 text-[15px] text-white/90 min-[400px]:grid-cols-2 lg:grid-cols-3">
            {["Volume discounts", "Repair first, pay later", "Invoice with payment terms", "No travel fee", "Several devices in one visit", `${SITE.warranty}-day warranty`].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-aqua" aria-hidden strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#enquire" className="rounded-full bg-aqua px-7 py-4 text-center text-lg font-bold text-ink hover:bg-white">Request a quote</a>
            <a href={telHref} className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-lg font-semibold tnum hover:bg-white/10">
              <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phone}
            </a>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHead title="Who I work with" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {WHO.map((w) => (
              <div key={w.t} className="rounded-[28px] border border-line bg-white p-7">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-mat"><w.icon className="h-6 w-6 text-teal-800" aria-hidden /></span>
                <h3 className="mt-5 text-xl font-bold">{w.t}</h3>
                <p className="mt-2 leading-relaxed text-muted2">{w.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHead title="How it works" intro="Built around your day, not a shop's opening hours." />
          <ol className="space-y-8">
            {STEPS.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[48px_1fr] gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lg font-bold text-aqua tnum">{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold">{s.t}</h3>
                  <p className="mt-1 leading-relaxed text-muted2">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead title="What I repair" intro="Prices for each model are on the price list, so you can check before you ask." />
            <Link href="/prices" className="mt-6 inline-block font-semibold text-teal-700 underline underline-offset-4">See every price</Link>
          </div>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              ["Screens", "Cracked glass, black screens, lines and touch problems on phones and iPads."],
              ["Batteries", "Phones that die by lunchtime or shut down in the cold."],
              ["Charging ports", "Loose cables and devices that won't charge."],
              ["Back glass and cameras", "Shattered backs and blurry or cracked camera lenses."],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-teal-400 pl-5">
                <dt className="text-lg font-bold">{t}</dt>
                <dd className="mt-1.5 leading-relaxed text-muted2">{d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="enquire" className="scroll-mt-20 border-t border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead title="Request a quote" intro="Tell me what you've got and I'll send a price per device. Prefer to talk? Call or WhatsApp any time." />
          <div className="rounded-[28px] border border-line bg-paper p-6 sm:p-8"><BusinessForm /></div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHead title="Questions" />
          <Faq items={FAQ_B} />
        </Container>
      </section>

      <CtaBand title="One phone or a whole team?" text="Either way I come to you. Call, message or send the list for a quote." />
    </>
  )
}
