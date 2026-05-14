import { AppError } from '../errors/AppError.js';
import { ReviewRepository } from '../repositories/ReviewRepository.js';
import { SubjectRepository } from '../repositories/SubjectRepository.js';

export class ReviewService {
  constructor(private repository = new ReviewRepository(), private subjects = new SubjectRepository()) {}

  list() {
    return this.repository.findAll();
  }

  async create(data: any) {
    if (!(await this.subjects.findById(data.subjectId))) {
      throw new AppError(404, 'Materia nao encontrada');
    }
    return this.repository.create(data);
  }

  async update(id: string, data: any) {
    if (data.subjectId && !(await this.subjects.findById(data.subjectId))) {
      throw new AppError(404, 'Materia nao encontrada');
    }
    const review = await this.repository.update(id, data);
    if (!review) throw new AppError(404, 'Revisao nao encontrada');
    return review;
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new AppError(404, 'Revisao nao encontrada');
  }
}
