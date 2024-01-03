import dotenv from 'dotenv';

dotenv.config();

export default config = {
  database: process.env.DB_HOST,  
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
};
