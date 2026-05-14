import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 18px;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    font-family: 'Fraunces', serif;
    font-size: clamp(36px, 7vw, 72px);
    letter-spacing: 0;
    line-height: .95;
  }
  p { margin: 10px 0 0; color: var(--muted); max-width: 640px; }

  @media (max-width: 760px) {
    display: grid;
    align-items: start;
  }
`;

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns ?? 3}, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 980px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const Panel = styled.div`
  padding: 20px;
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  .full { grid-column: 1 / -1; }

  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const List = styled.div`
  display: grid;
  gap: 12px;
`;

export const Row = styled.div`
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255,255,255,.045);
  padding: 14px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Dot = styled.span<{ color?: string }>`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
  background: ${({ color }) => color ?? 'var(--coral)'};
  box-shadow: 0 0 22px ${({ color }) => color ?? 'var(--coral)'};
`;
