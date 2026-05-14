import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { subjectsApi } from '../api/resources';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Field, Input, Textarea } from '../components/ui/Form';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useAsync } from '../hooks/useAsync';
import { Dot, FormGrid, Grid, Header, Panel } from './PageParts';

const schema = z.object({
  name: z.string().min(2),
  color: z.string(),
  weeklyGoalHours: z.coerce.number().min(1),
  description: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export function SubjectsPage() {
  const subjects = useAsync(() => subjectsApi.list(), []);
  const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { color: '#f58673', weeklyGoalHours: 5 } });

  const submit = form.handleSubmit(async (data) => {
    await subjectsApi.create(data);
    form.reset({ color: '#f58673', weeklyGoalHours: 5, name: '', description: '' });
    subjects.refresh();
  });

  if (subjects.loading) return <LoadingState />;
  if (subjects.error) return <ErrorState />;

  return (
    <>
      <Header>
        <div>
          <h2>Materias</h2>
          <p>Organize areas de estudo com cor, meta semanal e contexto suficiente para planejar sem friccao.</p>
        </div>
      </Header>
      <Card><Panel>
        <FormGrid onSubmit={submit}>
          <Field>Nome <Input {...form.register('name')} placeholder="Fisica" /></Field>
          <Field>Cor <Input type="color" {...form.register('color')} /></Field>
          <Field>Meta semanal em horas <Input type="number" {...form.register('weeklyGoalHours')} /></Field>
          <Field className="full">Descricao <Textarea {...form.register('description')} /></Field>
          <Button><Plus size={18} /> Criar materia</Button>
        </FormGrid>
      </Panel></Card>
      <Grid style={{ marginTop: 16 }}>
        {subjects.data?.length === 0 && <EmptyState text="Nenhuma materia cadastrada ainda." />}
        {subjects.data?.map((subject) => (
          <Card key={subject.id}><Panel>
            <h3><Dot color={subject.color} /> {subject.name}</h3>
            <p style={{ color: 'var(--muted)', minHeight: 44 }}>{subject.description || 'Sem descricao.'}</p>
            <ProgressBar value={65} color={subject.color} />
            <p>{subject.weeklyGoalHours}h por semana</p>
            <Button variant="ghost" onClick={() => subjectsApi.remove(subject.id).then(subjects.refresh)}><Trash2 size={16} /> Excluir</Button>
          </Panel></Card>
        ))}
      </Grid>
    </>
  );
}
