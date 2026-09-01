import dotenv from "dotenv"

dotenv.config({ path: '.env' });

export const envConfig = {
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT
}