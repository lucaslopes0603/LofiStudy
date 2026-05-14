# Lofi Study Platform

Plataforma full stack de estudos com Pomodoro, calendário, matérias, sessões, metas, revisões, biblioteca e estatísticas.

## Stack

- Front-end: React, TypeScript, Vite, Styled Components, Framer Motion, React Router, Axios, React Hook Form, Zod, Recharts
- Back-end: Node.js, Express, TypeScript, PostgreSQL, Zod
- Banco: PostgreSQL com SQL de schema e seed inicial

## Rodando localmente

1. Crie o banco:

```bash
createdb lofi_study
psql -d lofi_study -f backend/db/schema.sql
psql -d lofi_study -f backend/db/seed.sql
```

Ou use Docker:

```bash
docker compose up -d
psql postgresql://lofi:lofi@localhost:5432/lofi_study -f backend/db/schema.sql
psql postgresql://lofi:lofi@localhost:5432/lofi_study -f backend/db/seed.sql
```

2. Configure variáveis:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Instale dependências:

```bash
npm install
npm run install:all
```

4. Rode API e front:

```bash
npm run dev
```

Front-end: http://localhost:5173  
Back-end: http://localhost:3333/api/health

## Scripts úteis

```bash
npm run build
npm run dev --prefix backend
npm run dev --prefix frontend
```

## Estrutura

```text
backend/
  db/
  src/
    controllers/
    dtos/
    entities/
    errors/
    middleware/
    repositories/
    routes/
    services/
frontend/
  src/
    api/
    components/
    hooks/
    layouts/
    pages/
    styles/
    types/
```
