import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Entry } from "../entities/Entry";
import { User } from "../entities/User";

@Resolver(Entry)
export class EntryResolver {
  @FieldResolver(() => User, { nullable: true })
  creator(@Root() entry: Entry) {
    return User.findOne(entry.creatorId);
  }

  @Query(() => Entry, { nullable: true })
  post(@Arg("id", () => Int) id: number): Promise<Entry | undefined> {
    return Entry.findOne(id);
  }

  @Mutation(() => Entry)
  async createPost(
    @Arg("title") title: string,
    @Arg("text") text: string
  ): Promise<Entry> {
    return Entry.create({
      title,
      text,
    }).save();
  }

  @Mutation(() => Entry)
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title") title: string,
    @Arg("text") text: string
  ): Promise<Entry | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Entry)
      .set({ title, text })
      .where("id = :id", { id })
      .returning("*")
      .execute();

    return result.raw[0];
  }
}
