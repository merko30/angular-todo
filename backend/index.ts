import "dotenv/config";
import express from "express";
import cors from "cors";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { db } from "./db";
import { post } from "./db/schema";
import { uuidv7 } from "uuidv7";

const app = express();
const port = 3005;

app.use(
  cors({
    origin: "http://localhost:4200", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.all("/api/auth/{*any}", toNodeHandler(auth));

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

app.get("/api/posts", async (req, res) => {
  const posts = await db.select().from(post);

  console.log("posts", posts);

  res.json({
    posts,
  });
});

app.post("/api/posts", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
  }

  console.log(req.body);
  const createdPost = await db
    .insert(post)
    .values({
      ...req.body,
      id: uuidv7(),
      slug: req.body.title.toLowerCase().replace(" ", "-"),
      userId: session?.user.id,
    })
    .returning();

  res.json({
    post: createdPost,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
