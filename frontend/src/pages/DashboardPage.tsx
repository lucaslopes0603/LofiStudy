import { BookOpen, Flame, Timer, Trophy } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { ErrorState } from '../components/ErrorState';
import { StatCard } from '../components/ui/StatCard';
import { LoadingState } from '../components/LoadingState';
import { goalsApi, sessionsApi, statsApi, subjectsApi } from '../api/resources';
import { useAsync } from '../hooks/useAsync';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Dot, Grid, Header, List, Panel, Row } from './PageParts';

const hours = (m: number) => `${Math.floor(m / 60)}h ${m % 60}m`;

export function DashboardPage() {
  const summary = useAsync(() => statsApi.summary(), []);
  const subjects = useAsync(() => subjectsApi.list(), []);
  const sessions = useAsync(() => sessionsApi.list(), []);
  const goals = useAsync(() => goalsApi.list(), []);

  if (summary.loading || subjects.loading || sessions.loading || goals.loading) return <LoadingState />;
  if (summary.error || subjects.error || sessions.error || goals.error) return <ErrorState />;
  const todayGoal = goals.data?.find((goal) => goal.scope === 'daily')?.targetMinutes ?? 90;
  const todayProgress = Math.round(((summary.data?.todayMinutes ?? 0) / todayGoal) * 100);
  const recent = sessions.data?.slice(0, 4) ?? [];

  return (
    <>
      <Header>
        <div>
          <h2>Boa noite, estudante.</h2>
          <p>Seu quarto de estudos esta pronto: vinho quente na paleta, luz baixa e o proximo bloco de foco a um clique.</p>
        </div>
      </Header>
      <Grid>
        <StatCard label="Estudado hoje" value={hours(summary.data?.todayMinutes ?? 0)} icon={<Timer />} />
        <StatCard label="Pomodoros" value={`${summary.data?.todayPomodoros ?? 0}`} icon={<Trophy />} />
        <StatCard label="Streak" value={`${summary.data?.streakDays ?? 0} dias`} icon={<Flame />} />
      </Grid>
      <Grid columns={2} style={{ marginTop: 16 }}>
        <Card><Panel>
          <h3>Meta diaria</h3>
          <p style={{ color: 'var(--muted)' }}>{todayProgress >= 100 ? 'Meta atingida. Excelente ritmo.' : `${hours(summary.data?.todayMinutes ?? 0)} de ${hours(todayGoal)}`}</p>
          <ProgressBar value={todayProgress} />
        </Panel></Card>
        <Card><Panel>
          <h3>Materias estudadas</h3>
          <List>
            {(subjects.data ?? []).map((subject) => (
              <Row key={subject.id}><span><Dot color={subject.color} /> {subject.name}</span><span>{subject.weeklyGoalHours}h/semana</span></Row>
            ))}
          </List>
        </Panel></Card>
      </Grid>
      <Card style={{ marginTop: 16 }}><Panel>
        <h3><BookOpen size={18} /> Ultimas sessoes</h3>
        <List>
          {recent.map((session) => (
            <Row key={session.id}>
              <span><Dot color={session.subjectColor} /> {session.subjectName} · {session.description || 'Sessao de estudo'}</span>
              <span>{hours(session.durationMinutes)}</span>
            </Row>
          ))}
        </List>
      </Panel></Card>
    </>
  );
}
