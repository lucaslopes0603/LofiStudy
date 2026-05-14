import { Request, Response } from 'express';
import { SubjectService } from '../services/SubjectService.js';

const service = new SubjectService();

export class SubjectController {
  static async index(_request: Request, response: Response) {
    response.json(await service.list());
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
