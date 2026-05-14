import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController.js';
import { idParamSchema } from '../dtos/common.dto.js';
import { createReviewSchema, updateReviewSchema } from '../dtos/review.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';

export const reviewsRoutes = Router();

reviewsRoutes.get('/', asyncHandler(ReviewController.index));
reviewsRoutes.post('/', validate(createReviewSchema), asyncHandler(ReviewController.create));
reviewsRoutes.put('/:id', validate(idParamSchema.merge(updateReviewSchema)), asyncHandler(ReviewController.update));
reviewsRoutes.delete('/:id', validate(idParamSchema), asyncHandler(ReviewController.delete));
