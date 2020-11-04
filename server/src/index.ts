import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import path from "path";
import { createConnection } from "typeorm";
import { Entry } from "./entities/Entry";
import { HelloResolver } from "./resolvers/hello";
import { Heart } from "./entities/Heart";
import { User } from "./entities/User";
import { EntryResolver } from "./resolvers/entry";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "tiw", // database_name corresponds to the name of PostgreSQL db
    username: "postgres",
    port: 5433,
    logging: true,
    synchronize: true, // makes sure entities are synced with database
    entities: [Entry, User, Heart],
    migrations: [path.join(__dirname, "./migrations/*")],
  });
  await conn.runMigrations();

  // await Entry.delete()

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, EntryResolver],
      validate: false,
    }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Express server started on localhost:4000");
  });
};

main().catch((error) => {
  console.log(error);
});
