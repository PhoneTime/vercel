import { SITE } from "@/lib/site"

export const GALLERY = [
  { src: "iphone-14-pro-screen", alt: "iPhone 14 Pro with a lined, faulty display, then working after a new screen", cap: "iPhone 14 Pro", fix: "Screen replacement" },
  { src: "iphone-12-pro-back-glass", alt: "iPhone 12 Pro with shattered back glass, then with new back glass", cap: "iPhone 12 Pro", fix: "Back glass replacement" },
  { src: "galaxy-s23-ultra-screen", alt: "Galaxy S23 Ultra with a dead display, then working after a new screen", cap: "Galaxy S23 Ultra", fix: "Screen replacement" },
  { src: "iphone-15-pro-screen", alt: "iPhone 15 Pro with a broken display, then working after a new screen", cap: "iPhone 15 Pro", fix: "Screen replacement" },
  { src: "iphone-15-back-glass", alt: "iPhone 15 with cracked back glass, then with new back glass", cap: "iPhone 15", fix: "Back glass replacement" },
  { src: "galaxy-z-flip-repair", alt: "Galaxy Z Flip opened up on the repair mat during a repair", cap: "Galaxy Z Flip", fix: "Internal repair" },
  { src: "iphone-water-damage", alt: "Water droplets inside an iPhone, found while treating water damage", cap: "iPhone", fix: "Water damage treatment" },
]

export const FAQ = [
  {
    q: "Do you charge to come to me?",
    a: "No. Coming to your home or work is part of the repair price, anywhere in Kilsyth and the eastern suburbs I cover.",
  },
  {
    q: "How long does a repair take?",
    a: "Most repairs are done the same day, at your place, while you wait. If a part has to be ordered for a less common model, I'll tell you before booking.",
  },
  {
    q: "What kind of parts do you use?",
    a: "For most screens you can choose between part options, from genuine to good-value replacements. Each option is priced upfront so you know exactly what you are paying for before I start.",
  },
  {
    q: "Is there a warranty?",
    a: `Yes. Every repair has a ${SITE.warranty}-day warranty covering the replaced part and the labour. If something isn't right with the repair, I'll fix it free of charge.`,
  },
  {
    q: "My iPhone says “unknown part” after a repair. Is that a problem?",
    a: "On newer iPhones, Settings may show an “unknown part” notice after a battery, screen or camera replacement. This is normal for replacement parts and does not affect function or how your phone works.",
  },
  {
    q: "Will I lose my photos or data?",
    a: "Screen, battery, charging port and back glass repairs don't touch your data. A backup is always a good idea before any repair, and I can help you check it.",
  },
  {
    q: "When are you available?",
    a: "Open 24 hours, 7 days. Book online for any time that suits you, or call or WhatsApp for a same-day visit.",
  },
  {
    q: "How can I pay?",
    a: "Cash, card or bank transfer once the repair is done and you're happy with it.",
  },
]

export const SHOP = [
  { img: "/shop/iphone-acc.webp", t: "iPhone cases", href: SITE.shop + "/shop/category/accessories-phone-case-iphone-case-1" },
  { img: "/shop/samsung-acc.webp", t: "Samsung cases", href: SITE.shop + "/shop/category/accessories-phone-case-samsung-case-7" },
  { img: "/shop/charger-cable.webp", t: "Chargers and cables", href: SITE.shop + "/shop/category/accessories-charges-cables-54" },
  { img: "/shop/power-bank.webp", t: "Power banks", href: SITE.shop + "/shop/category/accessories-power-bank-55" },
  { img: "/shop/car-holder.webp", t: "Car holders", href: SITE.shop + "/shop/category/accessories-mounts-car-accessories-57" },
]
