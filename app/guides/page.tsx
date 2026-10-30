import Link from "next/link"
import { Container, CtaBand } from "@/components/Blocks"
import { GUIDES } from "@/lib/guides"

export const metadata = {
  title: "Phone Repair Guides – Costs, Batteries, Screens and Charging",
  description: "Plain-English guides from an on-site phone repairer in Melbourne's east: repair costs, battery health, charging problems and screen options.",
  alternates: { canonical: "/guides" },
}

export default function GuidesPage() {
  return (
    <>
      <section className="bg-ink pb-14 pt-12 text-white sm:pt-16">
        <Container>
          <h1 className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">Guides</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">Straight answers to the questions I get asked most, from repair costs to battery health.</p>
        </Container>
      </section>
      <section className="py-14 sm:py-20">
        <Container>
          <ul className="divide-y divide-line border-y border-line">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group block py-7">
                  <h2 className="text-2xl font-bold tracking-tight group-hover:text-teal-700 sm:text-[28px]">{g.title}</h2>
                  <p className="mt-2 max-w-2xl text-lg text-muted2">{g.description}</p>
                  <p className="mt-3 text-sm text-muted2">{g.read}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
