import Link from "next/link"
import { Check } from "lucide-react"
import PriceFinder from "@/components/PriceFinder"
import { Container, CtaBand } from "@/components/Blocks"
import { brands, prices, faultsFor, fromPrice, money, slug, SITE } from "@/lib/site"

export const metadata = {
  title: "Phone Repair Prices – iPhone, Samsung, Pixel, iPad",
  description: `Upfront prices for screen, battery, charging port and back glass repairs, done at your door in ${SITE.area}. No travel fee, ${SITE.warranty}-day warranty.`,
  alternates: { canonical: "/prices" },
}

const COLS = ["Screen", "Battery", "Charging port", "Back glass"]

export default function PricesPage() {
  return (
    <>
      <section className="bg-ink pb-14 pt-12 text-white sm:pt-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <h1 className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">Repair prices</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
              The price you see is the price you pay, including coming to you. Pick your model for every repair and part option, or scan the full list below.
            </p>
            <ul className="mt-7 space-y-2.5 text-[15px] text-white/90">
              {["Parts, labour and travel included", `${SITE.warranty}-day warranty on every repair`, "Pay once it's fixed: cash, card or transfer"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-aqua" strokeWidth={3} aria-hidden />{t}</li>
              ))}
            </ul>
          </div>
          <PriceFinder />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <nav aria-label="Brands" className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <a key={b.n} href={`#${slug(b.n)}`} className="rounded-full border border-line bg-white px-4 py-2 font-semibold hover:border-teal-400">{b.n}</a>
            ))}
          </nav>

          {brands.map((b) => (
            <div key={b.n} id={slug(b.n)} className="scroll-mt-24 pt-14">
              <h2 className="text-3xl font-extrabold tracking-tight">{b.n}</h2>
              <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-white">
                <table className="w-full min-w-[640px] text-left tnum">
                  <caption className="sr-only">{b.n} repair prices, starting from</caption>
                  <thead>
                    <tr className="border-b border-line text-sm text-muted2">
                      <th scope="col" className="px-5 py-3.5 font-medium">Model</th>
                      {COLS.map((c) => <th key={c} scope="col" className="px-4 py-3.5 text-right font-medium">{c}</th>)}
                    </tr>
                  </thead>
                  {b.g.map((g) => (
                    <tbody key={g.l}>
                      {b.g.length > 1 && (
                        <tr><th colSpan={5} scope="colgroup" className="bg-paper px-5 py-2 text-sm font-semibold text-teal-800">{g.l}</th></tr>
                      )}
                      {g.ms.map((m) => {
                        const has = faultsFor(m).length > 0
                        return (
                          <tr key={m} className="border-t border-line/70 hover:bg-mat/50">
                            <th scope="row" className="px-5 py-3 font-semibold">
                              <Link href={`/repair/${slug(m)}`} className="hover:text-teal-700 hover:underline">{m}</Link>
                            </th>
                            {COLS.map((c) => {
                              const v = fromPrice(prices[m]?.[c])
                              return <td key={c} className="px-4 py-3 text-right">{v != null ? money(v) : <span className="text-muted2">{has ? "–" : "Quote"}</span>}</td>
                            })}
                          </tr>
                        )
                      })}
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          ))}
          <p className="mt-8 text-sm text-muted2">Where a model has several part options, the lowest price is shown. Tap a model for every option.</p>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
