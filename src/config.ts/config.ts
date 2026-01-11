import dotenv from 'dotenv';
dotenv.config();

const AppConfig = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL || '',
    ACCESS_SECRET: process.env.ACCESS_SECRET || '',
    REFRESH_SECRET: process.env.REFRESH_SECRET || ''
}

export default AppConfig;