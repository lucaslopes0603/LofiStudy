import { addDays, formatDate } from '../utils/date.js';
import { AppError } from '../errors/AppError.js';
import { ReviewRepository } from '../repositories/ReviewRepository.js';
import { StudySessionRepository } from '../repositories/StudySessionRepository.js';
import { SubjectRepository } from '../repositories/SubjectRepository.js';

export class StudySessionService {
  constructor(
    private repository = new StudySessionRepository(),
    private subjects = new SubjectRepository(),
    private reviews = new ReviewRepository()
  ) {}

  list(from?: string, to?: string) {
    return this.repository.findAll(from, to);
  }

  async create(data: any) {
    const subject = await this.subjects.findById(data.subjectId);
    if (!subject) throw new AppError(404, 'Materia nao encontrada');
    const session = await this.repository.create(data);
    if (session.reviewContent) {
      await Promise.all([1, 7, 30].map((days) => this.reviews.create({
        subjectId: session.subjectId,
        studySessionId: session.id,
        title: `Revisar: ${session.description || subject.name}`,
        dueDate: formatDate(addDays(new Date(session.studiedAt), days)),
        status: 'pending',
        notes: session.notes
      })));
    }
    return session;
  }

  async update(id: string, data: any) {
    if (data.subjectId) {
      const subject = await this.subjects.findById(data.subjectId);
      if (!subject) throw new AppError(404, 'Materia nao encontrada');
    }
    const session = await this.repository.update(id, data);
    if (!session) throw new AppError(404, 'Sessao nao encontrada');
    return session;
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new AppError(404, 'Sessao nao encontrada');
  }
}
