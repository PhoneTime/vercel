import appData from "@/data/prices.json"
import baseData from "@/data/prices-base.json"

/* ------------------------------------------------------------------
   Business details. Prices come from data/prices.json, which is the
   file exported from the repair app ("Export website prices").
   ------------------------------------------------------------------ */

export type PriceOpt = { v?: string; l?: string; p: number; d?: string }
export type PriceData = {
  shop?: { name?: string; phone?: string; email?: string; web?: string; area?: string; abn?: string; warranty?: number; fs?: string }
  brands: { n: string; g: { l: string; ms: string[] }[] }[]
  prices: Record<string, Record<string, PriceOpt[]>>
  made?: string
}

/* prices.json is replaced by each export from the app. prices-base.json holds the
   older website prices and only fills gaps for repairs the app has no price for yet. */
const A = appData as PriceData
const B = baseData as PriceData
const D: PriceData = {
  shop: { ...B.shop, ...A.shop },
  brands: A.brands?.length ? A.brands : B.brands,
  prices: (() => {
    const out: PriceData["prices"] = {}
    for (const m of new Set([...Object.keys(B.prices || {}), ...Object.keys(A.prices || {})])) {
      out[m] = { ...(B.prices?.[m] || {}), ...(A.prices?.[m] || {}) }
    }
    return out
  })(),
  made: A.made || B.made,
}

export const SITE = {
  name: "Phone Time",
  legal: "Phone Time Phone Repair",
  url: "https://www.phonetime.com.au",
  phone: D.shop?.phone || "0468 897 890",
  email: D.shop?.email || "phonetime.au@gmail.com",
  abn: (D.shop?.abn || "70464886442").replace(/\D/g, ""),
  warranty: D.shop?.warranty || 90,
  formspree: D.shop?.fs || "https://formspree.io/f/xblgqzjw",
  google: "https://maps.app.goo.gl/kaBnrfUZXHFCxJYS6",
  shop: "https://shop.phonetime.com.au",
  area: "Kilsyth & Melbourne's eastern suburbs",
}

export const telHref = "tel:" + SITE.phone.replace(/\s/g, "")
export const waHref = (text?: string) =>
  "https://wa.me/61" + SITE.phone.replace(/\D/g, "").replace(/^0/, "") + (text ? "?text=" + encodeURIComponent(text) : "")
export const abnFmt = SITE.abn.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")

export const slug = (s: string) => s.toLowerCase().replace(/\+/g, " plus").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

export const brands = D.brands
export const prices = D.prices
export const pricesUpdated = D.made

export const allModels = () => brands.flatMap((b) => b.g.flatMap((g) => g.ms.map((m) => ({ brand: b.n, series: g.l, model: m }))))
export const modelBySlug = (s: string) => allModels().find((x) => slug(x.model) === s)

/* Order repairs are shown in, most asked-for first */
export const FAULT_ORDER = ["Screen", "Battery", "Charging port", "Back glass", "Housing", "Camera", "Water damage", "Other"]
export const FAULT_INFO: Record<string, { name: string; blurb: string }> = {
  Screen: { name: "Screen replacement", blurb: "Cracked glass, lines, black spots or touch that stops working." },
  Battery: { name: "Battery replacement", blurb: "Phone dies early, shuts off at 20% or the battery is swelling." },
  "Charging port": { name: "Charging port repair", blurb: "Cable feels loose, charges only at an angle, or not at all." },
  "Back glass": { name: "Back glass replacement", blurb: "Shattered rear glass replaced so the phone is sealed and smooth again." },
  Housing: { name: "Housing replacement", blurb: "Bent or dented frame with new back glass, in your phone's colour." },
  Camera: { name: "Camera repair", blurb: "Blurry, shaking or black camera, or cracked camera lens." },
  "Water damage": { name: "Water damage treatment", blurb: "Cleaning and drying the board to bring a wet phone back." },
  Other: { name: "Other repairs", blurb: "Buttons, speakers, microphones, Face ID and more." },
}

export const faultsFor = (model: string) => {
  const p = prices[model] || {}
  return Object.keys(p)
    .filter((f) => (p[f] || []).length)
    .sort((a, b) => (FAULT_ORDER.indexOf(a) + 99) % 99 - (FAULT_ORDER.indexOf(b) + 99) % 99)
}
export const fromPrice = (opts?: PriceOpt[]) => (opts && opts.length ? Math.min(...opts.map((o) => +o.p)) : null)
export const money = (n: number) => "$" + (Number.isInteger(n) ? n : n.toFixed(2))

/* Lowest price for a repair across every model in a series - used for "from $" */
export const seriesFrom = (fault: string, ms: string[]) => {
  const all = ms.map((m) => fromPrice(prices[m]?.[fault])).filter((x): x is number => x != null)
  return all.length ? Math.min(...all) : null
}

/* Suburbs served, nearest first */
export const AREAS = [
  "Kilsyth", "Kilsyth South", "Mooroolbark", "Montrose", "Croydon", "Croydon North", "Croydon South", "Croydon Hills",
  "Bayswater", "Bayswater North", "Boronia", "The Basin", "Lilydale", "Mount Evelyn", "Chirnside Park", "Ringwood",
  "Ringwood East", "Ringwood North", "Heathmont", "Wantirna", "Wantirna South", "Ferntree Gully", "Upper Ferntree Gully",
  "Knoxfield", "Scoresby", "Rowville", "Vermont", "Vermont South", "Mitcham", "Donvale", "Warranwood", "Wonga Park",
  "Glen Waverley", "Wheelers Hill", "Box Hill", "Blackburn",
]
