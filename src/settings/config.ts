import {config} from 'dotenv'

config()

const env = process.env;

export const ADMIN_USERNAME = env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'qwerty';

export const SETTINGS = {
    PORT: process.env.PORT || 5001,
    JWT: process.env.JWT || '123',
    JWT_ACCESS:process.env.JWT_ACCESS_SECRET || '222',
    JWT_REFRESH:process.env.JWT_REFRESH_SECRET || '333',
    MONGO_URL: process.env.MONGO_URL || 'localhost://27017',
    DB_NAME: process.env.DB_NAME || 'test-db'
};