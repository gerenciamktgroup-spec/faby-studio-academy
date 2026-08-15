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
  ChevronUp,
  Activity,
  BarChart3,
  TrendingUp,
  QrCode,
  Eye,
  X,
  User,
  Calendar,
  Layers,
  Check,
  Copy,
  HelpCircle,
  Hash,
  ArrowRight
} from 'lucide-react';

interface StudentDossier {
  id: string;
  name: string;
  avatar: string;
  dni: string;
  email: string;
  phone: string;
  course: string;
  enrolledDate: string;
  tutor: string;
  lastLogin: string;
  modulesCompleted: number;
  totalModules: number;
  progress: number;
  activeHours: number;
  connectedHours: number;
  activeRatio: number;
  gradeQuiz: number;
  gradePractice: number;
  practiceFeedback: string;
  rubricBreakdown: { criterion: string; score: number; max: number }[];
  tutoringSessions: { title: string; date: string; tutor: string; status: string }[];
  complianceStatus: 'CONFORME' | 'CERTIFICADA' | 'EN PROCESO';
  certCode: string;
  certDate?: string;
}

export default function AuditoriaDemoPage() {
  const [selectedFormat, setSelectedFormat] = useState<'json' | 'csv' | 'xlsx' | 'pdf'>('json');
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [exportStats, setExportStats] = useState<{ recordCount: number; fileHash: string; date: string } | null>({
    recordCount: 34,
    fileHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    date: '15/08/2026 17:30:00',
  });
  
  // Accordion states for the 9 criteria
  const [expandedCriteria, setExpandedCriteria] = useState<number | null>(null);
  
  // Modals state
  const [selectedStudentForExpediente, setSelectedStudentForExpediente] = useState<StudentDossier | null>(null);
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<StudentDossier | null>(null);
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  // 9 Criterios Normativos Normalizados
  const criteriaList = [
    {
      id: 1,
      title: 'Acceso seguro y autenticación individualizada',
      summary: 'Inicio de sesión cifrado con roles RBAC (Alumna, Docente, Admin) y recuperación segura.',
      technicalDetails: 'Sesiones con token seguro, control de concurrencia y validación en middleware de Next.js. Cumple estándares de confidencialidad de datos.',
      status: 'CONFORME',
      evidenceUrl: '/login',
      evidenceLabel: 'Ver Login & Auth',
      category: 'Seguridad & Acceso',
    },
    {
      id: 2,
      title: 'Seguimiento continuo de actividad lectiva (Heartbeat 45s)',
      summary: 'Diferenciación matemática de tiempo activo frente a tiempo conectado mediante telemetría.',
      technicalDetails: 'Ping periódico cada 45 segundos emitido desde el reproductor con detección de visibilidad de pestaña y reproducción efectiva de vídeo.',
      status: 'CONFORME',
      evidenceUrl: '/campus',
      evidenceLabel: 'Ver Dashboard Alumna',
      category: 'Telemetría',
    },
    {
      id: 3,
      title: 'Canales bidireccionales de comunicación docente',
      summary: 'Mensajería privada 1 a 1, foros temáticos por módulo y salas virtuales para tutorías.',
      technicalDetails: 'Historial de mensajes persistente en base de datos con timestamps inmutables para acreditación de respuesta en menos de 24 horas.',
      status: 'CONFORME',
      evidenceUrl: '/campus/mensajes',
      evidenceLabel: 'Ver Mensajería & Foros',
      category: 'Comunicación',
    },
    {
      id: 4,
      title: 'Tutorización y seguimiento pedagógico individual',
      summary: 'Panel docente con expedientes por alumna, control de alertas y corrección continua.',
      technicalDetails: 'Supervisión de entregas, histórico de conexiones y panel de gestión de tutorías 1 a 1 con registro de asistencia.',
      status: 'CONFORME',
      evidenceUrl: '/profesor',
      evidenceLabel: 'Ver Panel Docente',
      category: 'Pedagogía',
    },
    {
      id: 5,
      title: 'Evaluaciones objetivas mediante rúbricas y tests',
      summary: 'Tests teóricos (mínimo 70%) y rúbricas de 4 criterios (100 pts) para prácticas.',
      technicalDetails: 'Evaluador con criterios ponderados: aislamiento, distancia, simetría y adhesivo. Histórico inmutable para inspecciones.',
      status: 'CONFORME',
      evidenceUrl: '/profesor/evaluar-practica/1',
      evidenceLabel: 'Ver Evaluador Rúbrica',
      category: 'Evaluación',
    },
    {
      id: 6,
      title: 'Contenidos multimedia interactivos y guías PDF',
      summary: 'Streaming en alta definición, modo Picture-in-Picture, dossiers descargables y notas.',
      technicalDetails: 'Vídeos enlazados con control de velocidad, transcripciones técnicas, guías de práctica y autoevaluaciones integradas.',
      status: 'CONFORME',
      evidenceUrl: '/campus/cursos/c1000000-0000-0000-0000-000000000001',
      evidenceLabel: 'Ver Reproductor LMS',
      category: 'Contenidos',
    },
    {
      id: 7,
      title: 'Infraestructura de alta disponibilidad y concurrencia',
      summary: 'Despliegue cloud global en Vercel Edge con disponibilidad 99.9% y escalado elástico.',
      technicalDetails: 'CDN multi-región con caché optimizada para streaming, almacenamiento distribuido y tolerancia a fallos.',
      status: 'CONFORME',
      evidenceUrl: '/admin',
      evidenceLabel: 'Ver Ajustes Servidor',
      category: 'Infraestructura',
    },
    {
      id: 8,
      title: 'Privacidad y protección de datos (RGPD)',
      summary: 'Anonimización de direcciones IP mediante hash SHA-256 y consentimiento explícito.',
      technicalDetails: 'Cifrado unidireccional de IPs de conexión, registro inmutable y cumplimiento estricto del RGPD europeo.',
      status: 'CONFORME',
      evidenceUrl: '/registro',
      evidenceLabel: 'Ver Consentimiento RGPD',
      category: 'Legal & RGPD',
    },
    {
      id: 9,
      title: 'Trazabilidad criptográfica y exportación para inspección',
      summary: 'Exportación a JSON, CSV, XLSX y PDF con huella digital SHA-256 y diplomas con QR.',
      technicalDetails: 'Página de verificación pública con validador de integridad para centros empleadores y entidades inspectoras.',
      status: 'CONFORME',
      evidenceUrl: '/verificar-certificado/CERT-FS-DEMO-9988',
      evidenceLabel: 'Ver Validador QR',
      category: 'Auditoría',
    },
  ];

  // Datos detallados de alumnas para la tabla y expedientes
  const students: StudentDossier[] = [
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Lucía Martínez',
      avatar: 'LM',
      dni: '***5432*B',
      email: 'lucia.martinez@fabystudio.es',
      phone: '+34 612 345 678',
      course: 'Curso Profesional de Extensiones de Pestañas',
      enrolledDate: '01/08/2026',
      tutor: 'Laura Gómez',
      lastLogin: '15/08/2026 17:10:45',
      modulesCompleted: 4,
      totalModules: 6,
      progress: 68,
      activeHours: 1.8,
      connectedHours: 2.5,
      activeRatio: 72.0,
      gradeQuiz: 100,
      gradePractice: 86,
      practiceFeedback: 'Excelente aislamiento en zona central y lagrimal. Muy buena dirección en ojos almendrados.',
      rubricBreakdown: [
        { criterion: '1. Aislamiento y Separación Pelo a Pelo', score: 23, max: 25 },
        { criterion: '2. Distancia al Párpado (0.5mm - 1.0mm)', score: 21, max: 25 },
        { criterion: '3. Dirección y Simetría del Mapping', score: 22, max: 25 },
        { criterion: '4. Limpieza de Adhesivo y Micro-Gota', score: 20, max: 25 },
      ],
      tutoringSessions: [
        { title: 'Revisión Técnica Práctica 01 & Mapping', date: 'Martes 18/08 18:30h', tutor: 'Laura Gómez', status: 'Confirmada' },
        { title: 'Sesión Inicial de Inducción al Campus', date: '04/08/2026', tutor: 'Laura Gómez', status: 'Completada' },
      ],
      complianceStatus: 'CONFORME',
      certCode: 'PEND-FS-DEMO-LM68',
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Camila Torres',
      avatar: 'CT',
      dni: '***4567*C',
      email: 'camila.torres@gmail.com',
      phone: '+34 699 887 766',
      course: 'Curso Profesional de Extensiones de Pestañas',
      enrolledDate: '15/07/2026',
      tutor: 'Laura Gómez',
      lastLogin: '08/08/2026 19:42:10',
      modulesCompleted: 6,
      totalModules: 6,
      progress: 100,
      activeHours: 50.0,
      connectedHours: 54.2,
      activeRatio: 92.2,
      gradeQuiz: 100,
      gradePractice: 95,
      practiceFeedback: 'Técnica impecable en abanicado 4D y mapping Cat Eye. Proyecto final aprobado con honores.',
      rubricBreakdown: [
        { criterion: '1. Aislamiento y Separación Pelo a Pelo', score: 25, max: 25 },
        { criterion: '2. Distancia al Párpado (0.5mm - 1.0mm)', score: 24, max: 25 },
        { criterion: '3. Dirección y Simetría del Mapping', score: 23, max: 25 },
        { criterion: '4. Limpieza de Adhesivo y Micro-Gota', score: 23, max: 25 },
      ],
      tutoringSessions: [
        { title: 'Defensa de Proyecto Final en Modelo Real', date: '08/08/2026', tutor: 'Laura Gómez', status: 'Completada' },
      ],
      complianceStatus: 'CERTIFICADA',
      certCode: 'CERT-FS-DEMO-9988',
      certDate: '08/08/2026',
    },
    {
      id: 'student-3',
      name: 'María López',
      avatar: 'ML',
      dni: '***7890*D',
      email: 'maria.lopez@gmail.com',
      phone: '+34 655 443 322',
      course: 'Máster Profesional en Uñas de Gel & Acrílico',
      enrolledDate: '01/08/2026',
      tutor: 'Profesora Faby',
      lastLogin: '12/08/2026 11:20:15',
      modulesCompleted: 2,
      totalModules: 5,
      progress: 45,
      activeHours: 18.2,
      connectedHours: 22.0,
      activeRatio: 82.7,
      gradeQuiz: 90,
      gradePractice: 88,
      practiceFeedback: 'Buen control de la perla acrílica y ápice bien alineado en estructura ballerina.',
      rubricBreakdown: [
        { criterion: '1. Preparación de placa y manicura rusa', score: 22, max: 25 },
        { criterion: '2. Control del ápice y zona de estrés', score: 23, max: 25 },
        { criterion: '3. Curva C y simetría estructural', score: 21, max: 25 },
        { criterion: '4. Sellado de cutícula y limado', score: 22, max: 25 },
      ],
      tutoringSessions: [
        { title: 'Resolución de dudas sobre fresas de diamante', date: '10/08/2026', tutor: 'Profesora Faby', status: 'Completada' },
      ],
      complianceStatus: 'EN PROCESO',
      certCode: 'PEND-FS-DEMO-ML45',
    },
  ];

  // Timeline de eventos de auditoría (Humano + Técnico)
  const timelineEvents = [
    {
      id: 'evt-01',
      time: '17:15:30',
      date: '15/08/2026',
      humanTitle: 'Actividad de estudio validada en vivo',
      humanSubtitle: 'Lucía Martínez mantuvo foco activo en la reproducción del vídeo.',
      technicalType: 'HEARTBEAT_ACTIVE_TIME_VALIDATED',
      module: 'Lección 1.2: Anatomía de la Pestaña',
      user: 'lucia.martinez (LM)',
      ipHash: '8f4e2b...c91a',
      signature: 'sha256:d8a9f4c2e1b7...3c82',
    },
    {
      id: 'evt-02',
      time: '17:14:45',
      date: '15/08/2026',
      humanTitle: 'Lección completada con éxito',
      humanSubtitle: 'Progreso curricular actualizado al 68% tras superar el tiempo mínimo.',
      technicalType: 'LESSON_COMPLETED',
      module: 'Lección 1.1: Bienvenida & Estándares',
      user: 'lucia.martinez (LM)',
      ipHash: '8f4e2b...c91a',
      signature: 'sha256:4b12c9e7a2f0...88e1',
    },
    {
      id: 'evt-03',
      time: '17:10:02',
      date: '15/08/2026',
      humanTitle: 'Inicio de sesión seguro autenticado',
      humanSubtitle: 'Acceso verificado con credenciales personales cifradas.',
      technicalType: 'AUTH_SESSION_STARTED',
      module: 'Campus Virtual Alumna',
      user: 'lucia.martinez (LM)',
      ipHash: '8f4e2b...c91a',
      signature: 'sha256:77a10f9b3e41...90ff',
    },
    {
      id: 'evt-04',
      time: '19:45:12',
      date: '08/08/2026',
      humanTitle: 'Certificado oficial emitido con firma criptográfica',
      humanSubtitle: 'Camila Torres completó el 100% de horas y aprobó el proyecto final.',
      technicalType: 'CERTIFICATE_ISSUED_SHA256',
      module: 'Acreditación Oficial CERT-FS-DEMO-9988',
      user: 'camila.torres (CT)',
      ipHash: '3a1c8f...e45b',
      signature: 'sha256:9a8f4c2e1b7d...0b1c',
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
        fileHash: data.fileHash || 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        date: new Date().toLocaleString(),
      });
      setExportSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const copyHashToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-rose-100 selection:text-rose-900">
      
      {/* ── TOP NAVIGATION BAR (SaaS Header) ─────────────────────────────── */}
      <header className="h-18 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between shadow-xs sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-sm shadow-emerald-600/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-slate-900 text-base tracking-tight">
                FABY STUDIO <span className="text-emerald-700">ACADEMY</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                Auditoría SaaS
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Portal de Trazabilidad & Inspección Técnica</p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* MODO DEMO BADGE */}
          <div className="inline-flex items-center space-x-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] tracking-wide">MODO DEMO COMERCIAL</span>
          </div>

          <Link
            href="/demo"
            className="hidden sm:inline-flex items-center space-x-1.5 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Role Switcher</span>
          </Link>

          <Link
            href="/campus"
            className="inline-flex items-center space-x-1 bg-slate-900 hover:bg-slate-800 text-white text-xs px-3.5 py-1.5 rounded-xl font-bold transition-all shadow-2xs"
          >
            <span>Explorar Plataforma →</span>
          </Link>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* ── 1. CABECERA SIMPLIFICADA (Puntos 1 & 2) ───────────────────────── */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>SUPERVISIÓN & CONFORMIDAD TELEFORMATIVA</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                Auditoría y Trazabilidad Formativa
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Supervisión en tiempo real de actividad lectiva, cumplimiento de estándares de teleformación reglada, registro append-only con firma criptográfica y expedientes formativos con acreditación QR.
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Acciones de Inspección:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleExport('pdf')}
                  disabled={exporting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Informe PDF</span>
                </button>
                <button
                  onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
                  className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-2xs"
                >
                  <Hash className="w-3.5 h-3.5 text-slate-500" />
                  <span>Detalles Técnicos</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── 2. EXECUTIVE KPI DASHBOARD (Puntos 2 & 11) ────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
            {/* KPI 1 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Conformidad Normativa</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-slate-900 font-display">9 / 9</span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">100% OK</span>
              </div>
              <p className="text-[11px] text-slate-500">Criterios de teleformación auditados</p>
            </div>

            {/* KPI 2 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Trazabilidad Activa</span>
                <Activity className="w-4 h-4 text-rose-600" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-slate-900 font-display">24 / 7</span>
                <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">Cada 45s</span>
              </div>
              <p className="text-[11px] text-slate-500">Heartbeat con detección de foco</p>
            </div>

            {/* KPI 3 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Progreso Medio</span>
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-slate-900 font-display">84.0%</span>
                <span className="text-[11px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">+12% vs media</span>
              </div>
              <p className="text-[11px] text-slate-500">Avance curricular registrado</p>
            </div>

            {/* KPI 4 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span className="font-semibold text-[11px] uppercase tracking-wider">Rúbricas & Evaluaciones</span>
                <Award className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-extrabold text-slate-900 font-display">90.5 / 100</span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">Promedio</span>
              </div>
              <p className="text-[11px] text-slate-500">Evaluación docente de 4 criterios</p>
            </div>
          </div>

          {/* Expandable Technical Specifications Drawer (Punto 14) */}
          {showTechnicalSpecs && (
            <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 animate-in fade-in zoom-in-95 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold font-display text-sm text-emerald-400">
                  Especificaciones Técnicas & Arquitectura de Auditoría (Para Inspectores de Sistemas)
                </span>
                <button
                  onClick={() => setShowTechnicalSpecs(false)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  ✕ Cerrar
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] text-slate-300">
                <div className="space-y-1 bg-slate-800/60 p-3 rounded-xl">
                  <p className="font-bold text-white">🔒 Criptografía SHA-256</p>
                  <p className="leading-relaxed">Registros inmutables con huella hash unidireccional y anonimización de direcciones IP cumpliendo RGPD Art. 32.</p>
                </div>
                <div className="space-y-1 bg-slate-800/60 p-3 rounded-xl">
                  <p className="font-bold text-white">⚡ Active Learning Heartbeat</p>
                  <p className="leading-relaxed">Ping de telemetría emitido exclusivamente cuando la pestaña del navegador está activa y el reproductor de vídeo en marcha.</p>
                </div>
                <div className="space-y-1 bg-slate-800/60 p-3 rounded-xl">
                  <p className="font-bold text-white">📜 Verificación Pública QR</p>
                  <p className="leading-relaxed">Diplomas con hash de validación accesible públicamente mediante endpoint cifrado para centros de estética empleadores.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 3. MATRIZ COMPACTA DE LOS 9 CRITERIOS (Puntos 3 & 4) ──────────── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900 flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Matriz de Cumplimiento Normativo (9 de 9 Criterios)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Requisitos exigidos por la administración para plataformas de teleformación homologables.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
              100% Implementado en la Demo
            </span>
          </div>

          {/* Compact Matrix Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">#</th>
                  <th className="py-3 px-4">Criterio / Estándar Regulado</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4 text-center">Estado</th>
                  <th className="py-3 px-4 text-right">Evidencia en Plataforma</th>
                  <th className="py-3 px-3 text-center w-12">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {criteriaList.map((crit) => {
                  const isExpanded = expandedCriteria === crit.id;
                  return (
                    <React.Fragment key={crit.id}>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-3.5 text-center font-bold text-slate-400">
                          0{crit.id}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          {crit.title}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                            {crit.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center space-x-1 bg-emerald-100 text-emerald-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>{crit.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            href={crit.evidenceUrl}
                            className="inline-flex items-center space-x-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold px-3 py-1.5 rounded-xl text-[11px] border border-rose-200 shadow-2xs transition-colors"
                          >
                            <span>{crit.evidenceLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => setExpandedCriteria(isExpanded ? null : crit.id)}
                            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-800 transition-colors mx-auto"
                            title="Ver detalles técnicos del criterio"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* Accordion Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/80">
                          <td colSpan={6} className="p-4 px-6 text-xs space-y-2 border-b border-slate-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-[10px] font-bold text-slate-500 uppercase">Resumen Pedagógico:</p>
                                <p className="text-slate-700 leading-relaxed">{crit.summary}</p>
                              </div>
                              <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                                <p className="text-[10px] font-bold text-emerald-700 uppercase">Garantía Técnica de Auditoría:</p>
                                <p className="text-slate-600 text-[11px] leading-relaxed">{crit.technicalDetails}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 4. TABLA REDISEÑADA DE ALUMNAS (Puntos 5, 6, 7, 8, 13) ────────── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900 flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-rose-600" />
                <span>Expedientes Formativos & Control de Horas Activas</span>
              </h2>
              <p className="text-xs text-slate-500">
                Desglose individualizado de asistencia, calificaciones, ratio activo y certificación verificable.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Muestra representativa de alumnas
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Alumna</th>
                  <th className="py-3.5 px-4">Progreso Curricular</th>
                  <th className="py-3.5 px-4">Horas Activas / Conexión</th>
                  <th className="py-3.5 px-4">Evaluaciones</th>
                  <th className="py-3.5 px-4 text-center">Dictamen</th>
                  <th className="py-3.5 px-4 text-right">Acciones de Inspección</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Alumna with Circular Avatar */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-100 to-rose-200 text-rose-800 font-extrabold flex items-center justify-center text-xs border border-rose-300 shrink-0">
                          {st.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{st.name}</p>
                          <p className="text-[11px] text-slate-400 font-mono">DNI: {st.dni}</p>
                        </div>
                      </div>
                    </td>

                    {/* Progress Bar */}
                    <td className="py-4 px-4 min-w-[160px]">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-900">{st.progress}%</span>
                          <span className="text-slate-500">{st.modulesCompleted}/{st.totalModules} mód.</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              st.progress === 100 ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                            style={{ width: `${st.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Active vs Connected Time */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <p className="font-bold text-emerald-700 flex items-center space-x-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{st.activeHours}h activas</span>
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {st.connectedHours}h conectada ({st.activeRatio}%)
                        </p>
                      </div>
                    </td>

                    {/* Evaluations */}
                    <td className="py-4 px-4">
                      <div className="flex flex-col gap-1 text-[11px]">
                        <span className="font-medium text-slate-700">Quiz: <strong className="text-slate-900">{st.gradeQuiz}%</strong></span>
                        <span className="font-medium text-slate-700">Rúbrica: <strong className="text-rose-700">{st.gradePractice}/100</strong></span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        st.complianceStatus === 'CONFORME'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : st.complianceStatus === 'CERTIFICADA'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}>
                        {st.complianceStatus}
                      </span>
                    </td>

                    {/* Actions: Expediente + Certificado */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => setSelectedStudentForExpediente(st)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-xl text-[11px] transition-colors flex items-center space-x-1 shadow-2xs"
                        >
                          <FileText className="w-3 h-3 text-slate-600" />
                          <span>Ver Expediente</span>
                        </button>

                        <button
                          onClick={() => setSelectedStudentForCert(st)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3 py-1.5 rounded-xl text-[11px] transition-colors flex items-center space-x-1 shadow-2xs"
                        >
                          <QrCode className="w-3 h-3 text-rose-600" />
                          <span>Ver Diploma</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 5. TIMELINE VISUAL DE EVENTOS DE AUDITORÍA (Puntos 9 & 10) ──────── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-900 flex items-center space-x-2">
                <Database className="w-5 h-5 text-rose-600" />
                <span>Línea Temporal de Eventos Inmutables (Append-Only Log)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Historial cronológico con explicación humana y firma criptográfica SHA-256.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Sincronización en Tiempo Real ✓
            </span>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {timelineEvents.map((evt) => (
              <div key={evt.id} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-rose-600 shadow-2xs group-hover:scale-125 transition-transform" />

                <div className="p-4 bg-slate-50 hover:bg-slate-100/80 rounded-2xl border border-slate-200 transition-colors space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-slate-900">{evt.humanTitle}</span>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono">
                        {evt.technicalType}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {evt.date} • {evt.time}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{evt.humanSubtitle}</p>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 gap-2">
                    <span>Módulo: <strong className="text-slate-800 font-medium">{evt.module}</strong></span>
                    <span className="font-mono text-slate-400">IP: {evt.ipHash}</span>
                    <span className="font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                      {evt.signature}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 6. SECCIÓN DE EXPORTACIÓN CONSOLIDADA (Punto 12) ────────────────── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold font-display text-slate-900 flex items-center space-x-2">
                <Download className="w-5 h-5 text-emerald-600" />
                <span>Exportar Expediente Oficial de Inspección</span>
              </h3>
              <p className="text-xs text-slate-500">
                Descarga inmediata del libro completo de eventos, tiempos y notas en formatos estandarizados para auditorías externas.
              </p>
            </div>

            {/* Formats Group */}
            <div className="flex flex-wrap gap-2 shrink-0">
              {(['json', 'csv', 'xlsx', 'pdf'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => handleExport(fmt)}
                  disabled={exporting}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase flex items-center space-x-1.5 transition-all shadow-xs ${
                    selectedFormat === fmt
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <Download className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Exportar {fmt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Export Success Notification */}
          {exportSuccess && exportStats && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  Informe Generado ({selectedFormat.toUpperCase()}) — {exportStats.recordCount} registros auditados
                </span>
                <span className="text-emerald-700 text-[11px]">Última exportación: {exportStats.date}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-200">
                <p className="font-mono text-[10px] text-slate-600 truncate mr-2">
                  Huella Criptográfica SHA-256: {exportStats.fileHash}
                </p>
                <button
                  onClick={() => copyHashToClipboard(exportStats.fileHash)}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 shrink-0 flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedHash ? '¡Copiado!' : 'Copiar Hash'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── MODAL 1: PREVISUALIZACIÓN DE CERTIFICADO QR (Punto 8) ──────────── */}
      {selectedStudentForCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold font-display text-base">
                  Previsualización de Certificado Oficial Digital
                </h3>
              </div>
              <button
                onClick={() => setSelectedStudentForCert(null)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 p-1.5 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Surface */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-4 border-double border-amber-300/80 bg-amber-50/30 p-6 sm:p-8 rounded-2xl text-center space-y-4 relative overflow-hidden">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-0.5 rounded-full border border-rose-200">
                    FABY STUDIO ACADEMY • MADRID & BARCELONA
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 mt-2">
                    DIPLOMA DE ACREDITACIÓN PROFESIONAL
                  </h4>
                  <p className="text-xs text-slate-500">Se otorga el presente reconocimiento oficial a:</p>
                </div>

                <div className="py-2 border-b border-amber-200 max-w-sm mx-auto">
                  <p className="text-2xl font-extrabold font-display text-slate-900 tracking-tight">
                    {selectedStudentForCert.name}
                  </p>
                  <p className="text-xs text-slate-400 font-mono">DNI: {selectedStudentForCert.dni}</p>
                </div>

                <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed">
                  Por haber superado satisfactoriamente el programa formativo de <strong>{selectedStudentForCert.course}</strong> con una carga lectiva activa de <strong>{selectedStudentForCert.activeHours} horas</strong> y una calificación global de <strong>{selectedStudentForCert.gradePractice}/100</strong>.
                </p>

                {/* QR Code + SHA-256 Sign Box */}
                <div className="pt-4 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-white border border-slate-300 rounded-xl p-1 shadow-2xs flex items-center justify-center shrink-0">
                      <QrCode className="w-12 h-12 text-slate-900" />
                    </div>
                    <div className="text-[10px] space-y-0.5 text-slate-500">
                      <p className="font-mono font-bold text-slate-900">{selectedStudentForCert.certCode}</p>
                      <p>Fecha: {selectedStudentForCert.certDate || '15/08/2026'}</p>
                      <p className="text-emerald-700 font-semibold flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Firma SHA-256 Verificada
                      </p>
                    </div>
                  </div>

                  <div className="text-center sm:text-right">
                    <p className="font-display font-bold text-xs text-slate-900">Profesora Faby</p>
                    <p className="text-[10px] text-slate-500">Directora Académica</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Link
                  href={`/verificar-certificado/${selectedStudentForCert.certCode}`}
                  target="_blank"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center space-x-1.5 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir Validador Público QR</span>
                </Link>

                <button
                  onClick={() => setSelectedStudentForCert(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Cerrar Previsualización
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: EXPEDIENTE FORMATIVO INDIVIDUAL (Punto 13) ─────────────── */}
      {selectedStudentForExpediente && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white font-extrabold flex items-center justify-center text-sm">
                  {selectedStudentForExpediente.avatar}
                </div>
                <div>
                  <h3 className="font-bold font-display text-base">
                    Expediente Académico Individual: {selectedStudentForExpediente.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedStudentForExpediente.course} • DNI: {selectedStudentForExpediente.dni}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudentForExpediente(null)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 p-1.5 rounded-xl transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto text-xs">
              {/* Telemetry Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Horas Activas Validadas</span>
                  <p className="text-xl font-extrabold text-emerald-700">{selectedStudentForExpediente.activeHours}h</p>
                  <p className="text-[10px] text-slate-400">{selectedStudentForExpediente.connectedHours}h conectada ({selectedStudentForExpediente.activeRatio}%)</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Progreso Curricular</span>
                  <p className="text-xl font-extrabold text-slate-900">{selectedStudentForExpediente.progress}%</p>
                  <p className="text-[10px] text-slate-400">{selectedStudentForExpediente.modulesCompleted} de {selectedStudentForExpediente.totalModules} módulos completados</p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Tutora Asignada</span>
                  <p className="text-base font-bold text-rose-700">{selectedStudentForExpediente.tutor}</p>
                  <p className="text-[10px] text-slate-400">Matriculada: {selectedStudentForExpediente.enrolledDate}</p>
                </div>
              </div>

              {/* Rubric Breakdown */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                  Desglose de Rúbrica de Práctica Técnica (4 Criterios de 25 Pts)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedStudentForExpediente.rubricBreakdown.map((r, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                      <span className="font-medium text-slate-800">{r.criterion}</span>
                      <span className="font-bold text-rose-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {r.score} / {r.max} pts
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200 text-slate-700">
                  <p className="font-bold text-rose-800 mb-0.5">Devolución de la Tutora:</p>
                  <p className="italic">"{selectedStudentForExpediente.practiceFeedback}"</p>
                </div>
              </div>

              {/* Tutoring Sessions */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b border-slate-100 pb-2">
                  Tutorías Individuales 1 a 1
                </h4>
                <div className="space-y-2">
                  {selectedStudentForExpediente.tutoringSessions.map((tut, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-slate-900">{tut.title}</p>
                        <p className="text-[10px] text-slate-500">{tut.date} • Tutora: {tut.tutor}</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        {tut.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="font-mono text-[10px] text-slate-400">
                ID Expediente: {selectedStudentForExpediente.id}
              </span>
              <button
                onClick={() => setSelectedStudentForExpediente(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors"
              >
                Cerrar Expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 7. FOOTER SAAS PREMIUM (Punto 16) ─────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200 py-10 px-4 sm:px-8 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-bold font-display text-slate-900 text-sm">
              FABY STUDIO ACADEMY — Sistema LMS Homologable
            </p>
            <p className="text-[11px] text-slate-400">
              Plataforma de teleformación estética con trazabilidad inmutable y certificación digital verificable.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold text-slate-600">
            <Link href="/" className="hover:text-slate-900 transition-colors">Inicio</Link>
            <Link href="/campus" className="hover:text-slate-900 transition-colors">Campus Virtual</Link>
            <Link href="/profesor" className="hover:text-slate-900 transition-colors">Panel Docente</Link>
            <Link href="/admin" className="hover:text-slate-900 transition-colors">Administración</Link>
            <Link href="/demo" className="hover:text-slate-900 transition-colors">Role Switcher</Link>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400 space-y-0.5">
            <p className="font-bold text-slate-700">Versión 2.4.0 (Demo Homologable)</p>
            <p>Conforme normativa SEPE / FUNDAE / RGPD</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
