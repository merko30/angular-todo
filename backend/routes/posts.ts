import { Router } from "express";
import type { Request, Response } from "express";
import { uuidv7 } from "uuidv7";
import { db } from "../db";
import {
  post as postTable,
  postTag as postTagTable,
  tag as tagTable,
  comment as commentTable,
  post,
} from "../db/schema";
import { authMiddleware } from "../lib/middleware";
import { desc, eq, inArray } from "drizzle-orm";

const router = Router();

router.get("/", async (_, res: Response) => {
  const result = await db.query.post.findMany({
    with: { tags: { with: { tag: true } } },
    orderBy: [desc(post.createdAt)],
  });

  res.status(200).json({
    posts: result,
  });
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { tags, ...postFields } = req.body;

  const tagNames = tags
    .split(",")
    .map((name: string) => name.trim())
    .filter((name: string) => name.length);

  let createdTags: { id: number; name: string }[] = [];

  if (tagNames.length) {
    createdTags = await db
      .insert(tagTable)
      .values(tagNames.map((t: string) => ({ name: t })))
      .onConflictDoNothing({ target: tagTable.name })
      .returning();
  }

  const nonCreatedTagNames = tagNames.filter(
    (name: string) => !createdTags.some((tag) => tag.name === name)
  );

  const existingTags = await db
    .select()
    .from(tagTable)
    .where(inArray(tagTable.name, nonCreatedTagNames));

  const postTags = [...createdTags, ...existingTags];

  const [createdPost] = await db
    .insert(postTable)
    .values({
      ...postFields,
      id: uuidv7(),
      slug: postFields.title.toLowerCase().replace(" ", "-"),
      userId: req.userId,
    })
    .returning();

  if (postTags.length) {
    await db.insert(postTagTable).values(
      postTags.map((t) => ({
        tagId: t.id,
        postId: createdPost.id,
      }))
    );
  }
  if (!createdPost) {
    return res.status(400).json({ error: "Failed to create the post" });
  }

  return res.json({
    post: createdPost,
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ error: "No post ID" });
  }

  const foundPost = await db.query.post.findFirst({
    where: (posts) => eq(posts.id, req.params.id),
    with: {
      comments: true,
      tags: {
        with: {
          tag: true,
        },
      },
    },
  });

  if (!foundPost) {
    res.status(404).json({ error: "Post not found" });
  }

  res.status(200).json({
    post: foundPost,
  });
});

// create comment
router.post("/:id", authMiddleware, async (req: Request, res: Response) => {
  const { comment } = req.body;

  const postId = req.params.id;

  const userId = req.userId;

  const [newComment] = await db
    .insert(commentTable)
    .values({
      postId,
      text: comment,
      userId: userId!,
    })
    .returning();

  if (!newComment) {
    res.status(400).json({ error: "Failed to create the comment" });
  }

  res.status(201).json({
    comment: newComment,
  });
});

export default router;
