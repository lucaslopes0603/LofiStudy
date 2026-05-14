import { Router } from 'express';
import { StatsController } from '../controllers/StatsController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const statsRoutes = Router();

statsRoutes.get('/summary', asyncHandler(StatsController.summary as any));
statsRoutes.get('/weekly', asyncHandler(StatsController.weekly as any));
