import { Suspense } from "react"
import CallLink from "@/components/CallLink"
import { Container } from "@/components/Blocks"

export const metadata = {
  title: "Call or text",
  robots: { index: false, follow: false },
}

/* Helper page for the Phone Time repair app: /c?n=<number> starts a call,
   /c?n=<number>&s=1&b=<text> opens Messages with the text filled in.
   The app runs inside claude.ai, which can't open tel: or sms: links itself. */
export default function CallPage() {
  return (
    <div className="py-10 sm:py-16">
      <Container>
        <Suspense fallback={<div className="h-72 rounded-[28px] bg-white" />}>
          <CallLink />
        </Suspense>
      </Container>
    </div>
  )
}
