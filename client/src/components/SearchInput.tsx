import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { debounce } from "../utils/debounce";

interface SearchInputProps {}

export const SearchInput: React.FC<SearchInputProps> = ({}) => {
  const [value, setValue] = React.useState("");
  const searchFunction = useCallback(debounce((val: string) => {
    // Perform search query here, then perform some cache
    // magic to replace existing entries to the result entries
    console.log("A SEARCH WAS PERFORMED: ", val);
  }, 2500), []);

  return (
    <InputGroup maxW={80}>
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
