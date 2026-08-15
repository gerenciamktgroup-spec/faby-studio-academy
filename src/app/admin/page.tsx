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
  Download,
  KeyRound,
  AlertCircle,
  Copy,
  Send,
  Calendar,
  X,
  FileText,
  Check
} from 'lucide-react';

interface StudentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  dni: string;
  course: string;
  progress: number;
  activeHours: number;
  tutor: string;
  status: 'active' | 'completed' | 'paused';
  gradeQuiz: number;
  gradePractice: number | null;
  practiceFeedback: string;
  paymentStatus: 'paid_full' | 'installments_ok' | 'installment_late' | 'cash_pending';
  paidAmount: number;
  totalAmount: number;
  lateDays?: number;
  hasKit: boolean;
  enrolledDate: string;
  lastPasswordReset: string;
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
  method: 'card' | 'bizum' | 'klarna' | 'efectivo';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'refunded';
  couponUsed?: string;
  hasOrderBump?: boolean;
}

interface CouponData {
  code: string;
  discount: number;
  type: 'percent' | 'fixed';
  uses: number;
  maxUses: number;
  active: boolean;
  revenueGenerated: number;
  expiresAt: string;
}

export default function AdminPage() {
  // Main Tab Navigation
  const [activeTab, setActiveTab] = useState<'alumnas' | 'cobros' | 'promociones' | 'cursos' | 'certificados' | 'ajustes'>('alumnas');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // State 1: Enriched Student Database
  const [students, setStudents] = useState<StudentData[]>([
    {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Lucía Martínez',
      email: 'lucia.martinez@gmail.com',
      phone: '+34 612 345 678',
      dni: '***5432*B',
      course: 'Curso Profesional de Extensiones de Pestañas',
      progress: 68,
      activeHours: 1.8,
      tutor: 'Laura Gómez',
      status: 'active',
      gradeQuiz: 100,
      gradePractice: 86,
      practiceFeedback: 'Excelente aislamiento en zona central y lagrimal.',
      paymentStatus: 'paid_full',
      paidAmount: 353,
      totalAmount: 353,
      hasKit: true,
      enrolledDate: '01/08/2026',
      lastPasswordReset: 'Nunca',
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      name: 'Camila Torres',
      email: 'camila.torres@gmail.com',
      phone: '+34 655 432 109',
      dni: '***4567*C',
      course: 'Curso Profesional de Extensiones de Pestañas',
      progress: 92,
      activeHours: 50.0,
      tutor: 'Profesora Faby',
      status: 'completed',
      gradeQuiz: 100,
      gradePractice: 95,
      practiceFeedback: 'Proyecto final impecable. Dominio total de abanicos 4D.',
      paymentStatus: 'paid_full',
      paidAmount: 380,
      totalAmount: 380,
      hasKit: true,
      enrolledDate: '15/07/2026',
      lastPasswordReset: 'Nunca',
    },
    {
      id: 'st-3',
      name: 'María López',
      email: 'maria.lopez@gmail.com',
      phone: '+34 688 912 345',
      dni: '***9812*K',
      course: 'Máster Profesional en Uñas de Gel y Acrílico Premium',
      progress: 45,
      activeHours: 18.2,
      tutor: 'Laura Gómez',
      status: 'active',
      gradeQuiz: 90,
      gradePractice: 88,
      practiceFeedback: 'Buena nivelación de ápice con gel constructor.',
      paymentStatus: 'installments_ok',
      paidAmount: 326.66,
      totalAmount: 490,
      hasKit: true,
      enrolledDate: '28/07/2026',
      lastPasswordReset: '05/08/2026',
    },
    {
      id: 'st-4',
      name: 'Elena Ramos',
      email: 'elena.ramos@gmail.com',
      phone: '+34 677 334 112',
      dni: '***3341*P',
      course: 'Curso Superior de Cosmetología Facial y Skin Care',
      progress: 30,
      activeHours: 12.0,
      tutor: 'Profesora Faby',
      status: 'active',
      gradeQuiz: 80,
      gradePractice: null,
      practiceFeedback: 'Pendiente de entrega de fotos de cabina.',
      paymentStatus: 'installment_late',
      paidAmount: 196.66,
      totalAmount: 590,
      lateDays: 6,
      hasKit: false,
      enrolledDate: '05/08/2026',
      lastPasswordReset: 'Nunca',
    },
    {
      id: 'st-5',
      name: 'Sofía Navarro',
      email: 'sofia.navarro@gmail.com',
      phone: '+34 612 778 899',
      dni: '***7789*M',
      course: 'Curso Profesional de Extensiones de Pestañas',
      progress: 15,
      activeHours: 4.5,
      tutor: 'Laura Gómez',
      status: 'paused',
      gradeQuiz: 70,
      gradePractice: null,
      practiceFeedback: 'Sin entregas prácticas.',
      paymentStatus: 'cash_pending',
      paidAmount: 0,
      totalAmount: 353,
      hasKit: true,
      enrolledDate: '02/08/2026',
      lastPasswordReset: 'Nunca',
    },
  ]);

  // State 2: Courses Catalog
  const [courses] = useState<CourseData[]>([
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

  // State 3: Coupons and Promotions
  const [coupons, setCoupons] = useState<CouponData[]>([
    {
      code: 'FABYPRO20',
      discount: 20,
      type: 'percent',
      uses: 14,
      maxUses: 100,
      active: true,
      revenueGenerated: 4256,
      expiresAt: '31/12/2026',
    },
    {
      code: 'VERANO2026',
      discount: 15,
      type: 'percent',
      uses: 22,
      maxUses: 50,
      active: true,
      revenueGenerated: 6120,
      expiresAt: '31/08/2026',
    },
    {
      code: 'LOCALMADRID',
      discount: 50,
      type: 'fixed',
      uses: 8,
      maxUses: 30,
      active: true,
      revenueGenerated: 2720,
      expiresAt: '30/09/2026',
    },
    {
      code: 'BEAUTYVIP',
      discount: 10,
      type: 'percent',
      uses: 5,
      maxUses: 20,
      active: false,
      revenueGenerated: 1480,
      expiresAt: '01/06/2026',
    },
  ]);

  // Modals State
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showNewStudentModal, setShowNewStudentModal] = useState(false);
  const [showNewCouponModal, setShowNewCouponModal] = useState(false);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentDni, setNewStudentDni] = useState('');
  const [newStudentCourse, setNewStudentCourse] = useState('Curso Profesional de Extensiones de Pestañas');
  const [newStudentTutor, setNewStudentTutor] = useState('Laura Gómez');
  const [newStudentPaymentMethod, setNewStudentPaymentMethod] = useState<'card' | 'bizum' | 'klarna' | 'efectivo'>('card');
  const [newStudentHasKit, setNewStudentHasKit] = useState(true);

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(20);
  const [newCouponType, setNewCouponType] = useState<'percent' | 'fixed'>('percent');
  const [newCouponMaxUses, setNewCouponMaxUses] = useState(50);
  const [newCouponExpires, setNewCouponExpires] = useState('31/12/2026');

  // Edit Grade Form State
  const [editQuizGrade, setEditQuizGrade] = useState(100);
  const [editPracticeGrade, setEditPracticeGrade] = useState(86);
  const [editPracticeFeedback, setEditPracticeFeedback] = useState('');

  // Password Generator for Reset Modal
  const [tempPassword, setTempPassword] = useState('Faby2026!#k9L');

  // Filtered Students
  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.dni.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse = filterCourse === 'all' || st.course.toLowerCase().includes(filterCourse.toLowerCase());
    const matchesPayment = filterPayment === 'all' || st.paymentStatus === filterPayment;
    const matchesStatus = filterStatus === 'all' || st.status === filterStatus;

    return matchesSearch && matchesCourse && matchesPayment && matchesStatus;
  });

  // Action: Open Reset Password Modal
  const handleOpenResetPassword = (student: StudentData) => {
    setSelectedStudent(student);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pass = 'Faby2026!';
    for (let i = 0; i < 4; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTempPassword(pass);
    setShowPasswordModal(true);
  };

  // Action: Confirm Reset Password
  const handleConfirmPasswordReset = () => {
    if (!selectedStudent) return;
    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id ? { ...s, lastPasswordReset: 'Hoy (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')' } : s
      )
    );
    setShowPasswordModal(false);
    showToast(`Contraseña de ${selectedStudent.name} restablecida con éxito.`);
  };

  // Action: Open Edit Grade Modal
  const handleOpenGradeModal = (student: StudentData) => {
    setSelectedStudent(student);
    setEditQuizGrade(student.gradeQuiz);
    setEditPracticeGrade(student.gradePractice || 80);
    setEditPracticeFeedback(student.practiceFeedback || '');
    setShowGradeModal(true);
  };

  // Action: Save Grades
  const handleSaveGrades = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              gradeQuiz: Number(editQuizGrade),
              gradePractice: Number(editPracticeGrade),
              practiceFeedback: editPracticeFeedback,
            }
          : s
      )
    );
    setShowGradeModal(false);
    showToast(`Calificaciones de ${selectedStudent.name} actualizadas en expediente.`);
  };

  // Action: Validate Salon Cash Payment
  const handleValidateCashPayment = (studentId: string) => {
    setStudents(
      students.map((s) =>
        s.id === studentId
          ? { ...s, paymentStatus: 'paid_full', paidAmount: s.totalAmount, status: 'active' }
          : s
      )
    );
    showToast('Pago en efectivo validado en caja. Alumna activada en el campus.');
  };

  // Action: Send Payment Reminder
  const handleSendReminder = (student: StudentData, channel: 'whatsapp' | 'email') => {
    if (channel === 'whatsapp') {
      showToast(`Recordatorio de cuota enviado por WhatsApp a ${student.phone}.`);
    } else {
      showToast(`Email de recordatorio de cuota enviado a ${student.email}.`);
    }
  };

  // Action: Create New Student
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail) return;

    let baseAmount = 380;
    if (newStudentCourse.includes('Uñas')) baseAmount = 490;
    if (newStudentCourse.includes('Cosmetología')) baseAmount = 590;
    const finalAmount = baseAmount + (newStudentHasKit ? 49 : 0);

    const newSt: StudentData = {
      id: 'st-' + Date.now(),
      name: newStudentName,
      email: newStudentEmail,
      phone: newStudentPhone || '+34 600 000 000',
      dni: newStudentDni || '***9999*A',
      course: newStudentCourse,
      progress: 0,
      activeHours: 0,
      tutor: newStudentTutor,
      status: 'active',
      gradeQuiz: 0,
      gradePractice: null,
      practiceFeedback: 'Pendiente de inicio de programa.',
      paymentStatus: newStudentPaymentMethod === 'efectivo' ? 'cash_pending' : 'paid_full',
      paidAmount: newStudentPaymentMethod === 'efectivo' ? 0 : finalAmount,
      totalAmount: finalAmount,
      hasKit: newStudentHasKit,
      enrolledDate: 'Hoy',
      lastPasswordReset: 'Inicial',
    };

    setStudents([newSt, ...students]);
    setShowNewStudentModal(false);
    setNewStudentName('');
    setNewStudentEmail('');
    showToast(`Alumna ${newSt.name} matriculada con éxito en el sistema.`);
  };

  // Action: Create New Coupon
  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;

    const newC: CouponData = {
      code: newCouponCode.toUpperCase().trim(),
      discount: Number(newCouponDiscount),
      type: newCouponType,
      uses: 0,
      maxUses: Number(newCouponMaxUses),
      active: true,
      revenueGenerated: 0,
      expiresAt: newCouponExpires,
    };

    setCoupons([newC, ...coupons]);
    setShowNewCouponModal(false);
    setNewCouponCode('');
    showToast(`Cupón ${newC.code} creado y activado.`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const header = 'ID,Nombre,Email,DNI,Curso,Progreso,HorasActivas,Tutora,EstadoPago,MontoPagado,MontoTotal,NotaQuiz,NotaPractica\n';
    const rows = students
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.dni}","${s.course}","${s.progress}%","${s.activeHours}h","${s.tutor}","${s.paymentStatus}","${s.paidAmount}€","${s.totalAmount}€","${s.gradeQuiz}%","${s.gradePractice ? s.gradePractice + '/100' : 'N/A'}"`
      )
      .join('\n');

    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `EXPEDIENTE_ALUMNAS_FABY_STUDIO_${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Informe CSV descargado con éxito.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
              FS
            </div>
            <span className="font-display font-bold text-slate-900 text-base uppercase">
              FABY STUDIO <span className="text-rose-600">ADMIN</span>
            </span>
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-semibold text-slate-500">Panel Integral de Gestión Académica & Financiera</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNewStudentModal(true)}
            className="inline-flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Matricular Alumna</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="hidden sm:inline-flex items-center space-x-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs px-3.5 py-2 rounded-xl font-bold transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-rose-600" />
            <span>Exportar CSV</span>
          </button>

          <Link
            href="/demo"
            className="hidden md:inline-flex items-center space-x-1 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 text-xs px-3.5 py-2 rounded-xl font-bold transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Role Switcher</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        {/* KPI Metrics Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Alumnas Matriculadas</span>
              <Users className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 font-display">{students.length} Activas</p>
            <p className="text-[11px] text-emerald-600 font-semibold">+12% nuevas este mes</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Ingresos Facturados</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 font-display">16.480€</p>
            <p className="text-[11px] text-slate-500">Online + Pagos en Salón</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Cuotas con Retraso</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-amber-600 font-display">
              {students.filter((s) => s.paymentStatus === 'installment_late').length} Pendiente
            </p>
            <p className="text-[11px] text-slate-500">Recordatorios WhatsApp activos</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span className="font-semibold uppercase tracking-wider">Validación en Salón</span>
              <Building2 className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-extrabold text-purple-700 font-display">
              {students.filter((s) => s.paymentStatus === 'cash_pending').length} en Caja
            </p>
            <p className="text-[11px] text-slate-500">Salones Madrid / Barcelona</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 flex space-x-1 text-xs font-bold overflow-x-auto shadow-xs">
          <button
            onClick={() => setActiveTab('alumnas')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'alumnas'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Base de Datos & Calificaciones</span>
          </button>

          <button
            onClick={() => setActiveTab('cobros')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'cobros'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Cobros, Retrasos & Pagos en Salón</span>
          </button>

          <button
            onClick={() => setActiveTab('promociones')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'promociones'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promociones & Cupones</span>
          </button>

          <button
            onClick={() => setActiveTab('cursos')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'cursos'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Catálogo de Másteres</span>
          </button>

          <button
            onClick={() => setActiveTab('certificados')}
            className={`px-4 py-2.5 rounded-xl transition-all flex items-center space-x-1.5 whitespace-nowrap ${
              activeTab === 'certificados'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Auditoría & Diplomas</span>
          </button>
        </div>

        {/* TAB 1: Base de Datos de Alumnas & Calificaciones */}
        {activeTab === 'alumnas' && (
          <div className="space-y-4">
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por alumna, email o DNI..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={filterCourse}
                  onChange={(e) => setFilterCourse(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                >
                  <option value="all">Todos los Cursos</option>
                  <option value="Pestañas">Extensiones de Pestañas</option>
                  <option value="Uñas">Uñas de Gel & Acrílico</option>
                  <option value="Cosmetología">Cosmetología Facial</option>
                </select>

                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
                >
                  <option value="all">Estado de Pago</option>
                  <option value="paid_full">Pagado Completo</option>
                  <option value="installments_ok">En Cuotas al Día</option>
                  <option value="installment_late">Cuota Atrasada</option>
                  <option value="cash_pending">Pendiente en Salón</option>
                </select>

                <button
                  onClick={() => setShowNewStudentModal(true)}
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl font-bold flex items-center space-x-1 shadow-xs transition-colors ml-auto md:ml-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nueva Matrícula</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Alumna / Contacto</th>
                      <th className="py-3.5 px-4">Programa & Tutora</th>
                      <th className="py-3.5 px-4">Progreso / Horas</th>
                      <th className="py-3.5 px-4">Notas (Quiz / Rúbrica)</th>
                      <th className="py-3.5 px-4">Estado Pago</th>
                      <th className="py-3.5 px-4 text-right">Acciones Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs">
                              {st.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{st.name}</p>
                              <p className="text-[11px] text-slate-400">{st.email}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{st.phone} • DNI: {st.dni}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <p className="font-medium text-slate-800 line-clamp-1">{st.course}</p>
                          <span className="text-[10px] text-rose-600 font-semibold">Tutora: {st.tutor}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-bold">
                              <span>{st.progress}%</span>
                              <span className="text-slate-400">{st.activeHours}h</span>
                            </div>
                            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-rose-600 h-full rounded-full"
                                style={{ width: `${st.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5">
                            <p className="text-[11px] text-slate-700 font-semibold">
                              Teoría: <span className="text-emerald-700 font-bold">{st.gradeQuiz}%</span>
                            </p>
                            <p className="text-[11px] text-slate-700 font-semibold">
                              Práctica:{' '}
                              {st.gradePractice !== null ? (
                                <span className="text-rose-700 font-bold">{st.gradePractice} / 100</span>
                              ) : (
                                <span className="text-slate-400 italic">Pendiente</span>
                              )}
                            </p>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {st.paymentStatus === 'paid_full' && (
                            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Pagado Total ({st.paidAmount}€)
                            </span>
                          )}
                          {st.paymentStatus === 'installments_ok' && (
                            <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Cuota 2/3 ({st.paidAmount}€ / {st.totalAmount}€)
                            </span>
                          )}
                          {st.paymentStatus === 'installment_late' && (
                            <span className="bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              <span>Retraso ({st.lateDays}d)</span>
                            </span>
                          )}
                          {st.paymentStatus === 'cash_pending' && (
                            <span className="bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Pendiente Salón
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              onClick={() => handleOpenGradeModal(st)}
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-rose-600 rounded-lg border border-slate-200 transition-colors"
                              title="Editar / Calificar Notas"
                            >
                              <FileCheck className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenResetPassword(st)}
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-amber-600 rounded-lg border border-slate-200 transition-colors"
                              title="Resetear Contraseña de Alumna"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>

                            <Link
                              href={`/profesor/alumnas/${st.id}`}
                              className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200 transition-colors"
                              title="Ver Expediente Completo"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Cobros, Retrasos & Pagos en Salón */}
        {activeTab === 'cobros' && (
          <div className="space-y-6">
            {/* Overdue Installments Management */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Control de Cuotas con Retraso (Cobranzas)
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-semibold">Integrado con Klarna & Notificaciones Automáticas</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3">Alumna</th>
                      <th className="py-2.5 px-3">Teléfono / Email</th>
                      <th className="py-2.5 px-3">Curso</th>
                      <th className="py-2.5 px-3">Monto Pendiente</th>
                      <th className="py-2.5 px-3">Días de Retraso</th>
                      <th className="py-2.5 px-3 text-right">Acción de Recordatorio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students
                      .filter((s) => s.paymentStatus === 'installment_late')
                      .map((s) => (
                        <tr key={s.id}>
                          <td className="py-3 px-3 font-bold text-slate-900">{s.name}</td>
                          <td className="py-3 px-3 text-slate-600">{s.phone} • {s.email}</td>
                          <td className="py-3 px-3 text-slate-700">{s.course}</td>
                          <td className="py-3 px-3 font-bold text-rose-600">{(s.totalAmount - s.paidAmount).toFixed(2)}€</td>
                          <td className="py-3 px-3">
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                              {s.lateDays} días
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => handleSendReminder(s, 'whatsapp')}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1"
                              >
                                <Smartphone className="w-3.5 h-3.5" />
                                <span>WhatsApp</span>
                              </button>
                              <button
                                onClick={() => handleSendReminder(s, 'email')}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
                              >
                                <Mail className="w-3.5 h-3.5" />
                                <span>Email</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* In-Person Cash Reservations (Salons Madrid / Barcelona) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-purple-600" />
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Matrículas con Pago en Efectivo en Salones Faby Studio
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-semibold">Validación en Caja de Salón Central</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3">Código de Reserva</th>
                      <th className="py-2.5 px-3">Alumna</th>
                      <th className="py-2.5 px-3">Curso & Kit</th>
                      <th className="py-2.5 px-3">Monto en Caja</th>
                      <th className="py-2.5 px-3">Sede Elegida</th>
                      <th className="py-2.5 px-3 text-right">Validación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students
                      .filter((s) => s.paymentStatus === 'cash_pending')
                      .map((s) => (
                        <tr key={s.id}>
                          <td className="py-3 px-3 font-mono font-bold text-purple-700">RESERVA-FS-8812</td>
                          <td className="py-3 px-3 font-bold text-slate-900">{s.name} ({s.phone})</td>
                          <td className="py-3 px-3 text-slate-700">{s.course} {s.hasKit ? '+ Kit Físico' : ''}</td>
                          <td className="py-3 px-3 font-extrabold text-slate-900">{s.totalAmount}€</td>
                          <td className="py-3 px-3 text-slate-600">Serrano 45, Madrid</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleValidateCashPayment(s.id)}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 ml-auto"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Validar Pago en Caja</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Promociones & Cupones */}
        {activeTab === 'promociones' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">Cupones de Descuento & Promociones</h3>
                <p className="text-xs text-slate-500">Crea y gestiona códigos promocionales aplicables en el checkout web.</p>
              </div>

              <button
                onClick={() => setShowNewCouponModal(true)}
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5 self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Nuevo Cupón</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold border-b border-slate-200">
                      <th className="py-3.5 px-4">Código Cupón</th>
                      <th className="py-3.5 px-4">Descuento</th>
                      <th className="py-3.5 px-4">Usos Realizados</th>
                      <th className="py-3.5 px-4">Facturación Generada</th>
                      <th className="py-3.5 px-4">Caducidad</th>
                      <th className="py-3.5 px-4">Estado</th>
                      <th className="py-3.5 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {coupons.map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 flex items-center space-x-1.5">
                          <Tag className="w-3.5 h-3.5 text-rose-600" />
                          <span>{c.code}</span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-rose-700">
                          {c.discount}{c.type === 'percent' ? '%' : '€'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-700">
                          {c.uses} / {c.maxUses}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-emerald-700">
                          {c.revenueGenerated}€
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{c.expiresAt}</td>
                        <td className="py-3.5 px-4">
                          {c.active ? (
                            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                              Activo
                            </span>
                          ) : (
                            <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded">
                              Pausado
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setCoupons(
                                coupons.map((item, i) =>
                                  i === idx ? { ...item, active: !item.active } : item
                                )
                              );
                              showToast(`Estado de ${c.code} modificado.`);
                            }}
                            className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                          >
                            {c.active ? 'Pausar' : 'Reactivar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Catálogo de Másteres */}
        {activeTab === 'cursos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">Catálogo de Programas Activos</h3>
                <p className="text-xs text-slate-500">Administra los precios, horas formativas y dossiers descargables.</p>
              </div>
              <Link
                href="/profesor/cursos/nuevo"
                className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Nuevo Máster</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                      {c.category}
                    </span>
                    <span className="text-lg font-extrabold text-slate-900">{c.price}€</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 leading-snug">{c.title}</h4>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{c.studentsCount} Alumnas</span>
                    <span>{c.hours}h Lectivas</span>
                    <span className="text-emerald-700 font-bold">Publicado ✓</span>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Link
                      href={c.id === 'c1' ? '/cursos/extensiones-de-pestanas/dossier' : c.id === 'c2' ? '/cursos/unas-de-gel-y-acrilico/dossier' : '/cursos/cosmetologia-facial/dossier'}
                      target="_blank"
                      className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 py-2 rounded-xl text-xs font-semibold text-center transition-colors flex items-center justify-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5 text-rose-600" />
                      <span>Ver Dossier PDF</span>
                    </Link>

                    <Link
                      href={`/campus/cursos/${c.id === 'c1' ? 'c1000000-0000-0000-0000-000000000001' : c.id === 'c2' ? 'c2000000-0000-0000-0000-000000000002' : 'c3000000-0000-0000-0000-000000000003'}`}
                      className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center"
                    >
                      <span>Player LMS</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Certificados & Auditoría */}
        {activeTab === 'certificados' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Trazabilidad 100% Homologable
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 mt-2">
                  Portal de Verificación & Auditoría Oficial
                </h3>
              </div>

              <Link
                href="/auditoria"
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-xs"
              >
                <span>Inspeccionar Matriz Oficial (9/9)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Todos los accesos, tiempos de conexión cada 45 segundos, intentos de examen y emisiones de certificados se registran de forma inmutable con criptografía SHA-256 para cumplir con las exigencias del SEPE, FUNDAE y el RGPD.
            </p>
          </div>
        )}
      </main>

      {/* MODAL 1: Reset Password */}
      {showPasswordModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <KeyRound className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-sm">Resetear Contraseña de Alumna</h3>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="text-slate-700 font-bold">{selectedStudent.name}</p>
              <p className="text-slate-500 text-[11px]">{selectedStudent.email} • DNI: {selectedStudent.dni}</p>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-700 font-bold">Nueva Contraseña Temporal Segura:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={tempPassword}
                  className="flex-1 bg-slate-50 border border-slate-300 font-mono font-bold text-slate-900 text-sm px-3.5 py-2.5 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(tempPassword);
                    showToast('Contraseña temporal copiada al portapapeles.');
                  }}
                  className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 shadow-xs"
                  title="Copiar contraseña"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleConfirmPasswordReset}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl transition-colors shadow-xs flex items-center justify-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar Reseteo & Notificar</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Edit Grades */}
      {showGradeModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Expediente de Calificaciones</h3>
              </div>
              <button
                onClick={() => setShowGradeModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveGrades} className="space-y-4">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <p className="font-bold text-slate-900">{selectedStudent.name}</p>
                <p className="text-[11px] text-slate-500">{selectedStudent.course}</p>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Nota Evaluación Teórica (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editQuizGrade}
                  onChange={(e) => setEditQuizGrade(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Nota Práctica en Rúbrica (/100):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editPracticeGrade}
                  onChange={(e) => setEditPracticeGrade(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">Devolución / Feedback Pedagógico:</label>
                <textarea
                  rows={3}
                  value={editPracticeFeedback}
                  onChange={(e) => setEditPracticeFeedback(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl shadow-xs"
                >
                  Guardar Calificaciones
                </button>
                <button
                  type="button"
                  onClick={() => setShowGradeModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: New Student Manual Enrollment */}
      {showNewStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Matricular Nueva Alumna Directamente</h3>
              </div>
              <button
                onClick={() => setShowNewStudentModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Nombre Completo:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Carmen Navarro"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="carmen@gmail.com"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Teléfono WhatsApp:</label>
                  <input
                    type="text"
                    placeholder="+34 600 123 456"
                    value={newStudentPhone}
                    onChange={(e) => setNewStudentPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">DNI / NIE:</label>
                  <input
                    type="text"
                    placeholder="12345678Z"
                    value={newStudentDni}
                    onChange={(e) => setNewStudentDni(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Programa Formativo:</label>
                <select
                  value={newStudentCourse}
                  onChange={(e) => setNewStudentCourse(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium"
                >
                  <option value="Curso Profesional de Extensiones de Pestañas">
                    Curso Profesional de Extensiones de Pestañas (380€)
                  </option>
                  <option value="Máster Profesional en Uñas de Gel y Acrílico Premium">
                    Máster Profesional en Uñas de Gel y Acrílico Premium (490€)
                  </option>
                  <option value="Curso Superior de Cosmetología Facial y Skin Care">
                    Curso Superior de Cosmetología Facial y Skin Care (590€)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Tutora Asignada:</label>
                  <select
                    value={newStudentTutor}
                    onChange={(e) => setNewStudentTutor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium"
                  >
                    <option value="Laura Gómez">Laura Gómez (Especialista)</option>
                    <option value="Profesora Faby">Profesora Faby (Dirección)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Método de Pago:</label>
                  <select
                    value={newStudentPaymentMethod}
                    onChange={(e) => setNewStudentPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 font-medium"
                  >
                    <option value="card">Tarjeta de Crédito Online</option>
                    <option value="bizum">Bizum Inmediato</option>
                    <option value="klarna">Klarna en 3 Cuotas</option>
                    <option value="efectivo">Efectivo en Salón (Pendiente)</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center space-x-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newStudentHasKit}
                  onChange={(e) => setNewStudentHasKit(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="font-semibold text-slate-800">
                  Incluir Kit Físico Oficial FABY STUDIO (+49€)
                </span>
              </label>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-xs"
                >
                  Registrar Matrícula & Crear Cuenta
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewStudentModal(false)}
                  className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: New Coupon */}
      {showNewCouponModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">Crear Nuevo Cupón de Descuento</h3>
              </div>
              <button
                onClick={() => setShowNewCouponModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Código del Cupón (Mayúsculas):</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. BLACKFRIDAY30"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono font-bold text-slate-900 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Descuento:</label>
                  <input
                    type="number"
                    min="1"
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Tipo:</label>
                  <select
                    value={newCouponType}
                    onChange={(e) => setNewCouponType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                  >
                    <option value="percent">Porcentaje (%)</option>
                    <option value="fixed">Monto Fijo (€)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Límite de Usos:</label>
                  <input
                    type="number"
                    min="1"
                    value={newCouponMaxUses}
                    onChange={(e) => setNewCouponMaxUses(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-bold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Fecha de Expiración:</label>
                  <input
                    type="text"
                    value={newCouponExpires}
                    onChange={(e) => setNewCouponExpires(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl shadow-xs"
                >
                  Activar Cupón
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCouponModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
