export type ReviewStatus = 'pending' | 'done';

export interface Review {
  id: string;
  subjectId: string;
  studySessionId?: string | null;
  title: string;
  dueDate: string;
  status: ReviewStatus;
  notes?: string | null;
  subjectName?: string;
  subjectColor?: string;
}
