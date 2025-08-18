import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Prevent this route from being built during build time
export const dynamic = 'force-dynamic'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { 
      apartmentId, 
      apartmentName,
      checkIn, 
      checkOut, 
      guests, 
      nights,
      pricePerNight,
      totalAmount,
      guestName,
      guestEmail,
      guestPhone,
      notes
    } = await request.json()

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: apartmentName,
              description: `${nights} night${nights > 1 ? 's' : ''} • ${guests} guest${guests > 1 ? 's' : ''} • ${checkIn} to ${checkOut}`,
              images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
            },
            unit_amount: Math.round(totalAmount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/payment/cancel`,
      customer_email: guestEmail,
      metadata: {
        apartmentId,
        checkIn,
        checkOut,
        guests: guests.toString(),
        guestName,
        guestEmail,
        guestPhone,
        notes,
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH', 'FR', 'IT', 'ES', 'NL', 'BE', 'LU'],
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
