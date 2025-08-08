'use client'

import { useState } from 'react'
import { use } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { 
  Bed, 
  Bath, 
  Users, 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  ChefHat, 
  Sparkles,
  Calendar,
  Phone,
  Mail,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

// Mock apartment data
const apartments = {
  'apartment-1': {
    id: 'apartment-1',
    name: 'Two Bedroom Apartment',
    description: 'Spacious and modern apartment with stunning city views. Perfect for families or business travelers seeking comfort and convenience in the heart of Bayreuth.',
    longDescription: 'This beautifully appointed apartment offers the perfect blend of luxury and comfort. Located in the heart of Bayreuth, it features modern amenities, elegant furnishings, and stunning views of the city. The open-plan living area creates a welcoming atmosphere, while the fully equipped kitchen allows you to prepare meals at your convenience. The master bedroom features a king-size bed and en-suite bathroom, while the second bedroom offers flexibility with twin beds that can be converted to a king. Both bathrooms are modern and well-appointed with premium fixtures.',
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.9,
    location: 'Bayreuth, Germany',
               images: [
             '/b1.jpg',
             '/b2.jpeg',
             '/b3.jpeg',
             '/b4.jpeg',
             '/b5.jpeg',
             '/b6.jpeg',
             '/b7.jpeg',
             '/b8.jpeg'
           ],
    amenities: [
      { icon: Wifi, name: 'Free WiFi' },
      { icon: Car, name: 'Free Parking' },
      { icon: ChefHat, name: 'Fully Equipped Kitchen' },
      { icon: Sparkles, name: 'Premium Amenities' },
      { icon: Bed, name: 'King Size Beds' },
      { icon: Bath, name: 'En-suite Bathrooms' }
    ]
  },
  'apartment-2': {
    id: 'apartment-2',
    name: 'Two Bedroom Apartment with Balcony',
    description: 'Charming and comfortable apartment perfect for couples or small families. Enjoy a peaceful stay with all the amenities you need for a memorable vacation.',
    longDescription: 'This cozy apartment provides a perfect retreat for those seeking a peaceful and comfortable stay in Bayreuth. The thoughtfully designed space maximizes comfort and functionality, featuring a comfortable living area with a sofa bed for additional sleeping arrangements. The well-equipped kitchen includes modern appliances and everything needed to prepare delicious meals. The bedroom features a comfortable queen-size bed with premium linens, and the bathroom is modern and clean with a walk-in shower. The apartment is located in a quiet neighborhood while still being within easy reach of all major attractions.',
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.8,
    location: 'Bayreuth, Germany',
               images: [
             '/a2.jpeg',
             '/a1.jpeg',
             '/a3.jpeg',
             '/a4.jpeg',
             '/a5.jpeg',
             '/a6.jpeg',
             '/a7.jpeg',
             '/a8.jpeg'
           ],
    amenities: [
      { icon: Wifi, name: 'Free WiFi' },
      { icon: Car, name: 'Free Parking' },
      { icon: ChefHat, name: 'Kitchenette' },
      { icon: Sparkles, name: 'Comfortable Amenities' },
      { icon: Bed, name: 'Queen Size Bed' },
      { icon: Bath, name: 'Modern Bathroom' }
    ]
  }
}

export default function ApartmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const resolvedParams = use(params)
  const apartment = apartments[resolvedParams.id as keyof typeof apartments]

  if (!apartment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Apartment Not Found</h1>
            <p className="text-gray-600 mb-8">The apartment you're looking for doesn't exist.</p>
            <Link href="/apartments" className="btn-primary">
              Back to Apartments
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={apartment.images[selectedImage]}
            alt={apartment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <Link href="/apartments" className="inline-flex items-center space-x-2 text-white mb-4 hover:text-gray-200">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Apartments</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{apartment.name}</h1>
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-1">
                <MapPin className="w-5 h-5" />
                <span>{apartment.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span>{apartment.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="grid grid-cols-4 gap-4">
                {apartment.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index)
                      setIsModalOpen(true)
                    }}
                    className={`relative h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity ${
                      selectedImage === index ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${apartment.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this apartment</h2>
              <p className="text-gray-600 leading-relaxed">{apartment.longDescription}</p>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {apartment.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                    <amenity.icon className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary-600" />
                  <span className="text-lg font-medium">{apartment.location}</span>
                </div>
                <p className="text-gray-600">
                  Located in the heart of Bayreuth, this apartment is within walking distance to major attractions, 
                  restaurants, and shopping areas. Public transportation is easily accessible.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-primary-600">€{apartment.price}</p>
                <p className="text-gray-500">per night</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bedrooms</span>
                  <span className="font-medium">{apartment.bedrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Bathrooms</span>
                  <span className="font-medium">{apartment.bathrooms}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Max Guests</span>
                  <span className="font-medium">{apartment.maxGuests}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{apartment.rating}</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col space-y-6">
                <Link
                  href={`/booking?apartment=${apartment.id}`}
                  className="w-full btn-primary text-center flex items-center justify-center space-x-2 mb-8"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Now</span>
                </Link>
                <Link
                  href="/contact"
                  className="w-full btn-secondary text-center mt-8"
                >
                  Contact Host
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>+49 123 456 789</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>info@bayreuth-apartments.de</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl h-full flex flex-col max-h-screen">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-white text-lg font-medium">
                {apartment.name} - Photo {selectedImage + 1} of {apartment.images.length}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 rounded-full p-3 text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="flex-1 relative flex items-center justify-center min-h-0">
              {/* Navigation Buttons */}
              <button
                onClick={() => setSelectedImage((prev) => (prev === 0 ? apartment.images.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-4 text-white transition-colors"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={() => setSelectedImage((prev) => (prev === apartment.images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-4 text-white transition-colors"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Main Image */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full max-w-4xl max-h-[70vh]">
                  <img
                    src={apartment.images[selectedImage]}
                    alt={`${apartment.name} - Image ${selectedImage + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-6">
              <div className="flex justify-center space-x-3">
                {apartment.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === index 
                        ? 'border-white opacity-100' 
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${apartment.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
