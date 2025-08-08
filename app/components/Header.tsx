'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Calendar, MapPin, Phone, Mail } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              Bayreuth Apartments
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-gray-700 hover:text-primary-600 transition-colors border-b-2 pb-1 ${
                pathname === '/' ? 'border-primary-600' : 'border-transparent hover:border-primary-600'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/apartments" 
              className={`text-gray-700 hover:text-primary-600 transition-colors border-b-2 pb-1 ${
                pathname.startsWith('/apartments') ? 'border-primary-600' : 'border-transparent hover:border-primary-600'
              }`}
            >
              Apartments
            </Link>
            <Link 
              href="/booking" 
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white flex items-center"
            >
              Book Now
            </Link>
            <Link 
              href="/contact" 
              className={`text-gray-700 hover:text-primary-600 transition-colors border-b-2 pb-1 ${
                pathname === '/contact' ? 'border-primary-600' : 'border-transparent hover:border-primary-600'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>+49 178 6936366</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>info@bayreuth-apartments.de</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMounted && isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMounted && isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className={`text-gray-700 hover:text-primary-600 transition-colors border-l-4 pl-3 ${
                  pathname === '/' ? 'border-primary-600' : 'border-transparent hover:border-primary-600'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/apartments" 
                className={`text-gray-700 hover:text-primary-600 transition-colors border-l-4 pl-3 ${
                  pathname.startsWith('/apartments') ? 'border-primary-600' : 'border-transparent hover:border-primary-600'
                }`}
              >
                Apartments
              </Link>
              <Link 
                href="/booking" 
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white"
              >
                Book Now
              </Link>
              <Link 
                href="/contact" 
                className={`text-gray-700 hover:text-primary-600 transition-colors border-l-4 pl-3 ${
                  pathname === '/contact' ? 'border-primary-600' : 'border-transparent hover:border-primary-600'
                }`}
              >
                Contact
              </Link>
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
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
        )}
      </div>
    </header>
  )
}
