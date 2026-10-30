import Link from "next/link"
import { notFound } from "next/navigation"
import { Check } from "lucide-react"
import PriceFinder from "@/components/PriceFinder"
import { Container, SectionHead, Gallery, AreaLinks, ReviewsBand, CtaBand, Faq } from "@/components/Blocks"
import { AREAS, SITE, slug } from "@/lib/site"
import { FAQ } from "@/lib/content"

type P = { params: Promise<{ suburb: string }> }

export const dynamicParams = false
export function generateStaticParams() {
  return AREAS.map((a) => ({ suburb: slug(a) }))
}
const find = (s: string) => AREAS.find((a) => slug(a) === s)

export async function generateMetadata({ params }: P) {
  const a = find((await params).suburb)
  if (!a) return {}
  return {
    title: `Phone Repair ${a} – We Come to You`,
    description: `Mobile phone repair in ${a}. iPhone, Samsung, Pixel and iPad screens, batteries and charging ports fixed at your home or work. No travel fee, ${SITE.warranty}-day warranty.`,
    alternates: { canonical: `/areas/${slug(a)}` },
  }
}

export default async function SuburbPage({ params }: P) {
  const a = find((await params).suburb)
  if (!a) notFound()
  const i = AREAS.indexOf(a)
  const near = AREAS.filter((_, j) => j !== i && Math.abs(j - i) <= 5)

  return (
    <>
      <section className="bg-ink pb-14 pt-12 text-white sm:pt-16">
        <Container className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <nav aria-label="Breadcrumb" className="text-sm text-white/60">
              <Link href="/areas" className="hover:text-white">Areas</Link> <span aria-hidden>/</span> <span className="text-white/90">{a}</span>
            </nav>
            <h1 className="mt-4 text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[60px]">Phone repair in {a}</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
              I come to your home or work in {a} and fix your phone on the spot. Screens, batteries, charging ports, back glass and more.
            </p>
            <ul className="mt-6 grid max-w-md grid-cols-2 gap-y-2.5 text-[15px] text-white/90">
              {["No travel fee", "Most repairs same day", `${SITE.warranty}-day warranty`, "Open 24 hours"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-aqua" strokeWidth={3} aria-hidden />{t}</li>
              ))}
            </ul>
            <Link href="/book" className="mt-8 inline-block rounded-full bg-aqua px-7 py-4 text-lg font-bold text-ink hover:bg-white">Book a repair in {a}</Link>
          </div>
          <PriceFinder compact />
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <SectionHead title="Recent repairs" intro="Real jobs from around the eastern suburbs." />
          <div className="mt-10"><Gallery /></div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container><ReviewsBand /></Container>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHead title="Questions" />
          <Faq items={FAQ.slice(0, 4)} />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-extrabold tracking-tight">Nearby suburbs</h2>
          <div className="mt-6"><AreaLinks items={near} /></div>
        </Container>
      </section>
      <CtaBand title={`Need a repair in ${a}?`} />
    </>
  )
}
