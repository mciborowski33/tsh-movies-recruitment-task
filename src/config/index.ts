export const PORT = parseInt(process.env.PORT || '3000');
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(',') || '';
