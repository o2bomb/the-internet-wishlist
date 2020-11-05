import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";
import { Entry } from "../entities/Entry";
import { User } from "../entities/User";

@Resolver(Entry)
export class EntryResolver {
  @FieldResolver(() => User, { nullable: true })
  creator(@Root() entry: Entry) {
    return User.findOne({ id: entry.creatorId });
  }

  @Query(() => Entry, { nullable: true })
  entry(@Arg("id", () => Int) id: number): Promise<Entry | undefined> {
    return Entry.findOne(id);
  }

  @Mutation(() => Entry)
  async createEntry(
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<Entry> {
    if (req.session.userId) {
      return Entry.create({
        creatorId: req.session.userId,
        title,
        text,
      }).save();
    }

    return Entry.create({
      title,
      text,
    }).save();
  }

  @Mutation(() => Entry, { nullable: true })
  @UseMiddleware(isAuth)
  async updateEntry(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<Entry | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Entry)
      .set({ title, text })
      .where('id = :id and "creatorId" = :creatorId', {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteEntry(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ) {
    await Entry.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
