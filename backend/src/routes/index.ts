import { Router } from 'express';
import { goalsRoutes } from './goals.routes.js';
import { reviewsRoutes } from './reviews.routes.js';
import { statsRoutes } from './stats.routes.js';
import { studySessionsRoutes } from './studySessions.routes.js';
import { subjectsRoutes } from './subjects.routes.js';

export const routes = Router();

routes.get('/health', (_request, response) => response.json({ ok: true, service: 'lofi-study-api' }));
routes.use('/subjects', subjectsRoutes);
routes.use('/study-sessions', studySessionsRoutes);
routes.use('/stats', statsRoutes);
routes.use('/goals', goalsRoutes);
routes.use('/reviews', reviewsRoutes);
