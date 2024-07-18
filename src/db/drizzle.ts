import 'dotenv/config'
import * as schema from './schema';
import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const connectionString = "postgresql://city_owner:zoeMjZsJE4r0@ep-tight-grass-a5mvipms.us-east-2.aws.neon.tech/city?sslmode=require" as string;
const sql: NeonQueryFunction<boolean, boolean> = neon(connectionString);

export const db = drizzle(sql, { schema });
