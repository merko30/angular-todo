import { Router } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { uuidv7 } from "uuidv7";

import { db } from "../db";
import { post } from "../db/schema";
import { auth } from "../lib/auth";

const router = Router();

router.get("/", async (req, res) => {
  const posts = await db.select().from(post);

  console.log("posts", posts);

  res.json({
    posts,
  });
});

router.post("/", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
  }

  const [createdPost] = await db
    .insert(post)
    .values({
      ...req.body,
      id: uuidv7(),
      slug: req.body.title.toLowerCase().replace(" ", "-"),
      userId: session?.user.id,
    })
    .returning();

  if (!post) {
    res.status(400).json({ error: "Failed to create the post" });
  }

  res.json({
    post: createdPost,
  });
});

export default router;
