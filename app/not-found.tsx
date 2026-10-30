import Link from "next/link"
import { Container } from "@/components/Blocks"

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <h1 className="text-4xl font-extrabold tracking-tight">This page has moved</h1>
        <p className="mt-3 max-w-md text-lg text-muted2">The link may be old. Find your price or book a repair below.</p>
        <div className="mt-8 flex gap-3">
          <Link href="/prices" className="rounded-full bg-ink px-6 py-3 font-semibold text-white">See prices</Link>
          <Link href="/book" className="rounded-full border border-line px-6 py-3 font-semibold">Book a repair</Link>
        </div>
      </Container>
    </section>
  )
}
