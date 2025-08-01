import { Router } from "express";
import type { Response } from "express";
import { db } from "../db";

const router = Router();

router.get("/", async (_, res: Response) => {
  // order by number of posts
  const result = await db.query.tag.findMany({});

  res.status(200).json({
    tags: result,
  });
});

export default router;
