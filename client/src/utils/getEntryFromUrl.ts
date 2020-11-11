import { useGetEntryQuery } from "../generated/graphql";
import { getIdFromUrl } from "./getIdFromUrl";

export const getEntryFromUrl = () => {
  const intId = getIdFromUrl();

  return useGetEntryQuery({
    skip: intId === -1, // pause query if invalid postid,
    variables: {
      id: intId,
    },
  });
};
