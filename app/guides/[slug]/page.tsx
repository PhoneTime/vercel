import Link from "next/link"
import { notFound } from "next/navigation"
import { Container, CtaBand } from "@/components/Blocks"
import { GUIDES, guideBySlug } from "@/lib/guides"
import { SITE } from "@/lib/site"

type P = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: P) {
  const g = guideBySlug((await params).slug)
  if (!g) return {}
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.description, publishedTime: g.date },
  }
}

export default async function GuidePage({ params }: P) {
  const g = guideBySlug((await params).slug)
  if (!g) notFound()
  const others = GUIDES.filter((x) => x.slug !== g.slug)
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    datePublished: g.date,
    dateModified: g.date,
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@id": SITE.url + "/#business" },
    mainEntityOfPage: `${SITE.url}/guides/${g.slug}`,
    image: SITE.url + "/work/technician-at-work.webp",
  }
  const Body = g.Body
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <section className="bg-ink pb-12 pt-10 text-white sm:pt-14">
        <Container>
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <Link href="/guides" className="hover:text-white">Guides</Link>
          </nav>
          <h1 className="mt-4 max-w-3xl text-[34px] font-extrabold leading-[1.06] tracking-[-0.025em] sm:text-[50px]">{g.title}</h1>
          <p className="mt-4 text-white/60">
            {new Date(g.date + "T12:00").toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })} · {g.read}
          </p>
        </Container>
      </section>
      <section className="py-12 sm:py-16">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="guide max-w-[68ch]">
            <Body />
          </article>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-ink p-6 text-white">
              <h2 className="text-lg font-bold">Need it fixed?</h2>
              <p className="mt-2 text-white/70">I come to your home or work in {SITE.area}. Most repairs are done the same day.</p>
              <Link href="/book" className="mt-4 block rounded-full bg-aqua px-5 py-3 text-center font-bold text-ink hover:bg-white">Book a repair</Link>
              <Link href="/prices" className="mt-2 block rounded-full border border-white/25 px-5 py-3 text-center font-semibold hover:bg-white/10">See prices</Link>
            </div>
            <div>
              <h2 className="text-lg font-bold">More guides</h2>
              <ul className="mt-3 space-y-3">
                {others.map((o) => (
                  <li key={o.slug}><Link href={`/guides/${o.slug}`} className="font-medium text-teal-800 hover:underline">{o.title}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
