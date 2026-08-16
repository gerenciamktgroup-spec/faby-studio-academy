import { NextResponse } from 'next/server';
import {
  AuthenticationError,
  AuthorizationError,
} from '@/lib/auth/server';
import { ConfigurationError } from '@/lib/config/env';

export function apiErrorResponse(error: unknown): NextResponse {
  if (error instanceof AuthenticationError) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  if (error instanceof AuthorizationError) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  if (error instanceof ConfigurationError) {
    return NextResponse.json(
      { error: 'La plataforma todavía no tiene configurado su servicio de datos.' },
      { status: 503 }
    );
  }

  console.error('[API] Unhandled error:', error);
  return NextResponse.json(
    { error: 'No fue posible completar la operación.' },
    { status: 500 }
  );
}
