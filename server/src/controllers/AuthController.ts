import { NextFunction, Request, Response } from "express";
import Controller, { Methods } from "../typings/Controller";

export default class AuthCotnroller extends Controller {
  path = "/auth";
  routes = [
    {
      path: "/signup",
      method: Methods.POST,
      handler: this.handleSignup,
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

  async handleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    super.onSuccess(res, { route: "login" });
  }

  async handleSignup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    super.onSuccess(res, { route: "signup" });
  }
}
