import { Application } from "express";
import http from "http";

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
}
