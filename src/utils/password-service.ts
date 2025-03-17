import { compare, hash } from "bcrypt"; 

export async function hashPassword(password: string): Promise<string> {
  try {
    const SALT_ROUNDS = 10;
    const hashedPassword = await hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

export async function decryptPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    const decryptedPassword = await compare(password, hashedPassword);
    return decryptedPassword;
  } catch (error) {
    throw error;
  }
}
