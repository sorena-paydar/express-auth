import { NextFunction, Request, Response, Router } from "express";
import { ISafeData } from ".";

export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface IRoute {
  path: string;
  method: Methods;
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>;
  localMiddleware: ((
    req: Request,
    res: Response,
    next: NextFunction
  ) => void)[];
}

export default abstract class Controller {
  public router: Router = Router();
  public abstract path: string;
  protected abstract readonly routes: Array<IRoute>;

  public setRoutes(): Router {
    for (const route of this.routes) {
      for (const mw of route.localMiddleware) {
        this.router.use(route.path, mw);
      }

      switch (route.method) {
        case "GET":
          this.router.get(route.path, route.handler);
          break;

        case "POST":
          this.router.post(route.path, route.handler);
          break;

        case "PUT":
          this.router.put(route.path, route.handler);
          break;

        case "DELETE":
          this.router.delete(route.path, route.handler);
          break;
      }
    }

    return this.router;
  }

  protected onSuccess(
    res: Response,
    statusCode: number,
    success: boolean,
    data?: ISafeData,
    message?: string
  ): Response {
    return res.status(statusCode).json({
      success: success,
      message: message || "success",
      data: data,
    });
  }

  protected onFailure(
    res: Response,
    statusCode: number,
    success: boolean,
    message?: string
  ): Response {
    return res.status(statusCode).json({
      success: success,
      message: message || "failure",
    });
  }
}
