import { NextResponse, type NextRequest } from 'next/server';
import { STUDENT_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { recordActivityEvent } from '@/lib/audit-logger';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';
import {
  assessmentQuerySchema,
  assessmentSubmitSchema,
  validationError,
} from '@/lib/validation/api-schemas';

export async function GET(request: NextRequest) {
  try {
    await requireAuthPrincipal(STUDENT_ROLES);
    const payload = assessmentQuerySchema.safeParse({
      lessonId: request.nextUrl.searchParams.get('lessonId'),
    });
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const supabase = await createClient();
    const { data: assessment, error: assessmentError } = await supabase
      .from('assessments')
      .select('id, title, passing_score, time_limit_minutes')
      .eq('lesson_id', payload.data.lessonId)
      .maybeSingle();
    if (assessmentError) throw assessmentError;
    if (!assessment) {
      return NextResponse.json({ error: 'Esta lección no tiene una evaluación configurada.' }, { status: 404 });
    }

    const { data: questions, error: questionsError } = await supabase
      .from('questions')
      .select('id, question_text, question_type, options_json, points')
      .eq('assessment_id', assessment.id)
      .order('id');
    if (questionsError) throw questionsError;

    return NextResponse.json({ success: true, assessment: { ...assessment, questions: questions ?? [] } });
  } catch (error) {
    return apiErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const principal = await requireAuthPrincipal(STUDENT_ROLES);
    const payload = assessmentSubmitSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(validationError(payload.error), { status: 400 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.rpc('submit_assessment_attempt', {
      p_assessment_id: payload.data.assessmentId,
      p_answers: payload.data.answers,
    });
    if (error) throw error;
    const result = Array.isArray(data) ? data[0] : data;
    if (!result) throw new Error('La evaluación no devolvió un resultado.');

    await recordActivityEvent({
      userId: principal.id,
      sessionId: `sess_quiz_${crypto.randomUUID()}`,
      eventType: 'QUIZ_GRADED',
      metadata: {
        assessmentId: payload.data.assessmentId,
        attemptId: result.attempt_id,
        score: result.score,
        passed: result.passed,
      },
    });

    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
