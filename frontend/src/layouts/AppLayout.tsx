import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, BookOpen, CalendarDays, Clock3, Home, ListTodo, Repeat2 } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { LofiPlayer } from '../components/LofiPlayer';

const Shell = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  min-height: 100vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 26px 18px;
  border-right: 1px solid var(--line);
  background: rgba(15, 7, 10, .64);
  backdrop-filter: blur(18px);

  @media (max-width: 900px) {
    position: fixed;
    inset: auto 12px 86px 12px;
    height: auto;
    border: 1px solid var(--line);
    border-radius: 22px;
    z-index: 19;
    padding: 10px;
  }
`;

const Brand = styled.div`
  padding: 8px 10px 24px;
  h1 {
    margin: 0;
    font-family: 'Fraunces', serif;
    font-size: 31px;
  }
  p { margin: 6px 0 0; color: var(--muted); }

  @media (max-width: 900px) { display: none; }
`;

const Nav = styled.nav`
  display: grid;
  gap: 8px;

  a {
    min-height: 46px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 14px;
    color: var(--muted);
    font-weight: 800;
  }
  a.active {
    color: #fff7ec;
    background: linear-gradient(135deg, rgba(245, 134, 115, .18), rgba(141, 48, 64, .28));
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    a { justify-content: center; padding: 0; }
    span { display: none; }
  }
`;

const Main = styled.main`
  width: min(1220px, 100%);
  margin: 0 auto;
  padding: 34px 28px 118px;

  @media (max-width: 680px) {
    padding: 22px 16px 160px;
  }
`;

const items = [
  ['/dashboard', 'Dashboard', Home],
  ['/pomodoro', 'Pomodoro', Clock3],
  ['/calendar', 'Calendario', CalendarDays],
  ['/subjects', 'Materias', BookOpen],
  ['/sessions', 'Sessoes', ListTodo],
  ['/stats', 'Stats', BarChart3],
  ['/reviews', 'Revisoes', Repeat2]
] as const;

export function AppLayout() {
  const location = useLocation();
  return (
    <Shell>
      <Sidebar>
        <Brand>
          <h1>Lofi Study</h1>
          <p>Foco calmo, rotina constante.</p>
        </Brand>
        <Nav>
          {items.map(([to, label, Icon]) => (
            <NavLink key={to} to={to}><Icon size={19} /><span>{label}</span></NavLink>
          ))}
        </Nav>
      </Sidebar>
      <Main>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .28 }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Main>
      <LofiPlayer />
    </Shell>
  );
}
