CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(120) NOT NULL,
  color VARCHAR(20) NOT NULL,
  weekly_goal_hours NUMERIC(5,2) NOT NULL DEFAULT 5,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  studied_at DATE NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  type VARCHAR(20) NOT NULL CHECK (type IN ('pomodoro', 'manual')),
  description TEXT,
  focus_level INTEGER NOT NULL CHECK (focus_level BETWEEN 1 AND 5),
  difficulty_level INTEGER NOT NULL CHECK (difficulty_level BETWEEN 1 AND 5),
  review_content BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(160) NOT NULL,
  scope VARCHAR(20) NOT NULL CHECK (scope IN ('daily', 'weekly_subject')),
  target_minutes INTEGER NOT NULL CHECK (target_minutes > 0),
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  starts_on DATE NOT NULL DEFAULT CURRENT_DATE,
  ends_on DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  study_session_id UUID REFERENCES study_sessions(id) ON DELETE SET NULL,
  title VARCHAR(180) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  url TEXT NOT NULL,
  type VARCHAR(30) NOT NULL CHECK (type IN ('video', 'pdf', 'article', 'exercise', 'other')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sessions_date ON study_sessions(studied_at);
CREATE INDEX IF NOT EXISTS idx_sessions_subject ON study_sessions(subject_id);
CREATE INDEX IF NOT EXISTS idx_reviews_due ON reviews(due_date, status);
