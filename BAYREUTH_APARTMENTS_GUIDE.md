# 🏠 Bayreuth Apartments - Complete Website Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [What This Website Does](#what-this-website-does)
3. [Technical Setup](#technical-setup)
4. [How Each Page Works](#how-each-page-works)
5. [Database & Data](#database--data)
6. [Payment System](#payment-system)
7. [Email System](#email-system)
8. [Deployment](#deployment)
9. [Maintenance](#maintenance)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is a **vacation rental booking website** for two apartments in Bayreuth, Germany. It allows guests to:
- View apartment details and photos
- Check availability and book dates
- Pay securely online
- Receive confirmation emails

The website is built using **Next.js** (a modern web framework) and includes:
- **Frontend**: Beautiful, responsive design
- **Backend**: Server-side processing
- **Database**: Stores bookings and user data
- **Payment**: Stripe integration for secure payments
- **Email**: Automated confirmation emails

---

## 🏗️ What This Website Does

### **For Guests:**
1. **Browse Apartments** - View photos, amenities, and details
2. **Book Online** - Select dates, enter guest information
3. **Pay Securely** - Use credit card or PayPal via Stripe
4. **Get Confirmation** - Receive booking confirmation via email

### **For You (Host):**
1. **Receive Bookings** - Get notified of new reservations
2. **Manage Data** - View all bookings in the database
3. **Process Payments** - Money goes directly to your Stripe account
4. **Send Emails** - Automated guest communications

---

## 💻 Technical Setup

### **What You Need:**
- **Computer**: Mac, Windows, or Linux
- **Internet**: For downloading and deployment
- **Accounts**: Stripe (for payments), email service (for notifications)

### **Software Required:**
1. **Node.js** (JavaScript runtime) - Download from nodejs.org
2. **Git** (version control) - Usually pre-installed on Mac/Linux
3. **Code Editor** (optional) - VS Code recommended

### **File Structure:**
```
bayreuth-apartments/
├── app/                    # Main website pages
│   ├── page.tsx           # Homepage
│   ├── apartments/        # Apartment listings
│   ├── booking/          # Booking form
│   ├── payment/          # Payment processing
│   └── contact/          # Contact page
├── components/            # Reusable UI components
├── lib/                   # Database and email functions
├── prisma/               # Database configuration
├── public/               # Images and static files
└── package.json          # Project configuration
```

---

## 📄 How Each Page Works

### **1. Homepage (`/`)**
**File**: `app/page.tsx`
**What it does**: 
- Shows hero section with Bayreuth background
- Displays apartment cards with photos
- Links to booking and apartment details

**Key Features**:
- Responsive design (works on mobile/desktop)
- Apartment cards with photos and basic info
- "Book Now" and "View Details" buttons

### **2. Apartments Page (`/apartments`)**
**File**: `app/apartments/page.tsx`
**What it does**:
- Lists both apartments with detailed information
- Shows amenities, pricing, and availability
- Links to individual apartment pages

**Key Features**:
- Grid layout of apartment information
- Amenities list for each apartment
- Direct booking links

### **3. Individual Apartment Page (`/apartments/[id]`)**
**File**: `app/apartments/[id]/page.tsx`
**What it does**:
- Shows detailed information for one apartment
- Photo gallery with modal viewer
- Booking card with pricing
- Contact information

**Key Features**:
- Photo gallery (8 images per apartment)
- Interactive photo viewer (click to enlarge)
- Booking form integration
- Detailed amenities list

### **4. Booking Page (`/booking`)**
**File**: `app/booking/page.tsx`
**What it does**:
- Collects guest information
- Date selection with calendar
- Apartment selection
- Price calculation

**Key Features**:
- Modern date picker
- Guest information form
- Real-time price calculation
- Form validation

### **5. Payment Page (`/payment`)**
**File**: `app/payment/page.tsx`
**What it does**:
- Shows booking summary
- Integrates with Stripe Checkout
- Processes secure payments
- Redirects to success/cancel pages

**Key Features**:
- Stripe Checkout integration
- Booking summary display
- Secure payment processing
- Error handling

### **6. Success Page (`/payment/success`)**
**File**: `app/payment/success/page.tsx`
**What it does**:
- Confirms successful payment
- Shows booking details
- Provides contact information

### **7. Cancel Page (`/payment/cancel`)**
**File**: `app/payment/cancel/page.tsx`
**What it does**:
- Handles cancelled payments
- Provides alternative booking options

### **8. Contact Page (`/contact`)**
**File**: `app/contact/page.tsx`
**What it does**:
- Shows contact information
- Embedded Google Maps
- Contact form

---

## 🗄️ Database & Data

### **What is Stored:**
1. **Apartments**: Details, photos, amenities
2. **Users**: Guest information
3. **Bookings**: Reservation details
4. **Payments**: Transaction records

### **Database Files:**
- `prisma/schema.prisma` - Database structure
- `prisma/seed.ts` - Initial data setup
- `lib/database.ts` - Database operations

### **How to View Data:**
```bash
# View database contents
node scripts/view-database.js

# Open database browser
npm run db:studio
```

### **Current Data:**
- **Apartment 1**: Two Bedroom Apartment (b1-b8 photos)
- **Apartment 2**: Two Bedroom Apartment with Balcony (a1-a8 photos)
- **Admin User**: For managing the system

---

## 💳 Payment System

### **How Stripe Works:**
1. **Guest clicks "Pay"** → Redirected to Stripe Checkout
2. **Guest enters payment** → Stripe processes securely
3. **Payment successful** → Webhook notifies your server
4. **Booking created** → Database updated, emails sent

### **Stripe Setup:**
1. **Create Stripe Account**: stripe.com
2. **Get API Keys**: From Stripe Dashboard
3. **Add to Environment**: `.env.local` file
4. **Set Webhook**: Point to your domain

### **Environment Variables Needed:**
```env
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### **Test Cards:**
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Any future expiry date and CVC**

---

## 📧 Email System

### **How Emails Work:**
1. **Booking Confirmed** → Email sent to guest
2. **Payment Received** → Email sent to host
3. **Error Occurs** → Email sent to admin

### **Email Setup:**
1. **SMTP Service**: Gmail, SendGrid, etc.
2. **Environment Variables**: Add to `.env.local`
3. **Test Emails**: Verify delivery

### **Required Environment Variables:**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
ADMIN_EMAIL=admin@bayreuth-apartments.de
```

### **Email Templates:**
- **Guest Confirmation**: Booking details, check-in info
- **Host Notification**: New booking alert
- **Error Notification**: System issues

---

## 🚀 Deployment

### **Option 1: Vercel (Recommended)**
1. **Create Vercel Account**: vercel.com
2. **Connect GitHub**: Link your repository
3. **Add Environment Variables**: In Vercel dashboard
4. **Deploy**: Automatic deployment

### **Option 2: Other Hosting**
1. **Build Project**: `npm run build`
2. **Upload Files**: To your hosting provider
3. **Configure Domain**: Point to your hosting
4. **Set Environment Variables**: In hosting dashboard

### **Required for Production:**
1. **Custom Domain**: bayreuth-apartments.de
2. **SSL Certificate**: Automatic with Vercel
3. **Environment Variables**: All API keys
4. **Database**: PostgreSQL (not SQLite)

---

## 🔧 Maintenance

### **Regular Tasks:**
1. **Check Bookings**: Review new reservations
2. **Update Content**: Photos, descriptions, prices
3. **Monitor Payments**: Verify Stripe transactions
4. **Backup Database**: Export booking data

### **Content Updates:**
1. **Photos**: Replace images in `public/` folder
2. **Prices**: Update in database or code
3. **Descriptions**: Edit in `app/apartments/page.tsx`
4. **Contact Info**: Update in components

### **Database Management:**
```bash
# View all bookings
node scripts/view-database.js

# Reset database
npx prisma db push --force-reset

# Seed with new data
npm run db:seed
```

---

## 🛠️ Troubleshooting

### **Common Issues:**

**1. Website Won't Start**
```bash
# Check if Node.js is installed
node --version

# Install dependencies
npm install

# Start development server
npm run dev
```

**2. Database Errors**
```bash
# Reset database
npx prisma db push --force-reset

# Reseed data
npm run db:seed
```

**3. Payment Issues**
- Check Stripe API keys in `.env.local`
- Verify webhook URL in Stripe dashboard
- Test with Stripe test cards

**4. Email Not Sending**
- Check SMTP settings in `.env.local`
- Verify email service credentials
- Test with different email provider

**5. Images Not Loading**
- Check if images exist in `public/` folder
- Verify file names match code
- Clear browser cache

### **Error Messages:**

**"Module not found"**
- Run `npm install` to install dependencies

**"Database connection failed"**
- Check `.env.local` file exists
- Verify database URL is correct

**"Stripe error"**
- Check Stripe API keys
- Verify webhook configuration

**"Email failed"**
- Check SMTP settings
- Verify email credentials

---

## 📞 Support

### **Getting Help:**
1. **Check Logs**: Look at terminal output
2. **Google Error**: Search error messages
3. **Documentation**: Read Next.js/Stripe docs
4. **Community**: Ask on Stack Overflow

### **Useful Commands:**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# View database
node scripts/view-database.js

# Open database browser
npm run db:studio

# Reset everything
npx prisma db push --force-reset && npm run db:seed
```

### **Important Files:**
- `.env.local` - Environment variables
- `package.json` - Project configuration
- `prisma/schema.prisma` - Database structure
- `app/page.tsx` - Homepage
- `app/apartments/page.tsx` - Apartment listings

---

## 🎉 Success Checklist

### **Before Going Live:**
- [ ] All pages load correctly
- [ ] Booking form works
- [ ] Payment processing works
- [ ] Emails are sending
- [ ] Database is connected
- [ ] Images are loading
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Environment variables set

### **After Going Live:**
- [ ] Test complete booking flow
- [ ] Verify payment processing
- [ ] Check email delivery
- [ ] Monitor for errors
- [ ] Update content as needed
- [ ] Backup data regularly

---

## 📚 Additional Resources

### **Documentation:**
- **Next.js**: nextjs.org/docs
- **Stripe**: stripe.com/docs
- **Prisma**: prisma.io/docs
- **Tailwind CSS**: tailwindcss.com/docs

### **Tools:**
- **Vercel**: vercel.com (hosting)
- **Stripe**: stripe.com (payments)
- **Gmail**: gmail.com (SMTP)
- **VS Code**: code.visualstudio.com (editor)

### **Learning:**
- **JavaScript**: developer.mozilla.org
- **React**: reactjs.org
- **CSS**: developer.mozilla.org/css
- **Web Development**: freecodecamp.org

---

**🎯 This website is now ready to accept real bookings and payments!**

The system is fully automated - guests can book, pay, and receive confirmations without any manual intervention from you. Just monitor the bookings and payments through your Stripe dashboard and email notifications.
