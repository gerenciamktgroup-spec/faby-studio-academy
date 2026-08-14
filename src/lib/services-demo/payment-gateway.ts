/**
 * Simulación de Pasarela de Pago Multi-Método (Stripe, Bizum, Klarna) y Cupones
 */

export interface PaymentPlan {
  id: 'single' | 'installments_3';
  title: string;
  description: string;
  installmentsCount: number;
}

export interface CouponResult {
  valid: boolean;
  code: string;
  discountPercentage: number;
  message: string;
}

export const VALID_DEMO_COUPONS: Record<string, number> = {
  'FABYPRO20': 20, // 20% discount
  'BIENVENIDA10': 10, // 10% discount
  'VIPBEAUTY': 15, // 15% discount
};

export function validateCoupon(code: string): CouponResult {
  const normalized = code.trim().toUpperCase();
  if (VALID_DEMO_COUPONS[normalized]) {
    return {
      valid: true,
      code: normalized,
      discountPercentage: VALID_DEMO_COUPONS[normalized],
      message: `¡Cupón ${normalized} aplicado con éxito! Descuento del ${VALID_DEMO_COUPONS[normalized]}%`,
    };
  }
  return {
    valid: false,
    code: normalized,
    discountPercentage: 0,
    message: 'El código de cupón introducido no es válido o ha expirado.',
  };
}

export interface ProcessPaymentInput {
  method: 'card' | 'bizum' | 'klarna';
  studentName: string;
  studentEmail: string;
  phone?: string;
  originalPrice: number;
  couponCode?: string;
  installments?: number;
}

export interface ProcessPaymentOutput {
  success: boolean;
  transactionId: string;
  finalAmount: number;
  discountApplied: number;
  paymentMethod: string;
  receiptUrl: string;
  timestamp: string;
}

export async function processDemoPayment(input: ProcessPaymentInput): Promise<ProcessPaymentOutput> {
  // Simular latencia de pasarela bancaria
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let discount = 0;
  if (input.couponCode && VALID_DEMO_COUPONS[input.couponCode.toUpperCase()]) {
    const pct = VALID_DEMO_COUPONS[input.couponCode.toUpperCase()];
    discount = (input.originalPrice * pct) / 100;
  }

  const finalAmount = Math.max(0, input.originalPrice - discount);
  const transactionId = 'TXN_FABY_' + Math.random().toString(36).substring(2, 10).toUpperCase();

  return {
    success: true,
    transactionId,
    finalAmount,
    discountApplied: discount,
    paymentMethod: input.method === 'bizum' ? 'Bizum Móvil' : input.method === 'klarna' ? 'Klarna 3 Cuotas' : 'Tarjeta Bancaria (Stripe)',
    receiptUrl: `/recibo/${transactionId}`,
    timestamp: new Date().toISOString(),
  };
}
