"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ChevronDown } from "lucide-react"
import { brands, prices, faultsFor, FAULT_INFO, money, slug } from "@/lib/site"

export default function PriceFinder({ initialModel = "", compact = false }: { initialModel?: string; compact?: boolean }) {
  const startBrand = initialModel ? brands.findIndex((b) => b.g.some((g) => g.ms.includes(initialModel))) : 0
  const [bi, setBi] = useState(Math.max(0, startBrand))
  const firstPriced = (i: number) => {
    const ms = brands[i]?.g.flatMap((g) => g.ms) || []
    return ms.find((m) => faultsFor(m).length) || ms[0] || ""
  }
  const [model, setModel] = useState(initialModel || firstPriced(Math.max(0, startBrand)))
  const b = brands[bi]
  const faults = useMemo(() => faultsFor(model), [model])

  const pickBrand = (i: number) => {
    setBi(i)
    setModel(firstPriced(i))
  }

  return (
    <div className="rounded-[28px] bg-white p-5 text-ink shadow-[0_30px_60px_-30px_rgba(6,43,42,.55)] ring-1 ring-black/5 sm:p-6">
      <h2 className="text-lg font-bold tracking-tight">Check your price</h2>
      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Brand">
        {brands.map((x, i) => (
          <button
            key={x.n}
            type="button"
            aria-pressed={i === bi}
            onClick={() => pickBrand(i)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${i === bi ? "bg-ink text-white" : "bg-mat text-ink hover:bg-teal-100"}`}
          >
            {x.n}
          </button>
        ))}
      </div>

      <label htmlFor="pf-model" className="mt-4 block text-sm font-medium text-muted2">Your model</label>
      <div className="relative mt-1.5">
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink" aria-hidden />
      <select
        id="pf-model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full appearance-none rounded-2xl border border-line bg-paper px-4 py-3.5 pr-10 text-base font-semibold"
      >
        {b.g.map((g) =>
          b.g.length > 1 ? (
            <optgroup key={g.l} label={g.l}>
              {g.ms.map((m) => <option key={m}>{m}</option>)}
            </optgroup>
          ) : (
            g.ms.map((m) => <option key={m}>{m}</option>)
          ),
        )}
      </select>
      </div>

      <ul className="mt-4 divide-y divide-line" aria-live="polite">
        {faults.length === 0 && (
          <li className="py-4 text-muted2">
            Prices for this model are quoted on request. <Link href={`/book?model=${encodeURIComponent(model)}`} className="font-semibold text-teal-700 underline">Ask for a quote</Link>
          </li>
        )}
        {(compact ? faults.slice(0, 4) : faults).map((f) => {
          const opts = prices[model][f]
          return (
            <li key={f} className="flex items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{FAULT_INFO[f]?.name || f}</div>
                {opts.length > 1 && <div className="truncate text-sm text-muted2">{opts.length} part options</div>}
              </div>
              <div className="text-right">
                {opts.length > 1 && <div className="text-xs text-muted2">from</div>}
                <div className="text-lg font-bold tnum">{money(Math.min(...opts.map((o) => +o.p)))}</div>
              </div>
              <Link
                href={`/book?model=${encodeURIComponent(model)}&repair=${encodeURIComponent(f)}`}
                className="rounded-full bg-mat px-3.5 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-100"
                aria-label={`Book ${FAULT_INFO[f]?.name || f} for ${model}`}
              >
                Book
              </Link>
            </li>
          )
        })}
      </ul>
      <Link href={`/repair/${slug(model)}`} className="mt-2 inline-block text-sm font-semibold text-teal-700 underline-offset-4 hover:underline">
        All {model} repairs and part options
      </Link>
    </div>
  )
}
