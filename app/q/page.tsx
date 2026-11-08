import { Suspense } from "react"
import QuoteAccept from "@/components/QuoteAccept"
import { Container } from "@/components/Blocks"

export const metadata = {
  title: "Your Repair Quote",
  description: "Accept your Phone Time repair quote and choose a time that suits you.",
  robots: { index: false, follow: false },
}

export default function QuotePage() {
  return (
    <div className="pb-20">
      <section className="bg-ink pb-24 pt-10 text-white sm:pt-14">
        <Container>
          <h1 className="text-[38px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[54px]">Your repair quote</h1>
          <p className="mt-4 max-w-xl text-lg text-white/75">Accept it and pick a time that suits you – I come to you. Or send me a question first.</p>
        </Container>
      </section>
      <Container className="-mt-14">
        <Suspense fallback={<div className="h-96 rounded-[28px] bg-white" />}>
          <QuoteAccept />
        </Suspense>
      </Container>
    </div>
  )
}
