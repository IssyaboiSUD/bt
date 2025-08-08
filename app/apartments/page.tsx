import Header from '../components/Header'
import Footer from '../components/Footer'
import ApartmentCard from '../components/ApartmentCard'
import { Star, MapPin, Wifi, Car, ChefHat, Sparkles } from 'lucide-react'

// Mock data for apartments
const apartments = [
  {
    id: 'apartment-1',
    name: 'Two Bedroom Apartment',
    description: 'Spacious and modern apartment with stunning city views. Perfect for families or business travelers seeking comfort and convenience in the heart of Bayreuth.',
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
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
    rating: 4.9,
    location: 'Bayreuth, Germany',
    amenities: ['WiFi', 'Kitchen', 'Washing Machine', 'Parking', 'Air Conditioning', 'TV', 'Balcony']
  },
  {
    id: 'apartment-2',
    name: 'Two Bedroom Apartment with Balcony',
    description: 'Charming and comfortable apartment perfect for couples or small families. Enjoy a peaceful stay with all the amenities you need for a memorable vacation.',
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
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
    rating: 4.8,
    location: 'Bayreuth, Germany',
    amenities: ['WiFi', 'Kitchen', 'Washing Machine', 'Parking', 'Air Conditioning', 'TV', 'Garden Access']
  }
]

const amenities = [
  { icon: Wifi, name: 'Free WiFi' },
  { icon: ChefHat, name: 'Fully Equipped Kitchen' },
  { icon: Sparkles, name: 'Premium Amenities' },
  { icon: Car, name: 'Free Parking' },
  { icon: MapPin, name: 'Central Location' },
  { icon: Star, name: 'High Rating' }
]

export default function ApartmentsPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Apartments
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Choose from our two beautiful apartments, each offering comfort, style, and convenience in the heart of Bayreuth.
          </p>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {apartments.map((apartment) => (
              <div key={apartment.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Image Gallery */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={apartment.images[0]}
                    alt={apartment.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{apartment.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{apartment.name}</h2>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary-600">€{apartment.price}</p>
                      <p className="text-sm text-gray-500">per night</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-gray-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{apartment.location}</span>
                  </div>

                  <p className="text-gray-600 mb-6">{apartment.description}</p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">Bedrooms:</span>
                      <span>{apartment.bedrooms}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">Bathrooms:</span>
                      <span>{apartment.bathrooms}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">Max Guests:</span>
                      <span>{apartment.maxGuests}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="font-medium">Rating:</span>
                      <span>{apartment.rating}/5</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {apartment.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex space-x-4">
                    <a
                      href={`/apartments/${apartment.id}`}
                      className="flex-1 btn-secondary text-center"
                    >
                      View Details
                    </a>
                    <a
                      href={`/booking?apartment=${apartment.id}`}
                      className="flex-1 btn-primary text-center"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Included
            </h2>
            <p className="text-xl text-gray-600">
              All our apartments come with these standard amenities
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <amenity.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{amenity.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Check availability and book your perfect stay in Bayreuth
          </p>
          <a 
            href="/booking" 
            className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Check Availability
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
