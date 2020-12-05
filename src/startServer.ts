import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { redisClient } from './redisClient';
import { UserResolver } from './resolvers/UserResolver';
import { createTypeOrmConnection } from './utils/createTypeOrmConn';
import { PORT } from './constants';
import confirmEmailLinkRoute from './routes/confirmEmailRoute';

export const startServer = async () => {
  await createTypeOrmConnection();
  const app = express();

  app.get('/', (_, res) => res.send('API is running'));
  app.use('/confirm', confirmEmailLinkRoute);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver], validate: false }),
    context: ({ req, res }) => ({ req, res, redis: redisClient }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      `GraphQL Server is running at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
};
