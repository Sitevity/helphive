import { razorpayInstance } from '@/lib/razorpay';

export class PaymentService {
  static async createOrder(
    bookingId: string,
    amount: number,
    currency: string = 'INR'
  ): Promise<{
    orderId: string;
    amount: number;
    currency: string;
  }> {
    const response = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId,
        amount,
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  }

  static async verifyPayment(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ): Promise<boolean> {
    const response = await fetch('/api/payments/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    return result.success;
  }

  static async initiateRefund(
    paymentId: string,
    amount?: number
  ): Promise<{
    refundId: string;
    status: string;
  }> {
    const response = await fetch('/api/payments/refund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentId,
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to initiate refund');
    }

    return response.json();
  }
}

export function initializeRazorpay(
  onSuccess: (paymentId: string, orderId: string, signature: string) => void,
  onFailure: (error: { description: string; reason: string }) => void
) {
  if (typeof window === 'undefined') return null;

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: 0,
    currency: 'INR',
    name: 'TukTukIndia',
    description: 'Vehicle/Experience Booking',
    image: '/logo.png',
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    theme: {
      color: '#E85D04',
    },
    handler: function (response: {
      razorpay_payment_id: string;
      razorpay_order_id: string;
      razorpay_signature: string;
    }) {
      onSuccess(
        response.razorpay_payment_id,
        response.razorpay_order_id,
        response.razorpay_signature
      );
    },
    modal: {
      ondismiss: function () {
        onFailure({
          description: 'Payment cancelled',
          reason: 'user_cancelled',
        });
      },
    },
  };

  const razorpay = new (window as any).Razorpay(options);
  return razorpay;
}

export async function openPaymentModal(
  amount: number,
  orderId: string,
  onSuccess: (paymentId: string) => void,
  onFailure: (error: { description: string; reason: string }) => void
) {
  if (typeof window === 'undefined') return;

  const razorpay = initializeRazorpay(
    async (_, __, ___) => {
      onSuccess((window as any).razorpay_payment_id);
    },
    onFailure
  );

  if (razorpay) {
    (razorpay as any).updateAmount(amount * 100);
    (razorpay as any).setHandler(async function (response: any) {
      await PaymentService.verifyPayment(
        response.razorpay_order_id,
        response.razorpay_payment_id,
        response.razorpay_signature
      );
      onSuccess(response.razorpay_payment_id);
    });

    (razorpay as any).open();
  }
}
