import Link from "next/link"
import { SITE, telHref, waHref, abnFmt, AREAS, slug } from "@/lib/site"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pb-28 pt-16 text-white/75 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo-256.png" alt="" width={36} height={40} className="h-10 w-auto" />
            <span className="text-xl font-extrabold tracking-tight text-white">Phone Time</span>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed">
            On-site phone and tablet repair. I come to your home or work in {SITE.area}.
          </p>
          <a href={telHref} className="mt-5 block text-2xl font-bold text-aqua tnum">{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className="mt-1 block hover:text-white">{SITE.email}</a>
          <p className="mt-1">Open 24 hours, 7 days</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Repairs</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link href="/prices" className="hover:text-white">All repair prices</Link></li>
            <li><Link href="/book" className="hover:text-white">Book a repair</Link></li>
            <li><a href={waHref("Hi Phone Time, I'd like a quote")} target="_blank" rel="noopener" className="hover:text-white">Ask on WhatsApp</a></li>
            <li><a href={SITE.google} target="_blank" rel="noopener" className="hover:text-white">Google reviews</a></li>
            <li><a href={SITE.shop} target="_blank" rel="noopener" className="hover:text-white">Accessories shop</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-white">Areas I cover</h2>
          <p className="mt-4 leading-loose">
            {AREAS.slice(0, 14).map((a, i) => (
              <span key={a}>
                <Link href={`/areas/${slug(a)}`} className="hover:text-white">{a}</Link>
                {i < 13 ? ", " : ""}
              </span>
            ))}{" "}
            and <Link href="/areas" className="text-aqua hover:underline">more suburbs</Link>.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-2 border-t border-white/10 px-4 pt-6 text-sm text-white/50 sm:flex-row sm:justify-between sm:px-6">
        <p className="shrink-0">© {new Date().getFullYear()} {SITE.legal} · <span className="whitespace-nowrap">ABN {abnFmt}</span></p>
        <p className="max-w-xl sm:text-right">Apple, iPhone, iPad, Samsung and Galaxy are trademarks of their owners. Phone Time is an independent repairer.</p>
      </div>
    </footer>
  )
}
