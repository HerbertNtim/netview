import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
  PORT: process.env.PORT || 8000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  TMDB_API_KEY: process.env.TMDB_API_KEY
}
