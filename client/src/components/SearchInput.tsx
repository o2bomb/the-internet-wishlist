import { SearchIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import { debounce } from "../utils/debounce";
import { useViewport } from "../utils/ViewportProvider";

interface SearchInputProps {}

export const SearchInput: React.FC<SearchInputProps> = ({}) => {
  const viewportValues = useViewport();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState("");
  const searchFunction = useCallback(
    debounce((val: string) => {
      // Perform search query here, then perform some cache
      // magic to replace existing entries to the result entries
      console.log("A SEARCH WAS PERFORMED: ", val);
    }, 2500),
    []
  );

  const InputStuffs = (maxW?: number) => {
    return (
      <InputGroup maxW={maxW}>
        <InputLeftElement children={<SearchIcon />} />
        <Input
          value={value}
          onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            if (newValue) {
              searchFunction(newValue);
            }
          }}
          type="search"
          placeholder="Search for an entry..."
        />
      </InputGroup>
    );
  };

  if (viewportValues.width < 720) {
    const MobileSearchDrawer = (
      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Search for an entry</DrawerHeader>
            <DrawerBody>
              {InputStuffs()}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );

    return (
      <>
        <IconButton
          onClick={onOpen}
          icon={<SearchIcon />}
          aria-label="Search entries"
        />
        {MobileSearchDrawer}
      </>
    );
  }

  return InputStuffs(80);
};
