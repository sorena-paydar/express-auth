import * as jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../config";
import { unixTimestamp } from "../lib/utils";
import { IUser } from "../models/User.model";
import { IJwt } from "../typings/index";

export default class TokenService {
  private readonly user: IUser;
  private readonly expiration: number;

  constructor(user: IUser, expiration: number) {
    this.user = user;
    this.expiration = expiration;
  }

  public issueToken(): IJwt {
    const userId = String(this.user.id);

    const expiresIn = unixTimestamp(this.expiration);

    const payload: jwt.JwtPayload = {
      sub: userId,
      iat: Date.now(),
    };

    const options: jwt.SignOptions = {
      algorithm: "RS256",
      expiresIn: expiresIn,
      issuer: "Sorena Paydar",
      audience: "veryBlog",
    };

    const signedToken: string = jwt.sign(payload, PRIVATE_KEY, options);

    return {
      token: "Bearer " + signedToken,
      expiresIn: expiresIn,
    };
  }
}
