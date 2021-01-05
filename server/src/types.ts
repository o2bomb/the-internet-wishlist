import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";
import { createEntryTagLoader } from "./utils/createEntryTagLoader";
import { createHeartLoader } from "./utils/createHeartLoader";
import { createReportLoader } from "./utils/createReportLoader";
import { createUserLoader } from "./utils/createUserLoader";

export class MyContext {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: number, isAdmin: boolean };
  };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  heartLoader: ReturnType<typeof createHeartLoader>;
  entryTagLoader: ReturnType<typeof createEntryTagLoader>;
  reportLoader: ReturnType<typeof createReportLoader>;
}
