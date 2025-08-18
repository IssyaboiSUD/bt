import { NextRequest, NextResponse } from 'next/server'
import { getBookingBySessionId } from '../../../../lib/database'

// Prevent this route from being built during build time
export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const resolvedParams = await params
    const { sessionId } = resolvedParams

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const booking = await getBookingBySessionId(sessionId)

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      booking: {
        id: booking.id,
        apartmentName: booking.apartment.name,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalAmount: booking.totalAmount,
        status: booking.status,
        guestName: booking.user?.name || 'Unknown',
        guestEmail: booking.user?.email || 'No email',
        notes: booking.notes,
        createdAt: booking.createdAt
      }
    })

  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booking details' },
      { status: 500 }
    )
  }
}
