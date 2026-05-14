export interface Subject {
  id: string;
  name: string;
  color: string;
  weeklyGoalHours: number;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}
