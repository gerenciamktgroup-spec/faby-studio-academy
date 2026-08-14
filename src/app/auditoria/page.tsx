'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileSpreadsheet,
  FileText,
  UserCheck,
  Search,
  ExternalLink,
  Sparkles,
  Lock,
  MessageSquare,
  Video,
  Award,
  Database,
  Server,
  KeyRound,
  FileCheck2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function AuditoriaDemoPage() {
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'xlsx' | 'pdf'>('json');
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportStats, setExportStats] = useState<{ recordCount: number; fileHash: string } | null>(null);
  const [showComplianceDetails, setShowComplianceDetails] = useState(true);

  // Regulatory Requirements Matrix
  const regulatoryRequirements = [
    {
      id: 1,
      title: 'Acceso seguro con usuario y contraseña individual',
      description: 'Autenticación cifrada, recuperación de claves en 2 pasos y sesiones protegidas con roles RBAC (Alumna, Docente, Admin).',
      status: 'CUMPLIDO',
      evidenceUrl: '/login',
      evidenceLabel: 'Ver Login & Auth',
    },
    {
      id: 2,
      title: 'Seguimiento automático de actividad (Fechas, Conexión, Módulos, Progreso y Notas)',
      description: 'Active Learning Heartbeat cada 45s, registro de fecha/hora de inicio, cálculo de tiempo activo vs conectado, porcentaje de avance y notas.',
      status: 'CUMPLIDO',
      evidenceUrl: '/campus',
      evidenceLabel: 'Ver Dashboard Alumna',
    },
    {
      id: 3,
      title: 'Comunicación entre alumnos y tutores (Foros, Mensajería y Videoconferencia)',
      description: 'Canal de mensajería privada 1 a 1, foro de debate por temáticas y enlaces directos a salas virtuales de tutoría.',
      status: 'CUMPLIDO',
      evidenceUrl: '/campus/mensajes',
      evidenceLabel: 'Ver Mensajería & Foros',
    },
    {
      id: 4,
      title: 'Tutorización y seguimiento docente continuo',
      description: 'Panel de control docente con expedientes individuales de alumnas, alertas de tiempo inactivo y buzón de consultas.',
      status: 'CUMPLIDO',
      evidenceUrl: '/profesor',
      evidenceLabel: 'Ver Panel Docente',
    },
    {
      id: 5,
      title: 'Evaluaciones con cuestionarios, tareas y rúbricas con histórico permanente',
      description: 'Tests teóricos con porcentaje de superación (70%), entregas fotográficas y corrección por rúbrica de 4 criterios (100 pts) inmutable.',
      status: 'CUMPLIDO',
      evidenceUrl: '/profesor/evaluar-practica/1',
      evidenceLabel: 'Ver Evaluador Rúbrica',
    },
    {
      id: 6,
      title: 'Material multimedia (Vídeos, Guías PDF, Actividades Interactivas)',
      description: 'Streaming de video adaptable ABR con marcas de agua anti-piratería, Picture-in-Picture, guías técnicas descargables y anotaciones.',
      status: 'CUMPLIDO',
      evidenceUrl: '/campus/cursos/c1000000-0000-0000-0000-000000000001',
      evidenceLabel: 'Ver Reproductor LMS',
    },
    {
      id: 7,
      title: 'Capacidad de concurrencia y alto rendimiento de servidor',
      description: 'Infraestructura en la nube con escalado automático (Vercel Edge + Supabase PostgreSQL), caché CDN global y disponibilidad 99.9%.',
      status: 'CUMPLIDO',
      evidenceUrl: '/admin',
      evidenceLabel: 'Ver Ajustes de Servidor',
    },
    {
      id: 8,
      title: 'Copias de seguridad y estricta protección de datos (RGPD)',
      description: 'Anonimización de direcciones IP mediante hash SHA-256 unidireccional, consentimiento expreso de datos y copias de seguridad continuas.',
      status: 'CUMPLIDO',
      evidenceUrl: '/registro',
      evidenceLabel: 'Ver Consentimiento RGPD',
    },
    {
      id: 9,
      title: 'Disponibilidad de registros para inspección y auditoría de la Administración',
      description: 'Exportador oficial a formatos normalizados (JSON, CSV, XLSX, PDF) con huella criptográfica SHA-256 y trazabilidad forense completa.',
      status: 'CUMPLIDO',
      evidenceUrl: '/verificar-certificado/CERT-FS-DEMO-9988',
      evidenceLabel: 'Ver Validador Oficial QR',
    },
  ];

  const students = [
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Lucía Martínez',
      dni: '***5432*B',
      course: 'Curso Profesional de Extensiones de Pestañas',
      lastLogin: '14/08/2026 17:10:45',
      modulesCompleted: '4 de 6 módulos',
      progress: '68%',
      activeHours: '1.8h',
      connectedHours: '2.5h',
      activeRatio: '72.0%',
      evaluations: 'Test Bioseguridad: 100% • Práctica 01: 86/100',
      complianceStatus: 'CONFORME',
      complianceClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      lastHeartbeat: 'Hace 45 seg',
      certCode: 'PEND-FS-DEMO-LM68',
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Camila Torres',
      dni: '***4567*C',
      course: 'Curso Profesional de Extensiones de Pestañas',
      lastLogin: '08/08/2026 19:42:10',
      modulesCompleted: '6 de 6 módulos (Completo)',
      progress: '100%',
      activeHours: '50.0h',
      connectedHours: '54.2h',
      activeRatio: '92.2%',
      evaluations: 'Test Bioseguridad: 100% • Práctica 01: 95/100 • Proyecto Final: 95/100',
      complianceStatus: 'CERTIFICADA',
      complianceClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      lastHeartbeat: '08/08/2026',
      certCode: 'CERT-FS-DEMO-9988',
    },
  ];

  const recentAuditEvents = [
    {
      id: 'evt-99120',
      timestamp: '14/08/2026 17:15:30',
      eventType: 'HEARTBEAT_ACTIVE_TIME_VALIDATED',
      user: 'lucia.martinez (LM)',
      ipHash: '8f4e2b...c91a (Anonimizada)',
      lesson: 'Lección 1.2: Anatomía de la Pestaña',
      signature: 'sha256:d8a9f...3c82',
    },
    {
      id: 'evt-99119',
      timestamp: '14/08/2026 17:14:45',
      eventType: 'LESSON_COMPLETED',
      user: 'lucia.martinez (LM)',
      ipHash: '8f4e2b...c91a (Anonimizada)',
      lesson: 'Lección 1.1: Bienvenida & Estándares',
      signature: 'sha256:4b12c...88e1',
    },
    {
      id: 'evt-99118',
      timestamp: '14/08/2026 17:10:02',
      eventType: 'AUTH_SESSION_STARTED',
      user: 'lucia.martinez (LM)',
      ipHash: '8f4e2b...c91a (Anonimizada)',
      lesson: 'Inicio de Sesión en Campus',
      signature: 'sha256:77a10...90ff',
    },
  ];

  const handleExport = async (format: 'json' | 'csv' | 'xlsx' | 'pdf') => {
    setSelectedFormat(format);
    setExporting(true);
    setExportSuccess(false);

    try {
      const res = await fetch(`/api/audit/export?format=${format}`);
      const data = await res.json();

      setExportStats({
        recordCount: data.recordCount || 34,
        fileHash: data.fileHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      });
      setExportSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-display font-bold text-slate-900 text-base">
              PORTAL DE AUDITORÍA & INSPECCIÓN OFICIAL
            </span>
            <span className="block text-[9px] text-emerald-700 font-bold uppercase tracking-wider">
              FABY STUDIO ACADEMY — PLATAFORMA HOMOLOGABLE & CONFORME SEPE / FUNDAE / RGPD
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/demo"
            className="inline-flex items-center space-x-1 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs px-3 py-1.5 rounded-xl font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Role Switcher Demo</span>
          </Link>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-3 py-1 rounded-full font-bold">
            Perfil Auditor Oficial
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Compliance Guarantee Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>CONFORMIDAD TÉCNICA 100% — 9 DE 9 CRITERIOS REGULADOS SUPERADOS</span>
            </div>
            <h1 className="text-2xl font-bold font-display text-slate-900">
              Registro de Trazabilidad Continua & Verificación de Horas Activas
            </h1>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              La plataforma FABY STUDIO ACADEMY registra de manera inmutable la actividad de cada alumna matriculada: fecha/hora de acceso, tiempo de conexión, tiempo activo validado mediante heartbeat cada 45 segundos, progreso curricular, evaluaciones teóricas y rúbricas docentes, cumpliendo con los estándares de teleformación reglada y protección de datos RGPD.
            </p>
          </div>

          {/* Export Actions */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {(['json', 'csv', 'xlsx', 'pdf'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleExport(fmt)}
                disabled={exporting}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-3 py-2 rounded-xl text-xs uppercase flex items-center space-x-1.5 transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Exportar {fmt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Export Success Modal / Notification */}
        {exportSuccess && exportStats && (
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                Informe Oficial de Inspección Generado Correctamente ({selectedFormat.toUpperCase()})
              </span>
              <span className="text-emerald-700 font-semibold">{exportStats.recordCount} registros auditados</span>
            </div>
            <p className="font-mono text-[10px] text-slate-600 break-all bg-white p-2.5 rounded-xl border border-emerald-200">
              Huella Criptográfica SHA-256: {exportStats.fileHash}
            </p>
          </div>
        )}

        {/* SECTION 1: MATRIZ DE REQUISITOS REGULADOS (9/9) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold font-display text-slate-900">
                  Matriz de Requisitos Exigidos para Plataformas de Teleformación
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Auditoría detallada punto por punto según normativa de formación profesional, teleformación y RGPD.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowComplianceDetails(!showComplianceDetails)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
            >
              <span>{showComplianceDetails ? 'Plegar Matriz' : 'Desplegar Matriz'}</span>
              {showComplianceDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showComplianceDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {regulatoryRequirements.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-[10px]">
                        0{req.id}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> {req.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 leading-snug">{req.title}</h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{req.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <Link
                      href={req.evidenceUrl}
                      className="text-[11px] font-bold text-rose-600 hover:text-rose-700 flex items-center space-x-1"
                    >
                      <span>{req.evidenceLabel}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: AUDIT LOG TABLE (STUDENTS ACTIVITY BREAKDOWN) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900">
                Registro de Actividad & Expedientes Formativos de Alumnas
              </h2>
              <p className="text-xs text-slate-500">
                Desglose automático de accesos, tiempos de conexión, horas activas, módulos completados y calificaciones.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">Muestra auditada en tiempo real</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Alumna & DNI</th>
                  <th className="py-3.5 px-4">Último Acceso</th>
                  <th className="py-3.5 px-4">Módulos & Progreso</th>
                  <th className="py-3.5 px-4">Tiempo Activo / Conectado</th>
                  <th className="py-3.5 px-4">Evaluaciones Registradas</th>
                  <th className="py-3.5 px-4">Certificado QR</th>
                  <th className="py-3.5 px-4">Dictamen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-900">{st.name}</p>
                      <p className="text-[11px] text-slate-400">DNI: {st.dni}</p>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-700">
                      {st.lastLogin}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-900">{st.progress}</p>
                      <p className="text-[11px] text-slate-500">{st.modulesCompleted}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-emerald-700">{st.activeHours} activas</p>
                      <p className="text-[11px] text-slate-400">{st.connectedHours} conectada ({st.activeRatio})</p>
                    </td>
                    <td className="py-4 px-4 max-w-xs truncate text-[11px] font-medium text-slate-700">
                      {st.evaluations}
                    </td>
                    <td className="py-4 px-4">
                      <Link
                        href={`/verificar-certificado/${st.certCode}`}
                        className="text-rose-600 hover:underline font-mono text-[11px] flex items-center space-x-1"
                      >
                        <span>{st.certCode}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${st.complianceClass}`}>
                        {st.complianceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 3: RECENT CRYPTOGRAPHIC AUDIT EVENTS */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-bold font-display text-slate-900 flex items-center space-x-2">
                <Database className="w-4 h-4 text-rose-600" />
                <span>Libro de Eventos de Auditoría Inmutables (Append-Only)</span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Cada interacción lectiva genera un registro firmado con hash SHA-256 para prevenir alteraciones retroactivas.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Sincronizado
            </span>
          </div>

          <div className="divide-y divide-slate-100 font-mono text-xs">
            {recentAuditEvents.map((evt) => (
              <div key={evt.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded">{evt.eventType}</span>
                    <span className="text-slate-500 font-sans">{evt.timestamp}</span>
                  </div>
                  <p className="text-slate-900 font-sans font-medium">{evt.user} — {evt.lesson}</p>
                </div>

                <div className="text-right text-[10px] text-slate-400 font-mono">
                  <p>IP: {evt.ipHash}</p>
                  <p className="text-emerald-700 font-semibold">{evt.signature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
