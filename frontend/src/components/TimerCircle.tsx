import styled from 'styled-components';

const Wrap = styled.div`
  position: relative;
  width: min(330px, 78vw);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
  filter: drop-shadow(0 26px 40px rgba(217, 75, 95, .18));
`;

const Time = styled.div`
  text-align: center;
  strong {
    display: block;
    font-family: 'Fraunces', serif;
    font-size: clamp(54px, 12vw, 88px);
    line-height: .95;
  }
  span { color: var(--muted); font-weight: 800; }
`;

export function TimerCircle({ progress, label, seconds }: { progress: number; label: string; seconds: number }) {
  const radius = 142;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');

  return (
    <Wrap>
      <Svg viewBox="0 0 320 320">
        <circle cx="160" cy="160" r={radius} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="18" />
        <circle cx="160" cy="160" r={radius} fill="none" stroke="url(#timer)" strokeWidth="18" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
        <defs>
          <linearGradient id="timer"><stop stopColor="#f58673" /><stop offset="1" stopColor="#d94b5f" /></linearGradient>
        </defs>
      </Svg>
      <Time>
        <strong>{minutes}:{sec}</strong>
        <span>{label}</span>
      </Time>
    </Wrap>
  );
}
