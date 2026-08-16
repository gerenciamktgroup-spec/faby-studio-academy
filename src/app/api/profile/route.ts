import { NextResponse, type NextRequest } from 'next/server';
import { APP_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import { profileUpdateSchema, validationError } from '@/lib/validation/api-schemas';

export async function PATCH(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(APP_ROLES);
    const payload = profileUpdateSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: payload.data.fullName,
        phone: payload.data.phone || null,
        dni_nie: payload.data.documentId || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', principal.id)
      .select('full_name, email, phone, dni_nie')
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, profile: data });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function DELETE() {
  try {
    const principal = await requireAuthPrincipal(APP_ROLES);
    const supabase = await createClient();
    const { data: existing, error: existingError } = await supabase
      .from('data_deletion_requests')
      .select('id, status, requested_at')
      .eq('user_id', principal.id)
      .in('status', ['pending', 'processing'])
      .maybeSingle();
    if (existingError) throw existingError;
    if (existing) {
      return NextResponse.json({ success: true, request: existing, alreadyExists: true });
    }

    const { data, error } = await supabase
      .from('data_deletion_requests')
      .insert({ user_id: principal.id, status: 'pending' })
      .select('id, status, requested_at')
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, request: data }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
