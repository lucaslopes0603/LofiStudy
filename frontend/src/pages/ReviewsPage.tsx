import { Check, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { reviewsApi, subjectsApi } from '../api/resources';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { LoadingState } from '../components/LoadingState';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Field, Input, Select, Textarea } from '../components/ui/Form';
import { useAsync } from '../hooks/useAsync';
import { Dot, FormGrid, Header, List, Panel, Row } from './PageParts';

export function ReviewsPage() {
  const reviews = useAsync(() => reviewsApi.list(), []);
  const subjects = useAsync(() => subjectsApi.list(), []);
  const [form, setForm] = useState({ subjectId: '', title: '', dueDate: new Date().toISOString().slice(0, 10), notes: '' });

  if (reviews.loading || subjects.loading) return <LoadingState />;
  if (reviews.error || subjects.error) return <ErrorState />;
  const pending = reviews.data?.filter((review) => review.status === 'pending') ?? [];

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    await reviewsApi.create({ ...form, status: 'pending' });
    setForm({ subjectId: '', title: '', dueDate: new Date().toISOString().slice(0, 10), notes: '' });
    reviews.refresh();
  };

  return (
    <>
      <Header>
        <div><h2>Revisoes</h2><p>Pendencias criadas manualmente ou automaticamente em ciclos de 1, 7 e 30 dias.</p></div>
      </Header>
      <Card><Panel>
        <FormGrid onSubmit={create}>
          <Field>Materia <Select value={form.subjectId} onChange={(e) => setForm({ ...form, subjectId: e.target.value })}><option value="">Selecione</option>{subjects.data?.map((s) => <option value={s.id} key={s.id}>{s.name}</option>)}</Select></Field>
          <Field>Data <Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></Field>
          <Field className="full">Titulo <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field className="full">Notas <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
          <Button><Plus size={18} /> Criar revisao</Button>
        </FormGrid>
      </Panel></Card>
      <Card style={{ marginTop: 16 }}><Panel>
        <List>
          {pending.length === 0 && <EmptyState text="Nenhuma revisao pendente." />}
          {pending.map((review) => (
            <Row key={review.id}>
              <span><Dot color={review.subjectColor} /> {review.title} · {review.subjectName} · {review.dueDate}</span>
              <span style={{ display: 'flex', gap: 8 }}>
                <Button variant="ghost" onClick={() => reviewsApi.update(review.id, { status: 'done' }).then(reviews.refresh)}><Check size={16} /></Button>
                <Button variant="ghost" onClick={() => reviewsApi.remove(review.id).then(reviews.refresh)}><Trash2 size={16} /></Button>
              </span>
            </Row>
          ))}
        </List>
      </Panel></Card>
    </>
  );
}
