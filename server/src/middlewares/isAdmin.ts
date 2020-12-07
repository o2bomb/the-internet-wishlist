import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("User is not authenticated");
  }
  if (!context.req.session.isAdmin) {
    throw new Error("User does not have permission to access this resource");
  }

  return next();
};
