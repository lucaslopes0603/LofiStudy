import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Button = styled(motion.button)<{ variant?: 'primary' | 'ghost' | 'danger' }>`
  border: 0;
  border-radius: 14px;
  padding: 12px 16px;
  min-height: 44px;
  color: ${({ variant }) => (variant === 'ghost' ? 'var(--cream)' : '#18090d')};
  background: ${({ variant }) => {
    if (variant === 'ghost') return 'rgba(255,255,255,.06)';
    if (variant === 'danger') return '#e15b5b';
    return 'linear-gradient(135deg, var(--coral), #d94b5f)';
  }};
  box-shadow: ${({ variant }) => (variant === 'ghost' ? 'none' : '0 14px 34px rgba(217, 75, 95, .24)')};
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: border-color .2s ease, background .2s ease;

  &:disabled {
    opacity: .55;
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.98 }
};
