import styled from 'styled-components';

const Box = styled.div`
  border: 1px solid rgba(245, 134, 115, .35);
  border-radius: 18px;
  padding: 18px;
  color: var(--cream);
  background: rgba(141, 48, 64, .18);
`;

export function ErrorState({ text = 'Nao foi possivel conectar a API. Verifique o back-end e o banco de dados.' }: { text?: string }) {
  return <Box>{text}</Box>;
}
