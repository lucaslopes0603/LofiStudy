import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Card = styled(motion.section)`
  border: 1px solid var(--line);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(58, 24, 32, .82), rgba(24, 10, 15, .78));
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
`;

Card.defaultProps = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45 }
};
