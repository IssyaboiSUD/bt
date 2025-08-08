import Link from 'next/link'
import { MapPin, Phone, Mail, Calendar } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-primary-400 mb-4">Bayreuth Apartments</h3>
            <p className="text-gray-300 mb-4">
              Beautiful vacation apartments in the heart of Bayreuth, Germany. 
              Experience comfort and convenience with our modern accommodations.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Bayreuth, Germany</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+49 178 6936366</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@bayreuth-apartments.de</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/apartments" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Booking */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Book Your Stay</h4>
            <div className="space-y-2">
              <Link 
                href="/booking" 
                className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Check Availability</span>
              </Link>
            </div>
            <div className="mt-4 text-sm text-gray-300">
              <p>Direct booking - no commission fees!</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Bayreuth Apartments. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-300 hover:text-primary-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-300 hover:text-primary-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/imprint" className="text-gray-300 hover:text-primary-400 text-sm transition-colors">
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
