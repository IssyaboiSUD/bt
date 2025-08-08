'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Calendar, Users, MapPin, Star, Bed, Bath } from 'lucide-react'

// Mock apartment data
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

export default function BookingPage() {
  const router = useRouter()
  const [selectedApartment, setSelectedApartment] = useState('1')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [notes, setNotes] = useState('')

  const selectedApartmentData = apartments.find(apt => apt.id === selectedApartment)
  
  // Calculate nights and total price
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const totalPrice = nights * (selectedApartmentData?.price || 0)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Format dates for URL params
    const checkInStr = checkIn?.toLocaleDateString('en-CA') || ''
    const checkOutStr = checkOut?.toLocaleDateString('en-CA') || ''
    
    // Create URL params for payment page
    const params = new URLSearchParams({
      apartment: selectedApartment,
      checkIn: checkInStr,
      checkOut: checkOutStr,
      guests: guests.toString(),
      nights: nights.toString(),
      total: totalPrice.toString(),
      guestName,
      guestEmail,
      guestPhone,
      notes
    })
    
    // Redirect to payment page
    router.push(`/payment?${params.toString()}`)
  }

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your Stay
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Check availability and book your perfect apartment in Bayreuth
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
              
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                {/* Apartment Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Apartment
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {apartments.map((apartment) => (
                      <div
                        key={apartment.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedApartment === apartment.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedApartment(apartment.id)}
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={apartment.image}
                            alt={apartment.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{apartment.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <div className="flex items-center space-x-1">
                                <Bed className="w-4 h-4" />
                                <span>{apartment.bedrooms}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Bath className="w-4 h-4" />
                                <span>{apartment.bathrooms}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{apartment.maxGuests}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm">{apartment.rating}</span>
                              </div>
                              <span className="font-bold text-primary-600">€{apartment.price}/night</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dates and Guests */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <DatePicker
                      selected={checkIn}
                      onChange={(date) => setCheckIn(date)}
                      selectsStart
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={new Date()}
                      placeholderText="Select check-in date"
                      className="input-field w-full"
                      dateFormat="MMM dd, yyyy"
                      showPopperArrow={false}
                      popperClassName="modern-datepicker"
                      popperPlacement="bottom-start"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <DatePicker
                      selected={checkOut}
                      onChange={(date) => setCheckOut(date)}
                      selectsEnd
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={checkIn || new Date()}
                      placeholderText="Select check-out date"
                      className="input-field w-full"
                      dateFormat="MMM dd, yyyy"
                      showPopperArrow={false}
                      popperClassName="modern-datepicker"
                      popperPlacement="bottom-start"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="input-field"
                    >
                      {[...Array(selectedApartmentData?.maxGuests || 6)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} Guest{i !== 0 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guest Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="input-field"
                    rows={3}
                    placeholder="Any special requests or additional information..."
                  />
                </div>

                {/* Price Summary */}
                {nights > 0 && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Price Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>€{selectedApartmentData?.price} × {nights} nights</span>
                        <span>€{nights * (selectedApartmentData?.price || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>€0</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>€{totalPrice}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                  disabled={!checkIn || !checkOut || !guestName || !guestEmail}
                >
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
