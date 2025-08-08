import { NextRequest, NextResponse } from 'next/server'

// Mock apartments data
const apartments = [
  {
    id: '1',
    name: 'Apartment 1 - City Center',
    description: 'Beautiful 2-bedroom apartment in the heart of Bayreuth, perfect for families and business travelers. Walking distance to all major attractions including the Bayreuth Festival Theatre, the New Palace, and the historic Old Town.',
    price: 120,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    location: 'City Center, Bayreuth',
    amenities: ['WiFi', 'Kitchen', 'Washing Machine', 'Parking', 'Air Conditioning', 'TV', 'Balcony'],
    isActive: true
  },
  {
    id: '2',
    name: 'Apartment 2 - Garden View',
    description: 'Spacious 3-bedroom apartment with stunning garden views. Modern amenities and comfortable living spaces for larger groups. Perfect for families or groups of friends visiting Bayreuth.',
    price: 150,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    location: 'Garden District, Bayreuth',
    amenities: ['WiFi', 'Kitchen', 'Washing Machine', 'Parking', 'Air Conditioning', 'TV', 'Garden Access', 'BBQ'],
    isActive: true
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      // Return specific apartment
      const apartment = apartments.find(apt => apt.id === id)
      if (!apartment) {
        return NextResponse.json(
          { error: 'Apartment not found' },
          { status: 404 }
        )
      }
      return NextResponse.json({
        success: true,
        apartment
      })
    }

    // Return all apartments
    return NextResponse.json({
      success: true,
      apartments
    })

  } catch (error) {
    console.error('Error fetching apartments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch apartments' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    // Here you would typically:
    // 1. Validate the update data
    // 2. Update the apartment in the database
    // 3. Return the updated apartment

    console.log('Apartment update:', { id, updateData })

    return NextResponse.json({
      success: true,
      message: 'Apartment updated successfully'
    })

  } catch (error) {
    console.error('Error updating apartment:', error)
    return NextResponse.json(
      { error: 'Failed to update apartment' },
      { status: 500 }
    )
  }
}
