'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { ADMIN_ROLES, type AppRole } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { recordActivityEvent } from '@/lib/audit-logger';

export interface AdminActionState {
  status: 'idle' | 'success' | 'error';
  message: string;
}

export const initialAdminActionState: AdminActionState = { status: 'idle', message: '' };

const enrollmentSchema = z.object({
  studentId: z.string().uuid(),
  courseId: z.string().uuid(),
});

const roleSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(['alumna', 'tutor', 'profesor', 'admin_academico', 'superadmin', 'auditor']),
});

const courseStaffSchema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  staffRole: z.enum(['tutor', 'profesor']),
});

const courseSchema = z.object({
  title: z.string().trim().min(5).max(180),
  slug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  description: z.string().trim().min(20).max(3000),
  category: z.string().trim().min(3).max(100),
  estimatedHours: z.coerce.number().int().min(1).max(1000),
});

const invitationSchema = z.object({
  fullName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(254),
  role: z.enum(['alumna', 'tutor', 'profesor', 'admin_academico', 'auditor']),
});

const enrollmentStatusSchema = z.object({
  enrollmentId: z.string().uuid(),
  status: z.enum(['active', 'completed', 'cancelled']),
});

const removeRoleSchema = roleSchema;

const deletionRequestSchema = z.object({
  requestId: z.string().uuid(),
  status: z.enum(['processing', 'rejected']),
});

function errorState(message: string): AdminActionState {
  return { status: 'error', message };
}

export async function createEnrollmentAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAuthPrincipal(ADMIN_ROLES);
    const payload = enrollmentSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Selecciona una alumna y un curso válidos.');

    const supabase = await createClient();
    const { data: studentRole, error: roleError } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', payload.data.studentId)
      .eq('role', 'alumna')
      .maybeSingle();
    if (roleError) throw roleError;
    if (!studentRole) return errorState('La cuenta seleccionada no tiene el rol de alumna.');

    const { error } = await supabase.from('enrollments').insert({
      student_id: payload.data.studentId,
      course_id: payload.data.courseId,
      status: 'active',
    });
    if (error) {
      if (error.code === '23505') return errorState('La alumna ya está matriculada en este curso.');
      throw error;
    }

    revalidatePath('/admin');
    return { status: 'success', message: 'Matrícula creada correctamente.' };
  } catch (error) {
    console.error('[Admin] create enrollment:', error);
    return errorState('No fue posible crear la matrícula.');
  }
}

export async function inviteUserAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    const principal = await requireAuthPrincipal(ADMIN_ROLES);
    const payload = invitationSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Revisa nombre, correo y rol inicial.');
    const elevatedRoles: AppRole[] = ['admin_academico', 'auditor', 'superadmin'];
    if (elevatedRoles.includes(payload.data.role) && !principal.roles.includes('superadmin')) {
      return errorState('Solo superadministración puede invitar cuentas administrativas o de auditoría.');
    }

    const admin = createAdminClient();
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '');
    const { data, error: inviteError } = await admin.auth.admin.inviteUserByEmail(
      payload.data.email.toLowerCase(),
      {
        data: { full_name: payload.data.fullName },
        redirectTo: appUrl ? `${appUrl}/auth/callback?next=/actualizar-password` : undefined,
      }
    );
    if (inviteError || !data.user) {
      if (inviteError?.message.toLowerCase().includes('already')) return errorState('Ya existe una cuenta con ese correo.');
      throw inviteError ?? new Error('Supabase no devolvió la cuenta invitada.');
    }

    const { error: roleError } = await admin.from('user_roles').upsert(
      { user_id: data.user.id, role: payload.data.role },
      { onConflict: 'user_id,role' }
    );
    if (roleError) throw roleError;
    if (payload.data.role !== 'alumna') {
      const { error: removeStudentError } = await admin
        .from('user_roles')
        .delete()
        .eq('user_id', data.user.id)
        .eq('role', 'alumna');
      if (removeStudentError) throw removeStudentError;
    }

    revalidatePath('/admin');
    return { status: 'success', message: 'Invitación enviada y rol inicial asignado.' };
  } catch (error) {
    console.error('[Admin] invite user:', error);
    return errorState('No fue posible enviar la invitación. Revisa la clave de servicio y el correo de Supabase.');
  }
}

export async function assignRoleAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    const principal = await requireAuthPrincipal(ADMIN_ROLES);
    const payload = roleSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Selecciona un usuario y un rol válidos.');

    const targetRole = payload.data.role;
    const targetUserId = payload.data.userId;

    // Rule: No self-elevation
    if (targetUserId === principal.id) {
      return errorState('No puedes autoasignarte roles desde esta sesión.');
    }

    // Rule: admin_academico can only manage alumna, tutor, profesor
    const elevatedRoles: AppRole[] = ['admin_academico', 'auditor', 'superadmin'];
    if (elevatedRoles.includes(targetRole) && !principal.roles.includes('superadmin')) {
      return errorState('Solo superadministración puede asignar roles administrativos o de auditoría.');
    }

    const admin = createAdminClient();
    const { error } = await admin.from('user_roles').insert({
      user_id: targetUserId,
      role: targetRole,
    });

    if (error) {
      if (error.code === '23505') return errorState('La cuenta ya tiene ese rol.');
      throw error;
    }

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_role_assign_${targetUserId}`,
      eventType: 'EVENT_CORRECTION',
      metadata: {
        action: 'ROLE_ASSIGNED',
        target_user_id: targetUserId,
        assigned_role: targetRole,
        granted_by: principal.id,
      },
    });

    revalidatePath('/admin');
    return { status: 'success', message: 'Rol asignado correctamente.' };
  } catch (error) {
    console.error('[Admin] assign role:', error);
    return errorState('No fue posible asignar el rol.');
  }
}

export async function removeRoleAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    const principal = await requireAuthPrincipal(ADMIN_ROLES);
    const payload = removeRoleSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Selecciona una cuenta y un rol válidos.');

    const targetRole = payload.data.role;
    const targetUserId = payload.data.userId;

    // Rule: admin_academico can only manage alumna, tutor, profesor
    const elevatedRoles: AppRole[] = ['admin_academico', 'auditor', 'superadmin'];
    if (elevatedRoles.includes(targetRole) && !principal.roles.includes('superadmin')) {
      return errorState('Solo superadministración puede retirar roles administrativos o de auditoría.');
    }

    // Rule: A superadmin cannot remove their own superadmin role in this session
    if (targetUserId === principal.id && targetRole === 'superadmin') {
      return errorState('No puedes retirar tu propio rol de superadministración desde esta sesión.');
    }

    const admin = createAdminClient();

    // Rule: Cannot delete the last superadmin
    if (targetRole === 'superadmin') {
      const { count: superadminCount, error: saCountError } = await admin
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'superadmin');
      if (saCountError) throw saCountError;
      if ((superadminCount ?? 0) <= 1) {
        return errorState('No es posible eliminar el último superadministrador del sistema.');
      }
    }

    // Rule: Every account must retain at least one role
    const { count: userRoleCount, error: countError } = await admin
      .from('user_roles')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', targetUserId);
    if (countError) throw countError;
    if ((userRoleCount ?? 0) <= 1) {
      return errorState('La cuenta debe conservar al menos un rol.');
    }

    const { error } = await admin
      .from('user_roles')
      .delete()
      .eq('user_id', targetUserId)
      .eq('role', targetRole);
    if (error) throw error;

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_role_remove_${targetUserId}`,
      eventType: 'EVENT_CORRECTION',
      metadata: {
        action: 'ROLE_REMOVED',
        target_user_id: targetUserId,
        removed_role: targetRole,
        revoked_by: principal.id,
      },
    });

    revalidatePath('/admin');
    return { status: 'success', message: 'Rol retirado correctamente.' };
  } catch (error) {
    console.error('[Admin] remove role:', error);
    return errorState('No fue posible retirar el rol.');
  }
}

export async function updateEnrollmentStatusAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAuthPrincipal(ADMIN_ROLES);
    const payload = enrollmentStatusSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Selecciona una matrícula y un estado válidos.');
    const supabase = await createClient();
    const { error } = await supabase.from('enrollments').update({
      status: payload.data.status,
      completed_at: payload.data.status === 'completed' ? new Date().toISOString() : null,
    }).eq('id', payload.data.enrollmentId);
    if (error) throw error;
    revalidatePath('/admin');
    return { status: 'success', message: 'Estado de matrícula actualizado.' };
  } catch (error) {
    console.error('[Admin] update enrollment:', error);
    return errorState('No fue posible actualizar la matrícula.');
  }
}

export async function reviewDeletionRequestAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAuthPrincipal(ADMIN_ROLES);
    const payload = deletionRequestSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Selecciona una solicitud y una decisión.');
    const supabase = await createClient();
    const { error } = await supabase.from('data_deletion_requests').update({ status: payload.data.status, note: payload.data.status === 'processing' ? 'En revisión administrativa' : 'Solicitud rechazada por administración' }).eq('id', payload.data.requestId);
    if (error) throw error;
    revalidatePath('/admin');
    return { status: 'success', message: payload.data.status === 'processing' ? 'Solicitud puesta en revisión.' : 'Solicitud rechazada.' };
  } catch (error) {
    console.error('[Admin] review deletion request:', error);
    return errorState('No fue posible actualizar la solicitud.');
  }
}

export async function assignCourseStaffAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAuthPrincipal(ADMIN_ROLES);
    const payload = courseStaffSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Selecciona profesional, curso y función.');

    const supabase = await createClient();
    const { data: role, error: roleError } = await supabase
      .from('user_roles')
      .select('id')
      .eq('user_id', payload.data.userId)
      .eq('role', payload.data.staffRole)
      .maybeSingle();
    if (roleError) throw roleError;
    if (!role) return errorState(`La cuenta debe tener primero el rol ${payload.data.staffRole}.`);

    const { error } = await supabase.from('course_staff').insert({
      user_id: payload.data.userId,
      course_id: payload.data.courseId,
      staff_role: payload.data.staffRole,
    });
    if (error) {
      if (error.code === '23505') return errorState('La asignación ya existe.');
      throw error;
    }

    revalidatePath('/admin');
    return { status: 'success', message: 'Profesional asignada al curso.' };
  } catch (error) {
    console.error('[Admin] assign course staff:', error);
    return errorState('No fue posible asignar el curso.');
  }
}

export async function createCourseAction(
  _previous: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  try {
    await requireAuthPrincipal(ADMIN_ROLES);
    const payload = courseSchema.safeParse(Object.fromEntries(formData));
    if (!payload.success) return errorState('Revisa el título, slug, descripción y duración.');

    const supabase = await createClient();
    const { error } = await supabase.from('courses').insert({
      title: payload.data.title,
      slug: payload.data.slug,
      description: payload.data.description,
      category: payload.data.category,
      estimated_hours: payload.data.estimatedHours,
      is_published: false,
    });
    if (error) {
      if (error.code === '23505') return errorState('Ya existe un curso con ese slug.');
      throw error;
    }

    revalidatePath('/admin');
    return { status: 'success', message: 'Curso creado como borrador.' };
  } catch (error) {
    console.error('[Admin] create course:', error);
    return errorState('No fue posible crear el curso.');
  }
}
