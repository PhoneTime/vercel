import Link from "next/link"
import { notFound } from "next/navigation"
import { Check } from "lucide-react"
import { Container, Faq, faqJsonLd, CtaBand, ReviewsBand } from "@/components/Blocks"
import { allModels, modelBySlug, prices, faultsFor, FAULT_INFO, money, slug, SITE } from "@/lib/site"
import { FAQ } from "@/lib/content"

type P = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export function generateStaticParams() {
  return allModels().map((x) => ({ slug: slug(x.model) }))
}

export async function generateMetadata({ params }: P) {
  const m = modelBySlug((await params).slug)
  if (!m) return {}
  const fs = faultsFor(m.model)
  const scr = prices[m.model]?.Screen
  const from = scr ? " from " + money(Math.min(...scr.map((o) => +o.p))) : ""
  return {
    title: `${m.model} Repair – Screen${from}, Battery & More`,
    description: `${m.model} ${fs.length ? fs.map((f) => FAULT_INFO[f]?.name.toLowerCase() || f).slice(0, 3).join(", ") : "repairs"} at your home or work in ${SITE.area}. Upfront prices, no travel fee, ${SITE.warranty}-day warranty.`,
    alternates: { canonical: `/repair/${slug(m.model)}` },
  }
}

export default async function RepairPage({ params }: P) {
  const m = modelBySlug((await params).slug)
  if (!m) notFound()
  const fs = faultsFor(m.model)
  const p = prices[m.model] || {}
  const siblings = allModels().filter((x) => x.series === m.series && x.brand === m.brand && x.model !== m.model)

  const offers = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${m.model} repair`,
    provider: { "@id": SITE.url + "/#business" },
    areaServed: SITE.area,
    offers: fs.flatMap((f) => p[f].map((o) => ({ "@type": "Offer", name: `${m.model} ${o.l || FAULT_INFO[f]?.name || f}`, price: o.p, priceCurrency: "AUD" }))),
  }
  const faqs = FAQ.slice(0, 5)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }} />

      <section className="bg-ink pb-12 pt-10 text-white sm:pt-14">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <Link href="/prices" className="hover:text-white">Prices</Link> <span aria-hidden>/</span> {m.brand} <span aria-hidden>/</span> <span className="text-white/90">{m.model}</span>
          </nav>
          <h1 className="mt-4 text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">{m.model} repair</h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">Fixed at your home or work, most repairs the same day. Prices include coming to you.</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/90">
            {["No travel fee", `${SITE.warranty}-day warranty`, "Pay when it's done"].map((t) => (
              <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-aqua" strokeWidth={3} aria-hidden />{t}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            {fs.length === 0 && (
              <div className="rounded-3xl border border-line bg-white p-6">
                <h2 className="text-xl font-bold">Price on request</h2>
                <p className="mt-2 text-muted2">Send the details and I&apos;ll reply with a quote.</p>
                <Link href={`/book?mode=quote&model=${encodeURIComponent(m.model)}`} className="mt-4 inline-block rounded-full bg-ink px-6 py-3 font-semibold text-white">Ask for a quote</Link>
              </div>
            )}
            {fs.map((f) => (
              <article key={f} className="rounded-3xl border border-line bg-white p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">{FAULT_INFO[f]?.name || f}</h2>
                    {FAULT_INFO[f] && <p className="mt-1 text-muted2">{FAULT_INFO[f].blurb}</p>}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {p[f].length === 1 && <div className="text-2xl font-extrabold tnum">{money(+p[f][0].p)}</div>}
                    <Link
                      href={`/book?model=${encodeURIComponent(m.model)}&repair=${encodeURIComponent(f)}`}
                      className="rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-teal-800"
                    >
                      Book
                    </Link>
                  </div>
                </div>
                {p[f].length === 1 ? (
                  (p[f][0].d || (p[f][0].l && p[f][0].l !== f)) ? (
                    <div className="mt-4 border-t border-line pt-4">
                      {p[f][0].l && p[f][0].l !== f && <div className="font-semibold">{p[f][0].l}</div>}
                      {p[f][0].d && <p className="mt-0.5 text-[15px] leading-relaxed text-muted2">{p[f][0].d}</p>}
                    </div>
                  ) : null
                ) : (
                <ul className="mt-4 divide-y divide-line border-t border-line">
                  {p[f].map((o, i) => (
                    <li key={i} className="flex items-start justify-between gap-4 py-3.5">
                      <div>
                        <div className="font-semibold">{o.l || FAULT_INFO[f]?.name || f}</div>
                        {o.d && <p className="mt-0.5 text-[15px] leading-relaxed text-muted2">{o.d}</p>}
                      </div>
                      <div className="text-xl font-extrabold tnum">{money(+o.p)}</div>
                    </li>
                  ))}
                </ul>
                )}
              </article>
            ))}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-mat p-6">
              <h2 className="text-lg font-bold">Not sure what&apos;s wrong?</h2>
              <p className="mt-2 text-muted2">Describe the problem and I&apos;ll reply with a price. No obligation.</p>
              <Link href={`/book?mode=quote&model=${encodeURIComponent(m.model)}`} className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 font-semibold text-white hover:bg-teal-800">Get a free quote</Link>
            </div>
            {siblings.length > 0 && (
              <div>
                <h2 className="text-lg font-bold">Other {m.series} models</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {siblings.map((s) => (
                    <li key={s.model}><Link href={`/repair/${slug(s.model)}`} className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-[15px] hover:border-teal-400">{s.model}</Link></li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container><ReviewsBand /></Container>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="text-3xl font-extrabold tracking-tight">{m.model} repair questions</h2>
          <Faq items={faqs} />
        </Container>
      </section>
      <CtaBand title={`Get your ${m.model} fixed today`} />
    </>
  )
}
