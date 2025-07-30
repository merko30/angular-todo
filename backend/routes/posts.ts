import { Router } from "express";
import type { Request, Response } from "express";
import { uuidv7 } from "uuidv7";
import { db } from "../db";
import { post, postTag, tag } from "../db/schema";
import { authMiddleware } from "../lib/middleware";
import { notInArray } from "drizzle-orm";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await db.query.post.findMany({
    with: { postTags: { with: { tag: true } } },
  });

  console.log(result);

  res.status(200).json({
    posts: result,
  });
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { tags, ...postFields } = req.body;

  const tagNames = tags.split(",").map((name: string) => name.trim());

  const createdTags = await db
    .insert(tag)
    .values(tagNames.map((t: string) => ({ name: t })))
    .onConflictDoNothing({ target: tag.name })
    .returning();

  const existingTags = await db
    .select()
    .from(tag)
    .where(
      notInArray(
        tag.name,
        createdTags.map((t) => t.name)
      )
    );

  const postTags = [...createdTags, ...existingTags];

  console.log(postTags);

  const [createdPost] = await db
    .insert(post)
    .values({
      ...req.body,
      id: uuidv7(),
      slug: req.body.title.toLowerCase().replace(" ", "-"),
      userId: req.userId,
    })
    .returning();

  await db.insert(postTag).values(
    postTags.map((t) => ({
      tagId: t.id,
      postId: createdPost.id,
    }))
  );

  if (!post) {
    return res.status(400).json({ error: "Failed to create the post" });
  }

  return res.json({
    post: createdPost,
  });
});

export default router;
