import * as dotenv from "dotenv";

dotenv.config();

import fs from "fs";
import path from "path";

export const PORT = parseInt(process.env.PORT!) || 5000;

export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DB = process.env.POSTGRES_DB;
export const POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST || "localhost";
export const POSTGRES_DB_PORT = process.env.POSTGRES_DB_PORT || 5434;

// postgresql://USER:PASSWORD@HOST:PORT/DATABASE
export const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:${POSTGRES_DB_PORT}/${POSTGRES_DB}?schema=public`;

export const PRIVATE_KEY = fs.readFileSync(
  path.join(__dirname, "..", "..", "rsa-private.key"),
  "utf-8"
);

export const PASSPHRASE = process.env.PASSPHRASE;
