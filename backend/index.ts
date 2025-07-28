import "dotenv/config";
import express from "express";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();
const port = 3005;

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());

app.get("/", (_, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
