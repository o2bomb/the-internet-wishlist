# The Internet Wishlist
Inspired by https://twitter.com/theiwl?lang=en

## Technology stack
Front end:
- TypeScript
- [React](https://reactjs.org/)
- [Next](https://nextjs.org/)
- [Apollo Client](https://github.com/apollographql/apollo-client) (GraphQL client)
- [ChakraUI](https://chakra-ui.com/)
- [Framer Motion](https://www.framer.com/motion/)

Back end:
- TypeScript
- [Express](https://expressjs.com/)
- [Apollo Server](https://github.com/apollographql/apollo-server) (GraphQL server)
- [TypeGraphQL](https://typegraphql.com/) (GraphQL schema framework)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)


## How to run the project
Installation prerequisites:
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- Yarn or npm

1. Clone the repo to your local machine
2. Create a .env file in the `server` and `client` directories (see the .env.example file for an example of what the .env file looks like)
3. `sudo service postgresql start` to start the PostgreSQL server
4. `sudo -u postgres createdb tiw` to create a new database called "tiw"
5. In the `server` directory:
    1. `yarn install` to install all required libraries
    2. `yarn watch` to run the TypeScript compiler
    3. In a new terminal, `yarn dev` to start the server
    - Check that the GraphQL server is running correctly on http://localhost:4000/graphql
6. In the `client` directory:
    1. `yarn install` to install all required libraries
    2. In a new terminal, `yarn dev` to start the server
    - Check that the client is running correctly on http://localhost:3000

### Using Docker
Follow the instructions in this section if you want to run the development environment using Docker

Installation prerequisites:
- [Docker Desktop](https://www.docker.com/get-started)
- Yarn or npm

1. Clone the repo to your local machine, and **checkout the prod branch**
2. Create a .env file in the `server` and `client` directories (see the .env.example file for an example of what the .env file looks like)
3. `docker-compose run --rm -p 4000:4000 server` to start the postgres, redis and server services
- Check that the GraphQL server is running correctly on http://localhost:4000/graphql
4. In the `client` directory:
    1. `yarn install` to install all required libraries
    2. In a new terminal, `yarn dev` to start the server
    - Check that the client is running correctly on http://localhost:3000
- While the Docker services are running, `docker-compose exec postgres psql -U postgres tiw` can be used to gain direct access to the database

## Things I learned from this project
- In order for a `<a>` element to be able to be focused on (tabbable) it needs to have the `href` attribute set
- A debounce function that is used within a functional component in React will only work if it is wrapped in `React.useCallback()` (see [here](https://stackoverflow.com/a/55616626))
- To add a margin-top to only wrapped items within a flexbox, set the margin-top of the container to a negative value equal to the margin-top of the items within the flexbox (see [here](https://stackoverflow.com/a/30891910))
- Using the cors library is not necessary for setting headers on the server. Can be done through Apollo Server options directly (sometimes the cors library stuffs up the cookie setting header as well for some reason)
- The [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) (`??`) is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined
- create-react-app and Next have different ways of exposing environment variables. In Next, browser-side vars are exposed by prefixing them with `NEXT_PUBLIC_` (see [here](https://nextjs.org/docs/basic-features/environment-variables))
- In PostgreSQL, in order to select a table named user, the table name has to be encased in double quotation marks. This is because the `user` keyword exists as an alias for `current_user` (see [here](https://dba.stackexchange.com/questions/75551/returning-rows-in-postgresql-with-a-table-called-user))
- To bind data coming from Apollo Client to React state, use the `useEffect(..., [data])` hook
- `psql -U postgres tiw` to gain access to the `tiw` database as the `postgres` user 