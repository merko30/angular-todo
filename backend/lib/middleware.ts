import { fromNodeHeaders } from "better-auth/node";

import { auth } from "./auth";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.session) {
    res.status(401).json({
      error: "Unauthorized",
    });
  }

  req.userId = session?.user.id;

  next();
};
