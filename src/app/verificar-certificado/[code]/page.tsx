'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPublicCertificateByCode } from '@/lib/services-demo/certificate-service';
import { ShieldCheck, Award, CheckCircle2, Clock, FileCheck, ArrowLeft, Download, AlertCircle, Sparkles, QrCode } from 'lucide-react';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function VerificarCertificadoPage() {
  const params = useParams();
  const code = (params?.code as string) || 'CERT-FS-DEMO-9988';
  const cert = getPublicCertificateByCode(code);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <PublicHeader />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        {/* Verification Status Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>PORTAL OFICIAL DE VALIDACIÓN DE TÍTULOS — FABY STUDIO ACADEMY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900">
            Verificación de Certificación Digital
          </h1>
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Comprobación pública e inalterable de autenticidad respaldada por registro append-only y firma hash SHA-256.
          </p>
        </div>

        {cert ? (
          <div className="space-y-6">
            {/* Validation Banner */}
            <div className={`p-6 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
              cert.isValid
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                  cert.isValid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {cert.isValid ? <CheckCircle2 className="w-7 h-7" /> : <Clock className="w-7 h-7" />}
                </div>
                <div>
                  <h2 className="text-lg font-bold font-display text-slate-900">
                    {cert.isValid ? 'Certificado Oficial Válido y Auténtico' : 'Expediente en Proceso de Finalización'}
                  </h2>
                  <p className="text-xs text-slate-600">
                    Código de registro: <strong className="font-mono text-slate-900 font-bold">{cert.code}</strong>
                  </p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                cert.isValid
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                  : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {cert.isValid ? 'ESTADO: ACTIVO / EMITIDO' : 'ESTADO: EN CURSO (68%)'}
              </span>
            </div>

            {/* Official Diploma Detail Card (White Luxury with Gold Border) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 relative overflow-hidden shadow-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
                <div>
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-widest bg-rose-50 px-2.5 py-0.5 rounded-full">
                    {cert.specializationTag}
                  </span>
                  <h3 className="text-2xl font-bold font-display text-slate-900 mt-2">
                    {cert.courseTitle}
                  </h3>
                </div>

                <div className="text-left sm:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-xs text-slate-500">Calificación Final:</span>
                  <p className="text-2xl font-extrabold text-emerald-700 font-display">
                    {cert.gradePercentage}% ({cert.gradePercentage >= 90 ? 'Excelente / Con Distinción' : 'Aprobada'})
                  </p>
                </div>
              </div>

              {/* Student Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium">Alumna Titular</span>
                  <p className="text-base font-bold text-slate-900">{cert.studentName}</p>
                  <p className="text-slate-500">Documento: {cert.dniMasked}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium">Horas Lectivas Validadas</span>
                  <p className="text-base font-bold text-emerald-700">{cert.activeHours} horas activas</p>
                  <p className="text-slate-500">Trazabilidad Heartbeat 100%</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-500 font-medium">Fecha de Emisión</span>
                  <p className="text-base font-bold text-slate-900">{cert.issueDate}</p>
                  <p className="text-slate-500">Firma: {cert.directorName}</p>
                </div>
              </div>

              {/* Competencias y Habilidades Certificadas */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 font-display">Competencias Técnicas Evaluadas & Superadas:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {cert.skillsAcquired.map((skill, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cryptographic SHA-256 Integrity Footer */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <span className="text-slate-700 font-medium flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1 text-emerald-600 inline" />
                    Huella Criptográfica de Integridad (SHA-256):
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Registro Inmutable Verificado
                  </span>
                </div>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 break-all">
                  {cert.integrityHashSha256}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-4 max-w-lg mx-auto shadow-xs">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
            <h2 className="text-xl font-bold font-display text-slate-900">Certificado No Encontrado</h2>
            <p className="text-xs text-slate-500">
              El código <strong className="text-slate-900">{code}</strong> no coincide con ningún certificado emitido en la base de datos de FABY STUDIO ACADEMY.
            </p>
            <Link
              href="/campus/certificado"
              className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Ver Certificados Demo</span>
            </Link>
          </div>
        )}

        {/* Back navigation */}
        <div className="flex justify-center pt-4">
          <Link
            href="/demo"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Role Switcher Demo</span>
          </Link>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
