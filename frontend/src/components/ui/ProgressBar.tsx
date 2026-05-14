import { motion } from 'framer-motion';
import styled from 'styled-components';

const Track = styled.div`
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
`;

const Fill = styled(motion.div)<{ color?: string }>`
  height: 100%;
  border-radius: inherit;
  background: ${({ color }) => color ?? 'linear-gradient(90deg, var(--coral), var(--rose))'};
`;

export function ProgressBar({ value, color }: { value: number; color?: string }) {
  return (
    <Track>
      <Fill color={color} initial={{ width: 0 }} animate={{ width: `${Math.min(value, 100)}%` }} transition={{ duration: .7 }} />
    </Track>
  );
}
