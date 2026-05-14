import { query } from '../database/pool.js';
import { StudySession } from '../entities/StudySession.js';

const mapSession = (row: any): StudySession => ({
  id: row.id,
  subjectId: row.subject_id,
  subjectName: row.subject_name,
  subjectColor: row.subject_color,
  studiedAt: row.studied_at,
  durationMinutes: Number(row.duration_minutes),
  type: row.type,
  description: row.description,
  focusLevel: Number(row.focus_level),
  difficultyLevel: Number(row.difficulty_level),
  reviewContent: Boolean(row.review_content),
  notes: row.notes,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const listSelect = `
  SELECT ss.*, s.name AS subject_name, s.color AS subject_color
  FROM study_sessions ss
  JOIN subjects s ON s.id = ss.subject_id
`;

export class StudySessionRepository {
  async findAll(from?: string, to?: string) {
    const filters: string[] = [];
    const params: string[] = [];
    if (from) { params.push(from); filters.push(`ss.studied_at >= $${params.length}`); }
    if (to) { params.push(to); filters.push(`ss.studied_at <= $${params.length}`); }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const rows = await query<any>(`${listSelect} ${where} ORDER BY ss.studied_at DESC, ss.created_at DESC`, params);
    return rows.map(mapSession);
  }

  async findById(id: string) {
    const rows = await query<any>(`${listSelect} WHERE ss.id = $1`, [id]);
    return rows[0] ? mapSession(rows[0]) : null;
  }

  async create(data: Omit<StudySession, 'id' | 'createdAt' | 'updatedAt' | 'subjectName' | 'subjectColor'>) {
    const rows = await query<any>(
      `INSERT INTO study_sessions
       (subject_id, studied_at, duration_minutes, type, description, focus_level, difficulty_level, review_content, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [data.subjectId, data.studiedAt, data.durationMinutes, data.type, data.description ?? null, data.focusLevel, data.difficultyLevel, data.reviewContent, data.notes ?? null]
    );
    return this.findById(rows[0].id) as Promise<StudySession>;
  }

  async update(id: string, data: Partial<Omit<StudySession, 'id' | 'createdAt' | 'updatedAt' | 'subjectName' | 'subjectColor'>>) {
    const current = await this.findById(id);
    if (!current) return null;
    const next = { ...current, ...data };
    const rows = await query<any>(
      `UPDATE study_sessions
       SET subject_id = $1, studied_at = $2, duration_minutes = $3, type = $4, description = $5,
           focus_level = $6, difficulty_level = $7, review_content = $8, notes = $9, updated_at = NOW()
       WHERE id = $10 RETURNING id`,
      [next.subjectId, next.studiedAt, next.durationMinutes, next.type, next.description ?? null, next.focusLevel, next.difficultyLevel, next.reviewContent, next.notes ?? null, id]
    );
    return rows[0] ? this.findById(id) : null;
  }

  async delete(id: string) {
    const rows = await query<any>('DELETE FROM study_sessions WHERE id = $1 RETURNING id', [id]);
    return Boolean(rows[0]);
  }
}
