export interface Subject {
  id: string;
  name: string;
  color: string;
  weeklyGoalHours: number;
  description?: string | null;
}

export interface StudySession {
  id: string;
  subjectId: string;
  subjectName?: string;
  subjectColor?: string;
  studiedAt: string;
  durationMinutes: number;
  type: 'pomodoro' | 'manual';
  description?: string | null;
  focusLevel: number;
  difficultyLevel: number;
  reviewContent: boolean;
  notes?: string | null;
}

export interface Goal {
  id: string;
  title: string;
  scope: 'daily' | 'weekly_subject';
  targetMinutes: number;
  subjectId?: string | null;
}

export interface Review {
  id: string;
  subjectId: string;
  subjectName?: string;
  subjectColor?: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'done';
  notes?: string | null;
}

export interface Summary {
  todayMinutes: number;
  todayPomodoros: number;
  todaySubjects: number;
  totalMinutes: number;
  streakDays: number;
}
