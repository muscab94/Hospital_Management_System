import dotenv from 'dotenv'

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET || "cuman_hospital_jwt_secret_key_2024";
export const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
export const JWT_COOKIE_EXPIRE = process.env.JWT_COOKIE_EXPIRE || 7;


console.log("JWT_SECRET in config:", JWT_SECRET);