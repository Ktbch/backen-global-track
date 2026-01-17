// drizzle.config.ts

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

console.log(process.env.DATABSE_URL)

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        url: "mysql://u815137624_kay:Bethel32Tracker@srv512.hstgr.io:3306/u815137624_globalTracker",
    },
});
