import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
const sql: NeonQueryFunction<boolean, boolean> = neon(connectionString);

export const db = drizzle(sql, { schema });
