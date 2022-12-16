import db from "../models";
import * as bcrypt from "bcryptjs";
import { getUserFromDatabase, validatePassword } from "../lib/utils";
import { ISafeData, IUserService } from "../typings";
import { IUser } from "../models/User.model";
import TokenService from "./TokenService";

export default class UserService {
  private readonly email: string;
  private readonly username: string;
  private readonly password: string;
  private readonly bio: string;

  constructor(email: string, username: string, password: string, bio: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.bio = bio;
  }

  public async register(): Promise<IUserService> {
    try {
      const invalidPassword = validatePassword(this.password, 8, 22);

      if (invalidPassword) {
        return {
          statusCode: 400,
          success: false,
          message: invalidPassword,
        };
      }

      if (await getUserFromDatabase(this.email, this.username)) {
        return {
          statusCode: 409,
          success: false,
          message: "User already exists!",
        };
      }
      const hashedPassword = await bcrypt.hash(this.password, 10);

      const createdUser = await db.User.create({
        email: this.email,
        username: this.username,
        password: hashedPassword,
        bio: this.bio,
      });

      const data = this.prepareData(createdUser);

      return {
        statusCode: 201,
        success: true,
        message: "User signed up successfully!",
        data: data,
      };
    } catch (err) {
      console.log(err);

      return {
        statusCode: 400,
        success: false,
        message: `${err}`,
      };
    }
  }

  public async login(): Promise<IUserService> {
    try {
      const userFromDatabase = await getUserFromDatabase(
        this.email,
        this.username
      );

      if (!userFromDatabase) {
        return { statusCode: 400, success: false, message: "No such user!" };
      }

      const isPasswordEqual = await bcrypt.compare(
        this.password,
        userFromDatabase.password
      );

      if (!isPasswordEqual) {
        return { statusCode: 400, success: false, message: "Wrong password!" };
      }

      const data = this.prepareData(userFromDatabase);

      return {
        statusCode: 200,
        success: true,
        message: "User logged in successfully!",
        data: data,
      };
    } catch (err) {
      console.log(err);

      return { statusCode: 401, success: false, message: "An error occurred!" };
    }
  }

  private prepareData(user: IUser): ISafeData {
    const tokenService = new TokenService(user, 30);
    const { token, expiresIn } = tokenService.issueToken();

    const data: ISafeData = {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        createdAt: user.createdAt,
      },
      jwt: {
        token: token,
        expiresIn: expiresIn,
      },
    };

    return data;
  }
}
