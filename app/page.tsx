import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PhoneIcon, WrenchIcon, CalendarIcon, CheckCircleIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
  {/* Hero Section */}
  <section className="bg-gradient-to-b from-teal-600 to-teal-500 text-white py-16 md:py-24">
  <div className="container mx-auto px-4 text-center">
    <div className="flex justify-center mb-8">
      <img
        src="/images/phonetime-logo.png"
        alt="Phone Time Logo"
        className="w-28 h-28 object-contain"
      />
    </div>

    <h1 className="text-4xl md:text-5xl font-bold mb-4">Fast & Reliable Phone Repairs</h1>
    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Timely Repairs, Timeless Quality</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/price-check">
        <Button size="lg" className="bg-white text-teal-600 hover:bg-slate-100">
          Check Repair Prices
        </Button>
      </Link>
      <Link href="/appointment">
        <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white hover:text-teal-600"
        >
          Book an Appointment
        </Button>
      </Link>
    </div>
  </div>
</section>


      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<PhoneIcon className="h-10 w-10" />}
              title="Screen Repairs"
              description="Fast screen replacement for all major phone models."
            />
            <ServiceCard
              icon={<WrenchIcon className="h-10 w-10" />}
              title="Battery Replacement"
              description="Restore your phone's battery life with our premium replacements."
            />
            <ServiceCard
              icon={<CheckCircleIcon className="h-10 w-10" />}
              title="Water Damage"
              description="Specialized treatment for water-damaged devices."
            />
            <ServiceCard
              icon={<CalendarIcon className="h-10 w-10" />}
              title="Same-Day Service"
              description="Most repairs completed within hours, not days."
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              number="1"
              title="Expert Technicians"
              description="Our certified technicians have years of experience repairing all phone models."
            />
            <FeatureCard
              number="2"
              title="Quality Parts"
              description="We use only high-quality, manufacturer-grade replacement parts."
            />
            <FeatureCard
              number="3"
              title="Warranty Included"
              description="All our repairs come with a 90-day warranty for your peace of mind."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Fix Your Phone?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Check our competitive prices or book an appointment now</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/price-check">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-slate-100">
                Check Prices
              </Button>
            </Link>
            <Link href="/appointment">
              <Button size="lg" className="bg-slate-800 hover:bg-slate-900 text-white">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
      <div className="text-teal-500 mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function FeatureCard({ number, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="bg-teal-500 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}
