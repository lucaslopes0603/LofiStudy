import pg, { QueryResultRow } from 'pg';
import { env } from '../config/env.js';

export const pool = new pg.Pool({
  connectionString: env.databaseUrl
});

export type QueryParams = Array<string | number | boolean | null | Date>;

export async function query<T extends QueryResultRow>(text: string, params: QueryParams = []) {
  const result = await pool.query<T>(text, params);
  return result.rows;
}
