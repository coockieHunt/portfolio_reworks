import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    schema: './database/shema.ts',
    out: './drizzle',
    dialect: 'sqlite',
    dbCredentials: { url: 'portfolio.db' },
});