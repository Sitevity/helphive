import Razorpay from 'razorpay';

let razorpayInstance: Razorpay | null = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export { razorpayInstance };

export function generateRazorpayOrder(amount: number, receipt: string) {
  if (!razorpayInstance) {
    throw new Error('Razorpay is not configured');
  }
  return razorpayInstance.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt,
    notes: {
      product: 'TukTukIndia Booking',
    },
  });
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!process.env.RAZORPAY_KEY_SECRET) {
    return false;
  }
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return signature === expectedSignature;
}

export async function initiateRefund(paymentId: string, amount?: number) {
  if (!razorpayInstance) {
    throw new Error('Razorpay is not configured');
  }
  return razorpayInstance.payments.refund(paymentId, {
    amount: amount ? amount * 100 : undefined,
  });
}

export function getPaymentDetails(paymentId: string) {
  if (!razorpayInstance) {
    throw new Error('Razorpay is not configured');
  }
  return razorpayInstance.payments.fetch(paymentId);
}