import { Suspense } from "react"
import BookingForm from "@/components/BookingForm"
import { Container } from "@/components/Blocks"
import { SITE } from "@/lib/site"
import { DEPOSIT_POLICY } from "@/lib/content"

export const metadata = {
  title: "Book a Phone Repair or Get a Quote – I Come to You",
  description: `Book an on-site phone repair in ${SITE.area}. Choose your phone and repair, see the price, and pick a time. Open 24 hours, 7 days.`,
  alternates: { canonical: "/book" },
}

export default function BookPage() {
  return (
    <div className="pb-20">
      <section className="bg-ink pb-24 pt-10 text-white sm:pt-14">
        <Container>
          <h1 className="text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[54px]">Book a repair or get a quote</h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">Takes about a minute. Book a time now, or just ask for a price first. You only pay once it&apos;s fixed.</p>
        </Container>
      </section>
      <Container className="-mt-14">
        <Suspense fallback={<div className="h-96 rounded-[28px] bg-white" />}>
          <BookingForm />
        </Suspense>
      </Container>
      <Container>
        <section id="deposits" className="mt-14 scroll-mt-24 rounded-[28px] border border-line bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight">Deposits &amp; cancellations</h2>
          <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-muted2">
            {DEPOSIT_POLICY.map((t) => (
              <li key={t} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />{t}</li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  )
}
