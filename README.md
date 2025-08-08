# Bayreuth Apartments - Vacation Rental Website

A modern, responsive vacation rental website built with Next.js, TypeScript, and Tailwind CSS. This website allows guests to browse apartments, check availability, and book their stays directly.

## Features

- **Modern Design**: Clean, responsive design similar to professional vacation rental sites
- **Apartment Showcase**: Detailed apartment listings with photos, amenities, and pricing
- **Booking System**: Real-time availability checking and booking functionality
- **Payment Integration**: Stripe payment processing (ready for integration)
- **Contact Forms**: Easy communication between guests and hosts
- **Mobile Responsive**: Optimized for all devices
- **SEO Optimized**: Proper meta tags and structured data
- **Fast Performance**: Built with Next.js for optimal speed

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Prisma ORM with PostgreSQL
- **Payment**: Stripe (ready for integration)
- **Authentication**: NextAuth.js (ready for integration)
- **Email**: Nodemailer (ready for integration)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/bayreuth_apartments"

   # Stripe (get from Stripe dashboard)
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
   STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # Email (for confirmation emails)
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER="your-email@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"

   # Google Maps
   GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
```bash
npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
bt/
├── app/
│   ├── api/                    # API routes
│   │   ├── apartments/         # Apartment endpoints
│   │   ├── bookings/          # Booking endpoints
│   │   └── payments/          # Payment endpoints
│   ├── components/            # Reusable components
│   ├── apartments/            # Apartment pages
│   ├── booking/               # Booking pages
│   ├── contact/               # Contact pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── tailwind.config.js         # Tailwind configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## Key Features Implementation

### 1. Apartment Management
- Display apartment listings with photos and details
- Amenities and pricing information
- Availability calendar integration

### 2. Booking System
- Date selection with availability checking
- Guest information collection
- Price calculation
- Booking confirmation

### 3. Payment Processing
- Stripe integration ready
- Secure payment processing
- Payment confirmation emails

### 4. Contact & Support
- Contact forms
- Location information
- Support information

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

### Environment Variables for Production

Make sure to set these in your production environment:

- `DATABASE_URL`: Your production PostgreSQL database URL
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `NEXTAUTH_SECRET`: A secure random string
- `NEXTAUTH_URL`: Your production domain

## Customization

### 1. Update Apartment Information
Edit the apartment data in:
- `app/api/apartments/route.ts` (API data)
- `app/page.tsx` (homepage data)
- `app/apartments/page.tsx` (apartments page data)

### 2. Update Contact Information
Edit contact details in:
- `app/components/Header.tsx`
- `app/components/Footer.tsx`
- `app/contact/page.tsx`

### 3. Update Styling
Modify colors and styling in:
- `tailwind.config.js` (color scheme)
- `app/globals.css` (custom styles)

### 4. Add New Pages
Create new pages in the `app/` directory following the existing structure.

## Database Schema

The application uses Prisma with the following models:

- **User**: Admin and guest user accounts
- **Apartment**: Apartment information and details
- **Booking**: Guest bookings and reservations
- **Payment**: Payment processing records

## API Endpoints

- `GET /api/apartments` - List all apartments
- `GET /api/apartments?id=1` - Get specific apartment
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get bookings/availability
- `POST /api/payments` - Create payment intent
- `PUT /api/payments` - Update payment status

## Next Steps

### 1. Database Integration
- Set up PostgreSQL database
- Run Prisma migrations
- Seed initial data

### 2. Payment Integration
- Set up Stripe account
- Configure webhooks
- Test payment flow

### 3. Email Integration
- Configure email service
- Set up confirmation emails
- Test email delivery

### 4. Calendar Sync
- Integrate with Booking.com iCal feeds
- Set up Airbnb calendar sync
- Implement availability management

### 5. Admin Dashboard
- Create admin interface
- Add booking management
- Implement content management

## Support

For questions or support, please contact:
- Email: info@bayreuth-apartments.de
- Phone: +49 123 456 789

## License

This project is private and proprietary.

---

**Note**: This is a development version. For production deployment, ensure all security measures are in place and proper testing is completed.
