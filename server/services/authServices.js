import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';

config()
const secrateString = process.env.JWT_SECRET || "secrateString123456789secrateString"

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload, secrate = secrateString) {
  return jwt.sign(payload, secrate, { expiresIn: '1h' });
}

