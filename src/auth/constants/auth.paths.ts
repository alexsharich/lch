export const AUTH_PATH = '/auth'
export const AUTH_ROUTES = {
    ROOT: '',
    LOGIN: '/login',
    LOGOUT: '/logout',
    ME: '/me',
    REGISTRATION: '/registration',
    REGISTRATION_CONFIRMATION: '/registration-confirmation',
    REGISTRATION_EMAIL_RESENDING: '/registration-email-resending',
    REFRESH_TOKEN: '/refresh-token'
} as const