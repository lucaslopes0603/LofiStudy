import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { sessionsApi, subjectsApi } from '../api/resources';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Field, Input, Select, Textarea } from '../components/ui/Form';
import { useAsync } from '../hooks/useAsync';
import { Dot, FormGrid, Header, List, Panel, Row } from './PageParts';

const schema = z.object({
  subjectId: z.string().min(1),
  studiedAt: z.string(),
  durationMinutes: z.coerce.number().min(1),
  type: z.enum(['manual', 'pomodoro']),
  description: z.string().optional(),
  focusLevel: z.coerce.number().min(1).max(5),
  difficultyLevel: z.coerce.number().min(1).max(5),
  reviewContent: z.boolean().optional(),
  notes: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export function SessionsPage() {
  const subjects = useAsync(() => subjectsApi.list(), []);
  const sessions = useAsync(() => sessionsApi.list(), []);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { studiedAt: new Date().toISOString().slice(0, 10), type: 'manual', focusLevel: 4, difficultyLevel: 3 }
  });

  const submit = form.handleSubmit(async (data) => {
    await sessionsApi.create({ ...data, reviewContent: Boolean(data.reviewContent), notes: data.notes ?? '' });
    form.reset();
    sessions.refresh();
  });

  if (subjects.loading || sessions.loading) return <LoadingState />;
  if (subjects.error || sessions.error) return <ErrorState />;

  return (
    <>
      <Header>
        <div>
          <h2>Sessoes</h2>
          <p>Registre blocos manuais, ajuste foco e dificuldade, e marque conteudos que precisam de revisao espacada.</p>
        </div>
      </Header>
      <Card><Panel>
        <FormGrid onSubmit={submit}>
          <Field>Materia <Select {...form.register('subjectId')}><option value="">Selecione</option>{subjects.data?.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</Select></Field>
          <Field>Data <Input type="date" {...form.register('studiedAt')} /></Field>
          <Field>Duração <Input type="number" {...form.register('durationMinutes')} /></Field>
          <Field>Tipo <Select {...form.register('type')}><option value="manual">Manual</option><option value="pomodoro">Pomodoro</option></Select></Field>
          <Field>Foco <Input min="1" max="5" type="number" {...form.register('focusLevel')} /></Field>
          <Field>Dificuldade <Input min="1" max="5" type="number" {...form.register('difficultyLevel')} /></Field>
          <Field className="full">Descricao <Input {...form.register('description')} /></Field>
          <Field className="full">Notas <Textarea {...form.register('notes')} /></Field>
          <Field><span><input type="checkbox" {...form.register('reviewContent')} /> criar revisoes</span></Field>
          <Button><Plus size={18} /> Salvar sessao</Button>
        </FormGrid>
      </Panel></Card>
      <Card style={{ marginTop: 16 }}><Panel>
        <List>
          {sessions.data?.length === 0 && <EmptyState text="Nenhuma sessao registrada." />}
          {sessions.data?.map((session) => (
            <Row key={session.id}>
              <span><Dot color={session.subjectColor} /> {session.subjectName} · {session.description || 'Estudo'} · {session.durationMinutes}min</span>
              <Button variant="ghost" onClick={() => sessionsApi.remove(session.id).then(sessions.refresh)}><Trash2 size={16} /></Button>
            </Row>
          ))}
        </List>
      </Panel></Card>
    </>
  );
}
