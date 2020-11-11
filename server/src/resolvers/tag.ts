import { Tag } from "../entities/Tag";
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
import { isQueryError } from "../utils/isQueryError";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types";
import { Entry } from "../entities/Entry";
import { User } from "../entities/User";
import { FieldError } from "./FieldError";

@ObjectType()
class TagResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
  @Field(() => Tag, { nullable: true })
  tag?: Tag;
}

@Resolver(Tag)
export class TagResolver {
  @FieldResolver(() => User, { nullable: true })
  async creator(@Root() entry: Entry, @Ctx() { userLoader }: MyContext) {
    let user = null;
    if (entry.creatorId) {
      user = await userLoader.load(entry.creatorId);
    }
    return user;
  }

  @Query(() => Tag, { nullable: true })
  tag(@Arg("id", () => Int) id: number): Promise<Tag | undefined> {
    return Tag.findOne(id);
  }

  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    return Tag.find({});
  }

  @Mutation(() => TagResponse)
  @UseMiddleware(isAuth)
  async createTag(
    @Arg("name") name: string,
    @Ctx() { req }: MyContext
  ): Promise<TagResponse> {
    if (name.length === 0) {
      return {
        errors: [
          {
            field: "name",
            message: "Tag name must contain at least 1 character",
          },
        ],
      }
    }

    let tag;
    try {
      tag = await Tag.create({
        creatorId: req.session.userId,
        displayName: name,
        name: name.toLowerCase(),
      })
        .save();
    } catch (e) {
      if (isQueryError(e)) {
        if (e.code === "23505") {
          // Tag is a duplicate; don't do anything
          return {
            errors: [
              {
                field: "name",
                message: "Tag already exists",
              },
            ],
          };
        }
      }
    }

    return {
      tag
    };
  }
}
