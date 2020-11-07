import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
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
import { Heart } from "../entities/Heart";

@ObjectType()
class PaginatedEntries {
  @Field(() => [Entry])
  entries: Entry[];
  @Field()
  hasMore: boolean;
  @Field()
  cursor: string;
}

@Resolver(Entry)
export class EntryResolver {
  @FieldResolver(() => Int)
  async points(@Root() entry: Entry) {
    const [, heartCount] = await Heart.findAndCount({
      where: { entryId: entry.id },
    });
    return heartCount;
  }

  @FieldResolver(() => User, { nullable: true })
  creator(@Root() entry: Entry) {
    return User.findOne({ id: entry.creatorId });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async heartEntry(
    @Arg("id", () => Int) id: number,
    @Arg("deleteHeart", () => Boolean) deleteHeart: boolean,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const heart = await Heart.findOne({ where: { entryId: id, userId } });

    if (deleteHeart) {
      // Delete heart if user is unhearting entry
      await Heart.delete({ entryId: id, userId });
    } else if (!heart) {
      // Only create a new heart if it doesn't exist
      await Heart.create({
        entryId: id,
        userId,
      }).save();
    }
    return true;
  }

  @Query(() => Entry, { nullable: true })
  entry(@Arg("id", () => Int) id: number): Promise<Entry | undefined> {
    return Entry.findOne(id);
  }

  @Query(() => PaginatedEntries)
  async entries(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string,
  ): Promise<PaginatedEntries> {
    const realLimit = Math.min(30, limit); // limit to 30 max entries
    const realLimitPlusOne = realLimit + 1;

    const parameters: any[] = [realLimitPlusOne];

    if (cursor) {
      parameters.push(new Date(parseInt(cursor)));
    }

    const entries: Entry[] = await getConnection().query(
      `
        select e.*
        from entry e
        ${cursor ? `where e."createdAt" < $2` : ""}
        order by e."createdAt" DESC
        limit $1
      `,
      parameters
    );

    const newCursor = entries[realLimit-1] ? entries[realLimit-1].createdAt.getTime().toString() : "";

    return {
      entries: entries.slice(0, realLimit),
      hasMore: entries.length === realLimitPlusOne,
      cursor: newCursor
    };
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
