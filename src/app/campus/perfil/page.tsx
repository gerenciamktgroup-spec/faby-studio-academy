'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  ShieldCheck,
  CreditCard,
  Download,
  Lock,
  CheckCircle2,
  Mail,
  Phone,
  FileText,
  Save,
  Key,
  Bell,
  Check
} from 'lucide-react';

export default function StudentProfilePage() {
  const [name, setName] = useState('Lucía Martínez');
  const [email, setEmail] = useState('lucia.martinez@gmail.com');
  const [phone, setPhone] = useState('+34 612 345 678');
  const [dni, setDni] = useState('87654321B');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Password Change State
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [pwdError, setPwdError] = useState<string | null>(null);

  // Notification Preferences
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [whatsappNotifs, setWhatsappNotifs] = useState(true);

  const invoices = [
    {
      id: 'INV-2026-0881',
      date: '01/08/2026',
      concept: 'Matrícula Curso Profesional en Extensiones de Pestañas',
      amount: '380,00 €',
      paymentMethod: 'Tarjeta Stripe (•••• 4242)',
      status: 'Pagada',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(false);

    if (newPwd.length < 6) {
      setPwdError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdError('Las contraseñas no coinciden.');
      return;
    }

    setPwdSuccess(true);
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setTimeout(() => setPwdSuccess(false), 3000);
  };

  const handleDownloadInvoice = (inv: typeof invoices[0]) => {
    const content = `
═══════════════════════════════════════════════════════════
               FABY STUDIO ACADEMY
            FACTURA OFICIAL SIMPLIFICADA
═══════════════════════════════════════════════════════════

Número de Factura: ${inv.id}
Fecha de Emisión: ${inv.date}
Emisor: FABY STUDIO S.L. (NIF: B-88776655)
Dirección: Calle Serrano 45, Madrid, España

DATOS DE LA ALUMNA:
Nombre: ${name}
DNI/NIE: ${dni}
Email: ${email}
Teléfono: ${phone}

DETALLE DEL SERVICIO:
Concepto: ${inv.concept}
Base Imponible (21% IVA incl.): 314,05 €
IVA (21%): 65,95 €
TOTAL PAGADO: ${inv.amount}

Método de Pago: ${inv.paymentMethod}
Estado: PAGADA / EMITIDA

═══════════════════════════════════════════════════════════
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FACTURA_${inv.id}_FABY_STUDIO.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Mi Cuenta</span>
        <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">Perfil de Alumna & Facturación</h1>
        <p className="text-xs text-slate-500">Gestiona tus datos personales para certificados, seguridad y descarga de facturas oficiales.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Personal & Security Info */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Información Personal & Certificación</span>
              <span className="text-[10px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-bold uppercase">Datos para Diplomas</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nombre Completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">DNI / NIE / Pasaporte</label>
                <input
                  type="text"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Teléfono Móvil</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {saveSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>¡Datos del perfil actualizados con éxito!</span>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center justify-center space-x-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Datos Personales</span>
              </button>
            )}
          </form>

          {/* Security & Password Change */}
          <form onSubmit={handlePasswordChange} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center space-x-2">
              <Key className="w-4 h-4 text-rose-600" />
              <span>Cambiar Contraseña de Acceso</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Confirmar Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                  placeholder="Repite la nueva contraseña"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>
            </div>

            {pwdSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>¡Contraseña actualizada correctamente!</span>
              </div>
            )}

            {pwdError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-bold">
                {pwdError}
              </div>
            )}

            <button
              type="submit"
              className="bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl transition-colors w-full"
            >
              Actualizar Contraseña
            </button>
          </form>
        </div>

        {/* Right: Billing & Invoices */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Historial de Pagos & Facturas</span>
            </h3>

            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900">{inv.id}</span>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                      {inv.status}
                    </span>
                  </div>

                  <p className="text-slate-700 font-medium">{inv.concept}</p>
                  <p className="text-slate-500 text-[11px]">{inv.date} • {inv.paymentMethod}</p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="font-bold text-slate-900">{inv.amount}</span>
                    <button
                      onClick={() => handleDownloadInvoice(inv)}
                      className="bg-white border border-slate-200 hover:border-rose-500 text-slate-700 hover:text-rose-600 px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center space-x-1 shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Factura PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
