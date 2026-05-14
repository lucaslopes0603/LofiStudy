import { query } from '../database/pool.js';

export class StatsRepository {
  async summary() {
    const [today] = await query<any>(
      `SELECT COALESCE(SUM(duration_minutes), 0) AS minutes,
              COUNT(*) FILTER (WHERE type = 'pomodoro') AS pomodoros,
              COUNT(DISTINCT subject_id) AS subjects
       FROM study_sessions WHERE studied_at = CURRENT_DATE`
    );
    const [total] = await query<any>('SELECT COALESCE(SUM(duration_minutes), 0) AS minutes FROM study_sessions');
    const streakRows = await query<any>(
      `WITH days AS (
         SELECT DISTINCT studied_at::date AS day FROM study_sessions WHERE duration_minutes > 0
       ), numbered AS (
         SELECT day, day - (ROW_NUMBER() OVER (ORDER BY day))::int AS grp FROM days
       )
       SELECT COUNT(*) AS streak FROM numbered
       WHERE grp = (SELECT CURRENT_DATE - (ROW_NUMBER() OVER (ORDER BY day))::int FROM days WHERE day = CURRENT_DATE)
       GROUP BY grp`
    );
    return {
      todayMinutes: Number(today.minutes),
      todayPomodoros: Number(today.pomodoros),
      todaySubjects: Number(today.subjects),
      totalMinutes: Number(total.minutes),
      streakDays: Number(streakRows[0]?.streak ?? 0)
    };
  }

  async weekly() {
    const rows = await query<any>(
      `SELECT studied_at::date AS day, COALESCE(SUM(duration_minutes), 0) AS minutes
       FROM study_sessions
       WHERE studied_at >= CURRENT_DATE - INTERVAL '6 days'
       GROUP BY studied_at ORDER BY studied_at ASC`
    );
    return rows.map((row) => ({ day: row.day, minutes: Number(row.minutes) }));
  }

  async subjectTotals() {
    const rows = await query<any>(
      `SELECT s.name, s.color, COALESCE(SUM(ss.duration_minutes), 0) AS minutes
       FROM subjects s LEFT JOIN study_sessions ss ON ss.subject_id = s.id
       GROUP BY s.id ORDER BY minutes DESC`
    );
    return rows.map((row) => ({ name: row.name, color: row.color, minutes: Number(row.minutes) }));
  }

  async focusEvolution() {
    const rows = await query<any>(
      `SELECT studied_at::date AS day, ROUND(AVG(focus_level)::numeric, 2) AS focus
       FROM study_sessions
       WHERE studied_at >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY studied_at ORDER BY studied_at ASC`
    );
    return rows.map((row) => ({ day: row.day, focus: Number(row.focus) }));
  }
}
