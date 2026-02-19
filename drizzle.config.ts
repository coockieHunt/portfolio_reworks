import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

const envFile = process.env.NODE_ENV === 'production' ? '.env.docker' : '.env';
dotenv.config({ path: envFile });

const dbUrl = process.env.DATABASE_URL || 'portfolio.db';

export default defineConfig({
    schema: './database/shema.ts',
    out: './drizzle',
    dialect: 'sqlite',
    dbCredentials: { url: dbUrl },
});