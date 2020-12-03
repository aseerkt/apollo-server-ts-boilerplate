import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/UserResolver';
import { createTypeOrmConnection } from './utils/ormConn';
import { PORT } from './constants';

export const startServer = async () => {
  await createTypeOrmConnection();
  const app = express();

  app.get('/', (_, res) => res.send('API is running'));

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver], validate: false }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `GraphQL Server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};
