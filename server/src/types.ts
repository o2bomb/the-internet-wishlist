import { Request, Response } from "express";
import { Redis } from "ioredis";
import { createEntryTagLoader } from "./utils/createEntryTagLoader";
import { createHeartLoader } from "./utils/createHeartLoader";
import { createReportLoader } from "./utils/createReportLoader";
import { createUserLoader } from "./utils/createUserLoader";

export class MyContext {
  req: Request & { session: Express.Session };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  heartLoader: ReturnType<typeof createHeartLoader>;
  entryTagLoader: ReturnType<typeof createEntryTagLoader>;
  reportLoader: ReturnType<typeof createReportLoader>;
}
