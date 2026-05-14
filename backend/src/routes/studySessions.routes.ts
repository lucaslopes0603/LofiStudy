import { Router } from 'express';
import { StudySessionController } from '../controllers/StudySessionController.js';
import { idParamSchema } from '../dtos/common.dto.js';
import { createSessionSchema, updateSessionSchema } from '../dtos/session.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';

export const studySessionsRoutes = Router();

studySessionsRoutes.get('/', asyncHandler(StudySessionController.index));
studySessionsRoutes.post('/', validate(createSessionSchema), asyncHandler(StudySessionController.create));
studySessionsRoutes.put('/:id', validate(idParamSchema.merge(updateSessionSchema)), asyncHandler(StudySessionController.update));
studySessionsRoutes.delete('/:id', validate(idParamSchema), asyncHandler(StudySessionController.delete));
