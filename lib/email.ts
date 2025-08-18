import nodemailer from 'nodemailer'

// Check if we're in a build environment
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Send confirmation email to guest
export async function sendConfirmationEmail(booking: any) {
  // If we're in build time, skip email sending
  if (isBuildTime) {
    console.log('Build time detected, skipping email sending')
    return
  }

  try {
    const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Confirmation - Bayreuth Apartments</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0ea5e9; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .booking-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; }
        .button { background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Thank you for choosing Bayreuth Apartments</p>
        </div>
        
        <div class="content">
          <h2>Hello ${booking.user.name}!</h2>
          <p>Great news! Your booking has been confirmed and payment processed successfully.</p>
          
          <div class="booking-details">
            <h3>📋 Booking Details</h3>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Apartment:</strong> ${booking.apartment.name}</p>
            <p><strong>Address:</strong> ${booking.apartment.address}</p>
            <p><strong>Check-in:</strong> ${checkInDate}</p>
            <p><strong>Check-out:</strong> ${checkOutDate}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Total Paid:</strong> €${booking.totalAmount}</p>
            ${booking.notes ? `<p><strong>Special Requests:</strong> ${booking.notes}</p>` : ''}
          </div>
          
          <h3>🏠 What's Next?</h3>
          <ul>
            <li><strong>Check-in Instructions:</strong> We'll send detailed check-in instructions 24-48 hours before your arrival</li>
            <li><strong>Contact Information:</strong> Our team is available 24/7 at +49 123 456 789</li>
            <li><strong>Local Recommendations:</strong> We'll share our favorite restaurants and attractions in Bayreuth</li>
          </ul>
          
          <h3>📍 Location</h3>
          <p>Your apartment is located in the heart of Bayreuth, walking distance to major attractions:</p>
          <ul>
            <li>Bayreuth Festival Theatre - 10 min walk</li>
            <li>Margravial Opera House - 5 min walk</li>
            <li>City Center - 3 min walk</li>
          </ul>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="https://maps.google.com/maps?q=Holländerstraße+9,+95445+Bayreuth,+Germany" class="button">📍 View on Map</a>
          </p>
          
          <h3>❓ Need Help?</h3>
          <p>If you have any questions or need assistance:</p>
          <ul>
            <li>📞 Phone: +49 123 456 789 (24/7)</li>
            <li>📧 Email: info@bayreuth-apartments.de</li>
            <li>💬 WhatsApp: +49 123 456 789</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Bayreuth Apartments</p>
          <p>Holländerstraße 9, 95445 Bayreuth, Germany</p>
          <p>Thank you for choosing us for your stay in Bayreuth! 🏠</p>
        </div>
      </div>
    </body>
    </html>
    `

    const mailOptions = {
      from: `"Bayreuth Apartments" <${process.env.SMTP_USER}>`,
      to: booking.user.email,
      subject: `✅ Booking Confirmed - ${booking.apartment.name} - ${checkInDate}`,
      html: emailHtml,
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Confirmation email sent:', result.messageId)
    return result

  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw error
  }
}

// Send notification to host/admin
export async function sendHostNotification(booking: any) {
  // If we're in build time, skip email sending
  if (isBuildTime) {
    console.log('Build time detected, skipping host notification email')
    return
  }

  try {
    const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Booking - Bayreuth Apartments</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .booking-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💰 New Booking Received!</h1>
          <p>A guest has just completed their booking</p>
        </div>
        
        <div class="content">
          <div class="booking-details">
            <h3>📋 Booking Details</h3>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Apartment:</strong> ${booking.apartment.name}</p>
            <p><strong>Guest:</strong> ${booking.user.name}</p>
            <p><strong>Email:</strong> ${booking.user.email}</p>
            <p><strong>Phone:</strong> ${booking.user.phone || 'Not provided'}</p>
            <p><strong>Check-in:</strong> ${checkInDate}</p>
            <p><strong>Check-out:</strong> ${checkOutDate}</p>
            <p><strong>Guests:</strong> ${booking.guests}</p>
            <p><strong>Total Amount:</strong> €${booking.totalAmount}</p>
            <p><strong>Payment Status:</strong> ✅ PAID</p>
            ${booking.notes ? `<p><strong>Special Requests:</strong> ${booking.notes}</p>` : ''}
          </div>
          
          <h3>📝 Action Required:</h3>
          <ul>
            <li>Prepare the apartment for ${checkInDate}</li>
            <li>Send check-in instructions 24-48 hours before arrival</li>
            <li>Block the dates in your calendar</li>
            <li>Update availability on other platforms</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
    `

    const adminMailOptions = {
      from: `"Bayreuth Apartments System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER, // Send to admin
      subject: `🏠 New Booking: ${booking.apartment.name} - ${checkInDate} - €${booking.totalAmount}`,
      html: adminEmailHtml,
    }

    const result = await transporter.sendMail(adminMailOptions)
    console.log('Host notification sent:', result.messageId)
    return result

  } catch (error) {
    console.error('Error sending host notification:', error)
    throw error
  }
}

// Send error notification to admin
export async function sendErrorNotification(error: any, session: any) {
  // If we're in build time, skip email sending
  if (isBuildTime) {
    console.log('Build time detected, skipping error notification email')
    return
  }

  try {
    const errorEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Booking Processing Error - Bayreuth Apartments</title>
    </head>
    <body>
      <h1>⚠️ Booking Processing Error</h1>
      <p><strong>Session ID:</strong> ${session.id}</p>
      <p><strong>Error:</strong> ${error.message}</p>
      <p><strong>Stack:</strong> <pre>${error.stack}</pre></p>
      <p><strong>Session Data:</strong> <pre>${JSON.stringify(session, null, 2)}</pre></p>
      <p>Please investigate this issue immediately.</p>
    </body>
    </html>
    `

    const errorMailOptions = {
      from: `"Bayreuth Apartments System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `🚨 URGENT: Booking Processing Error - Session ${session.id}`,
      html: errorEmailHtml,
    }

    await transporter.sendMail(errorMailOptions)
    console.log('Error notification sent to admin')

  } catch (emailError) {
    console.error('Failed to send error notification:', emailError)
  }
}
