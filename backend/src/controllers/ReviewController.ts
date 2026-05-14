import { Request, Response } from 'express';
import { ReviewService } from '../services/ReviewService.js';

const service = new ReviewService();

export class ReviewController {
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
