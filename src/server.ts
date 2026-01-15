/* eslint-disable no-console */
import http from 'http';
import mongoose from 'mongoose';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';

import depthLimit from 'graphql-depth-limit';
import { createComplexityLimitRule } from 'graphql-validation-complexity';

import config from './app/config';
import seedSuperAdmin from './app/DB';
import { typeDefs } from './app/graphql/schema';
import { resolvers } from './app/graphql/resolvers';
import { normalizeGraphQLError } from './app/errors/normalizeGraphQLError';
import { buildContext } from './app/utils/context';

import app from './app';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

async function bootstrap() {
  // Connect DB
  await mongoose.connect(config.mongodb_url as string);
  seedSuperAdmin();

  // Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: config.node_env !== 'production',
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    formatError: (formattedError, error) =>
      normalizeGraphQLError(
        error,
        config.node_env === 'production'
          ? 'Internal server error'
          : formattedError.message,
      ),
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: buildContext,
    }),
  );

  app.use(notFound);
  app.use(globalErrorHandler);

  http.createServer(app).listen(config.port, () => {
    console.log(`🚀 Server ready at http://localhost:${config.port}/graphql`);
  });
}

bootstrap().catch(err => {
  console.error('Startup failure:', err);
  process.exit(1);
});
