import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import Controller, { Methods } from "../typings/Controller";

export default class AuthCotnroller extends Controller {
  path = "/auth";
  routes = [
    {
      path: "/register",
      method: Methods.POST,
      handler: this.handleRegister,
      localMiddleware: [],
    },
    {
      path: "/login",
      method: Methods.POST,
      handler: this.handleLogin,
      localMiddleware: [],
    },
  ];

  constructor() {
    super();
  }

  public async handleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, username, password, bio } = req.body;
      const userService = new UserService(email, username, password, bio);
      const data = await userService.login();

      if (data.success) {
        super.onSuccess(
          res,
          data.statusCode,
          data.success,
          data.data!,
          data.message
        );
      } else {
        super.onFailure(res, data.statusCode, data.success, data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public async handleRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, username, password, bio } = req.body;
      const userService = new UserService(email, username, password, bio);
      const data = await userService.register();
      if (data.success) {
        super.onSuccess(
          res,
          data.statusCode,
          data.success,
          data.data!,
          data.message
        );
      } else {
        super.onFailure(res, data.statusCode, data.success, data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
