import { IconButton, useToast } from "@chakra-ui/react";
import React from "react";
import { HeartIcon } from "../constants";
import {
  RegularEntryFragment,
  useHeartEntryMutation,
} from "../generated/graphql";

interface HeartButtonProps {
  entry: RegularEntryFragment;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ entry }) => {
  const toast = useToast();
  const { id, isHearted } = entry;
  const [heartEntry] = useHeartEntryMutation();

  return (
    <IconButton
      onClick={async () => {
        await heartEntry({
          variables: {
            id,
            deleteHeart: isHearted,
          },
        }).catch((e) => {
          // error occurred, notify user
          console.log(e);

          toast({
            title: "You must be logged in to like an entry!",
            status: "error",
            duration: 1000,
            isClosable: true,
          });
        });
      }}
      colorScheme={isHearted ? "red" : undefined}
      aria-label="Heart entry"
      icon={<HeartIcon />}
      isRound
    />
  );
};
