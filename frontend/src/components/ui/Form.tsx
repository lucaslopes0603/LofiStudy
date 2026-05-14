import styled from 'styled-components';

export const Field = styled.label`
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 800;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 44px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255,255,255,.055);
  color: #fff7ec;
  padding: 0 12px;
  outline: none;

  &:focus { border-color: rgba(245, 134, 115, .7); }
`;

export const Select = styled.select`
  width: 100%;
  min-height: 44px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #241018;
  color: #fff7ec;
  padding: 0 12px;
  outline: none;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255,255,255,.055);
  color: #fff7ec;
  padding: 12px;
  outline: none;
  resize: vertical;
`;
