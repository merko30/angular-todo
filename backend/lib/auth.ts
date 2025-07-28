import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";

import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "pg" or "mysql",
    schema,
  }),
  emailAndPassword: { enabled: true },
  trustedOrigins: ["http://localhost:4200"],
  //... the rest of your config
});
