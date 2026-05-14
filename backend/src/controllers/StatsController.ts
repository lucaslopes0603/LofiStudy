import { Response } from 'express';
import { StatsService } from '../services/StatsService.js';

const service = new StatsService();

export class StatsController {
  static async summary(_request: unknown, response: Response) {
    response.json(await service.summary());
  }

  static async weekly(_request: unknown, response: Response) {
    response.json(await service.weekly());
  }
}
