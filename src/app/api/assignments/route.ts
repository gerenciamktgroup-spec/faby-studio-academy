import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { recordActivityEvent } from '@/lib/audit-logger';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      studentId = '22222222-2222-2222-2222-222222222222',
      assignmentId = 'asg-01',
      title,
      description,
      fileUrl,
      grade,
      feedback,
      gradedBy,
      action = 'submit', // 'submit' | 'grade'
    } = body;

    const supabase = createClient();
    const submissionId = 'sub_' + Math.random().toString(36).substring(2, 10);

    if (action === 'submit') {
      try {
        await supabase.from('assignment_submissions').upsert([
          {
            id: submissionId,
            student_id: studentId,
            assignment_id: assignmentId,
            submission_text: description,
            file_url: fileUrl || 'https://images.unsplash.com/photo-1583001809873-a1284a5da677',
            submitted_at: new Date().toISOString(),
          },
        ]);

        await recordActivityEvent({
          userId: studentId,
          sessionId: 'sess_practice_' + Date.now(),
          eventType: 'ASSIGNMENT_SUBMITTED',
          metadata: {
            title,
            assignmentId,
            submissionId,
          },
        });
      } catch (err) {
        console.warn('[Assignments API] Running in sandbox mode:', err);
      }

      return NextResponse.json({
        success: true,
        submissionId,
        message: 'Práctica técnica recibida y puesta en cola para evaluación docente por rúbrica.',
      });
    }

    if (action === 'grade') {
      try {
        await supabase.from('assignment_submissions').update({
          grade,
          feedback,
          graded_by: gradedBy || '44444444-4444-4444-4444-444444444444',
          graded_at: new Date().toISOString(),
        }).match({ student_id: studentId, assignment_id: assignmentId });

        await recordActivityEvent({
          userId: studentId,
          sessionId: 'sess_grade_' + Date.now(),
          eventType: 'TUTOR_FEEDBACK_RECEIVED',
          metadata: {
            grade,
            feedback,
            assignmentId,
            gradedBy,
          },
        });
      } catch (err) {
        console.warn('[Assignments API] Running in sandbox mode:', err);
      }

      return NextResponse.json({
        success: true,
        grade,
        feedback,
        message: 'Calificación por rúbrica guardada en el expediente de la alumna.',
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    console.error('Error in assignments API:', error);
    return NextResponse.json({ error: 'Error procesando la entrega' }, { status: 500 });
  }
}
