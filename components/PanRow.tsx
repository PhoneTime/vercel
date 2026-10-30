"use client"

import { useEffect, useRef } from "react"

/* A sideways row. With a mouse, the row follows the pointer: move right and the
   content slides left. On touch screens it is a normal swipe row with snapping. */
export default function PanRow({ children, className = "", label }: { children: React.ReactNode; className?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let target = el.scrollLeft
    let raf = 0
    const tick = () => {
      const d = target - el.scrollLeft
      if (Math.abs(d) < 0.5) {
        el.scrollLeft = target
        raf = 0
        return
      }
      el.scrollLeft += d * 0.1
      raf = requestAnimationFrame(tick)
    }
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const edge = r.width * 0.15 // reach the ends before the pointer hits the edge
      const x = Math.min(1, Math.max(0, (e.clientX - r.left - edge) / (r.width - edge * 2)))
      target = x * (el.scrollWidth - el.clientWidth)
      if (reduce) el.scrollLeft = target
      else if (!raf) raf = requestAnimationFrame(tick)
    }
    el.addEventListener("mousemove", move)
    return () => {
      el.removeEventListener("mousemove", move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [@media(pointer:coarse)]:snap-x [@media(pointer:coarse)]:snap-mandatory ${className}`}
    >
      {children}
    </div>
  )
}
