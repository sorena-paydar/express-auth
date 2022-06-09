import { Application, RequestHandler, Request, Response } from "express";
import http from "http";
import path from "path";
import { Sequelize } from "sequelize/types";
import Controller from "./Controller";

export default class Server {
  private app: Application;
  private database: Sequelize;
  private readonly PORT: number;

  constructor(app: Application, database: Sequelize, PORT: number) {
    this.app = app;
    this.database = database;
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

  public async initDatabase(): Promise<void> {
    try {
      await this.database.authenticate();
      console.log("Database successfully authenticated");
    } catch (err) {
      console.log(`InitDatabase error: ${err}`);
    }
  }

  public renderClient(): void {
    this.app.get("/*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "../../dist/public", "index.html"));
    });
  }
}
