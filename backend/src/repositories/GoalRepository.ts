import { query } from '../database/pool.js';
import { Goal } from '../entities/Goal.js';

const mapGoal = (row: any): Goal => ({
  id: row.id,
  title: row.title,
  scope: row.scope,
  targetMinutes: Number(row.target_minutes),
  subjectId: row.subject_id,
  startsOn: row.starts_on,
  endsOn: row.ends_on
});

export class GoalRepository {
  async findAll() {
    const rows = await query<any>('SELECT * FROM goals ORDER BY created_at DESC');
    return rows.map(mapGoal);
  }

  async findById(id: string) {
    const rows = await query<any>('SELECT * FROM goals WHERE id = $1', [id]);
    return rows[0] ? mapGoal(rows[0]) : null;
  }

  async create(data: Omit<Goal, 'id'>) {
    const rows = await query<any>(
      `INSERT INTO goals (title, scope, target_minutes, subject_id, starts_on, ends_on)
       VALUES ($1, $2, $3, $4, COALESCE($5, CURRENT_DATE), $6) RETURNING *`,
      [data.title, data.scope, data.targetMinutes, data.subjectId ?? null, data.startsOn ?? null, data.endsOn ?? null]
    );
    return mapGoal(rows[0]);
  }

  async update(id: string, data: Partial<Omit<Goal, 'id'>>) {
    const current = await this.findById(id);
    if (!current) return null;
    const next = { ...current, ...data };
    const rows = await query<any>(
      `UPDATE goals SET title = $1, scope = $2, target_minutes = $3, subject_id = $4,
       starts_on = $5, ends_on = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
      [next.title, next.scope, next.targetMinutes, next.subjectId ?? null, next.startsOn, next.endsOn ?? null, id]
    );
    return mapGoal(rows[0]);
  }

  async delete(id: string) {
    const rows = await query<any>('DELETE FROM goals WHERE id = $1 RETURNING id', [id]);
    return Boolean(rows[0]);
  }
}
