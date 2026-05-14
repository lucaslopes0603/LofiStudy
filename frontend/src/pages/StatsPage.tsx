import { Award, Brain, Flame } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { statsApi } from '../api/resources';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { Card } from '../components/ui/Card';
import { StatCard } from '../components/ui/StatCard';
import { useAsync } from '../hooks/useAsync';
import { Grid, Header, Panel } from './PageParts';

export function StatsPage() {
  const summary = useAsync(() => statsApi.summary(), []);
  const stats = useAsync(() => statsApi.weekly(), []);
  if (summary.loading || stats.loading) return <LoadingState />;
  if (summary.error || stats.error) return <ErrorState />;

  const weekly = stats.data?.weekly.map((item) => ({ ...item, hours: Number((item.minutes / 60).toFixed(1)) })) ?? [];
  const subjects = stats.data?.subjects.map((item) => ({ ...item, hours: Number((item.minutes / 60).toFixed(1)) })) ?? [];
  const focus = stats.data?.focus ?? [];

  return (
    <>
      <Header>
        <div><h2>Estatisticas</h2><p>Graficos para entender cadencia, materias dominantes e qualidade percebida do foco.</p></div>
      </Header>
      <Grid>
        <StatCard label="Total estudado" value={`${Math.round((summary.data?.totalMinutes ?? 0) / 60)}h`} icon={<Award />} />
        <StatCard label="Dias seguidos" value={`${summary.data?.streakDays ?? 0}`} icon={<Flame />} />
        <StatCard label="Insight" value="Calmo" icon={<Brain />} />
      </Grid>
      <Grid columns={2} style={{ marginTop: 16 }}>
        <Card><Panel><h3>Horas por semana</h3><ResponsiveContainer width="100%" height={260}><AreaChart data={weekly}><CartesianGrid stroke="rgba(255,255,255,.08)" /><XAxis dataKey="day" stroke="#bfa5a1" /><YAxis stroke="#bfa5a1" /><Tooltip /><Area type="monotone" dataKey="hours" stroke="#f58673" fill="#8d3040" /></AreaChart></ResponsiveContainer></Panel></Card>
        <Card><Panel><h3>Materias mais estudadas</h3><ResponsiveContainer width="100%" height={260}><BarChart data={subjects}><XAxis dataKey="name" stroke="#bfa5a1" /><YAxis stroke="#bfa5a1" /><Tooltip /><Bar dataKey="hours">{subjects.map((s, i) => <Cell key={i} fill={s.color} />)}</Bar></BarChart></ResponsiveContainer></Panel></Card>
        <Card><Panel><h3>Evolucao do foco</h3><ResponsiveContainer width="100%" height={260}><LineChart data={focus}><XAxis dataKey="day" stroke="#bfa5a1" /><YAxis domain={[1, 5]} stroke="#bfa5a1" /><Tooltip /><Line type="monotone" dataKey="focus" stroke="#ff9a76" strokeWidth={3} /></LineChart></ResponsiveContainer></Panel></Card>
        <Card><Panel><h3>Insights automaticos</h3><p style={{ color: 'var(--muted)' }}>Sua rotina rende melhor quando alterna materias densas com revisoes curtas. Mantenha a meta diaria visivel e proteja o primeiro ciclo do dia.</p></Panel></Card>
      </Grid>
    </>
  );
}
