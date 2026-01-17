// drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log(process.env.DATABSE_URL)

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: process.env.DATABSE_URL!,
    },
});
