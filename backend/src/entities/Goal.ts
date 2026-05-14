export type GoalScope = 'daily' | 'weekly_subject';

export interface Goal {
  id: string;
  title: string;
  scope: GoalScope;
  targetMinutes: number;
  subjectId?: string | null;
  startsOn: string;
  endsOn?: string | null;
}
