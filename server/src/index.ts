import express from "express";
import path from "path";
import session from "express-session";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Entry } from "./entities/Entry";
import { Heart } from "./entities/Heart";
import { User } from "./entities/User";
import { EntryTag } from "./entities/EntryTag";
import { Tag } from "./entities/Tag";
import { HelloResolver } from "./resolvers/hello";
import { EntryResolver } from "./resolvers/entry";
import { UserResolver } from "./resolvers/user";
import { TagResolver } from "./resolvers/tag";
import { COOKIE_NAME, __prod__ } from "./constants";
import { createUserLoader } from "./utils/createUserLoader";
import { createHeartLoader } from "./utils/createHeartLoader";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "tiw", // database_name corresponds to the name of PostgreSQL db
    username: "postgres",
    port: 5433,
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
    origin: "http://localhost:3000",
    credentials: true,
  };
  // app.use(cors(corsOptions));
  const RedisStore = connectRedis(session);
  const redis = new Redis();
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
      secret: "change this so something else, can be anything",
      resave: false,
    })
  );

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
    }),
  });
  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.listen(4000, () => {
    console.log("Express server started on localhost:4000");
  });
};

main().catch((error) => {
  console.log(error);
});
