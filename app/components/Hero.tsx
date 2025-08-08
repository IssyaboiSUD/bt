'use client'

import Link from 'next/link'
import { Calendar, MapPin, Star } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-screen flex items-start justify-center pt-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bayreuth.jpeg')"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Bayreuth Apartments
          </h1>
          <p className="text-xl md:text-2xl mb-24 text-gray-200">
            Experience luxury and comfort in the heart of Bayreuth, Germany
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-16 text-sm md:text-base">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Central Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Instant Booking</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link 
              href="/booking" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Now</span>
            </Link>
            <Link 
              href="/apartments" 
              className="btn-secondary text-lg px-8 py-4"
            >
              View Apartments
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Free Cancellation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
