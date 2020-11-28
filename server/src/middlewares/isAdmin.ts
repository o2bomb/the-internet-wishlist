import { User } from "../entities/User";
import { MyContext } from "../types";
import { MiddlewareFn } from "type-graphql";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("User is not authenticated");
  }
  const user = await User.findOne(context.req.session.userId);
  if (!user?.isAdmin) {
    throw new Error("User does not have permissions");
  }

  return next();
}