'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Smartphone,
  Calendar,
  Sparkles,
  Tag,
  AlertCircle,
  PackageCheck,
  Building2,
  QrCode,
  Download,
  Copy
} from 'lucide-react';
import { validateCoupon, processDemoPayment } from '@/lib/services-demo/payment-gateway';

export default function DemoCheckoutPage() {
  const router = useRouter();
  const basePrice = 380;

  // Form State
  const [studentName, setStudentName] = useState('Lucía Martínez');
  const [studentEmail, setStudentEmail] = useState('lucia.martinez@gmail.com');
  const [phone, setPhone] = useState('612 345 678');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bizum' | 'klarna' | 'efectivo'>('card');
  const [selectedStudio, setSelectedStudio] = useState('Estudio Central FABY STUDIO — Calle Serrano 45, Madrid');

  // Commercial Order Bump State (Kit Faby Studio)
  const [includeKit, setIncludeKit] = useState(true);
  const kitPrice = 49;

  // Coupon State
  const [couponInput, setCouponInput] = useState('FABYPRO20');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPct: number } | null>({
    code: 'FABYPRO20',
    discountPct: 20,
  });
  const [couponMessage, setCouponMessage] = useState<string | null>('¡Cupón FABYPRO20 aplicado! Descuento del 20% en tu matrícula');
  const [couponError, setCouponError] = useState<string | null>(null);

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{ transactionId: string; finalAmount: number; isCash?: boolean } | null>(null);

  // Price calculations
  const discountAmount = appliedCoupon ? (basePrice * appliedCoupon.discountPct) / 100 : 0;
  const courseDiscounted = basePrice - discountAmount;
  const totalAmount = courseDiscounted + (includeKit ? kitPrice : 0);
  const installmentAmount = (totalAmount / 3).toFixed(2);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    setCouponMessage(null);

    const res = validateCoupon(couponInput);
    if (res.valid) {
      setAppliedCoupon({ code: res.code, discountPct: res.discountPercentage });
      setCouponMessage(res.message);
    } else {
      setAppliedCoupon(null);
      setCouponError(res.message);
    }
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'efectivo') {
      setTimeout(() => {
        setIsProcessing(false);
        const reservationCode = 'RESERVA-FS-' + Math.floor(1000 + Math.random() * 9000);
        setPaymentResult({
          transactionId: reservationCode,
          finalAmount: totalAmount,
          isCash: true,
        });
      }, 1000);
      return;
    }

    const result = await processDemoPayment({
      method: paymentMethod,
      studentName,
      studentEmail,
      phone,
      originalPrice: totalAmount,
      couponCode: appliedCoupon?.code,
    });

    setIsProcessing(false);
    setPaymentResult({
      transactionId: result.transactionId,
      finalAmount: totalAmount,
      isCash: false,
    });

    setTimeout(() => {
      router.push('/campus/onboarding');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PORTAL OFICIAL DE MATRÍCULA & PAGOS — FABY STUDIO ACADEMY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mt-1">
            Matrícula Oficial en FABY STUDIO ACADEMY
          </h1>
          <p className="text-xs text-slate-500">
            Curso Profesional de Extensiones de Pestañas • Pago Online o en Locales Físicos Faby Studio
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Payment Methods */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={handleProcessPayment} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Step 1: Personal Info */}
              <div className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>1. Datos de la Alumna</span>
                  <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold uppercase">Expediente Automático</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Order Bump (Kit de Herramientas) */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeKit}
                    onChange={(e) => setIncludeKit(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-rose-600 focus:ring-rose-500 cursor-pointer"
                  />
                  <div className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 flex items-center">
                        <PackageCheck className="w-4 h-4 text-rose-600 mr-1.5 inline" />
                        Añadir Kit Profesional de Pinzas & Adhesivo Faby Studio
                      </span>
                      <span className="font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                        +49,00 €
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      Incluye 2 pinzas japonesas de precisión graduadas, adhesivo de grado médico 1.5s y caja de pestañas mixtas para tus prácticas en modelo real. Entrega inmediata en el local o envío a domicilio.
                    </p>
                  </div>
                </label>
              </div>

              {/* Step 3: Payment Method Selector */}
              <div className="space-y-4">
                <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  3. Método de Pago (Online o Presencial)
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* Option 1: Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1.5 ${
                      paymentMethod === 'card'
                        ? 'bg-rose-50 border-rose-300 text-rose-700 ring-2 ring-rose-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-rose-600" />
                    <span>Tarjeta</span>
                  </button>

                  {/* Option 2: Bizum */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bizum')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1.5 ${
                      paymentMethod === 'bizum'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Bizum</span>
                  </button>

                  {/* Option 3: Klarna 3 cuotas */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1.5 ${
                      paymentMethod === 'klarna'
                        ? 'bg-purple-50 border-purple-300 text-purple-800 ring-2 ring-purple-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>3 Cuotas</span>
                  </button>

                  {/* Option 4: Pago en Efectivo en Local Faby Studio */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`p-3 rounded-2xl border text-xs font-bold transition-all flex flex-col items-center justify-center space-y-1.5 ${
                      paymentMethod === 'efectivo'
                        ? 'bg-amber-50 border-amber-300 text-amber-900 ring-2 ring-amber-100'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>En Local / Cabina</span>
                  </button>
                </div>

                {/* Conditional Fields */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
                    <div className="flex justify-between items-center text-slate-500">
                      <span className="font-semibold text-slate-800">Tarjeta de Débito / Crédito</span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Stripe 3D Secure</span>
                    </div>
                    <input
                      type="text"
                      disabled
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-700 font-mono"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        disabled
                        defaultValue="12/28"
                        className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 font-mono"
                      />
                      <input
                        type="text"
                        disabled
                        defaultValue="CVC 888"
                        className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-slate-700 font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'bizum' && (
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-3 text-xs">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Pago Móvil Instantáneo con Bizum</span>
                    </div>
                    <p className="text-slate-600">Introduce tu número de teléfono registrado en Bizum:</p>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="600 000 000"
                      className="w-full bg-white border border-emerald-300 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono"
                    />
                  </div>
                )}

                {paymentMethod === 'klarna' && (
                  <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-3 text-xs">
                    <div className="flex items-center justify-between text-purple-900 font-bold">
                      <span>Plan 3 Cuotas sin Intereses (0% TAE)</span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Klarna</span>
                    </div>
                    <div className="space-y-1.5 text-slate-600">
                      <div className="flex justify-between">
                        <span>Hoy:</span>
                        <strong className="text-slate-900">{installmentAmount} €</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>En 30 días:</span>
                        <strong className="text-slate-900">{installmentAmount} €</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>En 60 días:</span>
                        <strong className="text-slate-900">{installmentAmount} €</strong>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'efectivo' && (
                  <div className="p-5 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-3 text-xs">
                    <div className="flex items-center space-x-2 text-amber-900 font-bold">
                      <Building2 className="w-4 h-4 text-amber-600" />
                      <span>Pago en Efectivo o TPV en Estudio Faby Studio</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Genera tu <strong>Voucher de Reserva de Plaza</strong>. Podrás abonar el importe en efectivo o datáfono directamente en la recepción de cualquiera de nuestros estudios.
                    </p>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Selecciona el Estudio Faby para abonar tu matrícula:</label>
                      <select
                        value={selectedStudio}
                        onChange={(e) => setSelectedStudio(e.target.value)}
                        className="w-full bg-white border border-amber-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      >
                        <option value="Estudio Central FABY STUDIO — Calle Serrano 45, Madrid">Estudio Central FABY STUDIO — Calle Serrano 45, Madrid</option>
                        <option value="Estudio Faby Studio Norte — Paseo de la Castellana 120, Madrid">Estudio Faby Studio Norte — Paseo de la Castellana 120, Madrid</option>
                        <option value="Estudio Faby Studio Barcelona — Rambla de Catalunya 58, Barcelona">Estudio Faby Studio Barcelona — Rambla de Catalunya 58, Barcelona</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Payment Button */}
              {paymentResult ? (
                paymentResult.isCash ? (
                  <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-amber-600 mx-auto" />
                    <h4 className="font-bold text-slate-900 text-base font-display">¡Plaza Pre-Reservada con Éxito!</h4>
                    <p className="text-xs text-slate-700">
                      Muestra este código de reserva en la recepción del local para validar tu pago y activar tu campus:
                    </p>
                    <p className="font-mono text-base font-extrabold text-amber-900 bg-white p-2.5 rounded-xl border border-amber-300 inline-block">
                      {paymentResult.transactionId}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Total a abonar en local: <strong>{paymentResult.finalAmount.toFixed(2)} €</strong> ({selectedStudio.split('—')[0]})
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/admin"
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-600 bg-white border border-rose-200 hover:bg-rose-50 px-3.5 py-2 rounded-xl transition-colors"
                      >
                        <span>Abrir Panel Admin para Simular Validación de Pago en Local →</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="font-bold text-slate-900 text-base">¡Matrícula Completada con Éxito!</p>
                    <p className="text-xs text-emerald-700 font-mono">ID Transacción: {paymentResult.transactionId}</p>
                    <p className="text-xs text-slate-500">Redirigiendo al Tour de Bienvenida del Campus...</p>
                  </div>
                )
              ) : (
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white py-4 rounded-2xl font-bold text-base shadow-xl shadow-fabi-pink/20 transition-all flex items-center justify-center space-x-2 hover:scale-[1.01]"
                >
                  {isProcessing ? (
                    <span>Procesando Reserva...</span>
                  ) : paymentMethod === 'efectivo' ? (
                    <>
                      <span>Generar Voucher de Reserva ({totalAmount.toFixed(2)} € en Local)</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <span>
                        Pagar {paymentMethod === 'klarna' ? `1ª cuota de ${installmentAmount} €` : `${totalAmount.toFixed(2)} €`} y Acceder
                      </span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </form>
          </div>

          {/* Right Column: Order Summary & Coupon Engine */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 h-fit">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Resumen de Compra
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-700">Curso Profesional de Extensiones</span>
                  <span className="font-bold text-slate-900">{basePrice},00 €</span>
                </div>

                {includeKit && (
                  <div className="flex justify-between text-slate-700">
                    <span>Kit de Herramientas Faby Studio</span>
                    <span className="font-bold text-slate-900">+{kitPrice},00 €</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-slate-500">Acceso a Campus 24/7 de por vida</span>
                  <span className="text-emerald-700 font-semibold">Incluido</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tutorías 1 a 1 y Rúbricas</span>
                  <span className="text-emerald-700 font-semibold">Incluido</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Certificado con QR y SHA-256</span>
                  <span className="text-emerald-700 font-semibold">Incluido</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-rose-700 font-semibold pt-1 border-t border-slate-100">
                    <span>Descuento ({appliedCoupon.code} -{appliedCoupon.discountPct}%):</span>
                    <span>-{discountAmount.toFixed(2)} €</span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-4 flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">Total Matrícula</span>
                    <span className="text-[10px] text-slate-400">Impuestos (IVA) incluidos</span>
                  </div>
                  <span className="text-2xl font-extrabold text-rose-600 font-display">
                    {totalAmount.toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Coupon Engine Box */}
              <div className="pt-2 space-y-2 border-t border-slate-100">
                <label className="block text-xs font-semibold text-slate-600">Cupón de Descuento</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Ej. FABYPRO20"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 uppercase font-mono focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    Aplicar
                  </button>
                </div>

                {couponMessage && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1 inline text-emerald-600" /> {couponMessage}
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-amber-700 font-semibold flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1 inline text-amber-600" /> {couponError}
                  </p>
                )}
              </div>

              {/* Security Badges */}
              <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 space-y-1.5">
                <p className="flex items-center text-slate-500">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 mr-1.5 inline" />
                  Transacción protegida con cifrado SSL de 256 bits.
                </p>
                <p className="text-slate-400">
                  Garantía oficial FABY STUDIO ACADEMY. Puedes pagar online o en efectivo en cabina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
