import * as dotenv from "dotenv";

dotenv.config();

import fs from "fs";

export const PORT: number = parseInt(process.env.PORT!);

export const DATABASE_URL: string = process.env.DATABASE_URL!;

export const PRIVATE_KEY: string = fs.readFileSync("rsa-private.key", "utf-8");
