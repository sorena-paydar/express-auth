import { IUser } from "../models/User.model";
import db from "../models";

export function getUserFromDatabase(
  email: string,
  username: string
): Promise<IUser | null> {
  return db.User.findOne({
    where: [{ email: email }, { username: username }],
  });
}

export function unixTimestamp(days: number): number {
  const currentTimestamp = Date.now();
  // 1652950410974

  const expTimestamp = days * 24 * 60 * 60 * 1000;
  // 1655542448321 (token expires in 30d)

  return currentTimestamp + expTimestamp;
}

export function validatePassword(
  password: string,
  minLen: number,
  maxLen: number
): string | undefined {
  if (!password) {
    return "No password provided!";
  } else if (password.length < minLen || password.length > maxLen) {
    return `Password must be between ${minLen} and ${maxLen} characters long!!`;
  }
}
