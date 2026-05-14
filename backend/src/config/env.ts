import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT ?? 3333),
  databaseUrl: process.env.DATABASE_URL ?? 'postgresql://lofi:lofi@localhost:5432/lofi_study',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173'
};
