'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function PaymentCancelPage() {
  return (
    <main>
      <Header />
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Cancel Header */}
            <div className="bg-red-50 px-8 py-6 border-b border-red-100">
              <div className="flex items-center space-x-3">
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <h1 className="text-2xl font-bold text-red-900">Payment Cancelled</h1>
                  <p className="text-red-700">Your booking was not completed</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happened?</h2>
                <p className="text-gray-600 mb-4">
                  You cancelled the payment process before it was completed. No charges have been made to your card.
                </p>
                <p className="text-gray-600">
                  Your apartment is still available for booking. You can try again or choose different dates if needed.
                </p>
              </div>

              {/* Helpful Information */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">Need Assistance?</h3>
                <p className="text-sm text-blue-800 mb-3">
                  If you experienced any issues during checkout or have questions about your booking:
                </p>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Phone:</strong> +49 123 456 789</p>
                  <p><strong>Email:</strong> info@bayreuth-apartments.de</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/booking" className="btn-primary text-center flex items-center justify-center space-x-2">
                  <RefreshCw className="w-5 h-5" />
                  <span>Try Again</span>
                </Link>
                <Link href="/apartments" className="btn-secondary text-center flex items-center justify-center space-x-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Browse Apartments</span>
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
