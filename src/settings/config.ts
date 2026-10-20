const env = process.env;

export const ADMIN_USERNAME = env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'qwerty';

export const SETTINGS = {
    PORT: env.PORT || 5001,
    MONGO_URL: env.MONGO_URL || 'mongodb+srv://',
    DB_NAME: env.DB_NAME || 'test-db'
};