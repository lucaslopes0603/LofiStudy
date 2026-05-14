INSERT INTO subjects (id, name, color, weekly_goal_hours, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Matematica', '#f26d6d', 6, 'Algebra, funcoes e exercicios de fixacao'),
('22222222-2222-2222-2222-222222222222', 'Historia', '#b84a62', 4, 'Revisoes com linha do tempo e mapas mentais'),
('33333333-3333-3333-3333-333333333333', 'Ingles', '#ff9a76', 5, 'Listening, vocabulario e leitura')
ON CONFLICT (id) DO NOTHING;

INSERT INTO study_sessions (subject_id, studied_at, duration_minutes, type, description, focus_level, difficulty_level, review_content, notes) VALUES
('11111111-1111-1111-1111-111111111111', CURRENT_DATE, 50, 'pomodoro', 'Equacoes quadraticas', 4, 3, true, 'Rever discriminante e fatoracao.'),
('33333333-3333-3333-3333-333333333333', CURRENT_DATE, 25, 'pomodoro', 'Reading practice', 5, 2, false, 'Texto sobre tecnologia.'),
('22222222-2222-2222-2222-222222222222', CURRENT_DATE - INTERVAL '1 day', 45, 'manual', 'Era Vargas', 3, 4, true, 'Criar flashcards.'),
('11111111-1111-1111-1111-111111111111', CURRENT_DATE - INTERVAL '2 day', 60, 'manual', 'Lista de exercicios', 4, 4, false, 'Erros em sinais.'),
('33333333-3333-3333-3333-333333333333', CURRENT_DATE - INTERVAL '3 day', 30, 'pomodoro', 'Listening', 4, 2, true, 'Repetir audio sem legenda.');

INSERT INTO goals (title, scope, target_minutes, subject_id) VALUES
('Meta diaria de foco', 'daily', 90, NULL),
('Matematica da semana', 'weekly_subject', 360, '11111111-1111-1111-1111-111111111111')
ON CONFLICT DO NOTHING;

INSERT INTO reviews (subject_id, title, due_date, status, notes) VALUES
('11111111-1111-1111-1111-111111111111', 'Revisar equacoes quadraticas', CURRENT_DATE + INTERVAL '1 day', 'pending', 'Refazer 5 questoes.'),
('22222222-2222-2222-2222-222222222222', 'Linha do tempo Era Vargas', CURRENT_DATE + INTERVAL '7 day', 'pending', 'Comparar fases do governo.');
