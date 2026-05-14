import { Router } from 'express';
import { GoalController } from '../controllers/GoalController.js';
import { idParamSchema } from '../dtos/common.dto.js';
import { createGoalSchema, updateGoalSchema } from '../dtos/goal.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';

export const goalsRoutes = Router();

goalsRoutes.get('/', asyncHandler(GoalController.index));
goalsRoutes.post('/', validate(createGoalSchema), asyncHandler(GoalController.create));
goalsRoutes.put('/:id', validate(idParamSchema.merge(updateGoalSchema)), asyncHandler(GoalController.update));
goalsRoutes.delete('/:id', validate(idParamSchema), asyncHandler(GoalController.delete));
