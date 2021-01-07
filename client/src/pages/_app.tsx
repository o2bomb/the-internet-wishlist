import type { AppProps } from 'next/app';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PaginatedEntries } from "../generated/graphql";
import { ViewportProvider } from "../utils/ViewportProvider";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL,
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          entries: {
            keyArgs: [], // tells Apollo to just lump all entries together (instead of grouping them by limit, cursor, hasMore)
            merge(
              existing: PaginatedEntries | undefined,
              incoming: PaginatedEntries
            ): PaginatedEntries {
              // https://www.apollographql.com/docs/react/caching/cache-field-behavior/#the-merge-function
              // existing: stuff thats already in the cache
              // incoming: stuff coming from the server
              return {
                ...incoming,
                entries: [...(existing?.entries || []), ...incoming.entries],
              };
            },
          },
          searchEntries: {
            keyArgs: ["searchTerm"]
          }
        },
      },
    },
  }),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ViewportProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ViewportProvider>
    </ApolloProvider>
  );
}

export default MyApp;
