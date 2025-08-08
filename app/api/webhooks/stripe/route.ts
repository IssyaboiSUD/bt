import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { saveBookingToDatabase, updateApartmentAvailability } from '../../../../lib/database'
import { sendConfirmationEmail, sendHostNotification, sendErrorNotification } from '../../../../lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('Checkout session completed:', session.id)
        
        // Process the successful booking
        await handleSuccessfulPayment(session)
        break

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session
        console.log('Checkout session expired:', expiredSession.id)
        
        // Handle expired session (optional)
        await handleExpiredSession(expiredSession)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  // Extract booking details from metadata
  const metadata = session.metadata!
  
  console.log('Processing successful booking:', {
    sessionId: session.id,
    apartmentId: metadata.apartmentId,
    checkIn: metadata.checkIn,
    checkOut: metadata.checkOut,
    guests: metadata.guests,
    guestName: metadata.guestName,
    guestEmail: metadata.guestEmail,
    amount: session.amount_total! / 100, // Convert back from cents
  })

  try {
    // 1. Save booking to database
    const booking = await saveBookingToDatabase({
      sessionId: session.id,
      apartmentId: metadata.apartmentId,
      checkIn: metadata.checkIn,
      checkOut: metadata.checkOut,
      guests: parseInt(metadata.guests),
      guestName: metadata.guestName,
      guestEmail: metadata.guestEmail,
      guestPhone: metadata.guestPhone || '',
      notes: metadata.notes || '',
      totalAmount: session.amount_total! / 100,
      paymentStatus: 'PAID',
      bookingStatus: 'CONFIRMED'
    })

    // 2. Send confirmation email to guest
    await sendConfirmationEmail(booking)

    // 3. Send notification to host/admin
    await sendHostNotification(booking)

    // 4. Update apartment availability (if you have a calendar system)
    await updateApartmentAvailability(booking)

    console.log('Booking processed successfully:', booking.id)
    
  } catch (error) {
    console.error('Error processing booking:', error)
    // You might want to send an alert to admins here
    await sendErrorNotification(error, session)
  }
}

async function handleExpiredSession(session: Stripe.Checkout.Session) {
  console.log('Checkout session expired:', session.id)
  
  // Handle expired session
  // 1. Log the expiration
  // 2. Clean up any pending reservations
  // 3. Optionally notify the user about the expiration
  
  // You might want to send an email to the user saying their session expired
  // and they can try booking again
}
