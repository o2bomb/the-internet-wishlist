import DataLoader from "dataloader"
import { User } from "../entities/User";

/**
 * This method is used in the server's index.ts to batch and cache user requests
 * into a single request
 */
export const createUserLoader = () => {
  return new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach(u => {
      userIdToUser[u.id] = u;
    })

    return userIds.map((userId) => userIdToUser[userId]);
  });
} 