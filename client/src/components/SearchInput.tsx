import React, { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
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
import { useViewport } from "../utils/ViewportProvider";

export interface SearchInputProps {
  onSearchInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchInputFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onSearchInputBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  forceSearch?: (val: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearchInputKeyDown,
  onSearchInputChange,
  onSearchInputFocus,
  onSearchInputBlur,
  forceSearch,
}) => {
  const viewportValues = useViewport();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState("");

  const InputStuffs = (maxW?: number) => {
    return (
      <InputGroup maxW={maxW}>
        <InputLeftElement children={<SearchIcon />} />
        <Input
          value={value}
          onKeyDown={onSearchInputKeyDown}
          onChange={(e) => {
            if (onSearchInputChange) {
              onSearchInputChange(e);
            }
            setValue(e.target.value);
          }}
          onFocus={onSearchInputFocus}
          onBlur={onSearchInputBlur}
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
              <form
                onSubmit={(e) => {
                  if (forceSearch) {
                    forceSearch(value);
                  }
                  onClose();
                  e.preventDefault();
                }}
              >
                {InputStuffs()}
                <Button mt={4} w="100%" type="submit">Search</Button>
              </form>
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
