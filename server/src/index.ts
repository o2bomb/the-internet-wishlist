import { ApolloServer } from "apollo-server-express";
import "dotenv-safe/config";
import connectRedis from "connect-redis";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import path from "path";
import { buildSchema, registerEnumType } from "type-graphql";
import { createConnection } from "typeorm";
import { COOKIE_NAME, __prod__ } from "./constants";
import { Entry } from "./entities/Entry";
import { EntryTag } from "./entities/EntryTag";
import { Heart } from "./entities/Heart";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { EntryResolver, SortBy } from "./resolvers/entry";
import { HelloResolver } from "./resolvers/hello";
import { TagResolver } from "./resolvers/tag";
import { UserResolver } from "./resolvers/user";
import { createHeartLoader } from "./utils/createHeartLoader";
import { createUserLoader } from "./utils/createUserLoader";
import { createEntryTagLoader } from "./utils/createEntryTagLoader";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true, // makes sure entities are synced with database
    entities: [Entry, User, Heart, Tag, EntryTag],
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  await conn.runMigrations();

  // await Entry.delete({});
  // await User.delete({});
  // await EntryTag.delete({}); 
  // await Tag.delete({}); 

  const app = express();
  
  const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  };
  // app.use(cors(corsOptions));
  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // lasts 10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, // cookie only works in https (in prod)
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  registerEnumType(SortBy, {
    name: "SortBy",
    description: "Options to sort search results"
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, EntryResolver, UserResolver, TagResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      heartLoader: createHeartLoader(),
      entryTagLoader: createEntryTagLoader(),
    }),
  });
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("Express server started on port", process.env.PORT);
  });
};

main().catch((error) => {
  console.log(error);
});
