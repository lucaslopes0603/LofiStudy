import { Router } from 'express';
import { SubjectController } from '../controllers/SubjectController.js';
import { idParamSchema } from '../dtos/common.dto.js';
import { createSubjectSchema, updateSubjectSchema } from '../dtos/subject.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';

export const subjectsRoutes = Router();

subjectsRoutes.get('/', asyncHandler(SubjectController.index));
subjectsRoutes.post('/', validate(createSubjectSchema), asyncHandler(SubjectController.create));
subjectsRoutes.put('/:id', validate(idParamSchema.merge(updateSubjectSchema)), asyncHandler(SubjectController.update));
subjectsRoutes.delete('/:id', validate(idParamSchema), asyncHandler(SubjectController.delete));
