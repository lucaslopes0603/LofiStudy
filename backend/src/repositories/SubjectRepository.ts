import { query } from '../database/pool.js';
import { Subject } from '../entities/Subject.js';

const mapSubject = (row: any): Subject => ({
  id: row.id,
  name: row.name,
  color: row.color,
  weeklyGoalHours: Number(row.weekly_goal_hours),
  description: row.description,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

export class SubjectRepository {
  async findAll() {
    const rows = await query<any>('SELECT * FROM subjects ORDER BY name ASC');
    return rows.map(mapSubject);
  }

  async findById(id: string) {
    const rows = await query<any>('SELECT * FROM subjects WHERE id = $1', [id]);
    return rows[0] ? mapSubject(rows[0]) : null;
  }

  async create(data: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>) {
    const rows = await query<any>(
      `INSERT INTO subjects (name, color, weekly_goal_hours, description)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [data.name, data.color, data.weeklyGoalHours, data.description ?? null]
    );
    return mapSubject(rows[0]);
  }

  async update(id: string, data: Partial<Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>>) {
    const current = await this.findById(id);
    if (!current) return null;
    const next = { ...current, ...data };
    const rows = await query<any>(
      `UPDATE subjects
       SET name = $1, color = $2, weekly_goal_hours = $3, description = $4, updated_at = NOW()
       WHERE id = $5 RETURNING *`,
      [next.name, next.color, next.weeklyGoalHours, next.description ?? null, id]
    );
    return mapSubject(rows[0]);
  }

  async delete(id: string) {
    const rows = await query<any>('DELETE FROM subjects WHERE id = $1 RETURNING id', [id]);
    return Boolean(rows[0]);
  }
}
