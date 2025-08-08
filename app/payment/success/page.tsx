'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { CheckCircle, Calendar, Users, MapPin, Mail } from 'lucide-react'
import Link from 'next/link'

interface BookingDetails {
  apartmentId: string
  checkIn: string
  checkOut: string
  guests: string
  guestName: string
  guestEmail: string
  amount: number
  status: string
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // In a real app, you'd fetch the session details from your API
      // For now, we'll show a generic success message
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <main>
        <Header />
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing your booking...</h2>
              <p className="text-gray-600">Please wait while we confirm your payment.</p>
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
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Success Header */}
            <div className="bg-green-50 px-8 py-6 border-b border-green-100">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h1 className="text-2xl font-bold text-green-900">Booking Confirmed!</h1>
                  <p className="text-green-700">Your payment has been processed successfully</p>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Confirmation Email</p>
                      <p className="text-sm text-gray-600">
                        You'll receive a detailed confirmation email within the next few minutes with your booking details and check-in instructions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Check-in Information</p>
                      <p className="text-sm text-gray-600">
                        We'll contact you 24-48 hours before your arrival with detailed check-in instructions and access codes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Location Details</p>
                      <p className="text-sm text-gray-600">
                        Your apartment is located at Holländerstraße 9, 95445 Bayreuth, Germany. Full directions will be provided via email.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session ID for Reference */}
              {sessionId && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Booking Reference</h3>
                  <p className="text-sm font-mono text-gray-600 break-all">{sessionId}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Please keep this reference number for your records
                  </p>
                </div>
              )}

              {/* Contact Information */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Phone:</strong> +49 123 456 789</p>
                  <p><strong>Email:</strong> info@bayreuth-apartments.de</p>
                  <p><strong>Emergency Contact:</strong> +49 123 456 789 (24/7)</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/" className="btn-primary text-center">
                  Return to Home
                </Link>
                <Link href="/contact" className="btn-secondary text-center">
                  Contact Host
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main>
        <Header />
        <section className="py-16 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h2>
              <p className="text-gray-600">Please wait while we load your booking details.</p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}
