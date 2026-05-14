import { StatsRepository } from '../repositories/StatsRepository.js';

export class StatsService {
  constructor(private repository = new StatsRepository()) {}

  summary() {
    return this.repository.summary();
  }

  async weekly() {
    const [weekly, subjects, focus] = await Promise.all([
      this.repository.weekly(),
      this.repository.subjectTotals(),
      this.repository.focusEvolution()
    ]);
    return { weekly, subjects, focus };
  }
}
