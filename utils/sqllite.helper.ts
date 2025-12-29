//sqlite
import Database from 'better-sqlite3';

// orm
import { drizzle } from 'drizzle-orm/better-sqlite3';

// shema
import * as schema from '../database/shema';

export const sqlite = new Database('portfolio.db');
export const db = drizzle(sqlite, { schema });

export function pingSqlite(): void {
	sqlite.prepare('select 1 as ok').get();
}