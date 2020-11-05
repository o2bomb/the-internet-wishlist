import express from "express";
import path from "path";
import session from 'express-session';
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Entry } from "./entities/Entry";
import { HelloResolver } from "./resolvers/hello";
import { Heart } from "./entities/Heart";
import { User } from "./entities/User";
import { EntryResolver } from "./resolvers/entry";
import { UserResolver } from "./resolvers/user";
import { COOKIE_NAME, __prod__ } from "./constants";
import { EntryTag } from "./entities/EntryTag";
import { Tag } from "./entities/Tag";

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

  const app = express();

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
      resolvers: [HelloResolver, EntryResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis })
  });
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Express server started on localhost:4000");
  });
};

main().catch((error) => {
  console.log(error);
});
