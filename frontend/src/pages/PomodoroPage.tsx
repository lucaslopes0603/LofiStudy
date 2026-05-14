import { Pause, Play, RefreshCcw, ScanLine } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { sessionsApi, subjectsApi } from '../api/resources';
import { LoadingState } from '../components/LoadingState';
import { ErrorState } from '../components/ErrorState';
import { TimerCircle } from '../components/TimerCircle';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Field, Input, Select, Textarea } from '../components/ui/Form';
import { useAsync } from '../hooks/useAsync';
import { Header, Panel } from './PageParts';

const modes = {
  focus: { label: 'Foco', minutes: 25 },
  short: { label: 'Pausa curta', minutes: 5 },
  long: { label: 'Pausa longa', minutes: 15 }
};

const Board = styled(Card)`
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  align-items: center;

  @media (max-width: 880px) { grid-template-columns: 1fr; justify-items: center; }
`;

function playFinishTone() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.value = 660;
  gain.gain.value = 0.08;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.35);
}

const Controls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 18px;
`;

export function PomodoroPage() {
  const subjects = useAsync(() => subjectsApi.list(), []);
  const [mode, setMode] = useState<keyof typeof modes>('focus');
  const totalSeconds = modes[mode].minutes * 60;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [subjectId, setSubjectId] = useState('');
  const [description, setDescription] = useState('');
  const progress = useMemo(() => 1 - seconds / totalSeconds, [seconds, totalSeconds]);

  useEffect(() => {
    setSeconds(totalSeconds);
    setRunning(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(async () => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          playFinishTone();
          if (mode === 'focus' && subjectId) {
            sessionsApi.create({
              subjectId,
              studiedAt: new Date().toISOString().slice(0, 10),
              durationMinutes: modes.focus.minutes,
              type: 'pomodoro',
              description,
              focusLevel: 4,
              difficultyLevel: 3,
              reviewContent: false,
              notes: ''
            });
          }
          return totalSeconds;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, mode, subjectId, description, totalSeconds]);

  if (subjects.loading) return <LoadingState />;
  if (subjects.error) return <ErrorState />;
  const canStart = mode !== 'focus' || Boolean(subjectId);

  return (
    <>
      <Header>
        <div>
          <h2>Pomodoro</h2>
          <p>Entre no modo foco com um ciclo claro, musica discreta e salvamento automatico da sessao concluida.</p>
        </div>
        <Button variant="ghost"><ScanLine size={18} /> Modo foco</Button>
      </Header>
      <Board>
        <Panel>
          <Controls>
            {Object.entries(modes).map(([key, item]) => (
              <Button key={key} variant={mode === key ? 'primary' : 'ghost'} onClick={() => setMode(key as keyof typeof modes)}>{item.label}</Button>
            ))}
          </Controls>
          <div style={{ display: 'grid', gap: 14, marginTop: 22 }}>
            <Field>Materia
              <Select value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                <option value="">Escolha antes de iniciar</option>
                {subjects.data?.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
              </Select>
            </Field>
            <Field>Descricao
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="O que sera estudado neste bloco?" />
            </Field>
          </div>
          <Controls>
            <Button disabled={!canStart} onClick={() => setRunning(true)}><Play size={18} /> {seconds === totalSeconds ? 'Iniciar' : 'Continuar'}</Button>
            <Button variant="ghost" onClick={() => setRunning(false)}><Pause size={18} /> Pausar</Button>
            <Button variant="ghost" onClick={() => { setRunning(false); setSeconds(totalSeconds); }}><RefreshCcw size={18} /> Resetar</Button>
          </Controls>
        </Panel>
        <TimerCircle progress={progress} label={modes[mode].label} seconds={seconds} />
      </Board>
    </>
  );
}
