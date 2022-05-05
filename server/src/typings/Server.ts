import { Application, RequestHandler } from "express";
import http from "http";
import Controller from "./Controller";

export default class Server {
  private app: Application;
  private readonly PORT: number;

  constructor(app: Application, PORT: number) {
    this.app = app;
    this.PORT = PORT;
  }

  public run(): http.Server {
    return this.app.listen(this.PORT, () => {
      console.log(`Listening on PORT ${this.PORT}`);
    });
  }

  public loadMiddleware(middleware: Array<RequestHandler>): void {
    middleware.forEach((mw) => this.app.use(mw));
  }

  public loadControllers(controllers: Array<Controller>): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }
}
