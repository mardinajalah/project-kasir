import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

export const db = drizzle(process.env.DATABASE_URL);
