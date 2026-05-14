import { api } from './client';
import { demoGoals, demoReviews, demoSessions, demoSubjects, demoSummary, demoWeekly, withId } from './demo';
import { Goal, Review, StudySession, Subject, Summary } from '../types';

const fallback = async <T>(request: Promise<T>, demo: T) => {
  try {
    return await request;
  } catch {
    return demo;
  }
};

export const subjectsApi = {
  list: () => fallback(api.get<Subject[]>('/subjects').then((res) => res.data), demoSubjects),
  create: (data: Omit<Subject, 'id'>) => fallback(api.post<Subject>('/subjects', data).then((res) => res.data), withId(data)),
  update: (id: string, data: Partial<Subject>) => fallback(api.put<Subject>(`/subjects/${id}`, data).then((res) => res.data), { ...demoSubjects[0], ...data, id }),
  remove: (id: string) => fallback(api.delete(`/subjects/${id}`), undefined)
};

export const sessionsApi = {
  list: () => fallback(api.get<StudySession[]>('/study-sessions').then((res) => res.data), demoSessions),
  create: (data: Omit<StudySession, 'id' | 'subjectName' | 'subjectColor'>) => fallback(api.post<StudySession>('/study-sessions', data).then((res) => res.data), withId(data)),
  update: (id: string, data: Partial<StudySession>) => fallback(api.put<StudySession>(`/study-sessions/${id}`, data).then((res) => res.data), { ...demoSessions[0], ...data, id }),
  remove: (id: string) => fallback(api.delete(`/study-sessions/${id}`), undefined)
};

export const statsApi = {
  summary: () => fallback(api.get<Summary>('/stats/summary').then((res) => res.data), demoSummary),
  weekly: () => fallback(api.get<{ weekly: any[]; subjects: any[]; focus: any[] }>('/stats/weekly').then((res) => res.data), demoWeekly)
};

export const goalsApi = {
  list: () => fallback(api.get<Goal[]>('/goals').then((res) => res.data), demoGoals),
  create: (data: Omit<Goal, 'id'>) => fallback(api.post<Goal>('/goals', data).then((res) => res.data), withId(data)),
  remove: (id: string) => fallback(api.delete(`/goals/${id}`), undefined)
};

export const reviewsApi = {
  list: () => fallback(api.get<Review[]>('/reviews').then((res) => res.data), demoReviews),
  create: (data: Omit<Review, 'id' | 'subjectName' | 'subjectColor'>) => fallback(api.post<Review>('/reviews', data).then((res) => res.data), withId(data)),
  update: (id: string, data: Partial<Review>) => fallback(api.put<Review>(`/reviews/${id}`, data).then((res) => res.data), { ...demoReviews[0], ...data, id }),
  remove: (id: string) => fallback(api.delete(`/reviews/${id}`), undefined)
};
