import dotenv from 'dotenv';
dotenv.config();

const config = {
  MONGODB_URI: process.env.MONGODB_URI,
  MAX_ALLOWED_MESSAGES: 2
}

export { config }