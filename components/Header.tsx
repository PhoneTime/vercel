import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-6 flex justify-between items-center">
      <div className="text-2xl font-bold text-teal-600">
        <Link href="/">PhoneTime</Link>
      </div>
      <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
        <Link href="/" className="hover:text-teal-600 transition">Home</Link>
        <Link href="/price-check" className="hover:text-teal-600 transition">Price Check</Link>
        <Link href="/accessories" className="hover:text-teal-600 transition">Accessories</Link>
        <Link href="/appointment" className="hover:text-teal-600 transition">Appointment</Link>
        <Link href="/contact" className="hover:text-teal-600 transition">Contact</Link>
      </nav>
    </header>
  );
}
