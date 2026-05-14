import { query } from '../database/pool.js';
import { Review } from '../entities/Review.js';

const mapReview = (row: any): Review => ({
  id: row.id,
  subjectId: row.subject_id,
  studySessionId: row.study_session_id,
  title: row.title,
  dueDate: row.due_date,
  status: row.status,
  notes: row.notes,
  subjectName: row.subject_name,
  subjectColor: row.subject_color
});

const listSelect = `
  SELECT r.*, s.name AS subject_name, s.color AS subject_color
  FROM reviews r
  JOIN subjects s ON s.id = r.subject_id
`;

export class ReviewRepository {
  async findAll() {
    const rows = await query<any>(`${listSelect} ORDER BY r.due_date ASC`);
    return rows.map(mapReview);
  }

  async findById(id: string) {
    const rows = await query<any>(`${listSelect} WHERE r.id = $1`, [id]);
    return rows[0] ? mapReview(rows[0]) : null;
  }

  async create(data: Omit<Review, 'id' | 'subjectName' | 'subjectColor'>) {
    const rows = await query<any>(
      `INSERT INTO reviews (subject_id, study_session_id, title, due_date, status, notes)
       VALUES ($1, $2, $3, $4, COALESCE($5, 'pending'), $6) RETURNING id`,
      [data.subjectId, data.studySessionId ?? null, data.title, data.dueDate, data.status ?? 'pending', data.notes ?? null]
    );
    return this.findById(rows[0].id) as Promise<Review>;
  }

  async update(id: string, data: Partial<Omit<Review, 'id' | 'subjectName' | 'subjectColor'>>) {
    const current = await this.findById(id);
    if (!current) return null;
    const next = { ...current, ...data };
    const rows = await query<any>(
      `UPDATE reviews SET subject_id = $1, study_session_id = $2, title = $3, due_date = $4,
       status = $5, notes = $6, updated_at = NOW() WHERE id = $7 RETURNING id`,
      [next.subjectId, next.studySessionId ?? null, next.title, next.dueDate, next.status, next.notes ?? null, id]
    );
    return rows[0] ? this.findById(id) : null;
  }

  async delete(id: string) {
    const rows = await query<any>('DELETE FROM reviews WHERE id = $1 RETURNING id', [id]);
    return Boolean(rows[0]);
  }
}
