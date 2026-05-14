import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { CalendarPage } from './pages/CalendarPage';
import { DashboardPage } from './pages/DashboardPage';
import { PomodoroPage } from './pages/PomodoroPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { SessionsPage } from './pages/SessionsPage';
import { StatsPage } from './pages/StatsPage';
import { SubjectsPage } from './pages/SubjectsPage';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/pomodoro', element: <PomodoroPage /> },
      { path: '/calendar', element: <CalendarPage /> },
      { path: '/subjects', element: <SubjectsPage /> },
      { path: '/sessions', element: <SessionsPage /> },
      { path: '/stats', element: <StatsPage /> },
      { path: '/reviews', element: <ReviewsPage /> }
    ]
  }
]);
