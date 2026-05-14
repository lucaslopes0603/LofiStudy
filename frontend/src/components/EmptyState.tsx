import styled from 'styled-components';

const Box = styled.div`
  border: 1px dashed var(--line);
  border-radius: 18px;
  padding: 28px;
  color: var(--muted);
  text-align: center;
`;

export function EmptyState({ text }: { text: string }) {
  return <Box>{text}</Box>;
}
