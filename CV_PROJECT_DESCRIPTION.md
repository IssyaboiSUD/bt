# 🏠 Bayreuth Apartments - Vacation Rental Booking Website

## Project Overview
**Full-Stack Web Application** | Next.js, React, TypeScript, Stripe, Prisma | 2024

Developed a complete vacation rental booking platform for two apartments in Bayreuth, Germany, enabling guests to browse properties, book dates, and process secure payments while providing automated confirmation emails and booking management for hosts.

## 🎯 Key Achievements
- **End-to-End Development**: Built complete booking system from concept to deployment
- **Real Payment Processing**: Integrated Stripe Checkout for secure online transactions
- **Automated Workflows**: Implemented email notifications and booking confirmations
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Database Management**: Designed and implemented data models for bookings, users, and payments

## 🛠️ Technical Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form validation and state management
- **React DatePicker** - Interactive date selection
- **Lucide React** - Modern icon library

### **Backend & Database**
- **Prisma ORM** - Database schema and migrations
- **SQLite** (Development) / **PostgreSQL** (Production)
- **Next.js API Routes** - Server-side API endpoints
- **Stripe Webhooks** - Payment confirmation handling

### **Payment & Email**
- **Stripe Checkout** - Secure payment processing
- **Nodemailer** - Automated email notifications
- **SMTP Integration** - Email delivery system

### **Deployment & Infrastructure**
- **Vercel** - Hosting and deployment
- **Environment Variables** - Secure configuration management
- **SSL/HTTPS** - Security implementation

## 📋 Core Features Implemented

### **User Experience**
- **Responsive Design**: Mobile-optimized interface across all devices
- **Interactive Photo Gallery**: Booking.com-style image viewer with modal
- **Real-time Price Calculation**: Dynamic pricing based on dates and guests
- **Form Validation**: Client and server-side validation
- **Loading States**: Smooth user experience with loading indicators

### **Booking System**
- **Date Selection**: Modern calendar interface with availability checking
- **Guest Information**: Comprehensive booking form with validation
- **Apartment Selection**: Detailed property listings with amenities
- **Booking Summary**: Clear breakdown of costs and details

### **Payment Processing**
- **Stripe Integration**: Secure payment gateway implementation
- **Test Environment**: Complete testing with Stripe test cards
- **Webhook Handling**: Automated payment confirmation
- **Error Handling**: Graceful failure management

### **Database Architecture**
- **User Management**: Guest and admin user roles
- **Booking System**: Reservation tracking with status management
- **Payment Records**: Transaction history and reconciliation
- **Apartment Data**: Property details, photos, and amenities

### **Email Automation**
- **Booking Confirmations**: Automated guest notifications
- **Host Alerts**: New booking notifications
- **Error Reporting**: System issue notifications
- **Template System**: Professional email formatting

## 🔧 Technical Implementation Details

### **Database Schema Design**
```sql
- Users (id, email, name, phone, role)
- Apartments (id, name, description, price, amenities, images)
- Bookings (id, apartmentId, userId, dates, guests, total, status)
- Payments (id, bookingId, amount, status, stripeSessionId)
```

### **API Architecture**
- **RESTful Endpoints**: Clean API design for data operations
- **Webhook Handlers**: Stripe payment confirmation processing
- **Error Handling**: Comprehensive error management
- **Type Safety**: Full TypeScript implementation

### **Security Features**
- **Environment Variables**: Secure API key management
- **Input Validation**: Server-side data validation
- **CSRF Protection**: Cross-site request forgery prevention
- **SSL/HTTPS**: Encrypted data transmission

### **Performance Optimizations**
- **Image Optimization**: Responsive image loading
- **Code Splitting**: Dynamic imports for better loading
- **Caching**: Strategic caching implementation
- **SEO Optimization**: Meta tags and structured data

## 🚀 Deployment & DevOps

### **Development Workflow**
- **Version Control**: Git-based development
- **Environment Management**: Development vs production configurations
- **Database Migrations**: Prisma schema management
- **Testing**: Comprehensive testing strategy

### **Production Deployment**
- **Vercel Platform**: Automated deployment pipeline
- **Domain Configuration**: Custom domain setup
- **SSL Certificate**: Automatic HTTPS implementation
- **Environment Variables**: Secure production configuration

## 📊 Project Metrics
- **8 Pages**: Complete user journey implementation
- **2 Apartments**: Multi-property management system
- **3 Database Models**: Comprehensive data architecture
- **5 API Endpoints**: Full backend functionality
- **100% Responsive**: Mobile-first design approach

## 🎨 Design & UX Highlights
- **Modern UI**: Clean, professional design aesthetic
- **Intuitive Navigation**: User-friendly interface design
- **Accessibility**: WCAG compliance considerations
- **Cross-browser Compatibility**: Universal browser support
- **Loading States**: Smooth user experience indicators

## 🔄 Business Logic Implementation
- **Booking Flow**: Complete reservation process
- **Payment Processing**: Secure transaction handling
- **Email Automation**: Automated communication system
- **Data Management**: Comprehensive booking tracking
- **Error Recovery**: Graceful error handling

## 📈 Impact & Results
- **Complete Automation**: Zero manual intervention required
- **Professional Quality**: Production-ready application
- **Scalable Architecture**: Easy to extend and maintain
- **User-Friendly**: Intuitive for both guests and hosts
- **Secure Implementation**: Enterprise-level security

## 🛠️ Development Skills Demonstrated

### **Frontend Development**
- Modern React patterns and hooks
- TypeScript for type safety
- Responsive CSS with Tailwind
- Component architecture design
- State management implementation

### **Backend Development**
- API route design and implementation
- Database schema design
- Authentication and authorization
- Payment gateway integration
- Email system implementation

### **DevOps & Deployment**
- Environment configuration management
- Production deployment strategies
- Security best practices
- Performance optimization
- Monitoring and error handling

### **Project Management**
- Requirements analysis and planning
- Technical architecture design
- Testing and quality assurance
- Documentation and user guides
- Maintenance and support planning

---

## 💼 Professional Summary

This project demonstrates **full-stack development capabilities** with modern web technologies, showcasing ability to:

- **Design and implement** complete business solutions
- **Integrate third-party services** (Stripe, email providers)
- **Manage complex data relationships** and user workflows
- **Deploy production-ready applications** with security best practices
- **Create comprehensive documentation** for non-technical users
- **Handle real-world business requirements** with automated systems

The application serves as a **complete business solution** that could be deployed commercially, demonstrating both technical proficiency and business understanding.
