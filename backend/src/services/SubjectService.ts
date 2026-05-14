import { AppError } from '../errors/AppError.js';
import { SubjectRepository } from '../repositories/SubjectRepository.js';

export class SubjectService {
  constructor(private repository = new SubjectRepository()) {}

  list() {
    return this.repository.findAll();
  }

  async create(data: any) {
    return this.repository.create(data);
  }

  async update(id: string, data: any) {
    const subject = await this.repository.update(id, data);
    if (!subject) throw new AppError(404, 'Materia nao encontrada');
    return subject;
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new AppError(404, 'Materia nao encontrada');
  }
}
