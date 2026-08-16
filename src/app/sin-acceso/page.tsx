import Link from 'next/link';
import { ShieldX } from 'lucide-react';

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 flex items-center justify-center">
      <section className="max-w-md w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <ShieldX className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">Acceso no autorizado</h1>
        <p className="text-sm leading-relaxed text-slate-600">
          Tu sesión es válida, pero el rol asignado no permite acceder a esta sección.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <Link href="/" className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
            Ir al inicio
          </Link>
          <Link href="/login" className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white">
            Cambiar de cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}
