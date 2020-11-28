import DataLoader from "dataloader";
import { Report } from "../entities/Report";
import { In } from "typeorm";

/**
 * This method is used in the server's index.ts to batch and cache report requests
 * into a single request
 */
export const createReportLoader = () => {
  return new DataLoader<number, Report[]>(async (entryIds) => {
    const reports = await Report.find({
      where: {
        entryId: In(entryIds as number[]),
      },
    });

    const entryIdToReport: Record<number, Report[]> = {};
    reports.forEach((et) => {
      const prevMap = entryIdToReport[et.entryId] || [];
      entryIdToReport[et.entryId] = [...prevMap, et];
    });
    // console.log(entryIdToReport);

    return entryIds.map((key) => entryIdToReport[key]);
  });
};
