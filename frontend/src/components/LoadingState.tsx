import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  50% { opacity: .45; transform: scale(.96); }
`;

const Box = styled.div`
  padding: 28px;
  color: var(--muted);
  display: flex;
  gap: 12px;
  align-items: center;

  &::before {
    content: "";
    width: 12px;
    height: 12px;
    border-radius: 999px;
    background: var(--coral);
    animation: ${pulse} 1s infinite;
  }
`;

export function LoadingState() {
  return <Box>Carregando dados...</Box>;
}
