import { Container, AreaLinks, CtaBand } from "@/components/Blocks"
import { SITE } from "@/lib/site"

export const metadata = {
  title: "Areas Covered – Mobile Phone Repair in Melbourne's East",
  description: `On-site phone repair across ${SITE.area}: Kilsyth, Croydon, Mooroolbark, Bayswater, Boronia, Ringwood, Lilydale, Ferntree Gully, Rowville and more.`,
  alternates: { canonical: "/areas" },
}

export default function AreasPage() {
  return (
    <>
      <section className="bg-ink pb-14 pt-12 text-white sm:pt-16">
        <Container>
          <h1 className="text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">Areas I cover</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
            Based in Kilsyth and repairing phones at homes and workplaces across Melbourne&apos;s east. No travel fee in any of these suburbs.
          </p>
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <AreaLinks />
          <p className="mt-10 max-w-xl text-muted2">
            Just outside these suburbs? Call {SITE.phone} or send a booking with your address and I&apos;ll let you know if I can get to you.
          </p>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
