import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkSearchIntervalParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.start) {
    throw new HTTP400Error("Missing start date parameter");
  } else if (!req.query.end) {
    throw new HTTP400Error("Missing start date parameter");    
  } else {
    next();
  }
};