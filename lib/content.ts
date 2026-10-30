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

/* Google rating: update the count now and then (or ask Claude to). */
export const GOOGLE = { rating: 5.0, count: 48 }

/* Real Google reviews, word for word (long ones cut at a full stop), first name and initial only. */
export const REVIEWS = [
  { name: "Maria R.", text: "Utterly exceptional, friendly and came to me on a SUNDAY night!!! The repair was so quick (I am very impressed with the professional setup he brought with him)." },
  { name: "Darren V.", text: "Great service! Called on a Saturday night and he arrived within half an hour and fixed it very quickly. Cannot recommend any higher!" },
  { name: "Jenni L.", text: "Very friendly and efficient. My iphone 11 screen replacement was done in 15mins. Would use this company again in the future. Thank you :)!" },
  { name: "Wyatt W.", text: "Fantastic, was here within 15 mins, and fixed the phone in about 10 mins.. Highly recommend" },
  { name: "Rachael E.", text: "Absolutely amazing service. I am so happy, I completely smashed my whole screen while at work and they were able to come to my work to fix my phone. So so well priced." },
  { name: "Jayden C.", text: "Amazing service and my phone is fully fixed now. He came straight away as soon as we called. 10/10 recommend!" },
  { name: "Mark S.", text: "Henry turned up on time and efficiently restored my son's damaged phone and assisted the family in sovling long standing issues with the other phones." },
  { name: "Nathan C.", text: "I was very pleased with his service, prompt and efficient. Incredibly impressed with how quick and professional the repair was done." },
  { name: "Anthony K.", text: "Excellent and prompt service. Very reasonable prices. Highly recommended." },
  { name: "Claude V.", text: "The best job I've ever had done with my mobile." },
  { name: "Tilly E.", text: "I cannot say enough good things about the service kindness and special care they gave me." },
  { name: "Christine W.", text: "Wonderful service and support. I will be used again. Very happy with service." },
  { name: "Flynn", text: "very good service, called him out late at night, stayed for a few hours trying to fix my phone. gave me all the details. i needed. very good" },
  { name: "Peter H.", text: "Fantastic and fine attention to detail. Very professional" },
  { name: "Jake D.", text: "Great service, quick and easy and go to your house which is good" },
  { name: "Charlie D.", text: "I'm very happy from phonetime services. Come to my door easy and relax." },
  { name: "Vladimir O.", text: "Extremly fast helpful and convenient!" },
]
