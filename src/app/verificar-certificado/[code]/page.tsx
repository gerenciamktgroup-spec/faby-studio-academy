import Link from 'next/link';
import { AlertCircle, Award, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { verifyCertificate, type VerifiedCertificate } from '@/lib/certificates/verify';

async function findCertificate(code: string): Promise<VerifiedCertificate | null> {
  try {
    return await verifyCertificate(code);
  } catch {
    return null;
  }
}

export default async function VerifyCertificatePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: rawCode } = await params;
  const code = decodeURIComponent(rawCode).trim();
  const certificate = await findCertificate(code);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800">
            <ShieldCheck className="h-4 w-4" /> PORTAL DE VALIDACIÓN TÉCNICA
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Verificación de certificado</h1>
        </div>

        {certificate ? (
          <section className="rounded-3xl border border-emerald-200 bg-white p-7 shadow-sm space-y-7">
            <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 p-5 text-emerald-900">
              <CheckCircle2 className="h-10 w-10 shrink-0 text-emerald-600" />
              <div>
                <h2 className="text-xl font-bold">Certificado válido y emitido</h2>
                <p className="font-mono text-xs">{certificate.code}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Titular</p>
                <p className="mt-1 font-bold text-slate-900">{certificate.student_name}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Programa completado</p>
                <p className="mt-1 font-bold text-slate-900">{certificate.course_title}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="flex items-center gap-1 text-xs text-slate-500"><Clock className="h-3.5 w-3.5" /> Horas activas registradas</p>
                <p className="mt-1 font-bold text-slate-900">{certificate.total_active_hours} horas</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="flex items-center gap-1 text-xs text-slate-500"><Award className="h-3.5 w-3.5" /> Fecha de emisión</p>
                <p className="mt-1 font-bold text-slate-900">
                  {new Intl.DateTimeFormat('es', { dateStyle: 'long' }).format(new Date(certificate.issued_at))}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold text-slate-600">Estado de Autenticidad</p>
              <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 font-medium text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Certificado verificado mediante firma criptográfica del servidor.</span>
              </p>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-sm space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900">Certificado no encontrado</h2>
            <p className="text-sm text-slate-600">
              El código <strong>{code}</strong> no corresponde a un certificado emitido.
            </p>
          </section>
        )}

        <div className="text-center">
          <Link href="/verificar-certificado" className="text-sm font-bold text-rose-600">
            Verificar otro código
          </Link>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
