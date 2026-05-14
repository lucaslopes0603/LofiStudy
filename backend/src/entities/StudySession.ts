export type StudySessionType = 'pomodoro' | 'manual';

export interface StudySession {
  id: string;
  subjectId: string;
  subjectName?: string;
  subjectColor?: string;
  studiedAt: string;
  durationMinutes: number;
  type: StudySessionType;
  description?: string | null;
  focusLevel: number;
  difficultyLevel: number;
  reviewContent: boolean;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}
