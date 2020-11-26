import DataLoader from "dataloader";
import { In } from "typeorm";
import { EntryTag } from "../entities/EntryTag";

/**
 * This method is used in the server's index.ts to batch and cache entrytag requests
 * into a single request
 */
export const createEntryTagLoader = () => {
  return new DataLoader<number, EntryTag[]>(async (entryIds) => {
    const entryTags = await EntryTag.find({
      where: {
        entryId: In(entryIds as number[])
      },
      relations: ["tag"],
    });

    const entryIdToEntryTags: Record<number, EntryTag[]> = {};
    entryTags.forEach((et) => {
      const prevMap = entryIdToEntryTags[et.entryId] || [];
      entryIdToEntryTags[et.entryId] = [...prevMap, et];
    });
    // console.log(entryIdToEntryTags);

    return entryIds.map((key) => entryIdToEntryTags[key]);
  });
};
