import { NextResponse } from 'next/server';
import { APP_ROLES } from '@/lib/auth/roles';
import { requireAuthPrincipal } from '@/lib/auth/server';
import { apiErrorResponse } from '@/lib/http/errors';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

function isoDay(value: Date | string): string {
  return new Date(value).toISOString().slice(0, 10);
}

function dayBefore(value: string): string {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return isoDay(date);
}

function calculateStreak(days: string[], today: string) {
  const unique = [...new Set(days)].sort();
  const active = new Set(unique);
  const yesterday = dayBefore(today);
  let cursor = active.has(today) ? today : active.has(yesterday) ? yesterday : null;
  let current = 0;

  while (cursor && active.has(cursor)) {
    current += 1;
    cursor = dayBefore(cursor);
  }

  let longest = 0;
  let running = 0;
  let previous: string | null = null;
  for (const day of unique) {
    running = previous && dayBefore(day) === previous ? running + 1 : 1;
    longest = Math.max(longest, running);
    previous = day;
  }

  return { current, longest, activeToday: active.has(today) };
}

export async function GET() {
  try {
    const principal = await requireAuthPrincipal(APP_ROLES);
    const supabase = await createClient();
    const since = new Date();
    since.setUTCDate(since.getUTCDate() - 365);

    const { data, error } = await supabase
      .from('session_logs')
      .select('started_at, total_active_seconds')
      .eq('user_id', principal.id)
      .gte('started_at', since.toISOString())
      .gt('total_active_seconds', 0)
      .order('started_at', { ascending: true });

    if (error) throw error;
    const days = (data ?? []).map((row) => isoDay(row.started_at));
    const today = isoDay(new Date());
    const streak = calculateStreak(days, today);

    return NextResponse.json({
      ...streak,
      activeDays: [...new Set(days)].slice(-7),
    });
  } catch (error) {
    return apiErrorResponse(error);
  }
}
