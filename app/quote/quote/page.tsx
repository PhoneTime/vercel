"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function QuoteRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/price-check")
  }, [router])

  return (
    <div className="p-6 text-gray-500 text-center">
      Redirecting to quote page...
    </div>
  )
}
