// db.index.ts
import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle("mysql://u815137624_kay:Bethel34x@srv512.hstgr.io:3306/u815137624_kay");
