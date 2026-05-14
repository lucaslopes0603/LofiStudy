import { Goal, Review, StudySession, Subject, Summary } from '../types';

const today = new Date();
const iso = (offset = 0) => {
  const date = new Date(today);
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
};

export const demoSubjects: Subject[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Matematica',
    color: '#f58673',
    weeklyGoalHours: 6,
    description: 'Algebra, funcoes e listas de exercicios com revisao guiada.'
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Historia',
    color: '#b84a62',
    weeklyGoalHours: 4,
    description: 'Linha do tempo, mapas mentais e flashcards curtos.'
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Ingles',
    color: '#ff9a76',
    weeklyGoalHours: 5,
    description: 'Listening, leitura e vocabulario em ciclos leves.'
  }
];

export const demoSessions: StudySession[] = [
  {
    id: 's1',
    subjectId: demoSubjects[0].id,
    subjectName: demoSubjects[0].name,
    subjectColor: demoSubjects[0].color,
    studiedAt: iso(),
    durationMinutes: 50,
    type: 'pomodoro',
    description: 'Equacoes quadraticas',
    focusLevel: 4,
    difficultyLevel: 3,
    reviewContent: true,
    notes: 'Rever discriminante e fatoracao.'
  },
  {
    id: 's2',
    subjectId: demoSubjects[2].id,
    subjectName: demoSubjects[2].name,
    subjectColor: demoSubjects[2].color,
    studiedAt: iso(),
    durationMinutes: 25,
    type: 'pomodoro',
    description: 'Reading practice',
    focusLevel: 5,
    difficultyLevel: 2,
    reviewContent: false,
    notes: 'Texto curto sem legenda.'
  },
  {
    id: 's3',
    subjectId: demoSubjects[1].id,
    subjectName: demoSubjects[1].name,
    subjectColor: demoSubjects[1].color,
    studiedAt: iso(-1),
    durationMinutes: 45,
    type: 'manual',
    description: 'Era Vargas',
    focusLevel: 3,
    difficultyLevel: 4,
    reviewContent: true,
    notes: 'Criar flashcards.'
  },
  {
    id: 's4',
    subjectId: demoSubjects[0].id,
    subjectName: demoSubjects[0].name,
    subjectColor: demoSubjects[0].color,
    studiedAt: iso(-2),
    durationMinutes: 60,
    type: 'manual',
    description: 'Lista de exercicios',
    focusLevel: 4,
    difficultyLevel: 4,
    reviewContent: false,
    notes: 'Atenção aos sinais.'
  }
];

export const demoGoals: Goal[] = [
  { id: 'g1', title: 'Meta diaria de foco', scope: 'daily', targetMinutes: 90 },
  { id: 'g2', title: 'Matematica da semana', scope: 'weekly_subject', targetMinutes: 360, subjectId: demoSubjects[0].id }
];

export const demoReviews: Review[] = [
  {
    id: 'r1',
    subjectId: demoSubjects[0].id,
    subjectName: demoSubjects[0].name,
    subjectColor: demoSubjects[0].color,
    title: 'Revisar equacoes quadraticas',
    dueDate: iso(1),
    status: 'pending',
    notes: 'Refazer 5 questoes.'
  },
  {
    id: 'r2',
    subjectId: demoSubjects[1].id,
    subjectName: demoSubjects[1].name,
    subjectColor: demoSubjects[1].color,
    title: 'Linha do tempo Era Vargas',
    dueDate: iso(7),
    status: 'pending',
    notes: 'Comparar fases do governo.'
  }
];

export const demoSummary: Summary = {
  todayMinutes: 75,
  todayPomodoros: 2,
  todaySubjects: 2,
  totalMinutes: 180,
  streakDays: 4
};

export const demoWeekly = {
  weekly: [-6, -5, -4, -3, -2, -1, 0].map((offset, index) => ({
    day: iso(offset),
    minutes: [25, 50, 0, 45, 60, 35, 75][index]
  })),
  subjects: demoSubjects.map((subject, index) => ({
    name: subject.name,
    color: subject.color,
    minutes: [110, 45, 60][index]
  })),
  focus: [-5, -4, -3, -2, -1, 0].map((offset, index) => ({
    day: iso(offset),
    focus: [3.6, 4.1, 3.9, 4.3, 4.0, 4.7][index]
  }))
};

export function withId<T extends object>(data: T): T & { id: string } {
  return { ...data, id: `demo-${Date.now()}` };
}
