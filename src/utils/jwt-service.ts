import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = "lCy0cqenafktcJpA0fTr3PUONjTvyQ8GOAcV+XO1Oyc=";

export async function generateJwt(payload: any) {
  try {
    const token = sign(payload, JWT_SECRET, { expiresIn: '7d' });
    return token;
  } catch (error) {
    throw error;
  }
}

export async function verifyJwt(token: string) {
  try {
    const payload = verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw error;
  }
}