// express
import express, { Application } from "express";

// typings
import Server from "./typings/Server";

// utils
import { PORT } from "./config";

const app: Application = express();
const server: Server = new Server(app, PORT);

Promise.resolve().then(() => {
  server.run();
});
