
import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT ?? '5000',
  MONGO_URI: process.env.MONGO_URI ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? 'supersecretkey',
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

export default env;
