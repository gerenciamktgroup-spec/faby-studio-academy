/**
 * FABY STUDIO ACADEMY — Demo Auth System
 * Sistema de autenticación demo basado en localStorage.
 * Simula Supabase Auth para la presentación comercial sin necesidad de .env.
 * Rechaza credenciales inválidas y soporta registro de nuevas alumnas.
 */

const SESSION_KEY = 'faby_session';
const ACCOUNTS_KEY = 'faby_accounts';

export type UserRole = 'alumna' | 'profesor' | 'admin';

export interface DemoUser {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  course?: string;
  registeredAt?: string;
}

export interface DemoSession {
  user: DemoUser;
  token: string;
  expiresAt: number;
}

export interface AuthResult {
  success: boolean;
  session?: DemoSession;
  error?: string;
}

// ─── Cuentas Demo Oficiales (siempre disponibles) ───────────────────────────
const OFFICIAL_DEMO_ACCOUNTS: Array<DemoUser & { password: string }> = [
  {
    id: '22222222-2222-2222-2222-222222222222',
    email: 'lucia.martinez@fabystudio.es',
    password: 'Campus2024!',
    full_name: 'Lucía Martínez',
    role: 'alumna',
    avatar: 'LM',
    phone: '612 345 678',
    course: 'Extensiones de Pestañas',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    email: 'valeria.santos@gmail.com',
    password: 'Campus2024!',
    full_name: 'Valeria Santos',
    role: 'alumna',
    avatar: 'VS',
    phone: '698 765 432',
    course: 'Uñas de Gel y Acrílico',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    email: 'laura.gomez@fabystudio.es',
    password: 'Profesora2024!',
    full_name: 'Laura Gómez',
    role: 'profesor',
    avatar: 'LG',
  },
  {
    id: '11111111-1111-1111-1111-111111111111',
    email: 'admin@fabystudio.es',
    password: 'Admin2024!',
    full_name: 'Fabi Studio — Dirección',
    role: 'admin',
    avatar: 'AD',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isServer(): boolean {
  return typeof window === 'undefined';
}

function getRegisteredAccounts(): Array<DemoUser & { password: string }> {
  if (isServer()) return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRegisteredAccounts(accounts: Array<DemoUser & { password: string }>): void {
  if (isServer()) return;
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function getAllAccounts(): Array<DemoUser & { password: string }> {
  return [...OFFICIAL_DEMO_ACCOUNTS, ...getRegisteredAccounts()];
}

function generateToken(): string {
  return 'faby_tok_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

/**
 * Inicia sesión verificando email y contraseña.
 * Retorna error si las credenciales son incorrectas.
 */
export function signIn(email: string, password: string): AuthResult {
  if (isServer()) return { success: false, error: 'No disponible en servidor' };

  const normalized = email.trim().toLowerCase();
  const all = getAllAccounts();
  const account = all.find(
    (a) => a.email.toLowerCase() === normalized && a.password === password
  );

  if (!account) {
    // Chequeamos si el email existe pero la contraseña es incorrecta
    const emailExists = all.find((a) => a.email.toLowerCase() === normalized);
    if (emailExists) {
      return { success: false, error: 'Contraseña incorrecta. Intenta de nuevo.' };
    }
    return { success: false, error: 'No existe una cuenta con ese correo electrónico.' };
  }

  // Crear sesión con 8 horas de duración
  const { password: _pw, ...user } = account;
  const session: DemoSession = {
    user,
    token: generateToken(),
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, session };
}

/**
 * Registra una nueva alumna y crea sesión automáticamente.
 */
export function signUp(data: {
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  course?: string;
}): AuthResult {
  if (isServer()) return { success: false, error: 'No disponible en servidor' };

  const normalized = data.email.trim().toLowerCase();
  const all = getAllAccounts();

  // Verificar que el email no esté ya registrado
  if (all.find((a) => a.email.toLowerCase() === normalized)) {
    return { success: false, error: 'Ya existe una cuenta con este correo. Inicia sesión.' };
  }

  const newUser: DemoUser & { password: string } = {
    id: crypto.randomUUID ? crypto.randomUUID() : 'usr_' + Date.now(),
    email: normalized,
    password: data.password,
    full_name: data.full_name.trim(),
    role: 'alumna',
    avatar: data.full_name
      .trim()
      .split(' ')
      .map((n) => n[0]?.toUpperCase() || '')
      .slice(0, 2)
      .join(''),
    phone: data.phone,
    course: data.course,
    registeredAt: new Date().toISOString(),
  };

  // Guardar en localStorage
  const registered = getRegisteredAccounts();
  registered.push(newUser);
  saveRegisteredAccounts(registered);

  // Crear sesión automática
  const { password: _pw, ...user } = newUser;
  const session: DemoSession = {
    user,
    token: generateToken(),
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, session };
}

/**
 * Obtiene la sesión activa (si existe y no ha expirado).
 */
export function getSession(): DemoSession | null {
  if (isServer()) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: DemoSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

/**
 * Establece una sesión demo directamente (para el Role Switcher).
 */
export function setDemoSession(role: UserRole, personaKey?: string): DemoSession {
  if (isServer()) throw new Error('Solo disponible en cliente');

  let account: (typeof OFFICIAL_DEMO_ACCOUNTS)[0];

  if (role === 'alumna') {
    account = personaKey === 'valeria'
      ? OFFICIAL_DEMO_ACCOUNTS[1]
      : OFFICIAL_DEMO_ACCOUNTS[0];
  } else if (role === 'profesor') {
    account = OFFICIAL_DEMO_ACCOUNTS[2];
  } else {
    account = OFFICIAL_DEMO_ACCOUNTS[3];
  }

  const { password: _pw, ...user } = account;
  const session: DemoSession = {
    user,
    token: generateToken(),
    expiresAt: Date.now() + 8 * 60 * 60 * 1000,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/**
 * Cierra la sesión activa.
 */
export function signOut(): void {
  if (isServer()) return;
  localStorage.removeItem(SESSION_KEY);
}

// ─── Credenciales por rol (para UI) ──────────────────────────────────────────
export const DEMO_CREDENTIALS: Record<'alumna' | 'profesor' | 'admin', { email: string; password: string }> = {
  alumna: { email: 'lucia.martinez@fabystudio.es', password: 'Campus2024!' },
  profesor: { email: 'laura.gomez@fabystudio.es', password: 'Profesora2024!' },
  admin: { email: 'admin@fabystudio.es', password: 'Admin2024!' },
};
