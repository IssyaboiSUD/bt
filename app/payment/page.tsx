'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  Shield, 
  Check, 
  MapPin, 
  Calendar,
  Users,
  ArrowLeft,
  CreditCard,
  Lock
} from 'lucide-react'
import Link from 'next/link'

// Mock apartment data (should match booking page)
const apartments = [
  {
    id: 'apartment-1',
    name: 'Two Bedroom Apartment',
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: '/b8.jpeg',
    rating: 4.9
  },
  {
    id: 'apartment-2',
    name: 'Two Bedroom Apartment with Balcony',
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    image: '/a2.jpeg',
    rating: 4.8
  }
]

function PaymentContent() {
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')

  // Get booking details from URL params
  const apartmentId = searchParams.get('apartment') || '1'
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const guests = parseInt(searchParams.get('guests') || '1')
  const nights = parseInt(searchParams.get('nights') || '1')
  const total = parseFloat(searchParams.get('total') || '200')
  const guestName = searchParams.get('guestName') || ''
  const guestEmail = searchParams.get('guestEmail') || ''
  const guestPhone = searchParams.get('guestPhone') || ''
  const notes = searchParams.get('notes') || ''

  const selectedApartment = apartments.find(apt => apt.id === apartmentId)

  // Handle Stripe Checkout
  const handleStripeCheckout = async () => {
    if (!selectedApartment) return

    setIsProcessing(true)
    setError('')

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apartmentId,
          apartmentName: selectedApartment.name,
          checkIn,
          checkOut,
          guests,
          nights,
          pricePerNight: selectedApartment.price,
          totalAmount: total,
          guestName,
          guestEmail,
          guestPhone,
          notes,
        }),
      })

      const { sessionId, url, error: apiError } = await response.json()

      if (apiError) {
        setError(apiError)
        return
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      }
    } catch (err) {
      setError('Failed to create checkout session. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!selectedApartment) {
    return (
      <main>
        <Header />
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Details Missing</h2>
              <p className="text-gray-600 mb-8">Please go back to the booking page to select an apartment and dates.</p>
              <Link href="/booking" className="btn-primary">
                Go to Booking Page
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Secure Checkout
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Complete your booking with Stripe's secure checkout system
          </p>
        </div>
      </section>

      {/* Payment Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <Link href="/booking" className="text-primary-600 hover:text-primary-700">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">
                      Payments processed securely by Stripe
                    </span>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 text-red-600">⚠️</div>
                      <span className="text-sm font-medium text-red-800">{error}</span>
                    </div>
                  </div>
                )}

                {/* Booking Summary Card */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">You're booking:</h3>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={selectedApartment.image}
                      alt={selectedApartment.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{selectedApartment.name}</h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>Bayreuth, Germany</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span>{selectedApartment.bedrooms} bed</span>
                        <span>{selectedApartment.bathrooms} bath</span>
                        <span>Up to {selectedApartment.maxGuests} guests</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Check-in:</span>
                      <p className="font-medium">{checkIn}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Check-out:</span>
                      <p className="font-medium">{checkOut}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Guests:</span>
                      <p className="font-medium">{guests}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Nights:</span>
                      <p className="font-medium">{nights}</p>
                    </div>
                  </div>
                </div>

                {/* Guest Information */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Guest Information:</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-2 font-medium">{guestName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <span className="ml-2 font-medium">{guestEmail}</span>
                    </div>
                    {guestPhone && (
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2 font-medium">{guestPhone}</span>
                      </div>
                    )}
                    {notes && (
                      <div>
                        <span className="text-gray-600">Special Requests:</span>
                        <p className="mt-1 text-gray-700">{notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stripe Checkout Button */}
                <button
                  onClick={handleStripeCheckout}
                  disabled={isProcessing}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating Checkout...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay €{total.toFixed(2)} with Stripe</span>
                    </>
                  )}
                </button>

                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 mb-2">Stripe accepts:</p>
                  <div className="flex justify-center space-x-2 text-xs text-gray-500">
                    <span>Visa</span>
                    <span>•</span>
                    <span>Mastercard</span>
                    <span>•</span>
                    <span>American Express</span>
                    <span>•</span>
                    <span>PayPal</span>
                    <span>•</span>
                    <span>Apple Pay</span>
                    <span>•</span>
                    <span>Google Pay</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>€{selectedApartment.price} × {nights} nights</span>
                    <span>€{(selectedApartment.price * nights).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>€0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>€0.00</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Protected by:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">SSL Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Stripe Secure Processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-600">Money-back Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <main>
        <Header />
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
              <p className="text-gray-600">Please wait while we load your payment details.</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    }>
      <PaymentContent />
    </Suspense>
  )
}