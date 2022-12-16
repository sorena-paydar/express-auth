import { Jwt } from "jsonwebtoken";
import { IUser } from "../models/User.model";

declare global {
  namespace Express {
    interface Request {
      verifiedUser: ISafeUser;
    }
  }
}

export interface IUserService {
  success: boolean;
  statusCode: number;
  message: string;
  data?: ISafeData;
}

export interface ISafeUser {
  id: number;
  email: string;
  username: string;
  bio: string;
  createdAt: Date;
}

export interface ISafeData {
  user?: ISafeUser;
  jwt?: IJwt;
}

export interface IJwt {
  token: string;
  expiresIn: number | string;
}
