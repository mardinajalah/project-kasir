import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { envConfig } from '../config/env';

if (!envConfig.databaseUrl) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

const connection = await mysql.createConnection(envConfig.databaseUrl);

export const db = drizzle({ client: connection });
