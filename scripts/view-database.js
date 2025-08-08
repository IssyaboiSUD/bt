const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function viewDatabase() {
  console.log('📊 Database Overview\n')

  try {
    // Count records
    const apartmentCount = await prisma.apartment.count()
    const userCount = await prisma.user.count()
    const bookingCount = await prisma.booking.count()
    const paymentCount = await prisma.payment.count()

    console.log('📈 Record Counts:')
    console.log(`   Apartments: ${apartmentCount}`)
    console.log(`   Users: ${userCount}`)
    console.log(`   Bookings: ${bookingCount}`)
    console.log(`   Payments: ${paymentCount}\n`)

    // Show apartments
    console.log('🏠 Apartments:')
    const apartments = await prisma.apartment.findMany()
    apartments.forEach(apt => {
      const amenities = JSON.parse(apt.amenities)
      console.log(`   ${apt.id}: ${apt.name} - €${apt.pricePerNight}/night`)
      console.log(`      ${apt.bedrooms} bed, ${apt.bathrooms} bath, up to ${apt.maxGuests} guests`)
      console.log(`      Amenities: ${amenities.join(', ')}`)
      console.log(`      Address: ${apt.address}\n`)
    })

    // Show recent bookings (if any)
    if (bookingCount > 0) {
      console.log('📅 Recent Bookings:')
      const bookings = await prisma.booking.findMany({
        include: {
          apartment: true,
          user: true,
          payments: true
        },
        orderBy: { createdAt: 'desc' },
        take: 5
      })

      bookings.forEach(booking => {
        console.log(`   ${booking.id} - ${booking.apartment.name}`)
        console.log(`      Guest: ${booking.user?.name || 'Unknown'} (${booking.user?.email || 'No email'})`)
        console.log(`      Dates: ${booking.checkIn.toLocaleDateString()} - ${booking.checkOut.toLocaleDateString()}`)
        console.log(`      Amount: €${booking.totalAmount} - Status: ${booking.status}`)
        console.log(`      Created: ${booking.createdAt.toLocaleString()}\n`)
      })
    }

    console.log('✅ Database is ready and working!')

  } catch (error) {
    console.error('❌ Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

viewDatabase()
