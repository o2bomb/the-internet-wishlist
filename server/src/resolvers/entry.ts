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
import { getConnection, In } from "typeorm";
import { Entry } from "../entities/Entry";
import { EntryTag } from "../entities/EntryTag";
import { Heart } from "../entities/Heart";
import { User } from "../entities/User";
import { FieldError } from "./FieldError";
import { Tag } from "../entities/Tag";
import { Report } from "../entities/Report";
import { isAuth } from "../middlewares/isAuth";
import { isAdmin } from "../middlewares/isAdmin";
import { MyContext } from "../types";
import { validateCreateEntry } from "../utils/validateCreateEntry";
import { validateUpdateEntry } from "../utils/validateUpdateEntry";
import { isQueryError } from "../utils/isQueryError";
import { ForbiddenError, UserInputError } from "apollo-server-express";

export enum SortBy {
  NEWEST = "NEWEST",
  OLDEST = "OLDEST",
  MOST_HEARTS = "MOST_HEARTS",
  LEAST_HEARTS = "LEAST_HEARTS",
}

@ObjectType()
class SearchedEntries {
  @Field(() => [Entry])
  entries: Entry[];
  @Field()
  searchTerm: string;
}

@ObjectType()
class EntryResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Entry, { nullable: true })
  entry?: Entry;
}

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
  @FieldResolver(() => [Report])
  async reports(
    @Root() entry: Entry,
    @Ctx() { req, userLoader, reportLoader }: MyContext
  ): Promise<Report[]> {
    const { userId } = req.session;
    if (!userId) {
      return [];
    }

    const user = await userLoader.load(userId);
    if (!user.isAdmin) {
      return [];
    }

    const reports = (await reportLoader.load(entry.id)) || [];
    return reports;
  }

  @FieldResolver(() => [Tag])
  async tags(
    @Root() entry: Entry,
    @Ctx() { entryTagLoader }: MyContext
  ): Promise<Tag[]> {
    const entryTags = (await entryTagLoader.load(entry.id)) || [];

    return entryTags.map((et) => et.tag);
  }

  @FieldResolver(() => Boolean)
  async isHearted(
    @Root() entry: Entry,
    @Ctx() { req, heartLoader }: MyContext
  ) {
    let heart = undefined;
    if (req.session.userId) {
      heart = await heartLoader.load({
        entryId: entry.id,
        creatorId: req.session.userId,
      });
    }
    return !!heart;
  }

  @FieldResolver(() => User, { nullable: true })
  async creator(@Root() entry: Entry, @Ctx() { userLoader }: MyContext) {
    let user = null;
    if (entry.creatorId) {
      user = await userLoader.load(entry.creatorId);
    }
    return user;
  }

  @Query(() => [Entry])
  @UseMiddleware(isAdmin)
  async reportedEntries() {
    const entries = await Entry.createQueryBuilder()
      .where('"reportCount" > 0')
      .getMany();

    return entries;
  }

  @Query(() => [Entry])
  @UseMiddleware(isAuth)
  async heartedEntries(@Ctx() { req }: MyContext) {
    const hearts = await Heart.find({
      where: {
        creatorId: req.session.userId,
      },
      relations: ["entry"],
    });

    return hearts ? hearts.map((h) => h.entry) : [];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async reportEntry(
    @Arg("id", () => Int) id: number,
    @Arg("reason", () => String, { nullable: true }) reason: string | undefined,
    @Ctx() { req }: MyContext
  ) {
    const { userId } = req.session;
    const report = await Report.findOne({
      where: {
        creatorId: userId,
        entryId: id,
      },
    });

    if (report) {
      return true;
    }

    await getConnection().transaction(async (em) => {
      // Create new report
      await em
        .createQueryBuilder()
        .insert()
        .into(Report)
        .values({
          entryId: id,
          creatorId: userId,
          reason,
        })
        .execute();

      // Update entry's reportCount
      await em.query(`
        update entry
        set "reportCount" = "reportCount" + 1
        where id = ${id}
      `);
    });

    return true;
  }

  @Query(() => SearchedEntries)
  async searchEntries(
    @Arg("limit", () => Int) limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset: number,
    @Arg("searchTerm") searchTerm: string,
    @Arg("tagFilters", () => [Int], { nullable: true }) _: number[],
    @Arg("sortBy", () => SortBy, { nullable: true }) __: SortBy
  ): Promise<SearchedEntries> {
    const realLimit = Math.min(30, limit); // limit to 30 max entries

    if (!searchTerm) {
      return {
        entries: [],
        searchTerm,
      };
    }

    // https://youtu.be/szfUbzsKvtE
    // https://stackoverflow.com/a/64450994
    const formattedQuery = searchTerm.trim().replace(/ /g, " <-> ");
    const entries = await Entry.createQueryBuilder()
      .select()
      .where("document_with_weights @@ to_tsquery(:searchTerm)", {
        searchTerm: `${formattedQuery}:*`,
      })
      .orderBy(
        "ts_rank(document_with_weights, to_tsquery(:searchTerm))",
        "DESC"
      )
      .skip(offset || 0)
      .limit(realLimit)
      .getMany();

    return {
      entries,
      searchTerm,
    };
  }

  @Mutation(() => Entry, { nullable: true })
  @UseMiddleware(isAuth)
  async tagEntry(
    @Arg("id", () => Int) id: number,
    @Arg("tagIds", () => [Int]) tagIds: number[],
    @Ctx() { req }: MyContext
  ) {
    const entry = await Entry.findOne({
      where: {
        id,
        creatorId: req.session.userId,
      },
    });

    // Don't do anything if the entry doesn't belong to the user
    if (!entry) {
      return null;
    }

    // Search for duplicate tags that the entry already posseses
    const entryTags = await EntryTag.find({
      where: {
        entryId: id,
        tagId: In(tagIds),
      },
    });

    // Build insert values based on which tags the entry doesn't already have
    let values: string = "";
    const existingTagIds = entryTags.map((et) => et.tagId);
    const filteredTagIds = tagIds.filter((tagId) => {
      return !existingTagIds.includes(tagId);
    });
    if (filteredTagIds.length === 0) {
      // If there are no tagIds to add
      return null;
    }
    filteredTagIds.forEach((tagId, index, arr) => {
      values += `(${id}, ${tagId})`;
      if (index < arr.length - 1) {
        values += ",";
      }
    });

    try {
      // Create multiple EntryTags
      if (values) {
        await getConnection().query(`
          insert into entry_tag ("entryId", "tagId") values
          ${values}
        `);
      }
    } catch (e) {
      if (isQueryError(e)) {
        if (e.code === "23503") {
          // Tag being inserted doesn't exist; do nothing
        }
      }
    }

    return Entry.findOne(id);
  }

  @Mutation(() => Entry, { nullable: true })
  @UseMiddleware(isAuth)
  async heartEntry(
    @Arg("id", () => Int) id: number,
    @Arg("deleteHeart", () => Boolean) deleteHeart: boolean,
    @Ctx() { req }: MyContext
  ): Promise<Entry | null> {
    const { userId } = req.session;
    const heart = await Heart.findOne({
      where: { entryId: id, creatorId: userId },
    });
    let entry = null;

    if (deleteHeart) {
      if (heart) {
        await getConnection().transaction(async (em) => {
          // Delete heart
          await em
            .createQueryBuilder()
            .delete()
            .from(Heart)
            .where('"entryId" = :entryId', { entryId: id })
            .execute();

          // Update entry's points
          await em.query(`
            update entry
            set points = points - 1
            where id = ${id}
          `);

          // Get the updated entry
          entry = await em.getRepository(Entry).findOne(id);
        });
      }
    } else {
      if (!heart) {
        await getConnection().transaction(async (em) => {
          // Create new heart
          await em
            .createQueryBuilder()
            .insert()
            .into(Heart)
            .values({
              entryId: id,
              creatorId: userId,
            })
            .execute();

          // Update entry's points
          await em.query(`
            update entry
            set points = points + 1
            where id = ${id}
          `);

          // Get the updated entry
          entry = await em.getRepository(Entry).findOne(id);
        });
      }
    }
    return entry;
  }

  @Query(() => Entry, { nullable: true })
  entry(@Arg("id", () => Int) id: number): Promise<Entry | undefined> {
    return Entry.findOne(id);
  }

  @Query(() => PaginatedEntries)
  async entries(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string
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

    const newCursor = entries[realLimit - 1]
      ? entries[realLimit - 1].createdAt.getTime().toString()
      : "";

    return {
      entries: entries.slice(0, realLimit),
      hasMore: entries.length === realLimitPlusOne,
      cursor: newCursor,
    };
  }

  @Mutation(() => EntryResponse)
  async createEntry(
    @Arg("title") title: string,
    @Arg("text", { nullable: true }) text: string,
    @Ctx() { req }: MyContext
  ): Promise<EntryResponse> {
    const errors = validateCreateEntry(title, text);

    if (errors) {
      return {
        errors,
      };
    }

    if (req.session.userId) {
      const entry = await Entry.create({
        creatorId: req.session.userId,
        title,
        text,
      }).save();

      return {
        entry,
      };
    }

    const entry = await Entry.create({
      title,
      text,
    }).save();
    return {
      entry,
    };
  }

  @Mutation(() => Entry, { nullable: true })
  @UseMiddleware(isAuth)
  async updateEntry(
    @Arg("id", () => Int) id: number,
    @Arg("text") text: string,
    @Ctx() { req }: MyContext
  ): Promise<Entry | null> {
    const errors = validateUpdateEntry(text);

    if (errors) {
      throw new UserInputError(errors[0].message);
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Entry)
      .set({ text })
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
    let result;
    if (req.session.isAdmin) {
      result = await Entry.delete({ id });
    } else {
      result = await Entry.delete({ id, creatorId: req.session.userId });
    }
    if (result.affected === 0) {
      // Failed to delete entry
      throw new ForbiddenError("Failed to delete entry");
    }
    return true;
  }
}
