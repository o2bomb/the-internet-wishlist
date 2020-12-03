import { SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import { EntryCard } from "../components/EntryCard";
import { EntryList } from "../components/EntryList";
import { Layout } from "../components/Layout";
import { Listener } from "../components/Listener";
import { SearchInput } from "../components/SearchInput";
import { useSearchEntriesLazyQuery } from "../generated/graphql";
import { debounce } from "../utils/debounce";

const Index = () => {
  const [searchEntries, { data, loading, error }] = useSearchEntriesLazyQuery();
  const [showSearch, setShowSearch] = useState(false);

  const SearchEntriesInput = (
    <SearchInput
      forceSearch={(val) => {
        searchEntries({
          variables: {
            limit: 30,
            searchTerm: val,
          },
        });
      }}
      onSearchInputKeyDown={(e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
          searchEntries({
            variables: {
              limit: 30,
              searchTerm: e.currentTarget.value,
            },
          });
        }
      }}
      onSearchInputChange={(e) => {
        if (e.target.value) {
          searchFunction(e.target.value);
        }
      }}
      onSearchInputFocus={() => {
        setShowSearch(true);
      }}
    >
      {showSearch ? (
        <Button
          onClick={() => {
            setShowSearch(false);
          }}
          ml={4}
          size="sm"
          rightIcon={<SmallCloseIcon />}
        >
          Clear search
        </Button>
      ) : null}
    </SearchInput>
  );

  const searchFunction = debounce((val: string) => {
    searchEntries({
      variables: {
        limit: 30,
        searchTerm: val,
      },
    });
  }, 1000);

  const searchResults = () => {
    if (!data && loading) {
      return <Box>Loading entries...</Box>;
    }

    if (error) {
      console.log(error);
      return <Box>An error occured while looking for entries</Box>;
    }

    return (
      <>
        <Heading as="h2" size="2xl" mb={4}>
          Search results for: {data?.searchEntries.searchTerm}
        </Heading>
        <Stack spacing={4}>
          {data?.searchEntries.entries.map((e, index) => (
            <Box key={index}>
              <EntryCard entry={e} />
            </Box>
          ))}
        </Stack>
      </>
    );
  };

  const onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void = (e) => {
    if (e.key === "Escape" || e.keyCode === 27) {
      setShowSearch(false);
    }
  };

  return (
    <Listener onKeyDown={onKeyDown}>
      <Layout variant="small" navigation searchInput={SearchEntriesInput}>
        {showSearch ? searchResults() : <EntryList />}
      </Layout>
    </Listener>
  );
};

export default Index;
