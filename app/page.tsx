import Link from "next/link"
import { Check, Phone } from "lucide-react"
import PriceFinder from "@/components/PriceFinder"
import { Container, SectionHead, Gallery, Faq, faqJsonLd, AreaLinks, ReviewsBand, CtaBand } from "@/components/Blocks"
import { SITE, telHref, brands, allModels, seriesFrom, FAULT_INFO, money } from "@/lib/site"
import { SHOP } from "@/lib/content"

export const metadata = {
  title: { absolute: "Phone Time | On-site Phone Repair in Kilsyth & Melbourne's East" },
  alternates: { canonical: "/" },
}

const STEPS = [
  { t: "Pick your repair", d: "Choose your phone and see the price straight away. No surprises when I arrive." },
  { t: "Choose a time", d: "Book online or call. Morning, afternoon or evening, any day of the week." },
  { t: "I fix it at your place", d: "Most repairs are done while you wait. You test the phone, then you pay." },
]

export default function Home() {
  const ms = allModels().map((x) => x.model)
  const popular = ["Screen", "Battery", "Charging port", "Back glass"]
    .map((f) => ({ f, from: seriesFrom(f, ms) }))
    .filter((x) => x.from != null)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }} />

      {/* Hero: the promise on the left, the price check on the right */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-teal-600/30 blur-3xl" />
        <Container className="relative grid gap-10 pb-14 pt-12 sm:pt-16 lg:grid-cols-[1.08fr_1fr] lg:items-center lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <h1 className="text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[64px] lg:text-[76px]">
              Broken phone? I&nbsp;come to&nbsp;you.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
              Screens, batteries, charging ports and back glass for iPhone, Samsung, Pixel and iPad, repaired at your home or work across {SITE.area}.
            </p>
            <ul className="mt-7 grid max-w-md grid-cols-1 gap-x-6 gap-y-2.5 text-[15px] text-white/90 min-[400px]:grid-cols-2">
              {["Most repairs same day", "No travel fee", `${SITE.warranty}-day warranty`, "Open 24 hours, 7 days"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-aqua" aria-hidden strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 hidden gap-3 sm:flex">
              <Link href="/book" className="rounded-full bg-aqua px-7 py-4 text-center text-lg font-bold text-ink hover:bg-white">
                Book a repair
              </Link>
              <a href={telHref} className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-lg font-semibold tnum hover:bg-white/10">
                <Phone className="h-5 w-5" aria-hidden /> Call {SITE.phone}
              </a>
            </div>
          </div>
          <PriceFinder compact />
        </Container>
      </section>

      {/* How it works, beside a real photo from the repair mat */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative">
            <img
              src="/work/technician-at-work.webp"
              srcSet="/work/technician-at-work-sm.webp 640w, /work/technician-at-work.webp 1200w"
              sizes="(min-width: 1024px) 540px, 100vw"
              alt="Phone Time technician replacing parts inside an iPhone on a teal repair mat"
              className="aspect-square w-full rounded-[32px] object-cover"
              loading="lazy"
            />
            <p className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 px-4 py-3 text-[15px] shadow-lg backdrop-blur sm:right-auto">
              <b>A full repair setup, on your table.</b> Tools, mat and parts come with me.
            </p>
          </div>
          <div>
            <SectionHead title="How it works" intro="No dropping your phone off and waiting days. The repair happens where you are." />
            <ol className="mt-10 space-y-8">
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
          </div>
        </Container>
      </section>

      {/* Popular repairs with real starting prices from the price list */}
      <section className="border-y border-line bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHead title="Popular repairs" intro={`Prices for ${ms.length} models across ${brands.map((b) => b.n).join(", ")}.`} />
            <Link href="/prices" className="shrink-0 font-semibold text-teal-700 underline underline-offset-4">See every price</Link>
          </div>
          <ul className="mt-10 grid gap-x-12 sm:grid-cols-2">
            {popular.map(({ f, from }) => (
              <li key={f} className="flex items-baseline gap-4 border-t border-line py-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{FAULT_INFO[f].name}</h3>
                  <p className="mt-1 text-muted2">{FAULT_INFO[f].blurb}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted2">from</div>
                  <div className="text-2xl font-extrabold tnum">{money(from!)}</div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Real before / after work */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHead title="Recent repairs" intro="Photos from real jobs around the eastern suburbs." />
          <div className="mt-10">
            <Gallery />
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <ReviewsBand />
        </Container>
      </section>

      {/* Why choose: plain facts, two columns */}
      <section className="border-t border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHead title="Why locals choose Phone Time" />
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {[
              ["It comes to you", "Home, work or the café down the road. No travel fee and no waiting in a shop."],
              ["You choose the part", "Genuine or good-value options with the price shown upfront, so the choice is yours."],
              [`${SITE.warranty}-day warranty`, "Covers the part and the labour. If something isn't right, I fix it free."],
              ["One person, start to finish", "The person you book with is the person who repairs your phone."],
            ].map(([t, d]) => (
              <div key={t} className="border-l-2 border-teal-400 pl-5">
                <dt className="text-lg font-bold">{t}</dt>
                <dd className="mt-1.5 leading-relaxed text-muted2">{d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <SectionHead title="Areas I cover" intro="Based in Kilsyth and travelling across Melbourne's east every day." />
          <div className="mt-8">
            <AreaLinks limit={20} />
          </div>
          <Link href="/areas" className="mt-6 inline-block font-semibold text-teal-700 underline underline-offset-4">All suburbs</Link>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHead title="Questions" intro="Can't see yours? Call or message any time." />
          <Faq />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHead title="Cases, chargers and more" intro="Grab a case or a spare cable with your repair, or order from the online shop." />
            <a href={SITE.shop} target="_blank" rel="noopener" className="shrink-0 font-semibold text-teal-700 underline underline-offset-4">Visit the shop</a>
          </div>
          <div className="-mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:px-0">
            {SHOP.map((s) => (
              <a key={s.t} href={s.href} target="_blank" rel="noopener" className="group w-[42%] shrink-0 snap-start sm:w-auto">
                <div className="aspect-square overflow-hidden rounded-3xl bg-white ring-1 ring-line">
                  <img src={s.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="mt-3 font-semibold">{s.t}</div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
