import { Router } from "express";
import type { Request, Response } from "express";
import { uuidv7 } from "uuidv7";

import { db } from "../db";
import { post, tag } from "../db/schema";
import { authMiddleware } from "../lib/middleware";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const posts = await db.select().from(post);

  res.status(200).json({
    posts,
  });
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { tags, ...postFields } = req.body;

  await Promise.all(
    tags.split(",").map((name: string) =>
      db
        .insert(tag)
        .values({
          id: "1",
          name: name.trim(),
        })
        .onConflictDoNothing()
    )
  );

  const [createdPost] = await db
    .insert(post)
    .values({
      ...req.body,
      id: uuidv7(),
      slug: req.body.title.toLowerCase().replace(" ", "-"),
      userId: req.userId,
    })
    .returning();

  if (!post) {
    return res.status(400).json({ error: "Failed to create the post" });
  }

  return res.json({
    post: createdPost,
  });
});

export default router;
