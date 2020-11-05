import { Request, Response } from "express";
import { Redis } from "ioredis";

export class MyContext {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis
}
