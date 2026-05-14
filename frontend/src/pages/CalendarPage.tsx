import { CalendarPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { sessionsApi } from '../api/resources';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useAsync } from '../hooks/useAsync';
import { Dot, Header, List, Panel, Row } from './PageParts';

const Month = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
`;

const Day = styled.button<{ active?: boolean; marked?: boolean }>`
  min-height: 86px;
  border: 1px solid ${({ active }) => (active ? 'rgba(245,134,115,.72)' : 'var(--line)')};
  border-radius: 16px;
  background: ${({ marked }) => (marked ? 'rgba(217, 75, 95, .18)' : 'rgba(255,255,255,.045)')};
  color: #fff7ec;
  text-align: left;
  padding: 10px;
`;

export function CalendarPage() {
  const sessions = useAsync(() => sessionsApi.list(), []);
  const [selected, setSelected] = useState(new Date().toISOString().slice(0, 10));
  const days = useMemo(() => {
    const now = new Date();
    return Array.from({ length: new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() }, (_, index) => {
      const d = new Date(now.getFullYear(), now.getMonth(), index + 1);
      return d.toISOString().slice(0, 10);
    });
  }, []);
  if (sessions.loading) return <LoadingState />;
  if (sessions.error) return <ErrorState />;
  const selectedSessions = sessions.data?.filter((s) => s.studiedAt === selected) ?? [];
  const marked = new Set(sessions.data?.map((s) => s.studiedAt));

  return (
    <>
      <Header>
        <div><h2>Calendario</h2><p>Veja a constancia do mes e abra cada dia para revisar o que foi feito.</p></div>
        <Button><CalendarPlus size={18} /> Registrar estudo</Button>
      </Header>
      <Card><Panel><Month>
        {days.map((day) => <Day key={day} active={day === selected} marked={marked.has(day)} onClick={() => setSelected(day)}>{Number(day.slice(-2))}</Day>)}
      </Month></Panel></Card>
      <Card style={{ marginTop: 16 }}><Panel>
        <h3>{selected}</h3>
        <List>
          {selectedSessions.length === 0 && <EmptyState text="Sem estudo neste dia." />}
          {selectedSessions.map((session) => (
            <Row key={session.id}><span><Dot color={session.subjectColor} /> {session.subjectName} · {session.description}</span><span>{session.durationMinutes}min</span></Row>
          ))}
        </List>
      </Panel></Card>
    </>
  );
}
