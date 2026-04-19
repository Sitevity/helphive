import { NextRequest, NextResponse } from 'next/server';
import { generateRazorpayOrder } from '@/lib/razorpay';

export async function POST(request: NextRequest) {
  try {
    const { bookingId, amount, currency = 'INR' } = await request.json();

    if (!bookingId || !amount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Payment service not configured' },
        { status: 503 }
      );
    }

    const order = await generateRazorpayOrder(amount, `booking_${bookingId}`);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}