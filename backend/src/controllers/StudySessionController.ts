import { Request, Response } from 'express';
import { StudySessionService } from '../services/StudySessionService.js';

const service = new StudySessionService();

export class StudySessionController {
  static async index(request: Request, response: Response) {
    response.json(await service.list(request.query.from as string, request.query.to as string));
  }

  static async create(request: Request, response: Response) {
    response.status(201).json(await service.create(request.body));
  }

  static async update(request: Request, response: Response) {
    response.json(await service.update(request.params.id, request.body));
  }

  static async delete(request: Request, response: Response) {
    await service.delete(request.params.id);
    response.status(204).send();
  }
}
