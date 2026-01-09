import dotenv from 'dotenv';
dotenv.config();

const AppConfig = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL || '',
}

export default AppConfig;