import type { MetadataRoute } from "next"
import { SITE, AREAS, allModels, slug } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const u = (p: string, priority: number) => ({ url: SITE.url + p, lastModified: now, priority })
  return [
    u("/", 1),
    u("/prices", 0.9),
    u("/book", 0.9),
    u("/contact", 0.6),
    u("/areas", 0.6),
    ...allModels().map((m) => u(`/repair/${slug(m.model)}`, 0.7)),
    ...AREAS.map((a) => u(`/areas/${slug(a)}`, 0.6)),
  ]
}
