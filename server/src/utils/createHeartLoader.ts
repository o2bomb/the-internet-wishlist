import DataLoader from "dataloader"
import { Heart } from "../entities/Heart"

/**
 * This method is used in the server's index.ts to batch and cache heart requests
 * into a single request
 */
export const createHeartLoader = () => {
  return new DataLoader<{ entryId: number, creatorId: number }, Heart | null>(async (keys) => {
    const hearts = await Heart.findByIds(keys as any);
    const heartIdToHeart: Record<string, Heart> = {};
    hearts.forEach((h) => {
      heartIdToHeart[`${h.entryId} | ${h.creatorId}`] = h;
    })

    return keys.map((key) => heartIdToHeart[`${key.entryId} | ${key.creatorId}`])
  })
}