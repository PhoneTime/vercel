import Link from "next/link"
import { Phone, Star } from "lucide-react"
import { SITE, telHref, AREAS, slug } from "@/lib/site"
import { FAQ, GALLERY, GOOGLE, REVIEWS } from "@/lib/content"
import PanRow from "@/components/PanRow"

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
}

export function SectionHead({ title, intro, id }: { title: string; intro?: string; id?: string }) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.02em] sm:text-[40px]">{title}</h2>
      {intro && <p className="mt-3 text-lg leading-relaxed text-muted2">{intro}</p>}
    </div>
  )
}

/* Real before / after photos, scroll sideways on phones */
export function Gallery() {
  return (
    <PanRow label="Recent repair photos" className="-mx-4 scroll-pl-4 px-4 pb-4 sm:-mx-6 sm:scroll-pl-6 sm:px-6">
      {GALLERY.map((g) => (
        <figure key={g.src} className="w-[78%] shrink-0 snap-start sm:w-[380px]">
          <div className="aspect-[4/3.6] overflow-hidden rounded-3xl bg-ink/5">
            <img
              src={`/work/${g.src}-sm.webp`}
              srcSet={`/work/${g.src}-sm.webp 640w, /work/${g.src}.webp 1200w`}
              sizes="(min-width: 640px) 380px, 78vw"
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 px-1">
            <span className="font-semibold">{g.cap}</span>
            <span className="text-muted2"> – {g.fix}</span>
          </figcaption>
        </figure>
      ))}
    </PanRow>
  )
}

export function Faq({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mat text-xl leading-none text-teal-800 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-5 leading-relaxed text-muted2">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export const faqJsonLd = (items = FAQ) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
})

export function AreaLinks({ limit, current, items }: { limit?: number; current?: string; items?: string[] }) {
  const list = items || (limit ? AREAS.slice(0, limit) : AREAS)
  return (
    <ul className="flex flex-wrap gap-2">
      {list.map((a) => (
        <li key={a}>
          <Link
            href={`/areas/${slug(a)}`}
            className={`inline-block rounded-full border px-4 py-2 text-[15px] font-medium transition-colors ${a === current ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-teal-400"}`}
          >
            {a}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function ReviewsBand() {
  return (
    <div className="overflow-hidden rounded-[28px] bg-mat p-6 sm:p-10">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="text-[56px] font-extrabold leading-none tracking-tight sm:text-[64px]">{GOOGLE.rating.toFixed(1)}</div>
          <div>
            <div className="flex gap-0.5 text-[#f5a524]" aria-label={`Rated ${GOOGLE.rating} out of 5`}>
              {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5 fill-current" aria-hidden />)}
            </div>
            <p className="mt-1 font-semibold">{GOOGLE.count} Google reviews</p>
          </div>
        </div>
        <a href={SITE.google} target="_blank" rel="noopener" className="shrink-0 self-start rounded-full bg-ink px-6 py-3.5 font-semibold text-white hover:bg-teal-800 sm:self-auto">
          Read all reviews on Google
        </a>
      </div>
      <PanRow label="Google reviews" className="-mx-6 mt-8 scroll-pl-6 px-6 pb-1 sm:-mx-10 sm:scroll-pl-10 sm:px-10">
        {REVIEWS.map((r) => (
          <div key={r.name} className="w-[82%] shrink-0 snap-start sm:w-[320px]">
            <figure className="flex h-full flex-col rounded-3xl bg-white p-5">
              <div className="flex gap-0.5 text-[#f5a524]" aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-3 flex-1 leading-relaxed">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted2"><span className="font-semibold text-ink">{r.name}</span> · Google review</figcaption>
            </figure>
          </div>
        ))}
      </PanRow>
    </div>
  )
}

export function CtaBand({ title = "Need it fixed today?", text = "Most repairs are done the same day, at your place. Book a time online or give me a call." }: { title?: string; text?: string }) {
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-[32px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[44px]">{title}</h2>
          <p className="mt-3 text-lg text-white/70">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/book" className="rounded-full bg-aqua px-7 py-4 text-center text-lg font-bold text-ink hover:bg-white">Book a repair</Link>
          <a href={telHref} className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-lg font-semibold tnum hover:bg-white/10">
            <Phone className="h-5 w-5" aria-hidden /> {SITE.phone}
          </a>
        </div>
      </Container>
    </section>
  )
}
