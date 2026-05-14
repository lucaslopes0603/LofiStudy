import { AppError } from '../errors/AppError.js';
import { GoalRepository } from '../repositories/GoalRepository.js';
import { SubjectRepository } from '../repositories/SubjectRepository.js';

export class GoalService {
  constructor(private repository = new GoalRepository(), private subjects = new SubjectRepository()) {}

  list() {
    return this.repository.findAll();
  }

  async create(data: any) {
    if (data.subjectId && !(await this.subjects.findById(data.subjectId))) {
      throw new AppError(404, 'Materia nao encontrada');
    }
    return this.repository.create(data);
  }

  async update(id: string, data: any) {
    if (data.subjectId && !(await this.subjects.findById(data.subjectId))) {
      throw new AppError(404, 'Materia nao encontrada');
    }
    const goal = await this.repository.update(id, data);
    if (!goal) throw new AppError(404, 'Meta nao encontrada');
    return goal;
  }

  async delete(id: string) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new AppError(404, 'Meta nao encontrada');
  }
}
