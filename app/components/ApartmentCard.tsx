'use client'

import Link from 'next/link'
import { Bed, Bath, Users, Star, MapPin } from 'lucide-react'

interface ApartmentCardProps {
  id: string
  name: string
  description: string
  price: number
  maxGuests: number
  bedrooms: number
  bathrooms: number
  images: string[]
  rating?: number
  location?: string
}

export default function ApartmentCard({
  id,
  name,
  description,
  price,
  maxGuests,
  bedrooms,
  bathrooms,
  images,
  rating = 4.9,
  location = "Bayreuth, Germany"
}: ApartmentCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {rating && (
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary-600">€{price}</p>
            <p className="text-sm text-gray-500">per night</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Location */}
        <div className="flex items-center space-x-1 text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Bed className="w-4 h-4" />
            <span>{bedrooms} Bedroom{bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} Bathroom{bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>Up to {maxGuests} guests</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex space-x-3">
          <Link
            href={`/apartments/${id}`}
            className="flex-1 btn-secondary text-center"
          >
            View Details
          </Link>
          <Link
            href={`/booking?apartment=${id}`}
            className="flex-1 btn-primary text-center"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}
