import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Database operations for bookings
export async function saveBookingToDatabase(bookingData: {
  sessionId: string
  apartmentId: string
  checkIn: string
  checkOut: string
  guests: number
  guestName: string
  guestEmail: string
  guestPhone: string
  notes: string
  totalAmount: number
  paymentStatus: string
  bookingStatus: string
}) {
  try {
    // First, ensure the apartment exists
    let apartment = await prisma.apartment.findUnique({
      where: { id: bookingData.apartmentId }
    })

    if (!apartment) {
      // Create apartment if it doesn't exist (for demo purposes)
      apartment = await prisma.apartment.create({
        data: {
          id: bookingData.apartmentId,
          name: bookingData.apartmentId === '1' ? 'Two Bedroom Apartment' : 'Two Bedroom Apartment with Balcony',
          description: 'Beautiful apartment in Bayreuth',
          pricePerNight: 200,
          maxGuests: 4,
          bedrooms: 2,
          bathrooms: bookingData.apartmentId === '1' ? 2 : 1,
          address: 'Holländerstraße 9, 95445 Bayreuth, Germany',
          amenities: JSON.stringify(['WiFi', 'Kitchen', 'Parking', 'Air Conditioning']),
          images: JSON.stringify(['/b8.jpeg', '/b1.jpg', '/b2.jpeg', '/b3.jpeg', '/b4.jpeg', '/b5.jpeg', '/b6.jpeg', '/b7.jpeg']),
          isActive: true
        }
      })
    }

    // Create or find the user
    let user = await prisma.user.findUnique({
      where: { email: bookingData.guestEmail }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: bookingData.guestEmail,
          name: bookingData.guestName,
          phone: bookingData.guestPhone,
          role: 'GUEST'
        }
      })
    }

    // Create the booking
    const booking = await prisma.booking.create({
      data: {
        apartmentId: apartment.id,
        userId: user.id,
        checkIn: new Date(bookingData.checkIn),
        checkOut: new Date(bookingData.checkOut),
        guests: bookingData.guests,
        totalAmount: bookingData.totalAmount,
        status: bookingData.bookingStatus as any,
        notes: bookingData.notes,
        stripeSessionId: bookingData.sessionId,
      },
      include: {
        apartment: true,
        user: true
      }
    })

    // Create payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: bookingData.totalAmount,
        currency: 'EUR',
        status: bookingData.paymentStatus as any,
        stripeSessionId: bookingData.sessionId,
        paymentMethod: 'STRIPE'
      }
    })

    console.log('Booking saved to database:', booking.id)
    return booking

  } catch (error) {
    console.error('Database error:', error)
    throw error
  }
}

// Get booking by session ID
export async function getBookingBySessionId(sessionId: string) {
  return await prisma.booking.findFirst({
    where: { stripeSessionId: sessionId },
    include: {
      apartment: true,
      user: true,
      payments: true
    }
  })
}

// Update apartment availability
export async function updateApartmentAvailability(booking: any) {
  // This is where you'd update your calendar/availability system
  // For now, just log it
  console.log(`Apartment ${booking.apartmentId} is now booked from ${booking.checkIn} to ${booking.checkOut}`)
  
  // You could implement a calendar table or integrate with external calendar APIs
  // Example: Block dates in a calendar table, sync with Booking.com iCal, etc.
}
