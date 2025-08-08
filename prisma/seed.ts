import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create apartments
  const apartment1 = await prisma.apartment.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Two Bedroom Apartment',
      description: 'Spacious and modern apartment with stunning city views. Perfect for families or business travelers seeking comfort and convenience in the heart of Bayreuth.',
      pricePerNight: 200,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      address: 'Holländerstraße 9, 95445 Bayreuth, Germany',
      amenities: JSON.stringify([
        'WiFi',
        'Kitchen',
        'Parking',
        'Air Conditioning',
        'TV',
        'Washing Machine',
        'Balcony'
      ]),
      images: JSON.stringify([
        '/b8.jpeg',
        '/b1.jpg',
        '/b2.jpeg',
        '/b3.jpeg',
        '/b4.jpeg',
        '/b5.jpeg',
        '/b6.jpeg',
        '/b7.jpeg'
      ]),
      isActive: true,
    },
  })

  const apartment2 = await prisma.apartment.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Two Bedroom Apartment with Balcony',
      description: 'Charming and comfortable apartment perfect for couples or small families. Enjoy a peaceful stay with all the amenities you need for a memorable vacation.',
      pricePerNight: 200,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      address: 'Holländerstraße 9, 95445 Bayreuth, Germany',
      amenities: JSON.stringify([
        'WiFi',
        'Kitchen',
        'Parking',
        'Air Conditioning',
        'TV',
        'Garden Access',
        'Balcony'
      ]),
      images: JSON.stringify([
        '/a2.jpeg',
        '/a1.jpeg',
        '/a3.jpeg',
        '/a4.jpeg',
        '/a5.jpeg',
        '/a6.jpeg',
        '/a7.jpeg',
        '/a8.jpeg'
      ]),
      isActive: true,
    },
  })

  // Create an admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bayreuth-apartments.de' },
    update: {},
    create: {
      email: 'admin@bayreuth-apartments.de',
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log({ apartment1, apartment2, admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
