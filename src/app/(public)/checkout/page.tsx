import Link from 'next/link';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-14 w-full">
        <Link href="/cursos" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500"><ArrowLeft className="h-4 w-4" /> Volver al catálogo</Link>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 text-center shadow-sm space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-700"><Lock className="h-8 w-8" /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Inscripción protegida</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">El pago en línea aún no está habilitado</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">No solicitamos ni almacenamos datos de tarjeta hasta que el proveedor de pago, la moneda y la fiscalidad estén configurados. Administración puede crear una matrícula después de verificar el pago por el canal autorizado.</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left text-xs text-emerald-900 flex gap-3"><ShieldCheck className="h-5 w-5 shrink-0" /><p><strong>Sin cobros simulados.</strong> Cuando se active el proveedor, esta pantalla se conectará a un checkout alojado y a un webhook idempotente antes de matricular.</p></div>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/registro" className="rounded-xl bg-rose-600 px-5 py-3 text-sm font-bold text-white">Crear mi cuenta</Link>
            <Link href="/cursos" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">Revisar programas</Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
