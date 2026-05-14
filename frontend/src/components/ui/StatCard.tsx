import styled from 'styled-components';
import { Card } from './Card';

const Box = styled(Card)`
  padding: 18px;
  min-height: 132px;
  display: grid;
  align-content: space-between;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--muted);
`;

const Value = styled.strong`
  font-family: 'Fraunces', serif;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1;
`;

export function StatCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <Box>
      <Top><span>{label}</span>{icon}</Top>
      <Value>{value}</Value>
    </Box>
  );
}
