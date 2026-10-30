import "./globals.css"
import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { Schibsted_Grotesk } from "next/font/google"
import Script from "next/script"
import Providers from "@/app/providers"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MobileBar from "@/components/MobileBar"
import { SITE, AREAS } from "@/lib/site"

const sans = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Phone Time | On-site Phone Repair in Kilsyth & Melbourne's East",
    template: "%s | Phone Time",
  },
  description:
    "Mobile phone repair that comes to you. Screens, batteries, charging ports and back glass for iPhone, Samsung, Google Pixel and iPad, fixed at your home or work across Kilsyth and Melbourne's eastern suburbs.",
  keywords: ["phone repair Kilsyth", "mobile phone repair near me", "iPhone screen repair Melbourne east", "on-site phone repair", "Samsung screen repair Croydon", "Phone Time"],
  openGraph: {
    type: "website",
    siteName: "Phone Time",
    locale: "en_AU",
    url: SITE.url,
    images: [{ url: "/work/technician-at-work.webp", width: 1200, height: 1187, alt: "Phone Time technician repairing an iPhone on a repair mat" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/logo-256.png" },
}

export const viewport: Viewport = { themeColor: "#062b2a", width: "device-width", initialScale: 1 }

/* Service-area business: no street address shown, areas listed instead */
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "MobilePhoneStore",
  "@id": SITE.url + "/#business",
  name: SITE.name,
  url: SITE.url,
  telephone: "+61" + SITE.phone.replace(/\D/g, "").replace(/^0/, ""),
  email: SITE.email,
  image: SITE.url + "/work/technician-at-work.webp",
  logo: SITE.url + "/logo-256.png",
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Kilsyth", addressRegion: "VIC", postalCode: "3137", addressCountry: "AU" },
  areaServed: AREAS.map((a) => ({ "@type": "Place", name: a + " VIC" })),
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  }],
  sameAs: [SITE.google, SITE.shop],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AU" className={`light ${sans.variable}`} style={{ colorScheme: "light" }}>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17522228043" strategy="afterInteractive" />
        <Script id="google-tags" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17522228043');
            gtag('config', 'G-94D6CCRGY8');
          `}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      </head>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
        </Providers>
      </body>
    </html>
  )
}
