import { QueryFailedError } from "typeorm";

export const isQueryError = (
  err: any
): err is QueryFailedError & { code: string } =>
  err instanceof QueryFailedError;
