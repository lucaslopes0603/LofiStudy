import { Pause, Play, Radio } from 'lucide-react';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from './ui/Button';

const Dock = styled.div`
  position: fixed;
  right: 22px;
  bottom: 18px;
  z-index: 20;
  width: min(360px, calc(100vw - 32px));
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(24, 10, 15, .78);
  box-shadow: var(--shadow);
  backdrop-filter: blur(16px);
  padding: 12px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
`;

const Meta = styled.div`
  min-width: 0;
  strong { display: block; }
  span { display: block; color: var(--muted); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  input { width: 100%; accent-color: var(--coral); }
`;

export function LofiPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const audio = useRef<{ ctx: AudioContext; gain: GainNode; osc: OscillatorNode } | null>(null);

  const toggle = () => {
    if (playing) {
      audio.current?.ctx.close();
      audio.current = null;
      setPlaying(false);
      return;
    }
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 174;
    gain.gain.value = volume * 0.08;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    audio.current = { ctx, gain, osc };
    setPlaying(true);
  };

  const changeVolume = (value: number) => {
    setVolume(value);
    if (audio.current) audio.current.gain.gain.value = value * 0.08;
  };

  return (
    <Dock>
      <Button type="button" aria-label="Tocar radio lofi" onClick={toggle}>{playing ? <Pause size={18} /> : <Play size={18} />}</Button>
      <Meta>
        <strong><Radio size={14} /> Lofi radio</strong>
        <span>Sintetizador discreto local, iniciado somente por clique</span>
        <input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => changeVolume(Number(e.target.value))} />
      </Meta>
    </Dock>
  );
}
