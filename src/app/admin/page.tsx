'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Award,
  BookOpen,
  DollarSign,
  FileCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  Lock,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Settings,
  ShieldCheck,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Tag,
  CreditCard,
  UserCheck,
  ExternalLink,
  ChevronDown,
  Layers,
  BarChart3,
  Sliders,
  Mail,
  Smartphone,
  Building2,
  Download
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  email: string;
  dni: string;
  course: string;
  progress: number;
  activeHours: number;
  tutor: string;
  status: 'active' | 'completed' | 'paused';
  enrolledDate: string;
}

interface CourseData {
  id: string;
  title: string;
  category: string;
  price: number;
  studentsCount: number;
  hours: number;
  status: 'published' | 'draft';
  rating: number;
}

interface TransactionData {
  id: string;
  studentName: string;
  courseTitle: string;
  method: 'card' | 'bizum' | 'klarna';
  amount: number;
  date: string;
  status: 'completed' | 'refunded';
  couponUsed?: string;
  hasOrderBump?: boolean;
}

export default function AdminPage() {
  // Main Tab Navigation
  const [activeTab, setActiveTab] = useState<'alumnas' | 'cursos' | 'finanzas' | 'docentes' | 'certificados' | 'ajustes'>('alumnas');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State 1: Students & Enrollments
  const [students, setStudents] = useState<StudentData[]>([
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Lucía Martínez',
      email: 'lucia.martinez@gmail.com',
      dni: '***5432*B',
      course: 'Curso Profesional de Extensiones de Pestañas',
      progress: 68,
      activeHours: 1.8,
      tutor: 'Laura Gómez',
      status: 'active',
      enrolledDate: '01/08/2026',
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Camila Torres',
      email: 'camila.torres@gmail.com',
      dni: '***4567*C',
      course: 'Curso Profesional de Extensiones de Pestañas',
      progress: 92,
      activeHours: 50.0,
      tutor: 'Profesora Faby',
      status: 'completed',
      enrolledDate: '15/07/2026',
    },
    {
      id: 'st-3',
      name: 'María López',
      email: 'maria.lopez@gmail.com',
      dni: '***9812*K',
      course: 'Máster en Uñas de Gel & Acrílico Premium',
      progress: 45,
      activeHours: 18.2,
      tutor: 'Laura Gómez',
      status: 'active',
      enrolledDate: '28/07/2026',
    },
    {
      id: 'st-4',
      name: 'Elena Ramos',
      email: 'elena.ramos@gmail.com',
      dni: '***3341*P',
      course: 'Curso Superior de Cosmetología Facial',
      progress: 30,
      activeHours: 12.0,
      tutor: 'Profesora Faby',
      status: 'active',
      enrolledDate: '05/08/2026',
    },
    {
      id: 'st-5',
      name: 'Sofía Navarro',
      email: 'sofia.navarro@gmail.com',
      dni: '***7789*M',
      course: 'Curso Profesional de Extensiones de Pestañas',
      progress: 15,
      activeHours: 4.5,
      tutor: 'Laura Gómez',
      status: 'paused',
      enrolledDate: '02/08/2026',
    },
  ]);

  // Modal: New Student
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('Curso Profesional de Extensiones de Pestañas');
  const [newStudentTutor, setNewStudentTutor] = useState('Laura Gómez');

  // State 2: Courses Management
  const [courses, setCourses] = useState<CourseData[]>([
    {
      id: 'c1',
      title: 'Curso Profesional de Extensiones de Pestañas',
      category: 'Mirada & Pestañas',
      price: 380,
      studentsCount: 42,
      hours: 50,
      status: 'published',
      rating: 4.9,
    },
    {
      id: 'c2',
      title: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
      category: 'Uñas & Manicura',
      price: 490,
      studentsCount: 28,
      hours: 60,
      status: 'published',
      rating: 4.95,
    },
    {
      id: 'c3',
      title: 'Curso Superior de Cosmetología Facial y Skin Care',
      category: 'Cosmetología',
      price: 590,
      studentsCount: 19,
      hours: 80,
      status: 'published',
      rating: 4.88,
    },
  ]);

  // State 3: Transactions & Coupons
  const [transactions, setTransactions] = useState<TransactionData[]>([
    {
      id: 'TRX-99881',
      studentName: 'Lucía Martínez',
      courseTitle: 'Curso Profesional de Extensiones de Pestañas',
      method: 'card',
      amount: 353,
      date: '01/08/2026 14:32',
      status: 'completed',
      couponUsed: 'FABYPRO20',
      hasOrderBump: true,
    },
    {
      id: 'TRX-99882',
      studentName: 'Camila Torres',
      courseTitle: 'Curso Profesional de Extensiones de Pestañas',
      method: 'klarna',
      amount: 380,
      date: '15/07/2026 09:15',
      status: 'completed',
    },
    {
      id: 'TRX-99883',
      studentName: 'María López',
      courseTitle: 'Máster en Uñas de Gel & Acrílico Premium',
      method: 'bizum',
      amount: 490,
      date: '28/07/2026 18:40',
      status: 'completed',
    },
  ]);

  const [coupons, setCoupons] = useState([
    { code: 'FABYPRO20', discount: 20, uses: 14, maxUses: 100, active: true },
    { code: 'BEAUTYVIP50', discount: 50, uses: 5, maxUses: 20, active: true },
    { code: 'VERANO10', discount: 10, uses: 28, maxUses: 50, active: false },
  ]);

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(25);

  // State 4: Cash Payments in Studios
  const [cashReservations, setCashReservations] = useState([
    {
      id: 'RESERVA-FS-8812',
      studentName: 'Sofía Navarro',
      email: 'sofia.navarro@gmail.com',
      phone: '612 778 899',
      course: 'Curso Profesional de Extensiones de Pestañas',
      amount: 353,
      studio: 'Estudio Central Serrano 45, Madrid',
      date: 'Hoy (Pendiente en Recepción)',
      status: 'pending' as 'pending' | 'validated',
    },
  ]);

  const handleValidateCashPayment = (resId: string) => {
    setCashReservations(
      cashReservations.map((r) => (r.id === resId ? { ...r, status: 'validated' } : r))
    );
    showToast(`¡Pago en efectivo de ${resId} validado en local! Acceso al campus activado.`);
  };

  const handleExportCSV = () => {
    const headers = ['ID,Alumna,Metodo,Importe,Cupon,OrderBump,Fecha,Estado'];
    const rows = transactions.map(
      (t) =>
        `${t.id},"${t.studentName}",${t.method},${t.amount},${t.couponUsed || 'N/A'},${t.hasOrderBump ? 'SI' : 'NO'},"${t.date}",${t.status}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `transacciones_faby_studio_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('¡Archivo CSV de transacciones exportado con éxito!');
  };

  // State 5: Certificates
  const [certificates, setCertificates] = useState([
    {
      code: 'CERT-FS-DEMO-9988',
      studentName: 'Camila Torres',
      course: 'Curso Profesional de Extensiones de Pestañas',
      issueDate: '08/08/2026',
      grade: '92%',
      status: 'issued',
    },
  ]);

  // Handlers
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    const newSt: StudentData = {
      id: 'st-' + Date.now(),
      name: newStudentName.trim(),
      email: newStudentEmail.trim(),
      dni: '***' + Math.floor(1000 + Math.random() * 9000) + '*Z',
      course: newStudentCourse,
      progress: 0,
      activeHours: 0.0,
      tutor: newStudentTutor,
      status: 'active',
      enrolledDate: 'Hoy (' + new Date().toLocaleDateString() + ')',
    };

    setStudents([newSt, ...students]);
    setShowNewStudentModal(false);
    setNewStudentName('');
    setNewStudentEmail('');
    showToast(`¡Alumna ${newSt.name} matriculada y asignada a ${newSt.tutor}!`);
  };

  const handleToggleCourseStatus = (id: string) => {
    setCourses(
      courses.map((c) =>
        c.id === id ? { ...c, status: c.status === 'published' ? 'draft' : 'published' } : c
      )
    );
    showToast('Estado del curso actualizado.');
  };

  const handleToggleStudentStatus = (id: string) => {
    setStudents(
      students.map((s) => {
        if (s.id === id) {
          const next = s.status === 'active' ? 'paused' : s.status === 'paused' ? 'completed' : 'active';
          return { ...s, status: next };
        }
        return s;
      })
    );
    showToast('Estado de la matrícula actualizado.');
  };

  const handleReassignTutor = (id: string, newTutor: string) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, tutor: newTutor } : s))
    );
    showToast(`Tutora reasignada a ${newTutor}.`);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCoupons([
      {
        code: newCouponCode.trim().toUpperCase(),
        discount: newCouponDiscount,
        uses: 0,
        maxUses: 50,
        active: true,
      },
      ...coupons,
    ]);
    setNewCouponCode('');
    showToast(`¡Cupón ${newCouponCode.toUpperCase()} activado!`);
  };

  const handleIssueCertificate = (student: StudentData) => {
    const code = `CERT-FS-${Math.floor(1000 + Math.random() * 9000)}`;
    setCertificates([
      {
        code,
        studentName: student.name,
        course: student.course,
        issueDate: new Date().toLocaleDateString(),
        grade: `${student.progress}%`,
        status: 'issued',
      },
      ...certificates,
    ]);
    showToast(`¡Certificado oficial ${code} emitido con QR y SHA-256 para ${student.name}!`);
  };

  // Filtered Students List
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.dni.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === 'all' || s.course.includes(filterCourse);
    const matchesStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              FS
            </div>
            <div>
              <span className="font-display font-bold text-slate-900 text-base uppercase block leading-none">
                FABY STUDIO <span className="text-rose-600">ADMIN</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                CENTRO DE CONTROL EJECUTIVO & ACADÉMICO
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/auditoria"
            className="bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 text-xs px-3.5 py-2 rounded-xl font-bold transition-all flex items-center space-x-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Portal de Auditoría Forense</span>
          </Link>
          <Link
            href="/demo"
            className="bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs px-3.5 py-2 rounded-xl font-bold transition-all flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Role Switcher Demo</span>
          </Link>
        </div>
      </header>

      {/* Main Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl text-xs font-bold shadow-2xl flex items-center space-x-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Global Key Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Facturación Total (Sandbox)</span>
              <DollarSign className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 font-display">15.960 €</p>
            <p className="text-[11px] text-emerald-700 font-semibold">+24% vs mes anterior</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Total Alumnas</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-3xl font-extrabold text-slate-900 font-display">{students.length} Activas</p>
            <p className="text-[11px] text-slate-500">En 3 programas formativos</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Horas Activas Validadas</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-3xl font-extrabold text-emerald-700 font-display">1.840h</p>
            <p className="text-[11px] text-slate-500">Trazabilidad Heartbeat 100%</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Tasa de Graduación</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-3xl font-extrabold text-rose-600 font-display">74.5%</p>
            <p className="text-[11px] text-slate-500">Rúbrica aprobada ≥ 70/100</p>
          </div>
        </div>

        {/* Admin Hub Navigation Tabs */}
        <div className="flex border-b border-slate-200 space-x-2 sm:space-x-4 overflow-x-auto text-xs font-bold pb-px">
          <button
            onClick={() => setActiveTab('alumnas')}
            className={`pb-3.5 px-3 transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
              activeTab === 'alumnas'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Alumnas & Matrículas ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cursos')}
            className={`pb-3.5 px-3 transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
              activeTab === 'cursos'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Catálogo de Cursos ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('finanzas')}
            className={`pb-3.5 px-3 transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
              activeTab === 'finanzas'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Finanzas & Cupones ({transactions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('docentes')}
            className={`pb-3.5 px-3 transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
              activeTab === 'docentes'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Claustro Docente</span>
          </button>

          <button
            onClick={() => setActiveTab('certificados')}
            className={`pb-3.5 px-3 transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
              activeTab === 'certificados'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificados QR & SHA-256</span>
          </button>

          <button
            onClick={() => setActiveTab('ajustes')}
            className={`pb-3.5 px-3 transition-all flex items-center space-x-2 border-b-2 whitespace-nowrap ${
              activeTab === 'ajustes'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Ajustes & Sistema</span>
          </button>
        </div>

        {/* TAB 1: ALUMNAS & MATRÍCULAS */}
        {activeTab === 'alumnas' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-slate-900">
                    Directorio y Control de Matrículas
                  </h2>
                  <p className="text-xs text-slate-500">
                    Administra el acceso al campus, tiempos lectivos validados y asignaciones de tutora.
                  </p>
                </div>

                <button
                  onClick={() => setShowNewStudentModal(true)}
                  className="bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center space-x-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Matricular Nueva Alumna</span>
                </button>
              </div>

              {/* Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre, email o DNI..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                >
                  <option value="all">Todos los Cursos</option>
                  <option value="Extensiones">Extensiones de Pestañas</option>
                  <option value="Uñas">Uñas de Gel & Acrílico</option>
                  <option value="Cosmetología">Cosmetología Facial</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-rose-500"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="active">Activa</option>
                  <option value="completed">Completada</option>
                  <option value="paused">Pausada</option>
                </select>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Alumna & Contacto</th>
                      <th className="py-3 px-4">Curso Matriculado</th>
                      <th className="py-3 px-4">Progreso</th>
                      <th className="py-3 px-4">Tiempo Activo</th>
                      <th className="py-3 px-4">Tutora Asignada</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4 text-right">Acciones Directas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-slate-900">{st.name}</p>
                          <p className="text-[11px] text-slate-400">{st.email} • {st.dni}</p>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-800 max-w-xs truncate">
                          {st.course}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{st.progress}%</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700">{st.activeHours}h</td>
                        <td className="py-3.5 px-4">
                          <select
                            value={st.tutor}
                            onChange={(e) => handleReassignTutor(st.id, e.target.value)}
                            className="bg-white border border-slate-200 text-[11px] rounded-lg px-2 py-1 text-slate-800 font-semibold focus:outline-none focus:border-rose-500"
                          >
                            <option value="Laura Gómez">Laura Gómez</option>
                            <option value="Profesora Faby">Profesora Faby</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleStudentStatus(st.id)}
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                              st.status === 'active'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                : st.status === 'completed'
                                ? 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                            }`}
                          >
                            {st.status === 'active' ? 'ACTIVA' : st.status === 'completed' ? 'GRADUADA' : 'PAUSADA'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-1.5">
                          <Link
                            href={`/profesor/alumnas/${st.id}`}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-lg text-[11px] font-bold inline-block transition-colors"
                          >
                            Expediente
                          </Link>
                          {st.progress >= 70 && (
                            <button
                              onClick={() => handleIssueCertificate(st)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-lg text-[11px] font-bold inline-block transition-colors"
                            >
                              Emitir Certificado
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATÁLOGO DE CURSOS */}
        {activeTab === 'cursos' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold font-display text-slate-900">
                    Catálogo y Planes de Estudio
                  </h2>
                  <p className="text-xs text-slate-500">
                    Controla precios oficiales, visibilidad pública y creación de nuevos másteres.
                  </p>
                </div>

                <Link
                  href="/profesor/cursos/nuevo"
                  className="bg-gradient-to-r from-fabi-pink to-fabi-darkpink hover:from-fabi-darkpink hover:to-fabi-pink text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-rose-600/20 transition-all flex items-center space-x-1.5 self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Constructor de Nuevo Máster</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {courses.map((course) => (
                  <div key={course.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 uppercase">
                          {course.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          course.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {course.status === 'published' ? 'PUBLICADO' : 'BORRADOR'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-display leading-snug">{course.title}</h3>
                      <p className="text-xs text-slate-500">{course.hours} horas lectivas • {course.studentsCount} alumnas matriculadas</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Precio Oficial</span>
                        <span className="text-xl font-extrabold text-slate-900">{course.price} €</span>
                      </div>

                      <button
                        onClick={() => handleToggleCourseStatus(course.id)}
                        className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-2xs"
                      >
                        {course.status === 'published' ? 'Despublicar' : 'Publicar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FINANZAS & CUPONES */}
        {activeTab === 'finanzas' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Transactions */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold font-display text-slate-900">
                  Registro de Transacciones & Pasarelas (Sandbox)
                </h2>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-rose-600" />
                  <span>Exportar CSV</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">ID Transacción</th>
                      <th className="py-2.5 px-3">Alumna</th>
                      <th className="py-2.5 px-3">Método</th>
                      <th className="py-2.5 px-3">Total</th>
                      <th className="py-2.5 px-3">Cupón / Extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((trx) => (
                      <tr key={trx.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-900">{trx.id}</td>
                        <td className="py-3 px-3">{trx.studentName}</td>
                        <td className="py-3 px-3 uppercase font-bold text-slate-700">{trx.method}</td>
                        <td className="py-3 px-3 font-extrabold text-slate-900">{trx.amount} €</td>
                        <td className="py-3 px-3 text-[11px]">
                          {trx.couponUsed && (
                            <span className="text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded font-mono font-bold mr-1">
                              {trx.couponUsed}
                            </span>
                          )}
                          {trx.hasOrderBump && (
                            <span className="text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                              +Kit Pinzas
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cash in Studio Validations */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-amber-900 flex items-center space-x-1.5">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>Validación de Pagos en Efectivo en Locales Físicos</span>
                  </h3>
                  <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded font-bold">
                    Caja / Recepción
                  </span>
                </div>

                <div className="space-y-2">
                  {cashReservations.map((cr) => (
                    <div
                      key={cr.id}
                      className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-amber-900">{cr.id}</span>
                          <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                            cr.status === 'validated'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {cr.status === 'validated' ? 'COBRADO EN LOCAL ✓' : 'PENDIENTE EN RECEPCIÓN'}
                          </span>
                        </div>
                        <p className="font-bold text-slate-900">{cr.studentName} — {cr.amount} €</p>
                        <p className="text-[11px] text-slate-500">{cr.studio} • Tel: {cr.phone}</p>
                      </div>

                      {cr.status === 'pending' ? (
                        <button
                          onClick={() => handleValidateCashPayment(cr.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs shadow-xs transition-colors shrink-0"
                        >
                          Confirmar Cobro en Caja
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-xs flex items-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Matrícula Activada
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Coupon Creator */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-base font-bold font-display text-slate-900 border-b border-slate-100 pb-3">
                Motor de Cupones de Descuento
              </h2>

              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Código del Cupón</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="Ej. BEAUTY30"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 uppercase font-mono focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Porcentaje de Descuento ({newCouponDiscount}%)</label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full accent-rose-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors"
                >
                  Crear y Activar Cupón
                </button>
              </form>

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cupones Existentes:</p>
                {coupons.map((c) => (
                  <div key={c.code} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-mono font-bold text-slate-900">{c.code} (-{c.discount}%)</p>
                      <p className="text-[10px] text-slate-400">{c.uses} de {c.maxUses} canjes</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                      {c.active ? 'ACTIVO' : 'EXPIRADO'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CLAUSTRO DOCENTE */}
        {activeTab === 'docentes' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold font-display text-slate-900 border-b border-slate-100 pb-4">
              Gestión del Claustro Docente & Carga Lectiva
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 font-bold text-base flex items-center justify-center border border-rose-200">
                    PF
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Profesora Faby</h3>
                    <p className="text-xs text-rose-600 font-semibold">Directora Académica & Creadora de Contenido</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p>• <strong>24 Alumnas</strong> bajo supervisión directa</p>
                  <p>• Especialidad: Uñas Esculpidas, Volumen Ruso Avanzado y Cosmetología</p>
                  <p>• Ratio de Aprobación en Rúbrica: <strong>94.2%</strong></p>
                </div>
                <Link
                  href="/profesor"
                  className="block text-center w-full bg-white border border-slate-200 hover:border-rose-300 text-slate-800 font-bold py-2 rounded-xl text-xs transition-colors shadow-2xs"
                >
                  Abrir Panel Docente Faby →
                </Link>
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 font-bold text-base flex items-center justify-center border border-purple-200">
                    LG
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Laura Gómez</h3>
                    <p className="text-xs text-purple-600 font-semibold">Tutora Académica Especialista 1 a 1</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p>• <strong>18 Alumnas</strong> asignadas activamente</p>
                  <p>• Especialidad: Extensiones de Pestañas Técnica Clásica y Bioseguridad</p>
                  <p>• Tiempo promedio de respuesta en mensajes: <strong>1.4 horas</strong></p>
                </div>
                <Link
                  href="/profesor/evaluar-practica/1"
                  className="block text-center w-full bg-white border border-slate-200 hover:border-rose-300 text-slate-800 font-bold py-2 rounded-xl text-xs transition-colors shadow-2xs"
                >
                  Ver Rúbricas Evaluadas por Laura →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CERTIFICADOS QR & SHA-256 */}
        {activeTab === 'certificados' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold font-display text-slate-900">
                  Acreditaciones Oficiales Emitidas
                </h2>
                <p className="text-xs text-slate-500">
                  Diplomas protegidos con firma hash SHA-256 inmutable y código QR de validación pública.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {certificates.map((c) => (
                <div key={c.code} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-rose-600 text-sm">{c.code}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        Emitido & Verificable
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 mt-1">{c.studentName} — {c.course}</p>
                    <p className="text-[11px] text-slate-400">Fecha: {c.issueDate} • Nota Final: {c.grade}</p>
                  </div>

                  <Link
                    href={`/verificar-certificado/${c.code}`}
                    target="_blank"
                    className="bg-white border border-slate-200 hover:border-emerald-500 text-emerald-800 px-3.5 py-2 rounded-xl font-bold transition-colors flex items-center space-x-1.5 shadow-2xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verificar Página Pública QR</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: AJUSTES & SISTEMA */}
        {activeTab === 'ajustes' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold font-display text-slate-900 border-b border-slate-100 pb-3">
              Configuración del Entorno Académico & Políticas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                  Parámetros de Active Learning (Heartbeat)
                </h3>
                <p>Frecuencia de pulso de interacción: <strong>45 segundos</strong>.</p>
                <p>Umbral mínimo de tiempo activo para certificar: <strong>70% de las horas totales</strong>.</p>
                <p className="text-emerald-700 font-semibold">✓ Trazabilidad en tiempo real conectada con PostgreSQL 15.</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <h3 className="font-bold text-slate-900 text-sm flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-rose-600" />
                  Seguridad & Base de Datos Inmutable
                </h3>
                <p>Políticas de Acceso: <strong>Row Level Security (RLS)</strong> activo.</p>
                <p>Auditoría: Registro <strong>Append-Only</strong> con IP anonimizada.</p>
                <Link
                  href="/auditoria"
                  className="inline-flex items-center space-x-1 font-bold text-rose-600 hover:underline pt-1"
                >
                  <span>Exportar Informes Oficiales en PDF / CSV / JSON →</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Modal: New Student Registration */}
        {showNewStudentModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative text-xs">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-display">Matricular Nueva Alumna</h3>
                <button
                  onClick={() => setShowNewStudentModal(false)}
                  className="text-slate-400 hover:text-slate-700 font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateStudent} className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Nombre y Apellidos</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Ej. Andrea Morales"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    placeholder="andrea.morales@gmail.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Programa Formativo</label>
                  <select
                    value={newStudentCourse}
                    onChange={(e) => setNewStudentCourse(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                  >
                    <option value="Curso Profesional de Extensiones de Pestañas">Curso Profesional de Extensiones de Pestañas (50h)</option>
                    <option value="Máster en Uñas de Gel & Acrílico Premium">Máster en Uñas de Gel & Acrílico Premium (60h)</option>
                    <option value="Curso Superior de Cosmetología Facial">Curso Superior de Cosmetología Facial (80h)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tutora Asignada</label>
                  <select
                    value={newStudentTutor}
                    onChange={(e) => setNewStudentTutor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                  >
                    <option value="Laura Gómez">Laura Gómez (Especialista en Pestañas)</option>
                    <option value="Profesora Faby">Profesora Faby (Dirección Académica)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-fabi-pink to-fabi-darkpink text-white py-3 rounded-xl font-bold shadow-md shadow-rose-600/20 transition-all hover:scale-[1.01]"
                >
                  Confirmar Matrícula & Generar Credenciales
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
