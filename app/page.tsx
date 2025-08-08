import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import ApartmentCard from './components/ApartmentCard'
import { Star, MapPin, Shield, Clock, Heart } from 'lucide-react'

// Mock data for apartments
const apartments = [
  {
    id: 'apartment-1',
    name: 'Two Bedroom Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of Bayreuth, perfect for families and business travelers. Walking distance to all major attractions.',
    price: 200,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      '/b8.jpeg',
      '/b1.jpg',
      '/b2.jpeg',
      '/b3.jpeg',
      '/b4.jpeg',
      '/b5.jpeg',
      '/b6.jpeg',
      '/b7.jpeg'
    ],
    rating: 4.9,
    location: 'Bayreuth, Germany'
  },
  {
    id: 'apartment-2',
    name: 'Two Bedroom Apartment with Balcony',
    description: 'Spacious 2-bedroom apartment with stunning garden views. Modern amenities and comfortable living spaces for larger groups.',
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
    location: 'Bayreuth, Germany'
  }
]

const features = [
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Safe and secure payment processing with SSL encryption'
  },
  {
    icon: Clock,
    title: 'Instant Confirmation',
    description: 'Get immediate booking confirmation and detailed instructions'
  },
  {
    icon: Heart,
    title: 'Personal Service',
    description: 'Dedicated support and personalized recommendations'
  },
  {
    icon: MapPin,
    title: 'Prime Location',
    description: 'Central location with easy access to all attractions'
  }
]

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      
      {/* Apartments Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Apartments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our two beautiful apartments, each offering comfort, style, and convenience in the heart of Bayreuth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} {...apartment} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference of booking directly with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Guests Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mareike N.',
                rating: 5,
                comment: 'Perfect location and beautiful apartment. Everything was spotless and the host was very helpful.',
                location: 'Germany'
              },
              {
                name: 'Johann P.',
                rating: 5,
                comment: 'Excellent stay! The apartment had everything we needed and the location was ideal for exploring Bayreuth.',
                location: 'Germany'
              },
              {
                name: 'Marcin',
                rating: 5,
                comment: 'Wonderful experience. The apartment was spacious and comfortable. Highly recommend!',
                location: 'Poland'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{testimonial.name}</span>
                  <span className="text-sm text-gray-500">{testimonial.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Book directly with us and save on booking fees. Get instant confirmation and personalized service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/booking" 
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Check Availability
          </a>
          <a
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
      </main>
  )
}
