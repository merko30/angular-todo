import { Router } from "express";
import type { Request, Response } from "express";
import { uuidv7 } from "uuidv7";

import { db } from "../db";
import { post, postTag, tag } from "../db/schema";
import { authMiddleware } from "../lib/middleware";
import { eq, notInArray } from "drizzle-orm";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const result = await db
    .select()
    .from(post)
    .leftJoin(postTag, eq(post.id, postTag.postId))
    .leftJoin(tag, eq(postTag.tagId, tag.id));

  const grouped = result.reduce((acc, row) => {
    const post = acc[row.post.id] ?? {
      ...row.post,
      tags: [],
    };

    if (row.tag && row.tag.id && row.tag.name) {
      post.tags.push({ id: row.tag.id.toString(), name: row.tag.name });
    }

    acc[row.post.id] = post;
    return acc;
  }, {} as Record<string, { id: string; title: string; tags: { id: string; name: string }[] }>);

  const posts = Object.values(grouped);

  res.status(200).json({
    posts,
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
