import { createClient } from '@/lib/supabase/server';

function relation<T>(value: T | T[] | null): T | null {
  return Array.isArray(value) ? value[0] ?? null : value;
}

function ensureNoError(error: { message: string } | null, operation: string): void {
  if (error) throw new Error(`${operation}: ${error.message}`);
}

export interface StudentCourseSummary {
  enrollmentId: string;
  courseId: string;
  title: string;
  status: string;
  estimatedHours: number;
  completedLessons: number;
  totalLessons: number;
  progressPercentage: number;
  activeHours: number;
  nextLesson: { id: string; title: string } | null;
}

export interface StudentDashboardData {
  courses: StudentCourseSummary[];
  latestGrade: number | null;
  pendingFeedbackCount: number;
  unreadNotifications: number;
  certificateCount: number;
}

export async function loadStudentDashboard(userId: string): Promise<StudentDashboardData> {
  const supabase = await createClient();
  const [enrollmentsResult, progressResult, sessionsResult, submissionsResult, notificationsResult, certificatesResult] =
    await Promise.all([
      supabase
        .from('enrollments')
        .select('id, course_id, status, courses(id, title, estimated_hours)')
        .eq('student_id', userId)
        .in('status', ['active', 'completed'])
        .order('enrolled_at', { ascending: false }),
      supabase
        .from('lesson_progress')
        .select('lesson_id, status')
        .eq('student_id', userId),
      supabase
        .from('session_logs')
        .select('course_id, total_active_seconds')
        .eq('user_id', userId),
      supabase
        .from('assignment_submissions')
        .select('grade, graded_at')
        .eq('student_id', userId)
        .order('submitted_at', { ascending: false }),
      supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false),
      supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', userId),
    ]);

  ensureNoError(enrollmentsResult.error, 'No se pudieron consultar las matrículas');
  ensureNoError(progressResult.error, 'No se pudo consultar el progreso');
  ensureNoError(sessionsResult.error, 'No se pudo consultar el tiempo activo');
  ensureNoError(submissionsResult.error, 'No se pudieron consultar las prácticas');
  ensureNoError(notificationsResult.error, 'No se pudieron consultar las notificaciones');
  ensureNoError(certificatesResult.error, 'No se pudieron consultar los certificados');

  const completedLessonIds = new Set(
    (progressResult.data ?? [])
      .filter((item) => item.status === 'completed')
      .map((item) => item.lesson_id)
  );
  const activeSecondsByCourse = new Map<string, number>();
  for (const session of sessionsResult.data ?? []) {
    if (!session.course_id) continue;
    activeSecondsByCourse.set(
      session.course_id,
      (activeSecondsByCourse.get(session.course_id) ?? 0) +
        (session.total_active_seconds ?? 0)
    );
  }

  const courses = await Promise.all(
    (enrollmentsResult.data ?? []).map(async (enrollment) => {
      const course = relation(enrollment.courses as unknown as {
        id: string;
        title: string;
        estimated_hours: number;
      });
      if (!course) throw new Error('La matrícula no tiene un curso asociado.');

      const { data: modules, error: modulesError } = await supabase
        .from('modules')
        .select('id, order_index')
        .eq('course_id', enrollment.course_id)
        .order('order_index');
      ensureNoError(modulesError, 'No se pudieron consultar los módulos');

      const moduleIds = (modules ?? []).map((module) => module.id);
      const lessonsResult = moduleIds.length
        ? await supabase
            .from('lessons')
            .select('id, title, module_id, order_index')
            .in('module_id', moduleIds)
            .order('order_index')
        : { data: [], error: null };
      ensureNoError(lessonsResult.error, 'No se pudieron consultar las lecciones');

      const lessons = lessonsResult.data ?? [];
      const completedLessons = lessons.filter((lesson) => completedLessonIds.has(lesson.id)).length;
      const totalLessons = lessons.length;
      const nextLesson = lessons.find((lesson) => !completedLessonIds.has(lesson.id));

      return {
        enrollmentId: enrollment.id,
        courseId: course.id,
        title: course.title,
        status: enrollment.status,
        estimatedHours: course.estimated_hours,
        completedLessons,
        totalLessons,
        progressPercentage:
          totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        activeHours: Number(
          ((activeSecondsByCourse.get(course.id) ?? 0) / 3600).toFixed(2)
        ),
        nextLesson: nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null,
      } satisfies StudentCourseSummary;
    })
  );

  const submissions = submissionsResult.data ?? [];
  return {
    courses,
    latestGrade: submissions.find((submission) => submission.grade != null)?.grade ?? null,
    pendingFeedbackCount: submissions.filter((submission) => submission.grade == null).length,
    unreadNotifications: notificationsResult.count ?? 0,
    certificateCount: certificatesResult.count ?? 0,
  };
}

export interface TeacherStudentSummary {
  enrollmentId: string;
  studentId: string;
  fullName: string;
  email: string;
  courseTitle: string;
  status: string;
}

export interface TeacherDashboardData {
  courses: Array<{ id: string; title: string }>;
  students: TeacherStudentSummary[];
  pendingSubmissions: number;
  scheduledTutorings: number;
}

export async function loadTeacherDashboard(
  userId: string,
  canManageAllCourses: boolean
): Promise<TeacherDashboardData> {
  const supabase = await createClient();
  const coursesResult = canManageAllCourses
    ? await supabase.from('courses').select('id, title').order('title')
    : await supabase
        .from('course_staff')
        .select('course_id, courses(id, title)')
        .eq('user_id', userId)
        .eq('is_active', true);
  ensureNoError(coursesResult.error, 'No se pudieron consultar los cursos asignados');

  const courses = canManageAllCourses
    ? ((coursesResult.data ?? []) as Array<{ id: string; title: string }>)
    : ((coursesResult.data ?? []) as Array<{
        course_id: string;
        courses: { id: string; title: string } | { id: string; title: string }[] | null;
      }>)
        .map((row) => relation(row.courses as unknown as { id: string; title: string }))
        .filter((course): course is { id: string; title: string } => Boolean(course));
  const courseIds = courses.map((course) => course.id);

  if (courseIds.length === 0) {
    return { courses: [], students: [], pendingSubmissions: 0, scheduledTutorings: 0 };
  }

  const [enrollmentsResult, submissionsResult, tutoringResult] = await Promise.all([
    supabase
      .from('enrollments')
      .select('id, student_id, course_id, status, profiles(full_name, email), courses(title)')
      .in('course_id', courseIds)
      .in('status', ['active', 'completed'])
      .order('enrolled_at', { ascending: false }),
    supabase
      .from('assignment_submissions')
      .select('*', { count: 'exact', head: true })
      .is('graded_at', null),
    supabase
      .from('tutoring_sessions')
      .select('*', { count: 'exact', head: true })
      .eq('tutor_id', userId)
      .eq('status', 'scheduled'),
  ]);
  ensureNoError(enrollmentsResult.error, 'No se pudieron consultar las alumnas');
  ensureNoError(submissionsResult.error, 'No se pudieron consultar las prácticas');
  ensureNoError(tutoringResult.error, 'No se pudieron consultar las tutorías');

  const students = (enrollmentsResult.data ?? []).map((enrollment) => {
    const profile = relation(
      enrollment.profiles as unknown as { full_name: string; email: string }
    );
    const course = relation(enrollment.courses as unknown as { title: string });
    return {
      enrollmentId: enrollment.id,
      studentId: enrollment.student_id,
      fullName: profile?.full_name ?? 'Alumna',
      email: profile?.email ?? '',
      courseTitle: course?.title ?? 'Curso',
      status: enrollment.status,
    };
  });

  return {
    courses,
    students,
    pendingSubmissions: submissionsResult.count ?? 0,
    scheduledTutorings: tutoringResult.count ?? 0,
  };
}

export interface AdminDashboardData {
  profileCount: number;
  studentCount: number;
  courseCount: number;
  activeEnrollmentCount: number;
  pendingSubmissionCount: number;
  certificateCount: number;
  recentEnrollments: TeacherStudentSummary[];
  enrollments: TeacherStudentSummary[];
  users: Array<{ id: string; fullName: string; email: string; roles: string[] }>;
  courses: Array<{ id: string; title: string; isPublished: boolean }>;
  deletionRequests: Array<{ id: string; userName: string; email: string; status: string; requestedAt: string }>;
}

export async function loadAdminDashboard(): Promise<AdminDashboardData> {
  const supabase = await createClient();
  const [profiles, students, courses, enrollments, submissions, certificates, recent, users, roleRows, deletionRequests] =
    await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'alumna'),
      supabase
        .from('courses')
        .select('id, title, is_published', { count: 'exact' })
        .order('title'),
      supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active'),
      supabase
        .from('assignment_submissions')
        .select('*', { count: 'exact', head: true })
        .is('graded_at', null),
      supabase.from('certificates').select('*', { count: 'exact', head: true }),
      supabase
        .from('enrollments')
        .select('id, student_id, course_id, status, profiles(full_name, email), courses(title)')
        .order('enrolled_at', { ascending: false })
        .limit(500),
      supabase.from('profiles').select('id, full_name, email').order('full_name'),
      supabase.from('user_roles').select('user_id, role'),
      supabase.from('data_deletion_requests').select('id, status, requested_at, profiles(full_name, email)').in('status', ['pending', 'processing']).order('requested_at').limit(100),
    ]);

  for (const [result, label] of [
    [profiles, 'perfiles'],
    [students, 'alumnas'],
    [courses, 'cursos'],
    [enrollments, 'matrículas'],
    [submissions, 'prácticas'],
    [certificates, 'certificados'],
    [recent, 'matrículas recientes'],
    [users, 'usuarios'],
    [roleRows, 'roles'],
    [deletionRequests, 'solicitudes de eliminación'],
  ] as const) {
    ensureNoError(result.error, `No se pudieron consultar ${label}`);
  }

  const rolesByUser = new Map<string, string[]>();
  for (const row of roleRows.data ?? []) {
    rolesByUser.set(row.user_id, [...(rolesByUser.get(row.user_id) ?? []), row.role]);
  }

  return {
    profileCount: profiles.count ?? 0,
    studentCount: students.count ?? 0,
    courseCount: courses.count ?? 0,
    activeEnrollmentCount: enrollments.count ?? 0,
    pendingSubmissionCount: submissions.count ?? 0,
    certificateCount: certificates.count ?? 0,
    enrollments: (recent.data ?? []).map((enrollment) => {
      const profile = relation(
        enrollment.profiles as unknown as { full_name: string; email: string }
      );
      const course = relation(enrollment.courses as unknown as { title: string });
      return {
        enrollmentId: enrollment.id,
        studentId: enrollment.student_id,
        fullName: profile?.full_name ?? 'Alumna',
        email: profile?.email ?? '',
        courseTitle: course?.title ?? 'Curso',
        status: enrollment.status,
      };
    }),
    recentEnrollments: (recent.data ?? []).slice(0, 8).map((enrollment) => {
      const profile = relation(enrollment.profiles as unknown as { full_name: string; email: string });
      const course = relation(enrollment.courses as unknown as { title: string });
      return { enrollmentId: enrollment.id, studentId: enrollment.student_id, fullName: profile?.full_name ?? 'Alumna', email: profile?.email ?? '', courseTitle: course?.title ?? 'Curso', status: enrollment.status };
    }),
    users: (users.data ?? []).map((user) => ({
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      roles: rolesByUser.get(user.id) ?? [],
    })),
    courses: ((courses.data ?? []) as Array<{
      id: string;
      title: string;
      is_published: boolean;
    }>).map((course) => ({
      id: course.id,
      title: course.title,
      isPublished: course.is_published,
    })),
    deletionRequests: (deletionRequests.data ?? []).map((request) => {
      const profile = relation(request.profiles as unknown as { full_name: string; email: string });
      return { id: request.id, userName: profile?.full_name ?? 'Cuenta', email: profile?.email ?? '', status: request.status, requestedAt: request.requested_at };
    }),
  };
}
