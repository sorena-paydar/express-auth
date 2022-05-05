// express
import express, { Application, RequestHandler } from "express";

// typings
import Server from "./typings/Server";

// utils
import { PORT } from "./config";
import Controller from "./typings/Controller";
import AuthCotnroller from "./controllers/AuthController";
import cors from "cors";
import helmet from "helmet";

const app: Application = express();
const server: Server = new Server(app, PORT);

const controllers: Array<Controller> = [new AuthCotnroller()];

const globalMiddleware: Array<RequestHandler> = [
  helmet(),
  cors({ credentials: true, origin: true }),
];

Promise.resolve().then(() => {
  server.loadMiddleware(globalMiddleware);
  server.loadControllers(controllers);
  server.run();
});
